// import React, { useEffect } from "react";
// import { View, Text, Button, StyleSheet, Platform } from "react-native";
// import * as WebBrowser from "expo-web-browser";
// import { useAuth, useSignIn, useClerk } from "@clerk/clerk-expo";

// WebBrowser.maybeCompleteAuthSession();

// export default function SignIn() {
//   const { signIn } = useSignIn();
//   const { isSignedIn } = useAuth();
//   const clerk = useClerk();

//   const handleSignIn = async () => {
//     try {
//       // Open Clerk hosted sign-in page
//       await clerk.openSignIn();
//     } catch (err) {
//       console.error("Sign-in error:", err);
//     }
//   };

//   useEffect(() => {
//     if (isSignedIn) {
//       console.log("User is already signed in!");
//       // Optionally redirect to /tabs/menu or your main page
//     }
//   }, [isSignedIn]);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Please sign in</Text>
//       <Button title="Sign In" onPress={handleSignIn} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: "center", alignItems: "center" },
//   title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
// });



// // app/SignIn.tsx
// import React from "react";
// import { View, Text, Button, StyleSheet } from "react-native";
// import * as WebBrowser from "expo-web-browser";
// import { useOAuth } from "@clerk/clerk-expo";

// WebBrowser.maybeCompleteAuthSession();

// export default function SignIn() {
//   const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

//   const handleSignIn = async () => {
//     try {
//       const result = await startOAuthFlow();

//       if (result.createdSessionId) {
//         // Sign-in succeeded!
//         console.log("✅ User signed in!");
//       } else {
//         console.log("⚠️ Sign-in incomplete or canceled.");
//       }
//     } catch (err) {
//       console.error("Sign-in error:", err);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Welcome to MyBillingAppPro</Text>
//       <Text style={styles.subtitle}>Please sign in to continue</Text>
//       <Button title="Sign In with Google" onPress={handleSignIn} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: "center", alignItems: "center" },
//   title: { fontSize: 22, fontWeight: "bold", marginBottom: 8 },
//   subtitle: { fontSize: 16, marginBottom: 20 },
// });












// import React, { useEffect } from "react";
// import { View, Text, Button, StyleSheet, Alert } from "react-native";
// import * as WebBrowser from "expo-web-browser";
// import { useOAuth, useUser, useAuth } from "@clerk/clerk-expo";
// import { useRouter } from "expo-router";

// WebBrowser.maybeCompleteAuthSession();

// export default function SignIn() {
//   const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
//   const { isSignedIn } = useUser();
//   const { signOut } = useAuth();
//   const router = useRouter();

//   // ✅ If already signed in → redirect to home or main page
//   useEffect(() => {
//     if (isSignedIn) {
//       router.replace("/(tabs)"); // 👈 change if your home route is different
//     }
//   }, [isSignedIn]);

//   const handleSignIn = async () => {
//     try {
//       const result = await startOAuthFlow();

//       if (result?.createdSessionId) {
//         console.log("✅ Google sign-in successful!");
//         router.replace("/(tabs)"); // Redirect to your app’s main page
//       } else {
//         Alert.alert("Sign-in cancelled", "Please try again.");
//         console.log("⚠️ Sign-in incomplete or cancelled.");
//       }
//     } catch (err) {
//       console.error("❌ Sign-in error:", err);
//       Alert.alert("Error", "Something went wrong during sign-in.");
//       await signOut(); // ensures a clean state
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Welcome to MyBillingAppPro</Text>
//       <Text style={styles.subtitle}>Please sign in to continue</Text>
//       <Button title="Sign In with Google" onPress={handleSignIn} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: "center", alignItems: "center" },
//   title: { fontSize: 22, fontWeight: "bold", marginBottom: 8 },
//   subtitle: { fontSize: 16, marginBottom: 20 },
// });















// import React, { useEffect } from "react";
// import { View, Text, Button, StyleSheet, Alert } from "react-native";
// import * as WebBrowser from "expo-web-browser";
// import { useOAuth, useUser, useAuth } from "@clerk/clerk-expo";
// import { useRouter } from "expo-router";

// WebBrowser.maybeCompleteAuthSession();

// export default function SignIn() {
//   const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
//   const { isSignedIn } = useUser();
//   const { signOut } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (isSignedIn) {
//       router.replace("/(tabs)/Home");
//     }
//   }, [isSignedIn]);

//   const handleSignIn = async () => {
//     try {
//       const result = await startOAuthFlow();

//       if (result?.createdSessionId) {
//         console.log("✅ Google sign-in successful!");
//         router.replace("/(tabs)/Home");
//       } else {
//         Alert.alert("Sign-in cancelled", "Please try again.");
//       }
//     } catch (err) {
//       console.error("❌ Sign-in error:", err);
//       Alert.alert("Error", "Something went wrong during sign-in.");
//       await signOut();
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Welcome to MyBillingAppPro</Text>
//       <Text style={styles.subtitle}>Please sign in to continue</Text>
//       <Button title="Sign In with Google" onPress={handleSignIn} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: "center", alignItems: "center" },
//   title: { fontSize: 22, fontWeight: "bold", marginBottom: 8 },
//   subtitle: { fontSize: 16, marginBottom: 20 },
// });





// import React, { useEffect, useState } from "react";
// import { View, Text, Button, StyleSheet, Alert } from "react-native";
// import * as WebBrowser from "expo-web-browser";
// import { useOAuth, useUser, useAuth } from "@clerk/clerk-expo";
// import { useRouter } from "expo-router";

// WebBrowser.maybeCompleteAuthSession();

// export default function SignIn() {
//   const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
//   const { isSignedIn } = useUser();
//   const { signOut } = useAuth();
//   const router = useRouter();

//   const [ready, setReady] = useState(false); // ✅ track if component mounted

//   useEffect(() => {
//     setReady(true);
//   }, []);

//   useEffect(() => {
//     if (ready && isSignedIn) {
//       // ✅ only navigate after component is mounted
//       router.replace("/(tabs)/Home");
//     }
//   }, [isSignedIn, ready]);

//   const handleSignIn = async () => {
//     try {
//       const result = await startOAuthFlow();

//       if (result?.createdSessionId) {
//         console.log("✅ Google sign-in successful!");
//         router.replace("/(tabs)/Home");
//       } else {
//         Alert.alert("Sign-in cancelled", "Please try again.");
//       }
//     } catch (err) {
//       console.error("❌ Sign-in error:", err);
//       Alert.alert("Error", "Something went wrong during sign-in.");
//       await signOut(); // clean state
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Welcome to MyBillingAppPro</Text>
//       <Text style={styles.subtitle}>Please sign in to continue</Text>
//       <Button title="Sign In with Google" onPress={handleSignIn} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: "center", alignItems: "center" },
//   title: { fontSize: 22, fontWeight: "bold", marginBottom: 8 },
//   subtitle: { fontSize: 16, marginBottom: 20 },
// });








// import React, { useEffect, useState } from "react";
// import { View, Text, Button, StyleSheet, Alert } from "react-native";
// import * as WebBrowser from "expo-web-browser";
// import { useOAuth, useUser, useAuth } from "@clerk/clerk-expo";
// import { useRouter } from "expo-router";

// WebBrowser.maybeCompleteAuthSession();

// export default function SignIn() {
//   const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
//   const { isSignedIn } = useUser();
//   const { signOut } = useAuth();
//   const router = useRouter();

//   const [ready, setReady] = useState(false); // ✅ track if component mounted

//   useEffect(() => {
//     setReady(true);
//   }, []);

//   useEffect(() => {
//     if (ready && isSignedIn) {
//       // ✅ only navigate after component is mounted
//       router.replace("/(tabs)/Home");
//     }
//   }, [isSignedIn, ready]);

//   const handleSignIn = async () => {
//     try {
//       const result = await startOAuthFlow();

//       if (result?.createdSessionId) {
//         console.log("✅ Google sign-in successful!");
//         router.replace("/(tabs)/Home");
//       } else {
//         Alert.alert("Sign-in cancelled", "Please try again.");
//       }
//     } catch (err) {
//       console.error("❌ Sign-in error:", err);
//       Alert.alert("Error", "Something went wrong during sign-in.");
//       await signOut(); // clean state
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Welcome to MyBillingAppPro</Text>
//       <Text style={styles.subtitle}>Please sign in to continue</Text>
//       <Button title="Sign In with Google" onPress={handleSignIn} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: "center", alignItems: "center" },
//   title: { fontSize: 22, fontWeight: "bold", marginBottom: 8 },
//   subtitle: { fontSize: 16, marginBottom: 20 },
// });













// import React, { useEffect, useState } from "react";
// import { View, Text, Button, StyleSheet, Alert } from "react-native";
// import * as WebBrowser from "expo-web-browser";
// import { useOAuth, useUser, useAuth } from "@clerk/clerk-expo";
// import { useRouter } from "expo-router";

// WebBrowser.maybeCompleteAuthSession();

// export default function SignIn() {
//   const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
//   const { isSignedIn } = useUser();
//   const { signOut } = useAuth();
//   const router = useRouter();

//   const [ready, setReady] = useState(false); // track if component mounted

//   useEffect(() => {
//     setReady(true);
//   }, []);

//   useEffect(() => {
//     if (ready && isSignedIn) {
//       // Navigate to menu screen inside tabs
//       router.replace("/menu");
//     }
//   }, [isSignedIn, ready]);

//   const handleSignIn = async () => {
//     try {
//       const result = await startOAuthFlow();

//       if (result?.createdSessionId) {
//         console.log("✅ Google sign-in successful!");
//         router.replace("/menu"); // redirect to menu
//       } else {
//         Alert.alert("Sign-in cancelled", "Please try again.");
//       }
//     } catch (err) {
//       console.error("❌ Sign-in error:", err);
//       Alert.alert("Error", "Something went wrong during sign-in.");
//       await signOut(); // clean state
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Welcome to MyBillingAppPro</Text>
//       <Text style={styles.subtitle}>Please sign in to continue</Text>
//       <Button title="Sign In with Google" onPress={handleSignIn} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: "center", alignItems: "center" },
//   title: { fontSize: 22, fontWeight: "bold", marginBottom: 8 },
//   subtitle: { fontSize: 16, marginBottom: 20 },
// });




// import React, { useEffect } from "react";
// import { View, Text, Button, StyleSheet, Alert } from "react-native";
// import * as WebBrowser from "expo-web-browser";
// import { useOAuth, useUser, useAuth } from "@clerk/clerk-expo";
// import { useRouter } from "expo-router";

// WebBrowser.maybeCompleteAuthSession();

// export default function SignIn() {
//   const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
//   const { isSignedIn, isLoaded } = useUser(); // ✅ check if session is loaded
//   const { signOut } = useAuth();
//   const router = useRouter();

//   // Redirect if user is already signed in
//   useEffect(() => {
//     if (isLoaded && isSignedIn) {
//       router.replace("/menu"); // redirect to your menu screen inside (tabs)
//     }
//   }, [isLoaded, isSignedIn]);

//   const handleSignIn = async () => {
//     try {
//       const result = await startOAuthFlow();

//       if (result?.createdSessionId) {
//         console.log("✅ Google sign-in successful!");
//         router.replace("/menu"); // redirect to menu
//       } else {
//         Alert.alert("Sign-in cancelled", "Please try again.");
//       }
//     } catch (err) {
//       console.error("❌ Sign-in error:", err);
//       Alert.alert("Error", "Something went wrong during sign-in.");
//       await signOut(); // clean session
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Welcome to MyBillingAppPro</Text>
//       <Text style={styles.subtitle}>Please sign in to continue</Text>
//       <Button title="Sign In with Google" onPress={handleSignIn} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: "center", alignItems: "center" },
//   title: { fontSize: 22, fontWeight: "bold", marginBottom: 8 },
//   subtitle: { fontSize: 16, marginBottom: 20 },
// });



// import React, { useEffect } from "react";
// import { View, Text, Button, StyleSheet, Alert } from "react-native";
// import * as WebBrowser from "expo-web-browser";
// import { useOAuth, useUser, useAuth } from "@clerk/clerk-expo";
// import { useRouter } from "expo-router";

// WebBrowser.maybeCompleteAuthSession();

// export default function SignIn() {
//   const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
//   const { isSignedIn, isLoaded } = useUser();
//   const { signOut } = useAuth();
//   const router = useRouter();

//   // Redirect if already signed in
//   useEffect(() => {
//     if (isLoaded && isSignedIn) {
//       router.replace("/menu"); // go to menu tab
//     }
//   }, [isLoaded, isSignedIn]);

//   const handleSignIn = async () => {
//     try {
//       // ✅ If user is already signed in, just redirect
//       if (isSignedIn) {
//         router.replace("/menu");
//         return;
//       }

//       const result = await startOAuthFlow();

//       if (result?.createdSessionId) {
//         console.log("✅ Google sign-in successful!");
//         router.replace("/menu"); // redirect to menu
//       } else {
//         Alert.alert("Sign-in cancelled", "Please try again.");
//       }
//     } catch (err) {
//       console.error("❌ Sign-in error:", err);
//       Alert.alert("Error", "Something went wrong during sign-in.");
//       await signOut(); // clear session if something went wrong
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Welcome to MyBillingAppPro</Text>
//       <Text style={styles.subtitle}>Please sign in to continue</Text>
//       <Button title="Sign In with Google" onPress={handleSignIn} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: "center", alignItems: "center" },
//   title: { fontSize: 22, fontWeight: "bold", marginBottom: 8 },
//   subtitle: { fontSize: 16, marginBottom: 20 },
// });





import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, ActivityIndicator, Alert } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { useOAuth, useUser, useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

WebBrowser.maybeCompleteAuthSession();

export default function SignIn() {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const { isSignedIn, isLoaded } = useUser();
  const { signOut } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  // Redirect immediately if already signed in
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.replace("/menu");
    }
  }, [isLoaded, isSignedIn]);

  const handleSignIn = async () => {
    if (!isLoaded) return; // wait for Clerk to load
    if (isSignedIn) {
      router.replace("/menu");
      return;
    }

    try {
      setLoading(true);
      const result = await startOAuthFlow();

      if (result?.createdSessionId) {
        console.log("✅ Google sign-in successful!");
        router.replace("/menu");
      } else {
        Alert.alert("Sign-in cancelled", "Please try again.");
      }
    } catch (err: any) {
      console.error("❌ Sign-in error:", err);
      Alert.alert("Error", err?.message || "Something went wrong during sign-in.");
      await signOut();
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded) {
    // Show loading while Clerk is initializing
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to MyBillingAppPro</Text>
      <Text style={styles.subtitle}>Please sign in to continue</Text>
      <Button title={loading ? "Signing in..." : "Sign In with Google"} onPress={handleSignIn} disabled={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 8 },
  subtitle: { fontSize: 16, marginBottom: 20 },
});
