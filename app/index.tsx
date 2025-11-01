// // app/index.tsx
// import { useEffect } from "react";
// import { useRouter } from "expo-router";
// import { useAuth } from "@clerk/clerk-expo";
// import { ActivityIndicator, View } from "react-native";

// export default function RootRedirect() {
//   const router = useRouter();
//   const { isLoaded, isSignedIn } = useAuth();

//   useEffect(() => {
//     if (!isLoaded) return; // wait until Clerk finishes loading

//     if (isSignedIn) {
//       // ✅ Logged in → go to main app
//       router.replace("/(tabs)/menu");
//     } else {
//       // 🚪 Not logged in → go to sign-in
//       router.replace("/(auth)/sign-in");
//     }
//   }, [isLoaded, isSignedIn]);

//   // While Clerk is checking auth state
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <ActivityIndicator size="large" color="#007bff" />
//     </View>
//   );
// }





// import { useEffect } from "react";
// import { useRouter } from "expo-router";

// export default function RootRedirect() {
//   const router = useRouter();

//   useEffect(() => {
//     router.replace("/(tabs)/menu");
//   }, []);

//   return null;
// }




// 👇 MUST be the very first import
import "react-native-gesture-handler";

import { useEffect } from "react";
import { useRouter } from "expo-router";

export default function RootRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/(tabs)/menu");
  }, []);

  return null;
}
