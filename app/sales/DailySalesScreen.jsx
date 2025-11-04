import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { useAuth, useUser } from "@clerk/clerk-expo";

export default function DailySalesScreen() {
  const { getToken } = useAuth();
  const { isLoaded, isSignedIn } = useUser();

  const [dailySales, setDailySales] = useState([]);
  const [loading, setLoading] = useState(true);

  const groupSalesByDate = (bills) => {
    const grouped = {};
    bills.forEach((bill) => {
      const date = new Date(bill.createdAt).toLocaleDateString();
      if (!grouped[date]) grouped[date] = { date, numberOfBills: 0, totalSales: 0 };
      grouped[date].numberOfBills += 1;
      grouped[date].totalSales += bill.grandTotal;
    });
    return Object.values(grouped).sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const fetchBills = async () => {
    if (!isLoaded || !isSignedIn) return;
    try {
      const token = await getToken();
      const res = await fetch("https://billing-backend-sable.vercel.app/api/billing/list", {
        headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      });
      const data = await res.json();
      if (res.ok && data.bills) setDailySales(groupSalesByDate(data.bills));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBills(); }, [isLoaded, isSignedIn]);

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1, justifyContent: "center" }} />;

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <View style={styles.headerRow}>
        <Text style={[styles.cell, { flex: 2 }]}>Date</Text>
        <Text style={styles.cell}>Number of Bills</Text>
        <Text style={styles.cell}>Total Sales</Text>
      </View>
      <FlatList
        data={dailySales}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={[styles.cell, { flex: 2 }]}>{item.date}</Text>
            <Text style={styles.cell}>{item.numberOfBills}</Text>
            <Text style={styles.cell}>₹{item.totalSales}</Text>
          </View>
        )}
        ListEmptyComponent={() => <Text>No sales found.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerRow: { flexDirection: "row", paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "#ccc" },
  row: { flexDirection: "row", paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#eee" },
  cell: { flex: 1, textAlign: "center", fontSize: 14, fontWeight: "500" },
});
