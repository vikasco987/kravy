import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function SalesDashboard() {
  const router = useRouter();

  const tabs = [
    { title: "Daily Sales", path: "/sales/DailySalesScreen" },
    { title: "Weekly Sales", path: "/sales/WeeklySalesScreen" },
    { title: "Monthly Sales", path: "/sales/MonthlySalesScreen" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>📊 Sales Dashboard</Text>
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={index}
          style={styles.tabButton}
          onPress={() => router.push(tab.path)}
        >
          <Text style={styles.tabText}>{tab.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  heading: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  tabButton: {
    backgroundColor: "#4f46e5",
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
  },
  tabText: { color: "#fff", textAlign: "center", fontSize: 16, fontWeight: "600" },
});
