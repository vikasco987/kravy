// app/(tabs)/settings.tsx
import React, { useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useClerk, useUser } from "@clerk/clerk-expo";

export default function SettingsScreen({ navigation }) {
  const { user } = useUser();
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    try {
      console.log("👋 Signing out user...");
      await SecureStore.deleteItemAsync("__clerk_client_jwt");
      console.log("🧹 Cleared saved token (__clerk_client_jwt)");

      await signOut();
      console.log("✅ Clerk sign-out complete.");

      navigation.replace("/(auth)/sign-in");
    } catch (error) {
      console.error("❌ Error during sign-out:", error);
    }
  };

  useEffect(() => {
    const debugStoredToken = async () => {
      const stored = await SecureStore.getItemAsync("__clerk_client_jwt");
      console.log(
        "🔍 Stored token (for debug):",
        stored ? stored.substring(0, 25) + "..." : "null"
      );
    };
    debugStoredToken();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {user?.firstName || "User"} 👋</Text>
      <Text style={styles.subtitle}>Here’s your settings page</Text>

      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold" },
  subtitle: { fontSize: 16, marginTop: 10, marginBottom: 20 },
});
