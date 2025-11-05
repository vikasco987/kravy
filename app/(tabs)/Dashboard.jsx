import React from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView,
  SafeAreaView 
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from '@expo/vector-icons'; 

// --- Constants ---
const COLORS = {
  primary: '#1E90FF', // Dodger Blue for action/main elements
  secondary: '#3CB371', // Medium Sea Green for sales highlights
  background: '#F0F2F5', // Light gray background
  card: '#FFFFFF', // White card background
  text: '#333333',
  shadow: '#0000001A', // Light shadow for depth
};

// --- Custom Dashboard Card Component ---
const DashboardCard = ({ title, iconName, path, router }) => (
  <TouchableOpacity
    style={dashboardStyles.card}
    onPress={() => router.push(path)}
  >
    <View style={dashboardStyles.iconContainer}>
      <Ionicons 
        name={iconName} 
        size={36} 
        color={title === 'Daily Sales' ? COLORS.primary : title === 'Weekly Sales' ? COLORS.secondary : '#FF4500'} 
      />
    </View>
    <Text style={dashboardStyles.cardTitle}>{title}</Text>
    <Text style={dashboardStyles.cardSubtitle}>View detailed reports and trends</Text>
  </TouchableOpacity>
);

// --- Main Sales Dashboard Component ---
export default function SalesDashboard() {
  const router = useRouter();

  const tabs = [
    { title: "Daily Sales", path: "/sales/DailySalesScreen", icon: "sunny-outline" },
    { title: "Weekly Sales", path: "/sales/WeeklySalesScreen", icon: "calendar-outline" },
    { title: "Monthly Sales", path: "/sales/MonthlySalesScreen", icon: "stats-chart-outline" },
//     { title: "Products & Inventory", path: "/inventory/ProductsScreen", icon: "cube-outline" },
  ];

  return (
    <SafeAreaView style={dashboardStyles.safeArea}>
      <ScrollView style={dashboardStyles.container}>
        <Text style={dashboardStyles.heading}>📈 Revenue Overview</Text>
        <Text style={dashboardStyles.subHeading}>Select a view to analyze sales data</Text>
        
        <View style={dashboardStyles.cardGrid}>
          {tabs.map((tab, index) => (
            <DashboardCard
              key={index}
              title={tab.title}
              iconName={tab.icon}
              path={tab.path}
              router={router}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// --- Enhanced Stylesheet ---
const dashboardStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: { 
    flex: 1, 
    padding: 15,
  },
  heading: { 
    fontSize: 28, 
    fontWeight: "900", 
    color: COLORS.text,
    marginBottom: 5,
    paddingTop: 10,
  },
  subHeading: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    fontWeight: '500',
  },
  cardGrid: {
    // Optional: Use flex wrap or simply stack if not aiming for a two-column grid
    flexDirection: 'column', 
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: COLORS.card,
    padding: 20,
    marginBottom: 15,
    borderRadius: 12,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background,
    marginRight: 15,
  },
  cardTitle: { 
    fontSize: 18, 
    fontWeight: "700", 
    color: COLORS.text, 
    flex: 1,
  },
  cardSubtitle: { 
    fontSize: 12, 
    color: '#999',
    marginTop: 5,
    width: '100%', // Take full width below title
    marginLeft: 65, // Align with title text flow
  },
});