// // app/_layout.tsx
// import { ClerkProvider } from "@clerk/clerk-expo";
// import { Stack, Slot } from "expo-router";
// import Constants from "expo-constants";
// import * as SecureStore from "expo-secure-store";
// import * as WebBrowser from "expo-web-browser";

// WebBrowser.maybeCompleteAuthSession();

// const tokenCache = {
//   async getToken(key: string) { return SecureStore.getItemAsync(key); },
//   async saveToken(key: string, value: string) { return SecureStore.setItemAsync(key, value); },
// };
 
// export default function RootLayout() {
//   const publishableKey =
//     Constants.expoConfig?.extra?.clerkPublishableKey ||
//     process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

//   if (!publishableKey) throw new Error("Missing Clerk Publishable Key.");

//   return (
//     <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
//       <Stack screenOptions={{ headerShown: false }}>
//         <Slot /> {/* All nested screens */}
//       </Stack>
//     </ClerkProvider>
//   );
// }










// // app/_layout.tsx
// import * as WebBrowser from "expo-web-browser";
// import * as SecureStore from "expo-secure-store";
// import Constants from "expo-constants";
// import { ClerkProvider } from "@clerk/clerk-expo";
// import { Stack, Slot } from "expo-router";

// WebBrowser.maybeCompleteAuthSession();

// const tokenCache = {
//   async getToken(key: string) {
//     return SecureStore.getItemAsync(key);
//   },
//   async saveToken(key: string, value: string) {
//     return SecureStore.setItemAsync(key, value);
//   },
// };

// export default function RootLayout() {
//   const publishableKey =
//     Constants.expoConfig?.extra?.clerkPublishableKey ||
//     process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

//   if (!publishableKey) throw new Error("Missing Clerk Publishable Key.");

//   return (
//     <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
//       <Stack screenOptions={{ headerShown: false }}>
//         <Slot /> {/* Nested screens, including tabs */}
//       </Stack>
//     </ClerkProvider>
//   );
// }



// import { ClerkProvider } from "@clerk/clerk-expo";
// import { Stack, Slot } from "expo-router";
// import Constants from "expo-constants";
// import * as SecureStore from "expo-secure-store";
// import * as WebBrowser from "expo-web-browser";
// import * as Linking from "expo-linking";

// WebBrowser.maybeCompleteAuthSession();

// const tokenCache = {
//   async getToken(key: string) {
//     return SecureStore.getItemAsync(key);
//   },
//   async saveToken(key: string, value: string) {
//     return SecureStore.setItemAsync(key, value);
//   },
// };

// const prefix = Linking.createURL("/");

// export default function RootLayout() {
//   const publishableKey =
//     Constants.expoConfig?.extra?.clerkPublishableKey ||
//     process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

//   if (!publishableKey) {
//     throw new Error("Missing Clerk Publishable Key");
//   }

//   return (
//     <ClerkProvider
//       publishableKey={publishableKey}
//       tokenCache={tokenCache}
//       redirectUrl={`${prefix}oauth-native-callback`}
//     >
//       <Stack screenOptions={{ headerShown: false }}>
//         <Slot /> {/* 👈 This renders your nested pages (signin, tabs, etc.) */}
//       </Stack>
//     </ClerkProvider>
//   );
// }






// import { ClerkProvider } from "@clerk/clerk-expo";
// import { Stack } from "expo-router";
// import Constants from "expo-constants";
// import * as SecureStore from "expo-secure-store";
// import * as WebBrowser from "expo-web-browser";
// import * as Linking from "expo-linking";

// WebBrowser.maybeCompleteAuthSession();

// const tokenCache = {
//   async getToken(key: string) {
//     return SecureStore.getItemAsync(key);
//   },
//   async saveToken(key: string, value: string) {
//     return SecureStore.setItemAsync(key, value);
//   },
// };

// const prefix = Linking.createURL("/");

// export default function RootLayout() {
//   const publishableKey =
//     Constants.expoConfig?.extra?.clerkPublishableKey ||
//     process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

//   if (!publishableKey) {
//     throw new Error("Missing Clerk Publishable Key");
//   }

//   return (
//     <ClerkProvider
//       publishableKey={publishableKey}
//       tokenCache={tokenCache}
//       redirectUrl={`${prefix}oauth-native-callback`}
//     >
//       {/* ✅ Correct placement */}
//       <Stack screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="(tabs)" />
//         <Stack.Screen name="signin" />
//         <Stack.Screen name="signup" />
//       </Stack>
//     </ClerkProvider>
//   );
// }























//;oiuytrdsfdfgyuiop[oiuytrewadsdrtyuiopiuytreawsWAERTYUIOP[POIYUYTREWRTYUIOP[OIUYTYERWERRTYUIO]]]






// import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
// import { Slot, useRouter, useSegments } from "expo-router";
// import Constants from "expo-constants";
// import * as SecureStore from "expo-secure-store";
// import * as WebBrowser from "expo-web-browser";
// import * as Linking from "expo-linking";
// import { useEffect } from "react";
// import { View, ActivityIndicator } from "react-native";

// WebBrowser.maybeCompleteAuthSession();

// // 🔐 Secure token cache
// const tokenCache = {
//   async getToken(key: string) {
//     return SecureStore.getItemAsync(key);
//   },
//   async saveToken(key: string, value: string) {
//     return SecureStore.setItemAsync(key, value);
//   },
// };

// // 🌐 Deep linking prefix
// const prefix = Linking.createURL("/");

// // 👇 This handles the logic safely (AFTER router mounts)
// function AuthRedirect() {
//   const { isLoaded, isSignedIn } = useAuth();
//   const router = useRouter();
//   const segments = useSegments();

//   useEffect(() => {
//     // Don't run until Clerk and routing are ready
//     if (!isLoaded || !segments.length) return;

//     const inAuthGroup = segments[0] === "(auth)";

//     if (!isSignedIn && !inAuthGroup) {
//       router.replace("/(auth)/sign-in");
//     } else if (isSignedIn && inAuthGroup) {
//       router.replace("/(tabs)/menu");
//     }
//   }, [isLoaded, isSignedIn, segments]);

//   // Optional loader UI while checking auth
//   if (!isLoaded) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" color="#007AFF" />
//       </View>
//     );
//   }

//   // 👇 This is the root navigation slot (must exist to avoid your error)
//   return <Slot />;
// }

// // ✅ Final RootLayout with ClerkProvider
// export default function RootLayout() {
//   const publishableKey =
//     Constants.expoConfig?.extra?.clerkPublishableKey ||
//     process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

//   if (!publishableKey) {
//     throw new Error("Missing Clerk Publishable Key");
//   }

//   return (
//     <ClerkProvider
//       publishableKey={publishableKey}
//       tokenCache={tokenCache}
//       redirectUrl={`${prefix}oauth-native-callback`}
//     >
//       <AuthRedirect />
//     </ClerkProvider>
//   );
// }





























//[poiuytrewqeretrtyguio;p[]poiutrewqewrsrdtfhjkl;'kouiytrewqaesghbjkm]





































// // app/_layout.tsx
// import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
// import { Slot, useRouter } from "expo-router";
// import Constants from "expo-constants";
// import { useEffect, useState } from "react";
// import { View, ActivityIndicator } from "react-native";

// export default function RootLayout() {
//   const publishableKey =
//     Constants.expoConfig?.extra?.clerkPublishableKey ||
//     process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

//   if (!publishableKey) throw new Error("Missing Clerk Publishable Key");

//   return (
//     <ClerkProvider publishableKey={publishableKey}>
//       <SafeAuthRedirect>
//         <Slot /> {/* Must be here on first render */}
//       </SafeAuthRedirect>
//     </ClerkProvider>
//   );
// }

// // Wraps children and safely navigates after mounting
// function SafeAuthRedirect({ children }: { children: React.ReactNode }) {
//   const { isLoaded, isSignedIn } = useAuth();
//   const router = useRouter();
//   const [ready, setReady] = useState(false);

//   useEffect(() => {
//     // Mark layout as mounted
//     setReady(true);
//   }, []);

//   useEffect(() => {
//     if (!ready || !isLoaded) return;

//     if (!isSignedIn) {
//       router.replace("/(auth)/sign-in");
//     } else {
//       router.replace("/(tabs)/menu");
//     }
//   }, [ready, isLoaded, isSignedIn]);

//   // Optional loader while waiting
//   if (!isLoaded || !ready) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" color="#007AFF" />
//       </View>
//     );
//   }

//   return <>{children}</>; // now safe to render nested Slot
// }











// import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
// import { Slot, useRouter, useSegments } from "expo-router";
// import Constants from "expo-constants";
// import * as SecureStore from "expo-secure-store";
// import * as WebBrowser from "expo-web-browser";
// import * as Linking from "expo-linking";
// import { useEffect } from "react";
// import { View, ActivityIndicator } from "react-native";

// WebBrowser.maybeCompleteAuthSession();

// // 🔐 Secure token cache
// const tokenCache = {
//   async getToken(key: string) {
//     return SecureStore.getItemAsync(key);
//   },
//   async saveToken(key: string, value: string) {
//     return SecureStore.setItemAsync(key, value);
//   },
// };

// // 🌐 Deep linking prefix
// const prefix = Linking.createURL("/");

// // 👇 This handles the logic safely (AFTER router mounts)
// function AuthRedirect() {
//   const { isLoaded, isSignedIn } = useAuth();
//   const router = useRouter();
//   const segments = useSegments();

//   useEffect(() => {
//     // Don't run until Clerk and routing are ready
//     if (!isLoaded || !segments.length) return;

//     const inAuthGroup = segments[0] === "(auth)";

//     if (!isSignedIn && !inAuthGroup) {
//       router.replace("/(auth)/sign-in");
//     } else if (isSignedIn && inAuthGroup) {
//       router.replace("/(tabs)/menu");
//     }
//   }, [isLoaded, isSignedIn, segments]);

//   // Optional loader UI while checking auth
//   if (!isLoaded) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" color="#007AFF" />
//       </View>
//     );
//   }

//   // 👇 This is the root navigation slot (must exist to avoid your error)
//   return <Slot />;
// }

// // ✅ Final RootLayout with ClerkProvider
// export default function RootLayout() {
//   const publishableKey =
//     Constants.expoConfig?.extra?.clerkPublishableKey ||
//     process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

//   if (!publishableKey) {
//     throw new Error("Missing Clerk Publishable Key");
//   }

//   return (
//     <ClerkProvider
//       publishableKey={publishableKey}
//       tokenCache={tokenCache}
//       redirectUrl={`${prefix}oauth-native-callback`}
//     >
//       <AuthRedirect />
//     </ClerkProvider>
//   );
// // }







// "use client";

// import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
// import { Slot, useRouter, useSegments } from "expo-router";
// import Constants from "expo-constants";
// import { useEffect, useState } from "react";
// import { View, ActivityIndicator } from "react-native";

// // 🔐 Token cache (optional)
// import * as SecureStore from "expo-secure-store";

// const tokenCache = {
//   async getToken(key: string) {
//     return SecureStore.getItemAsync(key);
//   },
//   async saveToken(key: string, value: string) {
//     return SecureStore.setItemAsync(key, value);
//   },
// };

// export default function RootLayout() {
//   const publishableKey =
//     Constants.expoConfig?.extra?.clerkPublishableKey ||
//     process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

//   if (!publishableKey) throw new Error("Missing Clerk Publishable Key");

//   return (
//     <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
//       <AuthRedirect />
//     </ClerkProvider>
//   );
// }

// // This handles safe redirect based on auth changes
// function AuthRedirect() {
//   const { isLoaded, isSignedIn } = useAuth();
//   const router = useRouter();
//   const [ready, setReady] = useState(false);

//   useEffect(() => {
//     setReady(true); // mark layout ready
//   }, []);

//   useEffect(() => {
//     if (!ready || !isLoaded) return;

//     // If user is signed out, go to sign-in
//     if (!isSignedIn) {
//       router.replace("/(auth)/sign-in");
//     } else {
//       // If user is signed in, go to menu
//       router.replace("/(tabs)/menu");
//     }
//   }, [ready, isLoaded, isSignedIn, router]); // ✅ Depend on isSignedIn so redirect fires on re-login

//   if (!isLoaded || !ready) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" color="#007AFF" />
//       </View>
//     );
//   }

//   return <Slot />; // safe to render app content
// }




























// "use client";

// import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
// import { Slot, useRouter } from "expo-router";
// import Constants from "expo-constants";
// import { useEffect, useState } from "react";
// import { View, ActivityIndicator } from "react-native";
// import * as SecureStore from "expo-secure-store";

// // 🔐 Token cache (optional)
// const tokenCache = {
//   async getToken(key: string) {
//     return SecureStore.getItemAsync(key);
//   },
//   async saveToken(key: string, value: string) {
//     return SecureStore.setItemAsync(key, value);
//   },
//   async clearToken() {
//     await SecureStore.deleteItemAsync("clerk_token");
//   },
// };

// export default function RootLayout() {
//   const publishableKey =
//     Constants.expoConfig?.extra?.clerkPublishableKey ||
//     process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

//   if (!publishableKey) throw new Error("Missing Clerk Publishable Key");

//   return (
//     <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
//       <AuthRedirect />
//     </ClerkProvider>
//   );
// }

// // --------------------------------------------------------------------
// // ✅ AuthRedirect with detailed console logging for debugging
// // --------------------------------------------------------------------
// function AuthRedirect() {
//   const { isLoaded, isSignedIn } = useAuth();
//   const router = useRouter();
//   const [ready, setReady] = useState(false);

//   useEffect(() => {
//     setReady(true); // Mark layout as ready
//   }, []);

//   useEffect(() => {
//     if (!ready || !isLoaded) return;

//     console.log("🔄 AuthRedirect triggered. isSignedIn:", isSignedIn);

//     if (!isSignedIn) {
//       console.log("🚪 User not signed in — redirecting to sign-in...");
//       tokenCache.clearToken(); // Clear any saved token
//       router.replace("/(auth)/sign-in");
//     } else {
//       console.log("✅ User signed in — redirecting to menu...");
//       router.replace("/(tabs)/menu");

//       // Optional small auto reload (helps if menu loads too early)
//       setTimeout(() => {
//         console.log("🔁 Auto reloading menu route to ensure data refresh...");
//         router.replace("/(tabs)/menu");
//       }, 800);
//     }
//   }, [ready, isLoaded, isSignedIn]);

//   if (!isLoaded || !ready) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" color="#007AFF" />
//       </View>
//     );
//   }

//   return <Slot />;
// }






















// "use client";

// import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
// import { Slot, useRouter } from "expo-router";
// import Constants from "expo-constants";
// import { useEffect, useState } from "react";
// import { View, ActivityIndicator } from "react-native";
// import * as SecureStore from "expo-secure-store";

// const tokenCache = {
//   async getToken(key: string) {
//     return SecureStore.getItemAsync(key);
//   },
//   async saveToken(key: string, value: string) {
//     return SecureStore.setItemAsync(key, value);
//   },
//   async clearToken() {
//     await SecureStore.deleteItemAsync("__clerk_client_jwt");
//   },
// };

// export default function RootLayout() {
//   const publishableKey =
//     Constants.expoConfig?.extra?.clerkPublishableKey ||
//     process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

//   if (!publishableKey) throw new Error("Missing Clerk Publishable Key");

//   return (
//     <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
//       <AuthRedirect />
//     </ClerkProvider>
//   );
// }

// function AuthRedirect() {
//   const { isLoaded, isSignedIn, getToken } = useAuth();
//   const router = useRouter();
//   const [ready, setReady] = useState(false);
//   const [tokenReady, setTokenReady] = useState(false);

//   // mark UI ready
//   useEffect(() => setReady(true), []);

//   // watch Clerk state
//   useEffect(() => {
//     if (!ready || !isLoaded) return;

//     console.log("🔄 AuthRedirect triggered. isSignedIn:", isSignedIn);

//     if (!isSignedIn) {
//       console.log("🚪 User not signed in — redirecting to sign-in...");
//       tokenCache.clearToken();
//       router.replace("/(auth)/sign-in");
//       return;
//     }

//     console.log("✅ User signed in — checking for token...");
//     const interval = setInterval(async () => {
//       const token = await getToken();
//       console.log("🧩 Current token:", token ? token.slice(0, 15) + "..." : null);

//       if (token) {
//         clearInterval(interval);
//         setTokenReady(true);
//         console.log("✅ Clerk token confirmed — redirecting to menu");
//         router.replace("/(tabs)/menu");
//       }
//     }, 800); // check every 0.8s

//     return () => clearInterval(interval);
//   }, [ready, isLoaded, isSignedIn]);

//   if (!isLoaded || !ready) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" color="#007AFF" />
//       </View>
//     );
//   }

//   return <Slot />;
// }

























// "use client";

// import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
// import { Slot, useRouter } from "expo-router";
// import Constants from "expo-constants";
// import { useEffect, useState } from "react";
// import { View, ActivityIndicator } from "react-native";
// import * as SecureStore from "expo-secure-store";

// const tokenCache = {
//   async getToken(key: string) {
//     return SecureStore.getItemAsync(key);
//   },
//   async saveToken(key: string, value: string) {
//     return SecureStore.setItemAsync(key, value);
//   },
//   async clearToken() {
//     try {
//       await SecureStore.deleteItemAsync("__clerk_client_jwt");
//       console.log("🧹 Cleared old token");
//     } catch (err) {
//       console.log("⚠️ Failed to clear token:", err);
//     }
//   },
// };

// export default function RootLayout() {
//   const publishableKey =
//     Constants.expoConfig?.extra?.clerkPublishableKey ||
//     process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

//   if (!publishableKey) throw new Error("Missing Clerk Publishable Key");

//   return (
//     <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
//       <AuthRedirect />
//     </ClerkProvider>
//   );
// }

// function AuthRedirect() {
//   const { isLoaded, isSignedIn, getToken, signOut } = useAuth();
//   const router = useRouter();
//   const [ready, setReady] = useState(false);
//   const [tokenReady, setTokenReady] = useState(false);

//   useEffect(() => setReady(true), []);

//   useEffect(() => {
//     if (!ready || !isLoaded) return;

//     console.log("🔄 AuthRedirect triggered. isSignedIn:", isSignedIn);

//     if (!isSignedIn) {
//       // ✅ Wait 300ms before clearing token (avoids race with Clerk session destroy)
//       setTimeout(() => {
//         tokenCache.clearToken();
//       }, 300);
//       console.log("🚪 User not signed in — redirecting to sign-in...");
//       router.replace("/(auth)/sign-in");
//       return;
//     }

//     console.log("✅ User signed in — checking for token...");
//     const interval = setInterval(async () => {
//       const token = await getToken();
//       console.log("🧩 Current token:", token ? token.slice(0, 15) + "..." : null);

//       if (token) {
//         clearInterval(interval);
//         setTokenReady(true);
//         console.log("✅ Clerk token confirmed — redirecting to menu");
//         router.replace("/(tabs)/menu");
//       }
//     }, 800);

//     return () => clearInterval(interval);
//   }, [ready, isLoaded, isSignedIn]);

//   if (!isLoaded || !ready) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" color="#007AFF" />
//       </View>
//     );
//   }

//   return <Slot />;
// }


















// "use client";

// import { ClerkProvider, useAuth, useClerk } from "@clerk/clerk-expo";
// import { Slot, useRouter } from "expo-router";
// import Constants from "expo-constants";
// import { useEffect, useState } from "react";
// import { View, ActivityIndicator } from "react-native";
// import * as SecureStore from "expo-secure-store";

// const tokenCache = {
//   async getToken(key: string) {
//     return SecureStore.getItemAsync(key);
//   },
//   async saveToken(key: string, value: string) {
//     return SecureStore.setItemAsync(key, value);
//   },
//   async clearToken() {
//     try {
//       await SecureStore.deleteItemAsync("__clerk_client_jwt");
//       console.log("🧹 Cleared old token");
//     } catch (err) {
//       console.log("⚠️ Failed to clear token:", err);
//     }
//   },
// };

// export default function RootLayout() {
//   const publishableKey =
//     Constants.expoConfig?.extra?.clerkPublishableKey ||
//     process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

//   if (!publishableKey) throw new Error("Missing Clerk Publishable Key");

//   return (
//     <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
//       <AuthRedirect />
//     </ClerkProvider>
//   );
// }

// function AuthRedirect() {
//   const { isLoaded, isSignedIn, getToken } = useAuth();
//   const { addListener } = useClerk();
//   const router = useRouter();
//   const [ready, setReady] = useState(false);
//   const [authVersion, setAuthVersion] = useState(0); // triggers reruns when session changes

//   useEffect(() => setReady(true), []);

//   // 👂 Listen for session change events (sign-in/sign-out)
//   useEffect(() => {
//     const unsub = addListener(({ type }) => {
//       console.log("🔔 Clerk event:", type);
//       if (["session", "user"].includes(type)) {
//         // trigger re-evaluation
//         setAuthVersion((v) => v + 1);
//       }
//     });
//     return () => unsub?.();
//   }, []);

//   useEffect(() => {
//     if (!ready || !isLoaded) return;

//     console.log("🔄 AuthRedirect triggered. isSignedIn:", isSignedIn);

//     if (!isSignedIn) {
//       // wait briefly to ensure Clerk clears session
//       setTimeout(() => tokenCache.clearToken(), 300);
//       console.log("🚪 User not signed in — redirecting to sign-in...");
//       router.replace("/(auth)/sign-in");
//       return;
//     }

//     console.log("✅ User signed in — checking for token...");
//     const interval = setInterval(async () => {
//       const token = await getToken();
//       console.log("🧩 Current token:", token ? token.slice(0, 15) + "..." : null);

//       if (token) {
//         clearInterval(interval);
//         console.log("✅ Clerk token confirmed — redirecting to menu");
//         router.replace("/(tabs)/menu");
//       }
//     }, 800);

//     return () => clearInterval(interval);
//   }, [ready, isLoaded, isSignedIn, authVersion]); // 🔥 add authVersion dependency

//   if (!isLoaded || !ready) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" color="#007AFF" />
//       </View>
//     );
//   }

//   return <Slot />;
// }














// "use client";

// import { ClerkProvider, useAuth, useSession } from "@clerk/clerk-expo";
// import { Slot, useRouter } from "expo-router";
// import Constants from "expo-constants";
// import { useEffect, useState } from "react";
// import { View, ActivityIndicator } from "react-native";
// import * as SecureStore from "expo-secure-store";

// const tokenCache = {
//   async getToken(key: string) {
//     return SecureStore.getItemAsync(key);
//   },
//   async saveToken(key: string, value: string) {
//     return SecureStore.setItemAsync(key, value);
//   },
//   async clearToken() {
//     try {
//       await SecureStore.deleteItemAsync("__clerk_client_jwt");
//       console.log("🧹 Cleared old token");
//     } catch (err) {
//       console.log("⚠️ Failed to clear token:", err);
//     }
//   },
// };

// export default function RootLayout() {
//   const publishableKey =
//     Constants.expoConfig?.extra?.clerkPublishableKey ||
//     process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

//   if (!publishableKey) throw new Error("Missing Clerk Publishable Key");

//   return (
//     <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
//       <AuthRedirect />
//     </ClerkProvider>
//   );
// }

// function AuthRedirect() {
//   const router = useRouter();
//   const { isLoaded, isSignedIn, getToken } = useAuth();
//   const { session } = useSession();
//   const [ready, setReady] = useState(false);
//   const [lastSessionId, setLastSessionId] = useState<string | null>(null);

//   useEffect(() => setReady(true), []);

//   useEffect(() => {
//     if (!ready || !isLoaded) return;

//     console.log("🔄 AuthRedirect triggered. isSignedIn:", isSignedIn);

//     if (!isSignedIn) {
//       setTimeout(() => tokenCache.clearToken(), 300);
//       console.log("🚪 User not signed in — redirecting to sign-in...");
//       router.replace("/(auth)/sign-in");
//       return;
//     }

//     console.log("✅ User signed in — checking for token...");
//     const checkToken = async () => {
//       const token = await getToken();
//       console.log("🧩 Current token:", token ? token.slice(0, 15) + "..." : null);

//       if (token) {
//         console.log("✅ Clerk token confirmed — redirecting to menu");

//         // 🚀 Detect new session and hard reload
//         if (session?.id && session.id !== lastSessionId) {
//           console.log("🔁 Detected new session — forcing layout reload...");
//           setLastSessionId(session.id);
//           router.replace("/(tabs)/menu");
//           setTimeout(() => {
//             // ⬇️ Force app reload to fix stale layout
//             router.replace("/(tabs)/menu");
//           }, 800);
//         }
//       }
//     };

//     checkToken();
//   }, [ready, isLoaded, isSignedIn, session?.id]);

//   if (!isLoaded || !ready) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" color="#007AFF" />
//       </View>
//     );
//   }

//   return <Slot />;
// }


















// "use client";

// import { ClerkProvider, useAuth, useSession } from "@clerk/clerk-expo";
// import { Slot, useRouter } from "expo-router";
// import Constants from "expo-constants";
// import { useEffect, useState } from "react";
// import { View, ActivityIndicator } from "react-native";
// import * as SecureStore from "expo-secure-store";

// const tokenCache = {
//   async getToken(key: string) {
//     return SecureStore.getItemAsync(key);
//   },
//   async saveToken(key: string, value: string) {
//     return SecureStore.setItemAsync(key, value);
//   },
//   async clearToken() {
//     try {
//       await SecureStore.deleteItemAsync("__clerk_client_jwt");
//       console.log("🧹 Cleared old token");
//     } catch (err) {
//       console.log("⚠️ Failed to clear token:", err);
//     }
//   },
// };

// export default function RootLayout() {
//   const publishableKey =
//     Constants.expoConfig?.extra?.clerkPublishableKey ||
//     process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

//   if (!publishableKey) throw new Error("Missing Clerk Publishable Key");

//   return (
//     <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
//       <AuthRedirect />
//     </ClerkProvider>
//   );
// }

// function AuthRedirect() {
//   const router = useRouter();
//   const { isLoaded, isSignedIn, getToken } = useAuth();
//   const { session } = useSession();
//   const [ready, setReady] = useState(false);
//   const [lastSessionId, setLastSessionId] = useState<string | null>(null);

//   useEffect(() => setReady(true), []);

//   useEffect(() => {
//     if (!ready || !isLoaded) return;

//     console.log("🔄 AuthRedirect triggered. isSignedIn:", isSignedIn);

//     if (!isSignedIn) {
//       setTimeout(() => tokenCache.clearToken(), 300);
//       console.log("🚪 User not signed in — redirecting to sign-in...");
//       router.replace("/(auth)/sign-in");
//       return;
//     }

//     console.log("✅ User signed in — checking for token...");

//     const checkToken = async () => {
//       // Retry until token is available
//       const retries = 5;
//       const delay = 500;
//       let token: string | null = null;

//       for (let i = 0; i < retries; i++) {
//         token = await getToken({ skipCache: true });
//         console.log(`🧩 Attempt ${i + 1} — token:`, token ? token.slice(0, 15) + "..." : null);
//         if (token) break;
//         await new Promise((res) => setTimeout(res, delay));
//       }

//       if (!token) {
//         console.warn("⚠️ Token not available after retries. Session might not be ready.");
//         return;
//       }

//       console.log("✅ Clerk token confirmed — redirecting to menu");

//       if (session?.id && session.id !== lastSessionId) {
//         console.log("🔁 Detected new session — forcing layout reload...");
//         setLastSessionId(session.id);
//         router.replace("/(tabs)/menu");
//         setTimeout(() => router.replace("/(tabs)/menu"), 800);
//       }
//     };

//     checkToken();
//   }, [ready, isLoaded, isSignedIn, session?.id]);

//   if (!isLoaded || !ready) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" color="#007AFF" />
//       </View>
//     );
//   }

//   return <Slot />;
// }



























// "use client";

// import { ClerkProvider, useAuth, useSession } from "@clerk/clerk-expo";
// import { Slot, useRouter } from "expo-router";
// import Constants from "expo-constants";
// import { useEffect, useState } from "react";
// import { View, ActivityIndicator, Platform } from "react-native";
// import * as SecureStore from "expo-secure-store";

// const tokenCache = {
//   async getToken(key: string) {
//     return SecureStore.getItemAsync(key);
//   },
//   async saveToken(key: string, value: string) {
//     return SecureStore.setItemAsync(key, value);
//   },
//   async clearToken() {
//     try {
//       await SecureStore.deleteItemAsync("__clerk_client_jwt");
//       console.log("🧹 Cleared old token");
//     } catch (err) {
//       console.log("⚠️ Failed to clear token:", err);
//     }
//   },
// };

// export default function RootLayout() {
//   const publishableKey =
//     Constants.expoConfig?.extra?.clerkPublishableKey ||
//     process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

//   if (!publishableKey) throw new Error("Missing Clerk Publishable Key");

//   return (
//     <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
//       <AuthRedirect />
//     </ClerkProvider>
//   );
// }

// function AuthRedirect() {
//   const router = useRouter();
//   const { isLoaded, isSignedIn, getToken } = useAuth();
//   const { session } = useSession();
//   const [ready, setReady] = useState(false);
//   const [lastSessionId, setLastSessionId] = useState<string | null>(null);

//   useEffect(() => setReady(true), []);

//   useEffect(() => {
//     if (!ready || !isLoaded) return;

//     console.log("🔄 AuthRedirect triggered. isSignedIn:", isSignedIn);

//     if (!isSignedIn) {
//       console.log("🚪 User not signed in — redirecting to sign-in...");
//       setTimeout(() => tokenCache.clearToken(), 300);

//       // ✅ Auto refresh page after 15s if user is still not signed in
//       if (Platform.OS === "web") {
//         setTimeout(() => window.location.reload(), 15000);
//       }

//       router.replace("/(auth)/sign-in");
//       return;
//     }

//     // ✅ Only proceed if session object exists
//     if (!session?.id) {
//       console.log("⏳ Waiting for session to stabilize...");
//       return;
//     }

//     console.log("✅ User signed in with stable session:", session.id);

//     const navigateMenu = async () => {
//       const token = await getToken({ skipCache: true });
//       console.log("🧩 Clerk token:", token ? token.slice(0, 15) + "..." : null);

//       // Navigate only once per session
//       if (session.id !== lastSessionId) {
//         setLastSessionId(session.id);
//         console.log("🔁 Navigating to menu...");
//         if (Platform.OS === "web") {
//           window.location.href = "/menu"; // safe for web
//         } else {
//           router.replace("/menu"); // for native
//         }
//       }
//     };

//     navigateMenu();
//   }, [ready, isLoaded, isSignedIn, session?.id]);

//   if (!isLoaded || !ready) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" color="#007AFF" />
//       </View>
//     );
//   }

//   return <Slot />;
// }



























// "use client";

// import { ClerkProvider, useAuth, useSession } from "@clerk/clerk-expo";
// import { Slot, useRouter } from "expo-router";
// import Constants from "expo-constants";
// import { useEffect, useState } from "react";
// import { View, ActivityIndicator, Platform } from "react-native";
// import * as SecureStore from "expo-secure-store";

// const tokenCache = {
//   async getToken(key: string) {
//     return SecureStore.getItemAsync(key);
//   },
//   async saveToken(key: string, value: string) {
//     return SecureStore.setItemAsync(key, value);
//   },
//   async clearToken() {
//     try {
//       await SecureStore.deleteItemAsync("__clerk_client_jwt");
//       console.log("🧹 Cleared old token");
//     } catch (err) {
//       console.log("⚠️ Failed to clear token:", err);
//     }
//   },
// };

// export default function RootLayout() {
//   const publishableKey =
//     Constants.expoConfig?.extra?.clerkPublishableKey ||
//     process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

//   if (!publishableKey) throw new Error("Missing Clerk Publishable Key");

//   return (
//     <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
//       <AuthRedirect />
//     </ClerkProvider>
//   );
// }

// function AuthRedirect() {
//   const router = useRouter();
//   const { isLoaded, isSignedIn, getToken } = useAuth();
//   const { session } = useSession();
//   const [ready, setReady] = useState(false);
//   const [lastSessionId, setLastSessionId] = useState<string | null>(null);

//   useEffect(() => setReady(true), []);

//   useEffect(() => {
//     if (!ready || !isLoaded) return;

//     console.log("🔄 AuthRedirect triggered. isSignedIn:", isSignedIn);

//     // User not signed in
//     if (!isSignedIn) {
//       console.log("🚪 User not signed in — redirecting to sign-in...");
//       setTimeout(() => tokenCache.clearToken(), 300);

//       // Auto refresh for web after 15s
//       if (Platform.OS === "web") {
//         setTimeout(() => window.location.reload(), 15000);
//       }

//       router.replace("/(auth)/sign-in");
//       return;
//     }

//     // Wait for stable session
//     if (!session?.id) {
//       console.log("⏳ Waiting for session to stabilize...");
//       return;
//     }

//     // Already handled this session
//     if (session.id === lastSessionId) return;

//     const navigateMenu = async () => {
//       const token = await getToken({ skipCache: true });
//       console.log("🧩 Clerk token:", token ? token.slice(0, 15) + "..." : null);

//       setLastSessionId(session.id);
//       console.log("🔁 Navigating to menu...");
//       if (Platform.OS === "web") {
//         window.location.href = "/menu"; // safe auto navigate on web
//       } else {
//         router.replace("/menu"); // native navigation
//       }
//     };

//     navigateMenu();
//   }, [ready, isLoaded, isSignedIn, session?.id]);

//   if (!isLoaded || !ready) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" color="#007AFF" />
//       </View>
//     );
//   }

//   return <Slot />;
// }

























// "use client";

// import { ClerkProvider, useAuth, useSession, clerkClient } from "@clerk/clerk-expo";
// import { Slot, useRouter } from "expo-router";
// import Constants from "expo-constants";
// import { useEffect, useState } from "react";
// import { View, ActivityIndicator, Platform } from "react-native";
// import * as SecureStore from "expo-secure-store";

// const tokenCache = {
//   async getToken(key: string) {
//     const value = await SecureStore.getItemAsync(key);
//     console.log("🗄️ getToken:", key, value ? value.slice(0, 15) + "..." : null);
//     return value;
//   },
//   async saveToken(key: string, value: string) {
//     console.log("💾 saveToken:", key, value ? value.slice(0, 15) + "..." : null);
//     return SecureStore.setItemAsync(key, value);
//   },
//   async clearToken() {
//     try {
//       await SecureStore.deleteItemAsync("__clerk_client_jwt");
//       console.log("🧹 Cleared old token");
//     } catch (err) {
//       console.log("⚠️ Failed to clear token:", err);
//     }
//   },
// };

// export default function RootLayout() {
//   const publishableKey =
//     Constants.expoConfig?.extra?.clerkPublishableKey ||
//     process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

//   if (!publishableKey) throw new Error("Missing Clerk Publishable Key");

//   return (
//     <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
//       <AuthRedirect />
//     </ClerkProvider>
//   );
// }

// function AuthRedirect() {
//   const router = useRouter();
//   const { isLoaded, isSignedIn, getToken } = useAuth();
//   const { session } = useSession();
//   const [ready, setReady] = useState(false);
//   const [lastSessionId, setLastSessionId] = useState<string | null>(null);

//   // Ready flag
//   useEffect(() => setReady(true), []);

//   // Listen to Clerk events
//   useEffect(() => {
//     console.log("🔔 Setting up Clerk event listener...");
//     const unsubscribe = clerkClient?.addListener((event) => {
//       console.log("🔔 Clerk event:", event.type, "sessionId:", event.session?.id || null);
//       if (event.type === "sessionCreated") {
//         console.log("🚀 New session created — navigating to menu");
//         router.replace("/(tabs)/menu");
//       }
//       if (event.type === "sessionEnded") {
//         console.log("🛑 Session ended — clearing token and redirecting to sign-in");
//         tokenCache.clearToken();
//         router.replace("/(auth)/sign-in");
//       }
//     });

//     return () => unsubscribe?.();
//   }, [router]);

//   // Web focus listener (optional)
//   useEffect(() => {
//     if (Platform.OS === "web") {
//       const onFocus = () => console.log("🌐 Window focused — checking session...");
//       window.addEventListener("focus", onFocus);
//       return () => window.removeEventListener("focus", onFocus);
//     }
//   }, []);

//   // Auth / token check
//   useEffect(() => {
//     if (!ready || !isLoaded) return;

//     console.log("🔄 AuthRedirect triggered. isSignedIn:", isSignedIn);

//     if (!isSignedIn) {
//       console.log("🚪 User not signed in — redirecting to sign-in...");
//       setTimeout(() => tokenCache.clearToken(), 300);

//       // Auto refresh on web if not signed in
//       if (Platform.OS === "web") {
//         console.log("🌐 Web detected — will auto-refresh in 15s if still not signed in");
//         setTimeout(() => window.location.reload(), 15000);
//       }

//       router.replace("/(auth)/sign-in");
//       return;
//     }

//     console.log("✅ User signed in — checking for token...");

//     const checkToken = async () => {
//       const retries = 5;
//       const delay = 500;
//       let token: string | null = null;

//       for (let i = 0; i < retries; i++) {
//         token = await getToken({ skipCache: true });
//         console.log(`🧩 Attempt ${i + 1} — token:`, token ? token.slice(0, 15) + "..." : null);
//         if (token) break;
//         await new Promise((res) => setTimeout(res, delay));
//       }

//       if (!token) {
//         console.warn("⚠️ Token not available after retries. Session might not be ready.");
//         return;
//       }

//       console.log("✅ Clerk token confirmed — navigating to menu");

//       if (session?.id && session.id !== lastSessionId) {
//         console.log("🔁 Detected new session — forcing layout reload...");
//         setLastSessionId(session.id);

//         if (Platform.OS === "web") {
//           console.log("🌐 Web detected — reloading page automatically...");
//           window.location.reload();
//         } else {
//           router.replace("/(tabs)/menu");
//           setTimeout(() => router.replace("/(tabs)/menu"), 800);
//         }
//       }
//     };

//     checkToken();
//   }, [ready, isLoaded, isSignedIn, session?.id]);

//   if (!isLoaded || !ready) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" color="#007AFF" />
//       </View>
//     );
//   }

//   return <Slot />;
// }


















// "use client";

// import { ClerkProvider, useAuth, useSession, clerkClient } from "@clerk/clerk-expo";
// import { Slot, useRouter } from "expo-router";
// import Constants from "expo-constants";
// import { useEffect, useState } from "react";
// import { View, ActivityIndicator, Platform } from "react-native";
// import * as SecureStore from "expo-secure-store";

// const tokenCache = {
//   async getToken(key: string) {
//     const value = await SecureStore.getItemAsync(key);
//     console.log("🗄️ getToken:", key, value ? value.slice(0, 15) + "..." : null);
//     return value;
//   },
//   async saveToken(key: string, value: string) {
//     console.log("💾 saveToken:", key, value ? value.slice(0, 15) + "..." : null);
//     return SecureStore.setItemAsync(key, value);
//   },
//   async clearToken() {
//     try {
//       await SecureStore.deleteItemAsync("__clerk_client_jwt");
//       console.log("🧹 Cleared old token");
//     } catch (err) {
//       console.log("⚠️ Failed to clear token:", err);
//     }
//   },
// };

// export default function RootLayout() {
//   const publishableKey =
//     Constants.expoConfig?.extra?.clerkPublishableKey ||
//     process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

//   if (!publishableKey) throw new Error("Missing Clerk Publishable Key");

//   return (
//     <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
//       <AuthRedirect />
//     </ClerkProvider>
//   );
// }

// function AuthRedirect() {
//   const router = useRouter();
//   const { isLoaded, isSignedIn, getToken } = useAuth();
//   const { session } = useSession();
//   const [ready, setReady] = useState(false);
//   const [lastSessionId, setLastSessionId] = useState<string | null>(null);

//   useEffect(() => setReady(true), []);

//   // Web focus listener
//   useEffect(() => {
//     if (Platform.OS === "web") {
//       const onFocus = () => console.log("🌐 Window focused — checking session...");
//       window.addEventListener("focus", onFocus);
//       return () => window.removeEventListener("focus", onFocus);
//     }
//   }, []);

//   // Auth / token check
//   useEffect(() => {
//     if (!ready || !isLoaded) return;

//     console.log("🔄 AuthRedirect triggered. isSignedIn:", isSignedIn);

//     if (!isSignedIn) {
//       console.log("🚪 User not signed in — redirecting to sign-in...");
//       setTimeout(() => tokenCache.clearToken(), 300);

//       if (Platform.OS === "web") {
//         console.log("🌐 Web detected — will auto-refresh in 15s if still not signed in");
//         setTimeout(() => window.location.reload(), 15000);
//       }

//       router.replace("/(auth)/sign-in");
//       return;
//     }

//     console.log("✅ User signed in — checking token...");

//     const checkToken = async () => {
//       const retries = 5;
//       const delay = 500;
//       let token: string | null = null;

//       for (let i = 0; i < retries; i++) {
//         token = await getToken({ skipCache: true });
//         console.log(`🧩 Attempt ${i + 1} — token:`, token ? token.slice(0, 15) + "..." : null);
//         if (token) break;
//         await new Promise((res) => setTimeout(res, delay));
//       }

//       if (!token) {
//         console.warn("⚠️ Token not available after retries. Session might not be ready.");
//         return;
//       }

//       console.log("✅ Clerk token confirmed — navigating to menu");

//       if (session?.id && session.id !== lastSessionId) {
//         console.log("🔁 Detected new session — navigating to menu...");
//         setLastSessionId(session.id);

//         if (Platform.OS === "web") {
//           window.location.reload();
//         } else {
//           router.replace("/(tabs)/menu");
//         }
//       }
//     };

//     checkToken();
//   }, [ready, isLoaded, isSignedIn, session?.id]);

//   if (!isLoaded || !ready) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" color="#007AFF" />
//       </View>
//     );
//   }

//   return <Slot />;
// }






























// "use client";

// import { ClerkProvider, useAuth, useSession } from "@clerk/clerk-expo";
// import { Slot, useRouter } from "expo-router";
// import Constants from "expo-constants";
// import { useEffect, useState } from "react";
// import { View, ActivityIndicator, Platform } from "react-native";
// import * as SecureStore from "expo-secure-store";

// const tokenCache = {
//   async getToken(key: string) {
//     const value = await SecureStore.getItemAsync(key);
//     console.log("🗄️ getToken:", key, value ? value.slice(0, 15) + "..." : null);
//     return value;
//   },
//   async saveToken(key: string, value: string) {
//     console.log("💾 saveToken:", key, value ? value.slice(0, 15) + "..." : null);
//     return SecureStore.setItemAsync(key, value);
//   },
//   async clearToken() {
//     try {
//       await SecureStore.deleteItemAsync("__clerk_client_jwt");
//       console.log("🧹 Cleared old token");
//     } catch (err) {
//       console.log("⚠️ Failed to clear token:", err);
//     }
//   },
// };

// export default function RootLayout() {
//   const publishableKey =
//     Constants.expoConfig?.extra?.clerkPublishableKey ||
//     process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

//   if (!publishableKey) throw new Error("Missing Clerk Publishable Key");

//   return (
//     <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
//       <AuthRedirect />
//     </ClerkProvider>
//   );
// }

// function AuthRedirect() {
//   const router = useRouter();
//   const { isLoaded, isSignedIn, getToken } = useAuth();
//   const { session } = useSession();
//   const [ready, setReady] = useState(false);
//   const [lastSessionId, setLastSessionId] = useState<string | null>(null);

//   useEffect(() => setReady(true), []);

//   useEffect(() => {
//     if (Platform.OS === "web") {
//       const onFocus = () => console.log("🌐 Window focused — checking session...");
//       window.addEventListener("focus", onFocus);
//       return () => window.removeEventListener("focus", onFocus);
//     }
//   }, []);

//   useEffect(() => {
//     if (!ready || !isLoaded) return;

//     console.log("🔄 AuthRedirect triggered. isSignedIn:", isSignedIn);

//     if (!isSignedIn) {
//       console.log("🚪 User not signed in — redirecting to sign-in...");
//       setTimeout(() => tokenCache.clearToken(), 300);
//       router.replace("/(auth)/sign-in");
//       return;
//     }

//     const waitForToken = async () => {
//       console.log("⏳ Waiting for Clerk token after OAuth...");

//       let token: string | null = null;
//       const maxRetries = 10;
//       const delay = 700;

//       for (let i = 0; i < maxRetries; i++) {
//         token = await getToken({ skipCache: true });
//         console.log(`🧩 Attempt ${i + 1} — token:`, token ? token.slice(0, 15) + "..." : null);
//         if (token) break;
//         await new Promise((res) => setTimeout(res, delay));
//       }

//       if (!token) {
//         console.warn("⚠️ Token still null after retries — Clerk session might not be ready.");
//         return;
//       }

//       console.log("✅ Clerk token confirmed — navigating to menu");

//       if (session?.id && session.id !== lastSessionId) {
//         setLastSessionId(session.id);
//         if (Platform.OS === "web") window.location.replace("/(tabs)/menu");
//         else router.replace("/(tabs)/menu");
//       }
//     };

//     waitForToken();
//   }, [ready, isLoaded, isSignedIn, session?.id]);

//   if (!isLoaded || !ready) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" color="#007AFF" />
//       </View>
//     );
//   }

//   return <Slot />;
// }















// "use client";

// import { ClerkProvider, useAuth, useSession } from "@clerk/clerk-expo";
// import { Slot, useRouter } from "expo-router";
// import Constants from "expo-constants";
// import { useEffect, useState } from "react";
// import { View, ActivityIndicator, Platform } from "react-native";
// import * as SecureStore from "expo-secure-store";

// const tokenCache = {
//   async getToken(key: string) {
//     const value = await SecureStore.getItemAsync(key);
//     console.log("🗄️ getToken:", key, value ? value.slice(0, 15) + "..." : null);
//     return value;
//   },
//   async saveToken(key: string, value: string) {
//     console.log("💾 saveToken:", key, value ? value.slice(0, 15) + "..." : null);
//     return SecureStore.setItemAsync(key, value);
//   },
//   async clearToken() {
//     try {
//       await SecureStore.deleteItemAsync("__clerk_client_jwt");
//       console.log("🧹 Cleared old token");
//     } catch (err) {
//       console.log("⚠️ Failed to clear token:", err);
//     }
//   },
// };

// export default function RootLayout() {
//   const publishableKey =
//     Constants.expoConfig?.extra?.clerkPublishableKey ||
//     process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

//   if (!publishableKey) throw new Error("Missing Clerk Publishable Key");

//   return (
//     <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
//       <AuthRedirect />
//     </ClerkProvider>
//   );
// }

// function AuthRedirect() {
//   const router = useRouter();
//   const { isLoaded, isSignedIn, getToken } = useAuth();
//   const { session } = useSession();
//   const [ready, setReady] = useState(false);
//   const [lastSessionId, setLastSessionId] = useState<string | null>(null);

//   useEffect(() => setReady(true), []);

//   useEffect(() => {
//     if (Platform.OS === "web") {
//       const onFocus = () => console.log("🌐 Window focused — checking session...");
//       window.addEventListener("focus", onFocus);
//       return () => window.removeEventListener("focus", onFocus);
//     }
//   }, []);

//   useEffect(() => {
//     if (!ready || !isLoaded) return;

//     console.log("🔄 AuthRedirect triggered. isSignedIn:", isSignedIn);

//     if (!isSignedIn) {
//       console.log("🚪 User not signed in — redirecting to sign-in...");
//       setTimeout(() => tokenCache.clearToken(), 300);
//       if (Platform.OS === "web") setTimeout(() => window.location.reload(), 15000);
//       router.replace("/(auth)/sign-in");
//       return;
//     }

//     const checkToken = async () => {
//       const retries = 5;
//       const delay = 500;
//       let token: string | null = null;

//       for (let i = 0; i < retries; i++) {
//         token = await getToken({ skipCache: true });
//         console.log(`🧩 Attempt ${i + 1} — token:`, token ? token.slice(0, 15) + "..." : null);
//         if (token) break;
//         await new Promise((res) => setTimeout(res, delay));
//       }

//       if (!token) {
//         console.warn("⚠️ Token not available after retries. Session might not be ready.");
//         return;
//       }

//       console.log("✅ Clerk token confirmed — navigating to menu");

//       if (session?.id && session.id !== lastSessionId) {
//         setLastSessionId(session.id);
//         console.log("🔁 Detected new session — navigating...");

//         if (Platform.OS === "web") window.location.reload();
//         else router.replace("/(tabs)/menu");
//       }
//     };

//     checkToken();
//   }, [ready, isLoaded, isSignedIn, session?.id]);

//   if (!isLoaded || !ready) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" color="#007AFF" />
//       </View>
//     );
//   }

//   return <Slot />;
// }














































// "use client";

// import { ClerkProvider, useAuth, useSession } from "@clerk/clerk-expo";
// import { Drawer } from "expo-router/drawer";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import { Slot, useRouter } from "expo-router";
// import Constants from "expo-constants";
// import { useEffect, useState } from "react";
// import { View, ActivityIndicator, Platform } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import * as SecureStore from "expo-secure-store";

// // 🔐 Clerk token cache
// const tokenCache = {
//   async getToken(key: string) {
//     const value = await SecureStore.getItemAsync(key);
//     console.log("🗄️ getToken:", key, value ? value.slice(0, 15) + "..." : null);
//     return value;
//   },
//   async saveToken(key: string, value: string) {
//     console.log("💾 saveToken:", key, value ? value.slice(0, 15) + "..." : null);
//     return SecureStore.setItemAsync(key, value);
//   },
//   async clearToken() {
//     try {
//       await SecureStore.deleteItemAsync("__clerk_client_jwt");
//       console.log("🧹 Cleared old token");
//     } catch (err) {
//       console.log("⚠️ Failed to clear token:", err);
//     }
//   },
// };

// export default function RootLayout() {
//   const publishableKey =
//     Constants.expoConfig?.extra?.clerkPublishableKey ||
//     process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

//   if (!publishableKey) throw new Error("Missing Clerk Publishable Key");

//   return (
//     <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
//       <AuthRedirect />
//     </ClerkProvider>
//   );
// }

// // 🔄 Handles authentication redirect logic
// function AuthRedirect() {
//   const router = useRouter();
//   const { isLoaded, isSignedIn, getToken } = useAuth();
//   const { session } = useSession();
//   const [ready, setReady] = useState(false);
//   const [lastSessionId, setLastSessionId] = useState<string | null>(null);

//   useEffect(() => setReady(true), []);

//   useEffect(() => {
//     if (Platform.OS === "web") {
//       const onFocus = () => console.log("🌐 Window focused — checking session...");
//       window.addEventListener("focus", onFocus);
//       return () => window.removeEventListener("focus", onFocus);
//     }
//   }, []);

//   useEffect(() => {
//     if (!ready || !isLoaded) return;

//     console.log("🔄 AuthRedirect triggered. isSignedIn:", isSignedIn);

//     if (!isSignedIn) {
//       console.log("🚪 User not signed in — redirecting to sign-in...");
//       setTimeout(() => tokenCache.clearToken(), 300);
//       if (Platform.OS === "web") setTimeout(() => window.location.reload(), 15000);
//       router.replace("/(auth)/sign-in");
//       return;
//     }

//     const checkToken = async () => {
//       const retries = 5;
//       const delay = 500;
//       let token: string | null = null;

//       for (let i = 0; i < retries; i++) {
//         token = await getToken({ skipCache: true });
//         console.log(`🧩 Attempt ${i + 1} — token:`, token ? token.slice(0, 15) + "..." : null);
//         if (token) break;
//         await new Promise((res) => setTimeout(res, delay));
//       }

//       if (!token) {
//         console.warn("⚠️ Token not available after retries. Session might not be ready.");
//         return;
//       }

//       if (session?.id && session.id !== lastSessionId) {
//         setLastSessionId(session.id);
//         console.log("🔁 Detected new session — navigating...");
//         if (Platform.OS === "web") window.location.reload();
//         else router.replace("/(tabs)/menu");
//       }
//     };

//     checkToken();
//   }, [ready, isLoaded, isSignedIn, session?.id]);

//   if (!isLoaded || !ready) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" color="#007AFF" />
//       </View>
//     );
//   }

//   // ✅ Drawer Layout Wrapper
//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <Drawer
//         screenOptions={{
//           headerShown: false,
//           drawerActiveTintColor: "#4F46E5",
//           drawerLabelStyle: { fontSize: 16 },
//         }}
//       >
//         <Drawer.Screen
//           name="(tabs)"
//           options={{
//             drawerLabel: "Home",
//             drawerIcon: ({ color, size }) => (
//               <Ionicons name="home-outline" size={size} color={color} />
//             ),
//           }}
//         />
//         <Drawer.Screen
//           name="party/index"
//           options={{
//             drawerLabel: "Parties",
//             drawerIcon: ({ color, size }) => (
//               <Ionicons name="people-outline" size={size} color={color} />
//             ),
//           }}
//         />
//       </Drawer>
//     </GestureHandlerRootView>
//   );
// }




//;.lkjhgfdsfgfchgjhjkl;jewbjewjhhkqljdegbwhjsmkjhbgcfdxzsawdsfxcggvnbm,.mnbvcfxdzsadfxcgjmk,lmkjhgfdsfcgvbnm,./













// "use client";

// import { ClerkProvider, useAuth, useSession, useUser, useClerk } from "@clerk/clerk-expo";
// import { Drawer } from "expo-router/drawer";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import { useRouter } from "expo-router";
// import Constants from "expo-constants";
// import { useEffect, useState } from "react";
// import { View, ActivityIndicator, Platform, Text, StyleSheet } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import * as SecureStore from "expo-secure-store";

// // ------------------
// // Clerk token cache
// // ------------------
// const tokenCache = {
//   async getToken(key: string) {
//     const value = await SecureStore.getItemAsync(key);
//     console.log("🗄️ getToken:", key, value ? value.slice(0, 15) + "..." : null);
//     return value;
//   },
//   async saveToken(key: string, value: string) {
//     console.log("💾 saveToken:", key, value ? value.slice(0, 15) + "..." : null);
//     return SecureStore.setItemAsync(key, value);
//   },
//   async clearToken() {
//     try {
//       await SecureStore.deleteItemAsync("__clerk_client_jwt");
//       console.log("🧹 Cleared old token");
//     } catch (err) {
//       console.log("⚠️ Failed to clear token:", err);
//     }
//   },
// };

// // ------------------
// // Custom Drawer Content
// // ------------------
// function CustomDrawerContent(props: any) {
//   const { user } = useUser();
//   const { signOut } = useClerk();

//   return (
//     <View style={{ flex: 1 }}>
//       <View style={styles.header}>
//         <Ionicons name="person-circle-outline" size={70} color="#fff" />
//         <Text style={styles.welcome}>WELCOME</Text>
//         <Text style={styles.userId}>User ID: {user?.id}</Text>
//       </View>

//       <DrawerItem
//         label="Dashboard"
//         icon={({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />}
//         onPress={() => props.navigation.navigate("(tabs)")}
//       />

//       <DrawerItem
//         label="Sign Out"
//         icon={({ color, size }) => <Ionicons name="log-out-outline" size={size} color={color} />}
//         onPress={async () => await signOut()}
//       />
//     </View>
//   );
// }

// // ------------------
// // Root Layout
// // ------------------
// export default function RootLayout() {
//   const publishableKey =
//     Constants.expoConfig?.extra?.clerkPublishableKey ||
//     process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

//   if (!publishableKey) throw new Error("Missing Clerk Publishable Key");

//   return (
//     <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
//       <AuthRedirect />
//     </ClerkProvider>
//   );
// }

// // ------------------
// // Auth Redirect + Drawer
// // ------------------
// function AuthRedirect() {
//   const router = useRouter();
//   const { isLoaded, isSignedIn, getToken } = useAuth();
//   const { session } = useSession();
//   const [ready, setReady] = useState(false);
//   const [lastSessionId, setLastSessionId] = useState<string | null>(null);

//   useEffect(() => setReady(true), []);

//   // Web focus listener
//   useEffect(() => {
//     if (Platform.OS === "web") {
//       const onFocus = () => console.log("🌐 Window focused — checking session...");
//       window.addEventListener("focus", onFocus);
//       return () => window.removeEventListener("focus", onFocus);
//     }
//   }, []);

//   // Auth check + redirect
//   useEffect(() => {
//     if (!ready || !isLoaded) return;

//     if (!isSignedIn) {
//       console.log("🚪 User not signed in — redirecting to sign-in...");
//       setTimeout(() => tokenCache.clearToken(), 300);
//       if (Platform.OS === "web") setTimeout(() => window.location.reload(), 15000);
//       router.replace("/(auth)/sign-in");
//       return;
//     }

//     const checkToken = async () => {
//       const retries = 5;
//       const delay = 500;
//       let token: string | null = null;

//       for (let i = 0; i < retries; i++) {
//         token = await getToken({ skipCache: true });
//         if (token) break;
//         await new Promise((res) => setTimeout(res, delay));
//       }

//       if (!token) {
//         console.warn("⚠️ Token not available after retries. Session might not be ready.");
//         return;
//       }

//       if (session?.id && session.id !== lastSessionId) {
//         setLastSessionId(session.id);
//         if (Platform.OS === "web") window.location.reload();
//         else router.replace("/(tabs)/menu");
//       }
//     };

//     checkToken();
//   }, [ready, isLoaded, isSignedIn, session?.id]);

//   if (!isLoaded || !ready) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" color="#007AFF" />
//       </View>
//     );
//   }

//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <Drawer
//         drawerContent={(props) => <CustomDrawerContent {...props} />}
//         screenOptions={{
//           headerShown: false,
//           drawerActiveTintColor: "#4F46E5",
//           drawerLabelStyle: { fontSize: 16 },
//         }}
//       >
//         <Drawer.Screen
//           name="(tabs)"
//           options={{
//             drawerLabel: "Home",
//             drawerIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
//           }}
//         />
//         <Drawer.Screen
//           name="party/index"
//           options={{
//             drawerLabel: "Parties",
//             drawerIcon: ({ color, size }) => <Ionicons name="people-outline" size={size} color={color} />,
//           }}
//         />
//       </Drawer>
//     </GestureHandlerRootView>
//   );
// }

// // ------------------
// // Styles
// // ------------------
// const styles = StyleSheet.create({
//   header: {
//     backgroundColor: "#4F46E5",
//     padding: 20,
//     alignItems: "center",
//   },
//   welcome: { color: "#fff", fontSize: 18, fontWeight: "bold" },
//   userId: { color: "rgba(255,255,255,0.8)", fontSize: 12, marginTop: 4 },
// });








"use client";

import { ClerkProvider, useAuth, useSession } from "@clerk/clerk-expo";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import Constants from "expo-constants";
import { useEffect, useState } from "react";
import { View, ActivityIndicator, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";
import CustomDrawerContent from "./CustomDrawer";

// Clerk token cache
const tokenCache = {
  async getToken(key: string) {
    const value = await SecureStore.getItemAsync(key);
    console.log("🗄️ getToken:", key, value ? value.slice(0, 15) + "..." : null);
    return value;
  },
  async saveToken(key: string, value: string) {
    console.log("💾 saveToken:", key, value ? value.slice(0, 15) + "..." : null);
    return SecureStore.setItemAsync(key, value);
  },
  async clearToken() {
    try {
      await SecureStore.deleteItemAsync("__clerk_client_jwt");
      console.log("🧹 Cleared old token");
    } catch (err) {
      console.log("⚠️ Failed to clear token:", err);
    }
  },
};

export default function RootLayout() {
  const publishableKey =
    Constants.expoConfig?.extra?.clerkPublishableKey ||
    process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!publishableKey) throw new Error("Missing Clerk Publishable Key");

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <AuthRedirect />
    </ClerkProvider>
  );
}

// Auth redirect logic
function AuthRedirect() {
  const router = useRouter();
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const { session } = useSession();
  const [ready, setReady] = useState(false);
  const [lastSessionId, setLastSessionId] = useState<string | null>(null);

  useEffect(() => setReady(true), []);

  useEffect(() => {
    if (!ready || !isLoaded) return;

    if (!isSignedIn) {
      setTimeout(() => tokenCache.clearToken(), 300);
      if (Platform.OS === "web") setTimeout(() => window.location.reload(), 15000);
      router.replace("/(auth)/sign-in");
      return;
    }

    const checkToken = async () => {
      const retries = 5;
      const delay = 500;
      let token: string | null = null;

      for (let i = 0; i < retries; i++) {
        token = await getToken({ skipCache: true });
        if (token) break;
        await new Promise((res) => setTimeout(res, delay));
      }

      if (!token) return;

      if (session?.id && session.id !== lastSessionId) {
        setLastSessionId(session.id);
        if (Platform.OS === "web") window.location.reload();
        else router.replace("/(tabs)/menu");
      }
    };

    checkToken();
  }, [ready, isLoaded, isSignedIn, session?.id]);

  if (!isLoaded || !ready) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          drawerActiveTintColor: "#4F46E5",
          drawerLabelStyle: { fontSize: 16 },
        }}
      >
        <Drawer.Screen
          name="(tabs)"
          options={{
            drawerLabel: "Home",
            drawerIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
          }}
        />
        <Drawer.Screen
          name="party/index"
          options={{
            drawerLabel: "Parties",
            drawerIcon: ({ color, size }) => <Ionicons name="people-outline" size={size} color={color} />,
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
