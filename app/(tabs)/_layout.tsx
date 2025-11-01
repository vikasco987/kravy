// import { Tabs } from 'expo-router';

// export default function TabsLayout() {
//   return (
//     <Tabs>
//       <Tabs.Screen name="menu" options={{ title: 'Menu' }} />
//       <Tabs.Screen name="upload" options={{ title: 'Upload' }} />
//       <Tabs.Screen name="view" options={{ title: 'View' }} />
//     </Tabs>
//   );
// }



// app/(tabs)/_layout.tsx
// import { Tabs } from "expo-router";

// export default function TabsLayout() {
//   return (
//     <Tabs>
//       <Tabs.Screen name="menu" options={{ title: "Menu" }} />
//       <Tabs.Screen name="settings" options={{ title: "Settings" }} />
//     </Tabs>
//   );
// }








// // app/(tabs)/_layout.tsx
// import React from "react";
// import { Tabs } from "expo-router";
// import { ClerkLoaded, useAuth } from "@clerk/clerk-expo";
// import { Slot, Redirect } from "expo-router";

// export default function TabsLayout() {
//   const { isSignedIn } = useAuth();

//   return (
//     <ClerkLoaded>
//       {isSignedIn ? (
//         <Tabs>
//           <Tabs.Screen name="menu" options={{ title: "Menu" }} />
//           <Tabs.Screen name="settings" options={{ title: "Settings" }} />
//         </Tabs>
//       ) : (
//         <Redirect href="/SignIn" />
//       )}
//     </ClerkLoaded>
//   );
// }





























// // app/(tabs)/_layout.tsx
// import React from "react";
// import { Tabs } from "expo-router";
// import { ClerkLoaded, useAuth } from "@clerk/clerk-expo";
// import { Redirect, Slot } from "expo-router";

// export default function TabsLayout() {
//   const { isSignedIn, isLoaded } = useAuth();

//   // Wait until Clerk finishes loading
//   if (!isLoaded) return <Slot />; // fallback to render nested routes

//   // If not signed in, redirect to sign-in page
//   if (!isSignedIn) return <Redirect href="/(auth)/sign-in" />;

//   // Signed-in users see the tabs
//   return (
//     <ClerkLoaded>
//       <Tabs>
//         <Tabs.Screen name="menu" options={{ title: "Menu" }} />
//         <Tabs.Screen name="settings" options={{ title: "Settings" }} />
//         {/* Other tabs can go here */}
//       </Tabs>
//     </ClerkLoaded>
//   );
// }






























// // app/(tabs)/_layout.tsx
// import React from "react";
// import { Tabs } from "expo-router";

// export default function TabsLayout() {
//   return (
//     <Tabs>
//       <Tabs.Screen name="menu" options={{ title: "Menu" }} />
//       <Tabs.Screen name="settings" options={{ title: "Settings" }} />
//     </Tabs>
//   );
// }














// // app/(tabs)/_layout.tsx
// "use client";

// import React from "react";
// import { Tabs } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";

// export default function TabsLayout() {
//   return (
//     <Tabs
//       screenOptions={{
//         headerStyle: { backgroundColor: "#4F46E5" },
//         headerTintColor: "#fff",
//         headerTitleStyle: { fontWeight: "bold" },
//         tabBarActiveTintColor: "#4F46E5",
//         tabBarInactiveTintColor: "gray",
//       }}
//     >
//       <Tabs.Screen
//         name="menu"
//         options={{
//           title: "Menu",
//           tabBarIcon: ({ color, size }) => <Ionicons name="grid-outline" size={size} color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="customers"
//         options={{
//           title: "Customers",
//           tabBarIcon: ({ color, size }) => <Ionicons name="people-outline" size={size} color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="settings"
//         options={{
//           title: "Settings",
//           tabBarIcon: ({ color, size }) => <Ionicons name="settings-outline" size={size} color={color} />,
//         }}
//       />
//     </Tabs>
//   );
// }






// // app/(tabs)/_layout.tsx
// "use client";

// import React from "react";
// import { Tabs } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";

// export default function TabsLayout() {
//   return (
//     <Tabs
//       screenOptions={{
//         headerStyle: { backgroundColor: "#4F46E5" },
//         headerTintColor: "#fff",
//         headerTitleStyle: { fontWeight: "bold" },
//         tabBarActiveTintColor: "#4F46E5",
//         tabBarInactiveTintColor: "gray",
//       }}
//     >
//       <Tabs.Screen
//         name="menu"
//         options={{
//           title: "Menu",
//           tabBarIcon: ({ color, size }) => <Ionicons name="grid-outline" size={size} color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="customers"
//         options={{
//           title: "Customers",
//           tabBarIcon: ({ color, size }) => <Ionicons name="people-outline" size={size} color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="AddItemScreen"
//         options={{
//           title: "Add Item",
//           tabBarIcon: ({ color, size }) => <Ionicons name="add-circle-outline" size={size} color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="CompanyInfoScreen"
//         options={{
//           title: "Company Info",
//           tabBarIcon: ({ color, size }) => <Ionicons name="business-outline" size={size} color={color} />,
//         }}
//       />
//             <Tabs.Screen
//         name="add-item"
//         options={{
//           title: "Add Item",
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="add-circle-outline" color={color} size={size} />
//           ),
//         }}
//       />

//       <Tabs.Screen
//         name="settings"
//         options={{
//           title: "Settings",
//           tabBarIcon: ({ color, size }) => <Ionicons name="settings-outline" size={size} color={color} />,
//         }}
//       />
//     </Tabs>
//   );
// }






// // app/(tabs)/_layout.tsx
// import React from "react";
// import { Tabs } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";

// export default function TabsLayout() {
//   return (
//     <Tabs
//       screenOptions={{
//         headerStyle: { backgroundColor: "#4F46E5" },
//         headerTintColor: "#fff",
//         headerTitleStyle: { fontWeight: "bold" },
//         tabBarActiveTintColor: "#4F46E5",
//         tabBarInactiveTintColor: "gray",
//       }}
//     >
//       <Tabs.Screen
//         name="menu"
//         options={{
//           title: "Menu",
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="grid-outline" size={size} color={color} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="customers"
//         options={{
//           title: "Customers",
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="people-outline" size={size} color={color} />
//           ),
//         }}
//       />
     
//       <Tabs.Screen
//         name="settings"
//         options={{
//           title: "Settings",
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="settings-outline" size={size} color={color} />
//           ),
//         }}
//       />
//     </Tabs>
//   );
// }





// // app/(tabs)/_layout.tsx
// import React from "react";
// import { Tabs } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";

// export default function TabsLayout() {
//   return (
//     <Tabs
//       screenOptions={{
//         headerStyle: { backgroundColor: "#4F46E5" },
//         headerTintColor: "#fff",
//         headerTitleStyle: { fontWeight: "bold", letterSpacing: 0.5 },
//         tabBarActiveTintColor: "#4F46E5",
//         tabBarInactiveTintColor: "#9CA3AF",
//         tabBarStyle: {
//           backgroundColor: "#fff",
//           borderTopWidth: 1,
//           borderTopColor: "#E5E7EB",
//           height: 60,
//           paddingBottom: 6,
//         },
//       }}
//     >
//       {/* 🧾 Menu Screen */}
//       <Tabs.Screen
//         name="menu"
//         options={{
//           title: "Menu",
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="grid-outline" size={size} color={color} />
//           ),
//         }}
//       />

  
//       {/* 👥 Customers Screen */}
//       <Tabs.Screen
//         name="customers"
//         options={{
//           title: "Customers",
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="people-outline" size={size} color={color} />
//           ),
//         }}
//       />
//           {/* 🏪 Inventory Screen */}
//       <Tabs.Screen
//         name="Inventory"
//         options={{
//           title: "Inventory",
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="storefront-outline" size={size} color={color} />
//           ),
//         }}
//       />


//       {/* ⚙️ Settings Screen */}
//       <Tabs.Screen
//         name="settings"
//         options={{
//           title: "Settings",
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="settings-outline" size={size} color={color} />
//           ),
//         }}
//       />
//     </Tabs>
//   );
// }











// // app/(tabs)/_layout.tsx
// import React from "react";
// import { Tabs } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";
// import { useSafeAreaInsets } from "react-native-safe-area-context";

// export default function TabsLayout() {
//   const insets = useSafeAreaInsets(); // ✅ gets safe area padding

//   return (
//     <Tabs
//       screenOptions={{
//         headerStyle: { backgroundColor: "#4F46E5" },
//         headerTintColor: "#fff",
//         headerTitleStyle: { fontWeight: "bold", letterSpacing: 0.5 },
//         tabBarActiveTintColor: "#4F46E5",
//         tabBarInactiveTintColor: "#9CA3AF",
//         tabBarStyle: {
//           backgroundColor: "#fff",
//           borderTopWidth: 1,
//           borderTopColor: "#E5E7EB",
//           height: 60 + insets.bottom, // ✅ auto-adjust height
//           paddingBottom: insets.bottom > 0 ? insets.bottom : 6, // ✅ prevent icons from hiding
//         },
//       }}
//     >
//       <Tabs.Screen
//         name="menu"
//         options={{
//           title: "Menu",
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="grid-outline" size={size} color={color} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="customers"
//         options={{
//           title: "Customers",
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="people-outline" size={size} color={color} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="Inventory"
//         options={{
//           title: "Inventory",
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="storefront-outline" size={size} color={color} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="settings"
//         options={{
//           title: "Settings",
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="settings-outline" size={size} color={color} />
//           ),
//         }}
//       />
//     </Tabs>
//   );
// }



// // app/(tabs)/_layout.tsx
// import "react-native-gesture-handler";
// import React from "react";
// import { Tabs } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import TopNavBar from "../components/TopNavBar";

// export default function TabsLayout() {
//   const insets = useSafeAreaInsets();

//   return (
//     <>
//       {/* ✅ Custom top navigation bar */}
//       <TopNavBar />

//       <Tabs
//         screenOptions={{
//           headerShown: false, // 🚫 Disable Expo Router’s default header
//           tabBarActiveTintColor: "#4F46E5",
//           tabBarInactiveTintColor: "#9CA3AF",
//           tabBarStyle: {
//             backgroundColor: "#fff",
//             borderTopWidth: 1,
//             borderTopColor: "#E5E7EB",
//             height: 60 + insets.bottom,
//             paddingBottom: insets.bottom > 0 ? insets.bottom : 6,
//           },
//         }}
//       >
//         <Tabs.Screen
//           name="menu"
//           options={{
//             title: "Menu",
//             tabBarIcon: ({ color, size }) => (
//               <Ionicons name="grid-outline" size={size} color={color} />
//             ),
//           }}
//         />
//         <Tabs.Screen
//           name="customers"
//           options={{
//             title: "Customers",
//             tabBarIcon: ({ color, size }) => (
//               <Ionicons name="people-outline" size={size} color={color} />
//             ),
//           }}
//         />
//         <Tabs.Screen
//           name="Inventory"
//           options={{
//             title: "Inventory",
//             tabBarIcon: ({ color, size }) => (
//               <Ionicons name="storefront-outline" size={size} color={color} />
//             ),
//           }}
//         />
//         <Tabs.Screen
//           name="settings"
//           options={{
//             title: "Settings",
//             tabBarIcon: ({ color, size }) => (
//               <Ionicons name="settings-outline" size={size} color={color} />
//             ),
//           }}
//         />
//       </Tabs>
//     </>
//   );
// }














// // app/(tabs)/_layout.tsx
// import "react-native-gesture-handler";
// import React from "react";
// import { Tabs, usePathname } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import TopNavBar from "../components/TopNavBar";

// export default function TabsLayout() {
//   const insets = useSafeAreaInsets();
//   const pathname = usePathname();

//   // ✅ Dynamic title logic
//   const getTitle = () => {
//     if (pathname.includes("menu")) return "Menu";
//     if (pathname.includes("customers")) return "Customers";
//     if (pathname.includes("Inventory")) return "Inventory";
//     if (pathname.includes("settings")) return "Settings";
//     return "Dashboard";
//   };

//   return (
//     <>
//       {/* ✅ Show dynamic title */}
//       <TopNavBar title={getTitle()} />

//       <Tabs
//         screenOptions={{
//           headerShown: false, // hide default header
//           tabBarActiveTintColor: "#4F46E5",
//           tabBarInactiveTintColor: "#9CA3AF",
//           tabBarStyle: {
//             backgroundColor: "#fff",
//             borderTopWidth: 1,
//             borderTopColor: "#E5E7EB",
//             height: 60 + insets.bottom,
//             paddingBottom: insets.bottom > 0 ? insets.bottom : 6,
//           },
//         }}
//       >
//         <Tabs.Screen
//           name="menu"
//           options={{
//             title: "Menu",
//             tabBarIcon: ({ color, size }) => (
//               <Ionicons name="grid-outline" size={size} color={color} />
//             ),
//           }}
//         />
//         <Tabs.Screen
//           name="customers"
//           options={{
//             title: "Customers",
//             tabBarIcon: ({ color, size }) => (
//               <Ionicons name="people-outline" size={size} color={color} />
//             ),
//           }}
//         />
//         <Tabs.Screen
//           name="Inventory"
//           options={{
//             title: "Inventory",
//             tabBarIcon: ({ color, size }) => (
//               <Ionicons name="storefront-outline" size={size} color={color} />
//             ),
//           }}
//         />

        
//         <Tabs.Screen
//           name="settings"
//           options={{
//             title: "Settings",
//             tabBarIcon: ({ color, size }) => (
//               <Ionicons name="settings-outline" size={size} color={color} />
//             ),
//           }}
//         />
//       </Tabs>
//     </>
//   );
// }













// app/(tabs)/_layout.tsx
import "react-native-gesture-handler";
import React from "react";
import { Tabs, usePathname } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TopNavBar from "../components/TopNavBar";

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();

  // ✅ Dynamic title logic
  const getTitle = () => {
    if (pathname.includes("menu")) return "Menu";
    if (pathname.includes("customers")) return "Customers";
    if (pathname.includes("Inventory")) return "Inventory";
    if (pathname.includes("printer")) return "Printer"; // 👈 added
    if (pathname.includes("settings")) return "Settings";
    return "Dashboard";
  };

  return (
    <>
      {/* ✅ Top title bar */}
      <TopNavBar title={getTitle()} />

      <Tabs
        screenOptions={{
          headerShown: false, // hide default header
          tabBarActiveTintColor: "#4F46E5",
          tabBarInactiveTintColor: "#9CA3AF",
          tabBarStyle: {
            backgroundColor: "#fff",
            borderTopWidth: 1,
            borderTopColor: "#E5E7EB",
            height: 60 + insets.bottom,
            paddingBottom: insets.bottom > 0 ? insets.bottom : 6,
          },
        }}
      >
        <Tabs.Screen
          name="menu"
          options={{
            title: "Menu",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="grid-outline" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="customers"
          options={{
            title: "Customers",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="people-outline" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="Inventory"
          options={{
            title: "Inventory",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="storefront-outline" size={size} color={color} />
            ),
          }}
        />

        {/* ✅ Added Printer Tab */}
        <Tabs.Screen
          name="printer"
          options={{
            title: "Printer",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="print-outline" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings-outline" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
