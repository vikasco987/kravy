import "react-native-gesture-handler";
import React from "react";
import { Tabs, usePathname } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TopNavBar from "../components/TopNavBar";

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();

  // Dynamic title logic: now includes Dashboard
  const getTitle = () => {
    if (pathname.includes("Dashboard")) return "Sales & Bills";
    if (pathname.includes("menu")) return "POS Menu";
    if (pathname.includes("Client")) return "Client";
    if (pathname.includes("Inventory")) return "Inventory";
    if (pathname.includes("printer")) return "Printer Setup";
    if (pathname.includes("settings")) return "Settings";
    return "App";
  };

  return (
    <>
      {/* Top title bar */}
      <TopNavBar title={getTitle()} />

      <Tabs
        screenOptions={{
          headerShown: false, // hide default header
          tabBarActiveTintColor: "#1E90FF", // A vibrant blue
          tabBarInactiveTintColor: "#6B7280", // Slate gray
          tabBarStyle: {
            backgroundColor: "#fff",
            borderTopWidth: 1,
            borderTopColor: "#E5E7EB",
            height: 60 + insets.bottom,
            paddingBottom: insets.bottom > 0 ? insets.bottom : 6,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600'
          }
        }}
      >
        {/* === NEW DASHBOARD TAB === */}
        <Tabs.Screen
          name="Dashboard" // Maps to Dashboard.jsx
          options={{
            title: "Dashboard",
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons 
                name={focused ? "bar-chart" : "bar-chart-outline"} // Attractive sales icon
                size={size} 
                color={color} 
              />
            ),
          }}
        />

        <Tabs.Screen
          name="menu"
          options={{
            title: "Menu",
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons 
                name={focused ? "grid" : "grid-outline"} 
                size={size} 
                color={color} 
              />
            ),
          }}
        />

        <Tabs.Screen
          name="Client"
          options={{
            title: "Client",
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons 
                name={focused ? "people" : "people-outline"} 
                size={size} 
                color={color} 
              />
            ),
          }}
        />

        <Tabs.Screen
          name="Inventory"
          options={{
            title: "Inventory",
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons 
                name={focused ? "cube" : "cube-outline"} 
                size={size} 
                color={color} 
              />
            ),
          }}
        />

        <Tabs.Screen
          name="printer"
          options={{
            title: "Printer",
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons 
                name={focused ? "print" : "print-outline"} 
                size={size} 
                color={color} 
              />
            ),
          }}
        />

        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons 
                name={focused ? "settings" : "settings-outline"} 
                size={size} 
                color={color} 
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
