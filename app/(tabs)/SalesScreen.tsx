"use client";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useAuth, useUser } from "@clerk/clerk-expo";

type Bill = {
  id: string;
  createdAt: string;
  totalAmount: number;
  items: {
    name: string;
    qty: number;
    price: number;
  }[];
  customer?: {
    name: string;
    phone: string;
  };
};

export default function SalesListScreen() {
  const { getToken } = useAuth();
  const { isLoaded, isSignedIn } = useUser();
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSales = async () => {
    try {
      setLoading(true);
      const token = isLoaded && isSignedIn ? await getToken() : null;
      const res = await fetch("https://billing-backend-sable.vercel.app/api/billing", {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      const data = await res.json();

      if (res.ok) {
        setBills(data.bills || []);
      } else {
        console.error("Fetch sales failed:", data.error);
        Alert.alert("Error", data.error || "Failed to load sales data");
      }
    } catch (err: any) {
      console.error("Error fetching sales:", err);
      Alert.alert("Error", err.message || "Failed to fetch sales");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales();
  }, [isLoaded, isSignedIn]);

  const renderItem = ({ item }: { item: Bill }) => (
    <View style={styles.card}>
      <Text style={styles.dateText}>
        {new Date(item.createdAt).toLocaleDateString()}
      </Text>

      <Text style={styles.customerName}>
        👤 {item.customer?.name || "Walk-in Customer"}
      </Text>
      <Text style={styles.phone}>{item.customer?.phone || "—"}</Text>

      <View style={styles.tableHeader}>
        <Text style={[styles.cell, { flex: 2 }]}>Item</Text>
        <Text style={[styles.cell, { flex: 1 }]}>Qty</Text>
        <Text style={[styles.cell, { flex: 1 }]}>Price</Text>
        <Text style={[styles.cell, { flex: 1 }]}>Total</Text>
      </View>

      {item.items.map((itm, idx) => (
        <View key={idx} style={styles.tableRow}>
          <Text style={[styles.cell, { flex: 2 }]}>{itm.name}</Text>
          <Text style={[styles.cell, { flex: 1 }]}>{itm.qty}</Text>
          <Text style={[styles.cell, { flex: 1 }]}>₹{itm.price}</Text>
          <Text style={[styles.cell, { flex: 1 }]}>₹{itm.qty * itm.price}</Text>
        </View>
      ))}

      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Grand Total:</Text>
        <Text style={styles.totalValue}>₹{item.totalAmount.toFixed(2)}</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4f46e5" />
        <Text>Loading Sales...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ backgroundColor: "#f8f9fa" }}>
      <Text style={styles.heading}>📊 Sales Report</Text>

      {bills.length === 0 ? (
        <Text style={styles.noData}>No sales found.</Text>
      ) : (
        <FlatList
          data={bills}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}

      <TouchableOpacity onPress={fetchSales} style={styles.refreshBtn}>
        <Text style={styles.refreshText}>🔄 Refresh</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 15,
    marginBottom: 15,
    elevation: 2,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  dateText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  customerName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
  },
  phone: {
    color: "#666",
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 5,
    backgroundColor: "#f2f2f2",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 4,
  },
  cell: {
    textAlign: "center",
    fontSize: 14,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderColor: "#ccc",
    marginTop: 8,
    paddingTop: 6,
  },
  totalLabel: {
    fontWeight: "bold",
    fontSize: 16,
  },
  totalValue: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#4f46e5",
  },
  noData: {
    textAlign: "center",
    color: "#666",
    marginTop: 50,
    fontSize: 16,
  },
  refreshBtn: {
    backgroundColor: "#4f46e5",
    marginHorizontal: 100,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  refreshText: {
    color: "white",
    fontWeight: "bold",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
