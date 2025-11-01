// app/oauth-native-callback.tsx
import { useEffect } from "react";
import { useRouter } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export default function OAuthNativeCallback() {
  const router = useRouter();

  useEffect(() => {
    // 👇 Redirect user to your main tabs after successful login
    router.replace("/(tabs)/menu");
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
