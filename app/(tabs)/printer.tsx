









// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   Button,
//   FlatList,
//   TouchableOpacity,
//   Alert,
//   PermissionsAndroid,
//   Platform,
// } from "react-native";
// import {
//   BluetoothManager,
//   BluetoothEscposPrinter,
// } from "react-native-bluetooth-escpos-printer";

// // 🧩 Step 3: Bluetooth permission request (for Android 12+)
// async function requestBluetoothPermissions() {
//   if (Platform.OS === "android") {
//     if (Platform.Version >= 31) {
//       const granted = await PermissionsAndroid.requestMultiple([
//         PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
//         PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//       ]);

//       const allGranted = Object.values(granted).every(
//         (status) => status === PermissionsAndroid.RESULTS.GRANTED
//       );

//       if (!allGranted) {
//         Alert.alert("Permission Denied", "Bluetooth permissions not granted!");
//         return false;
//       }
//       return true;
//     } else {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
//       );
//       if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
//         Alert.alert("Permission Denied", "Location permission not granted!");
//         return false;
//       }
//       return true;
//     }
//   }
//   return true;
// }

// export default function PrinterScreen() {
//   const [devices, setDevices] = useState<any[]>([]);
//   const [connected, setConnected] = useState(false);

//   // 🔍 Scan nearby or paired Bluetooth devices
//   const scanDevices = async () => {
//     try {
//       const permissionOk = await requestBluetoothPermissions();
//       if (!permissionOk) return;

//       const enabled = await BluetoothManager.isBluetoothEnabled();
//       if (!enabled) {
//         await BluetoothManager.enableBluetooth();
//       }

//       const paired = await BluetoothManager.scanDevices();
//       const parsed = JSON.parse(paired.found || "[]");
//       setDevices(parsed);
//       Alert.alert("Scan Complete ✅", `${parsed.length} devices found`);
//     } catch (err: any) {
//       Alert.alert("Error", "Failed to scan: " + err.message);
//     }
//   };

//   // 🔗 Connect to selected printer
//   const connectToDevice = async (address: string) => {
//     try {
//       await BluetoothManager.connect(address);
//       setConnected(true);
//       Alert.alert("Printer Connected ✅", `Connected to ${address}`);
//     } catch (err: any) {
//       Alert.alert("Error", "Could not connect: " + err.message);
//     }
//   };

//   // 🧾 Print sample bill (2-inch 58mm format)
//   const printSample = async () => {
//     try {
//       await BluetoothEscposPrinter.printerAlign(
//         BluetoothEscposPrinter.ALIGN.CENTER
//       );
//       await BluetoothEscposPrinter.printText("My Billing App\n\r", {
//         encoding: "GBK",
//         codepage: 0,
//         widthtimes: 2,
//         heigthtimes: 2,
//       });
//       await BluetoothEscposPrinter.printText("Bill Receipt\n\r", {});
//       await BluetoothEscposPrinter.printText(
//         "--------------------------------\n\r",
//         {}
//       );
//       await BluetoothEscposPrinter.printText("Item       Qty    Price\n\r", {});
//       await BluetoothEscposPrinter.printText("Tea        2      40.00\n\r", {});
//       await BluetoothEscposPrinter.printText(
//         "Samosa     3      60.00\n\r",
//         {}
//       );
//       await BluetoothEscposPrinter.printText(
//         "--------------------------------\n\r",
//         {}
//       );
//       await BluetoothEscposPrinter.printText("Total: ₹100.00\n\r", {
//         widthtimes: 1,
//         heigthtimes: 1,
//       });
//       await BluetoothEscposPrinter.printText(
//         "\n\rThank you for your purchase!\n\r\n\r\n\r",
//         {}
//       );
//     } catch (err: any) {
//       Alert.alert("Error", "Failed to print: " + err.message);
//     }
//   };

//   return (
//     <View style={{ flex: 1, padding: 20, backgroundColor: "#fff" }}>
//       <Text
//         style={{
//           fontSize: 20,
//           fontWeight: "600",
//           marginBottom: 20,
//           textAlign: "center",
//         }}
//       >
//         🖨️ Bluetooth Printer Setup
//       </Text>

//       <Button title="🔍 Scan Bluetooth Printers" onPress={scanDevices} />

//       {devices.length > 0 && (
//         <FlatList
//           data={devices}
//           keyExtractor={(item) => item.address}
//           renderItem={({ item }) => (
//             <TouchableOpacity
//               style={{
//                 padding: 12,
//                 backgroundColor: "#f3f3f3",
//                 marginVertical: 6,
//                 borderRadius: 8,
//               }}
//               onPress={() => connectToDevice(item.address)}
//             >
//               <Text style={{ fontWeight: "600" }}>
//                 {item.name || "Unknown Device"}
//               </Text>
//               <Text style={{ color: "#666" }}>{item.address}</Text>
//             </TouchableOpacity>
//           )}
//         />
//       )}

//       {connected && (
//         <View style={{ marginTop: 20 }}>
//           <Button title="🖨️ Print Sample Bill" onPress={printSample} />
//         </View>
//       )}
//     </View>
//   );
// }
















// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   Button,
//   FlatList,
//   TouchableOpacity,
//   Alert,
//   PermissionsAndroid,
//   Platform,
// } from "react-native";
// import {
//   BluetoothManager,
//   BluetoothEscposPrinter,
// } from "react-native-bluetooth-escpos-printer";

// // ✅ Step 1: Request Bluetooth permissions at runtime (for Android 12+)
// async function requestBluetoothPermissions() {
//   if (Platform.OS === "android") {
//     try {
//       if (Platform.Version >= 31) {
//         // Android 12 and above
//         const granted = await PermissionsAndroid.requestMultiple([
//           PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
//           PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//         ]);

//         const allGranted =
//           granted["android.permission.BLUETOOTH_SCAN"] === "granted" &&
//           granted["android.permission.BLUETOOTH_CONNECT"] === "granted" &&
//           granted["android.permission.ACCESS_FINE_LOCATION"] === "granted";

//         if (!allGranted) {
//           Alert.alert(
//             "Permission Denied",
//             "Bluetooth permissions are required to scan printers."
//           );
//           return false;
//         }
//         return true;
//       } else {
//         // For Android 11 and below
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
//         );
//         if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
//           Alert.alert(
//             "Permission Denied",
//             "Location permission is required to scan printers."
//           );
//           return false;
//         }
//         return true;
//       }
//     } catch (error: any) {
//       console.log("Permission request failed:", error);
//       Alert.alert("Error", "Failed to request permissions.");
//       return false;
//     }
//   }
//   return true; // iOS or other platforms
// }

// export default function PrinterScreen() {
//   const [devices, setDevices] = useState<any[]>([]);
//   const [connected, setConnected] = useState(false);

//   // 🔍 Scan nearby Bluetooth printers
//   const scanDevices = async () => {
//     try {
//       const permissionOk = await requestBluetoothPermissions();
//       if (!permissionOk) return;

//       const enabled = await BluetoothManager.isBluetoothEnabled();
//       if (!enabled) {
//         await BluetoothManager.enableBluetooth();
//       }

//       const paired = await BluetoothManager.scanDevices();
//       const parsed = JSON.parse(paired.found || "[]");
//       setDevices(parsed);
//       Alert.alert("✅ Scan Complete", `${parsed.length} devices found`);
//     } catch (err: any) {
//       Alert.alert("Error", "Failed to scan: " + err.message);
//     }
//   };

//   // 🔗 Connect to selected printer
//   const connectToDevice = async (address: string) => {
//     try {
//       await BluetoothManager.connect(address);
//       setConnected(true);
//       Alert.alert("✅ Printer Connected", `Connected to ${address}`);
//     } catch (err: any) {
//       Alert.alert("Error", "Could not connect: " + err.message);
//     }
//   };

//   // 🧾 Print sample bill
//   const printSample = async () => {
//     try {
//       await BluetoothEscposPrinter.printerAlign(
//         BluetoothEscposPrinter.ALIGN.CENTER
//       );
//       await BluetoothEscposPrinter.printText("My Billing App\n\r", {
//         encoding: "GBK",
//         codepage: 0,
//         widthtimes: 2,
//         heigthtimes: 2,
//       });
//       await BluetoothEscposPrinter.printText("Bill Receipt\n\r", {});
//       await BluetoothEscposPrinter.printText(
//         "--------------------------------\n\r",
//         {}
//       );
//       await BluetoothEscposPrinter.printText("Item       Qty    Price\n\r", {});
//       await BluetoothEscposPrinter.printText("Tea        2      40.00\n\r", {});
//       await BluetoothEscposPrinter.printText(
//         "Samosa     3      60.00\n\r",
//         {}
//       );
//       await BluetoothEscposPrinter.printText(
//         "--------------------------------\n\r",
//         {}
//       );
//       await BluetoothEscposPrinter.printText("Total: ₹100.00\n\r", {
//         widthtimes: 1,
//         heigthtimes: 1,
//       });
//       await BluetoothEscposPrinter.printText(
//         "\n\rThank you for your purchase!\n\r\n\r\n\r",
//         {}
//       );
//     } catch (err: any) {
//       Alert.alert("Error", "Failed to print: " + err.message);
//     }
//   };

//   return (
//     <View style={{ flex: 1, padding: 20, backgroundColor: "#fff" }}>
//       <Text
//         style={{
//           fontSize: 20,
//           fontWeight: "600",
//           marginBottom: 20,
//           textAlign: "center",
//         }}
//       >
//         🖨️ Bluetooth Printer Setup
//       </Text>

//       <Button title="🔍 Scan Bluetooth Printers" onPress={scanDevices} />

//       {devices.length > 0 && (
//         <FlatList
//           data={devices}
//           keyExtractor={(item) => item.address}
//           renderItem={({ item }) => (
//             <TouchableOpacity
//               style={{
//                 padding: 12,
//                 backgroundColor: "#f3f3f3",
//                 marginVertical: 6,
//                 borderRadius: 8,
//               }}
//               onPress={() => connectToDevice(item.address)}
//             >
//               <Text style={{ fontWeight: "600" }}>
//                 {item.name || "Unknown Device"}
//               </Text>
//               <Text style={{ color: "#666" }}>{item.address}</Text>
//             </TouchableOpacity>
//           )}
//         />
//       )}

//       {connected && (
//         <View style={{ marginTop: 20 }}>
//           <Button title="🖨️ Print Sample Bill" onPress={printSample} />
//         </View>
//       )}
//     </View>
//   );
// }














// // import React, { useState } from "react";
// import {
//   View,
//   Text,
//   Button,
//   FlatList,
//   TouchableOpacity,
//   Alert,
//   PermissionsAndroid,
//   Platform,
// } from "react-native";
// import {
//   BluetoothManager,
//   BluetoothEscposPrinter,
// } from "react-native-bluetooth-escpos-printer";

// /**
//  * ✅ Step 1: Ask for Bluetooth + Location permissions (Android 12+)
//  */
// async function requestBluetoothPermissions() {
//   if (Platform.OS === "android") {
//     try {
//       if (Platform.Version >= 31) {
//         // Android 12 and above
//         const granted = await PermissionsAndroid.requestMultiple([
//           PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
//           PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//         ]);

//         const allGranted =
//           granted["android.permission.BLUETOOTH_SCAN"] === "granted" &&
//           granted["android.permission.BLUETOOTH_CONNECT"] === "granted" &&
//           granted["android.permission.ACCESS_FINE_LOCATION"] === "granted";

//         if (!allGranted) {
//           Alert.alert(
//             "Permission Denied",
//             "Bluetooth permissions are required to scan printers."
//           );
//           return false;
//         }
//         return true;
//       } else {
//         // Android 11 and below
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
//         );
//         if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
//           Alert.alert(
//             "Permission Denied",
//             "Location permission is required to scan printers."
//           );
//           return false;
//         }
//         return true;
//       }
//     } catch (error: any) {
//       console.log("Permission request failed:", error);
//       Alert.alert("Error", "Failed to request permissions.");
//       return false;
//     }
//   }
//   return true; // iOS or other platforms
// }

// /**
//  * 🖨️ Bluetooth Printer Screen
//  */
// export default function PrinterScreen() {
//   const [devices, setDevices] = useState<any[]>([]);
//   const [connected, setConnected] = useState(false);

//   /**
//    * 🔍 Step 2: Scan nearby Bluetooth printers
//    */
//   const scanDevices = async () => {
//     try {
//       const permissionOk = await requestBluetoothPermissions();
//       if (!permissionOk) return;

//       const enabled = await BluetoothManager.isBluetoothEnabled();
//       if (!enabled) {
//         await BluetoothManager.enableBluetooth();
//       }

//       const paired = await BluetoothManager.scanDevices();
//       const parsed = JSON.parse(paired.found || "[]");
//       setDevices(parsed);
//       Alert.alert("✅ Scan Complete", `${parsed.length} devices found`);
//     } catch (err: any) {
//       Alert.alert("Error", "Failed to scan: " + err.message);
//     }
//   };

//   /**
//    * 🔗 Step 3: Connect to a selected printer
//    */
//   const connectToDevice = async (address: string) => {
//     try {
//       await BluetoothManager.connect(address);
//       setConnected(true);
//       Alert.alert("✅ Printer Connected", `Connected to ${address}`);
//     } catch (err: any) {
//       Alert.alert("Error", "Could not connect: " + err.message);
//     }
//   };

//   /**
//    * 🧾 Step 4: Print a sample bill
//    */
//   const printSample = async () => {
//     try {
//       await BluetoothEscposPrinter.printerAlign(
//         BluetoothEscposPrinter.ALIGN.CENTER
//       );
//       await BluetoothEscposPrinter.printText("My Billing App\n\r", {
//         encoding: "GBK",
//         codepage: 0,
//         widthtimes: 2,
//         heigthtimes: 2,
//       });
//       await BluetoothEscposPrinter.printText("Bill Receipt\n\r", {});
//       await BluetoothEscposPrinter.printText(
//         "--------------------------------\n\r",
//         {}
//       );
//       await BluetoothEscposPrinter.printText("Item       Qty    Price\n\r", {});
//       await BluetoothEscposPrinter.printText("Tea        2      40.00\n\r", {});
//       await BluetoothEscposPrinter.printText(
//         "Samosa     3      60.00\n\r",
//         {}
//       );
//       await BluetoothEscposPrinter.printText(
//         "--------------------------------\n\r",
//         {}
//       );
//       await BluetoothEscposPrinter.printText("Total: ₹100.00\n\r", {
//         widthtimes: 1,
//         heigthtimes: 1,
//       });
//       await BluetoothEscposPrinter.printText(
//         "\n\rThank you for your purchase!\n\r\n\r\n\r",
//         {}
//       );
//     } catch (err: any) {
//       Alert.alert("Error", "Failed to print: " + err.message);
//     }
//   };

//   /**
//    * 🖥️ UI
//    */
//   return (
//     <View style={{ flex: 1, padding: 20, backgroundColor: "#fff" }}>
//       <Text
//         style={{
//           fontSize: 20,
//           fontWeight: "600",
//           marginBottom: 20,
//           textAlign: "center",
//         }}
//       >
//         🖨️ Bluetooth Printer Setup
//       </Text>

//       <Button title="🔍 Scan Bluetooth Printers" onPress={scanDevices} />

//       {devices.length > 0 && (
//         <FlatList
//           data={devices}
//           keyExtractor={(item) => item.address}
//           renderItem={({ item }) => (
//             <TouchableOpacity
//               style={{
//                 padding: 12,
//                 backgroundColor: "#f3f3f3",
//                 marginVertical: 6,
//                 borderRadius: 8,
//               }}
//               onPress={() => connectToDevice(item.address)}
//             >
//               <Text style={{ fontWeight: "600" }}>
//                 {item.name || "Unknown Device"}
//               </Text>
//               <Text style={{ color: "#666" }}>{item.address}</Text>
//             </TouchableOpacity>
//           )}
//         />
//       )}

//       {connected && (
//         <View style={{ marginTop: 20 }}>
//           <Button title="🖨️ Print Sample Bill" onPress={printSample} />
//         </View>
//       )}
//     </View>
//   );
// }





















// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   Button,
//   FlatList,
//   TouchableOpacity,
//   Alert,
//   PermissionsAndroid,
//   Platform,
// } from "react-native";
// import {
//   BluetoothManager,
//   BluetoothEscposPrinter,
// } from "react-native-bluetooth-escpos-printer";

// /**
//  * ✅ Step 1: Ask for Bluetooth + Location permissions (Android 12+)
//  */
// async function requestBluetoothPermissions() {
//   if (Platform.OS === "android") {
//     try {
//       // 🔒 For Android 12 and above
//       const granted = await PermissionsAndroid.requestMultiple([
//         PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
//         PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//       ]);

//       const hasConnect =
//         granted["android.permission.BLUETOOTH_CONNECT"] ===
//         PermissionsAndroid.RESULTS.GRANTED;
//       const hasScan =
//         granted["android.permission.BLUETOOTH_SCAN"] ===
//         PermissionsAndroid.RESULTS.GRANTED;
//       const hasLocation =
//         granted["android.permission.ACCESS_FINE_LOCATION"] ===
//         PermissionsAndroid.RESULTS.GRANTED;

//       if (hasConnect && hasScan && hasLocation) {
//         console.log("✅ Bluetooth permissions granted");
//         return true;
//       } else {
//         console.log("❌ Bluetooth permissions denied");
//         Alert.alert(
//           "Bluetooth Permission",
//           "Please allow Bluetooth and Location permissions to scan devices."
//         );
//         return false;
//       }
//     } catch (err) {
//       console.warn("Permission error:", err);
//       Alert.alert("Error", "Failed to request Bluetooth permissions.");
//       return false;
//     }
//   }

//   // iOS or other platforms
//   return true;
// }

// /**
//  * 🖨️ Bluetooth Printer Screen
//  */
// export default function PrinterScreen() {
//   const [devices, setDevices] = useState<any[]>([]);
//   const [connected, setConnected] = useState(false);

//   /**
//    * 🔍 Step 2: Scan nearby Bluetooth printers
//    */
//   const scanDevices = async () => {
//     try {
//       const permissionOk = await requestBluetoothPermissions();
//       if (!permissionOk) return;

//       const enabled = await BluetoothManager.isBluetoothEnabled();
//       if (!enabled) {
//         await BluetoothManager.enableBluetooth();
//       }

//       const paired = await BluetoothManager.scanDevices();
//       const parsed = JSON.parse(paired.found || "[]");
//       setDevices(parsed);
//       Alert.alert("✅ Scan Complete", `${parsed.length} devices found`);
//     } catch (err: any) {
//       Alert.alert("Error", "Failed to scan: " + err.message);
//     }
//   };

//   /**
//    * 🔗 Step 3: Connect to a selected printer
//    */
//   const connectToDevice = async (address: string) => {
//     try {
//       const hasPermission = await requestBluetoothPermissions();
//       if (!hasPermission) return;

//       await BluetoothManager.connect(address);
//       setConnected(true);
//       Alert.alert("✅ Printer Connected", `Connected to ${address}`);
//     } catch (err: any) {
//       Alert.alert("Error", "Could not connect: " + err.message);
//     }
//   };

//   /**
//    * 🧾 Step 4: Print a sample bill
//    */
//   const printSample = async () => {
//     try {
//       await BluetoothEscposPrinter.printerAlign(
//         BluetoothEscposPrinter.ALIGN.CENTER
//       );
//       await BluetoothEscposPrinter.printText("My Billing App\n\r", {
//         encoding: "GBK",
//         codepage: 0,
//         widthtimes: 2,
//         heigthtimes: 2,
//       });
//       await BluetoothEscposPrinter.printText("Bill Receipt\n\r", {});
//       await BluetoothEscposPrinter.printText(
//         "--------------------------------\n\r",
//         {}
//       );
//       await BluetoothEscposPrinter.printText("Item       Qty    Price\n\r", {});
//       await BluetoothEscposPrinter.printText("Tea        2      40.00\n\r", {});
//       await BluetoothEscposPrinter.printText(
//         "Samosa     3      60.00\n\r",
//         {}
//       );
//       await BluetoothEscposPrinter.printText(
//         "--------------------------------\n\r",
//         {}
//       );
//       await BluetoothEscposPrinter.printText("Total: ₹100.00\n\r", {
//         widthtimes: 1,
//         heigthtimes: 1,
//       });
//       await BluetoothEscposPrinter.printText(
//         "\n\rThank you for your purchase!\n\r\n\r\n\r",
//         {}
//       );
//     } catch (err: any) {
//       Alert.alert("Error", "Failed to print: " + err.message);
//     }
//   };

//   /**
//    * 🖥️ UI
//    */
//   return (
//     <View style={{ flex: 1, padding: 20, backgroundColor: "#fff" }}>
//       <Text
//         style={{
//           fontSize: 20,
//           fontWeight: "600",
//           marginBottom: 20,
//           textAlign: "center",
//         }}
//       >
//         🖨️ Bluetooth Printer Setup
//       </Text>

//       <Button title="🔍 Scan Bluetooth Printers" onPress={scanDevices} />

//       {devices.length > 0 && (
//         <FlatList
//           data={devices}
//           keyExtractor={(item) => item.address}
//           renderItem={({ item }) => (
//             <TouchableOpacity
//               style={{
//                 padding: 12,
//                 backgroundColor: "#f3f3f3",
//                 marginVertical: 6,
//                 borderRadius: 8,
//               }}
//               onPress={() => connectToDevice(item.address)}
//             >
//               <Text style={{ fontWeight: "600" }}>
//                 {item.name || "Unknown Device"}
//               </Text>
//               <Text style={{ color: "#666" }}>{item.address}</Text>
//             </TouchableOpacity>
//           )}
//         />
//       )}

//       {connected && (
//         <View style={{ marginTop: 20 }}>
//           <Button title="🖨️ Print Sample Bill" onPress={printSample} />
//         </View>
//       )}
//     </View>
//   );
// }




// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   Button,
//   FlatList,
//   TouchableOpacity,
//   Alert,
//   PermissionsAndroid,
//   Platform,
// } from "react-native";
// import {
//   BluetoothManager,
//   BluetoothEscposPrinter,
// } from "react-native-bluetooth-escpos-printer";

// /**
//  * ✅ Request Bluetooth & Location Permissions
//  */
// async function requestBluetoothPermissions() {
//   if (Platform.OS === "android") {
//     try {
//       const permissions = [
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//         PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
//       ];

//       // Add Android 12+ permissions
//       if (Platform.Version >= 31) {
//         permissions.push(
//           PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
//           PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN
//         );
//       }

//       const granted = await PermissionsAndroid.requestMultiple(permissions);

//       const allGranted = Object.values(granted).every(
//         (status) => status === PermissionsAndroid.RESULTS.GRANTED
//       );

//       if (allGranted) {
//         console.log("✅ All Bluetooth permissions granted");
//         return true;
//       } else {
//         console.log("❌ Bluetooth permissions denied", granted);
//         Alert.alert(
//           "Bluetooth Permission Denied",
//           "Please go to Settings → Apps → MyBillingApp → Permissions → Allow Bluetooth & Location."
//         );
//         return false;
//       }
//     } catch (err) {
//       console.warn("Permission error:", err);
//       Alert.alert("Error", "Failed to request Bluetooth permissions.");
//       return false;
//     }
//   }
//   return true;
// }

// /**
//  * 🖨️ Bluetooth Printer Screen
//  */
// export default function PrinterScreen() {
//   const [devices, setDevices] = useState<any[]>([]);
//   const [connected, setConnected] = useState(false);

//   /**
//    * 🔍 Step 2: Scan nearby Bluetooth printers
//    */
//   const scanDevices = async () => {
//     try {
//       const permissionOk = await requestBluetoothPermissions();
//       if (!permissionOk) return;

//       const enabled = await BluetoothManager.isBluetoothEnabled();
//       if (!enabled) {
//         await BluetoothManager.enableBluetooth();
//       }

//       const paired = await BluetoothManager.scanDevices();
//       const foundDevices = JSON.parse(paired.found || "[]");
//       console.log("Found devices:", foundDevices);
//       setDevices(foundDevices);
//       Alert.alert("✅ Scan Complete", `${foundDevices.length} devices found`);
//     } catch (err: any) {
//       console.error("Scan error:", err);
//       Alert.alert("Error", "Failed to scan: " + err.message);
//     }
//   };

//   /**
//    * 🔗 Step 3: Connect to a selected printer
//    */
//   const connectToDevice = async (address: string) => {
//     try {
//       const hasPermission = await requestBluetoothPermissions();
//       if (!hasPermission) return;

//       await BluetoothManager.connect(address);
//       setConnected(true);
//       Alert.alert("✅ Printer Connected", `Connected to ${address}`);
//     } catch (err: any) {
//       console.error("Connect error:", err);
//       Alert.alert("Error", "Could not connect: " + err.message);
//     }
//   };

//   /**
//    * 🧾 Step 4: Print a sample bill
//    */
//   const printSample = async () => {
//     try {
//       await BluetoothEscposPrinter.printerAlign(
//         BluetoothEscposPrinter.ALIGN.CENTER
//       );
//       await BluetoothEscposPrinter.printText("My Billing App\n\r", {
//         encoding: "GBK",
//         codepage: 0,
//         widthtimes: 2,
//         heigthtimes: 2,
//       });
//       await BluetoothEscposPrinter.printText("Bill Receipt\n\r", {});
//       await BluetoothEscposPrinter.printText(
//         "--------------------------------\n\r",
//         {}
//       );
//       await BluetoothEscposPrinter.printText("Item       Qty    Price\n\r", {});
//       await BluetoothEscposPrinter.printText("Tea        2      40.00\n\r", {});
//       await BluetoothEscposPrinter.printText(
//         "Samosa     3      60.00\n\r",
//         {}
//       );
//       await BluetoothEscposPrinter.printText(
//         "--------------------------------\n\r",
//         {}
//       );
//       await BluetoothEscposPrinter.printText("Total: ₹100.00\n\r", {
//         widthtimes: 1,
//         heigthtimes: 1,
//       });
//       await BluetoothEscposPrinter.printText(
//         "\n\rThank you for your purchase!\n\r\n\r\n\r",
//         {}
//       );
//     } catch (err: any) {
//       console.error("Print error:", err);
//       Alert.alert("Error", "Failed to print: " + err.message);
//     }
//   };

//   /**
//    * 🖥️ UI
//    */
//   return (
//     <View style={{ flex: 1, padding: 20, backgroundColor: "#fff" }}>
//       <Text
//         style={{
//           fontSize: 20,
//           fontWeight: "600",
//           marginBottom: 20,
//           textAlign: "center",
//         }}
//       >
//         🖨️ Bluetooth Printer Setup
//       </Text>

//       <Button title="🔍 Scan Bluetooth Printers" onPress={scanDevices} />

//       {devices.length > 0 && (
//         <FlatList
//           data={devices}
//           keyExtractor={(item) => item.address}
//           renderItem={({ item }) => (
//             <TouchableOpacity
//               style={{
//                 padding: 12,
//                 backgroundColor: "#f3f3f3",
//                 marginVertical: 6,
//                 borderRadius: 8,
//               }}
//               onPress={() => connectToDevice(item.address)}
//             >
//               <Text style={{ fontWeight: "600" }}>
//                 {item.name || "Unknown Device"}
//               </Text>
//               <Text style={{ color: "#666" }}>{item.address}</Text>
//             </TouchableOpacity>
//           )}
//         />
//       )}

//       {connected && (
//         <View style={{ marginTop: 20 }}>
//           <Button title="🖨️ Print Sample Bill" onPress={printSample} />
//         </View>
//       )}
//     </View>
//   );
// }






// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   Button,
//   FlatList,
//   TouchableOpacity,
//   Alert,
//   PermissionsAndroid,
//   Platform,
// } from "react-native";
// import {
//   BluetoothManager,
//   BluetoothEscposPrinter,
// } from "react-native-bluetooth-escpos-printer";

// /**
//  * ✅ Request Bluetooth & Location Permissions (Android 12+ supported)
//  */
// async function requestBluetoothPermissions() {
//   if (Platform.OS === "android") {
//     try {
//       const permissions = [
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//         PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
//       ];

//       // Add Android 12+ permissions
//       if (Platform.Version >= 31) {
//         permissions.push(
//           PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
//           PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN
//         );
//       }

//       const granted = await PermissionsAndroid.requestMultiple(permissions);

//       const allGranted = Object.values(granted).every(
//         (status) => status === PermissionsAndroid.RESULTS.GRANTED
//       );

//       if (allGranted) {
//         console.log("✅ All Bluetooth permissions granted");
//         return true;
//       } else {
//         console.log("❌ Bluetooth permissions denied", granted);
//         Alert.alert(
//           "Bluetooth Permission Denied",
//           "Please go to Settings → Apps → MyBillingApp → Permissions → Allow Bluetooth & Location."
//         );
//         return false;
//       }
//     } catch (err) {
//       console.warn("Permission error:", err);
//       Alert.alert("Error", "Failed to request Bluetooth permissions.");
//       return false;
//     }
//   }
//   return true;
// }

// /**
//  * 🖨️ Bluetooth Printer Screen
//  */
// export default function PrinterScreen() {
//   const [devices, setDevices] = useState<any[]>([]);
//   const [connected, setConnected] = useState(false);
//   const [permissionsGranted, setPermissionsGranted] = useState(false);

//   /**
//    * 🚀 Auto-request Bluetooth permissions when screen opens
//    */
//   useEffect(() => {
//     (async () => {
//       const ok = await requestBluetoothPermissions();
//       setPermissionsGranted(ok);
//       if (ok) {
//         console.log("✅ Ready to scan Bluetooth devices");
//       }
//     })();
//   }, []);

//   /**
//    * 🔍 Step 2: Scan nearby Bluetooth printers
//    */
//   const scanDevices = async () => {
//     try {
//       if (!permissionsGranted) {
//         Alert.alert("Permission Required", "Please allow Bluetooth access first.");
//         return;
//       }

//       const enabled = await BluetoothManager.isBluetoothEnabled();
//       if (!enabled) {
//         await BluetoothManager.enableBluetooth();
//       }

//       const paired = await BluetoothManager.scanDevices();
//       const foundDevices = JSON.parse(paired.found || "[]");
//       console.log("📡 Found devices:", foundDevices);
//       setDevices(foundDevices);
//       Alert.alert("✅ Scan Complete", `${foundDevices.length} devices found`);
//     } catch (err: any) {
//       console.error("Scan error:", err);
//       Alert.alert("Error", "Failed to scan: " + err.message);
//     }
//   };

//   /**
//    * 🔗 Step 3: Connect to a selected printer
//    */
//   const connectToDevice = async (address: string) => {
//     try {
//       if (!permissionsGranted) {
//         Alert.alert("Permission Required", "Please allow Bluetooth access first.");
//         return;
//       }

//       await BluetoothManager.connect(address);
//       setConnected(true);
//       Alert.alert("✅ Printer Connected", `Connected to ${address}`);
//     } catch (err: any) {
//       console.error("Connect error:", err);
//       Alert.alert("Error", "Could not connect: " + err.message);
//     }
//   };

//   /**
//    * 🧾 Step 4: Print a sample bill
//    */
//   const printSample = async () => {
//     try {
//       await BluetoothEscposPrinter.printerAlign(
//         BluetoothEscposPrinter.ALIGN.CENTER
//       );
//       await BluetoothEscposPrinter.printText("My Billing App\n\r", {
//         encoding: "GBK",
//         codepage: 0,
//         widthtimes: 2,
//         heigthtimes: 2,
//       });
//       await BluetoothEscposPrinter.printText("Bill Receipt\n\r", {});
//       await BluetoothEscposPrinter.printText(
//         "--------------------------------\n\r",
//         {}
//       );
//       await BluetoothEscposPrinter.printText("Item       Qty    Price\n\r", {});
//       await BluetoothEscposPrinter.printText("Tea        2      40.00\n\r", {});
//       await BluetoothEscposPrinter.printText(
//         "Samosa     3      60.00\n\r",
//         {}
//       );
//       await BluetoothEscposPrinter.printText(
//         "--------------------------------\n\r",
//         {}
//       );
//       await BluetoothEscposPrinter.printText("Total: ₹100.00\n\r", {
//         widthtimes: 1,
//         heigthtimes: 1,
//       });
//       await BluetoothEscposPrinter.printText(
//         "\n\rThank you for your purchase!\n\r\n\r\n\r",
//         {}
//       );
//     } catch (err: any) {
//       console.error("Print error:", err);
//       Alert.alert("Error", "Failed to print: " + err.message);
//     }
//   };

//   /**
//    * 🖥️ UI
//    */
//   return (
//     <View style={{ flex: 1, padding: 20, backgroundColor: "#fff" }}>
//       <Text
//         style={{
//           fontSize: 20,
//           fontWeight: "600",
//           marginBottom: 20,
//           textAlign: "center",
//         }}
//       >
//         🖨️ Bluetooth Printer Setup
//       </Text>

//       {!permissionsGranted && (
//         <Text style={{ color: "red", textAlign: "center", marginBottom: 10 }}>
//           ⚠️ Bluetooth permission not granted. Please allow access in Settings.
//         </Text>
//       )}

//       <Button
//         title="🔍 Scan Bluetooth Printers"
//         onPress={scanDevices}
//         disabled={!permissionsGranted}
//       />

//       {devices.length > 0 && (
//         <FlatList
//           data={devices}
//           keyExtractor={(item) => item.address}
//           renderItem={({ item }) => (
//             <TouchableOpacity
//               style={{
//                 padding: 12,
//                 backgroundColor: "#f3f3f3",
//                 marginVertical: 6,
//                 borderRadius: 8,
//               }}
//               onPress={() => connectToDevice(item.address)}
//             >
//               <Text style={{ fontWeight: "600" }}>
//                 {item.name || "Unknown Device"}
//               </Text>
//               <Text style={{ color: "#666" }}>{item.address}</Text>
//             </TouchableOpacity>
//           )}
//         />
//       )}

//       {connected && (
//         <View style={{ marginTop: 20 }}>
//           <Button title="🖨️ Print Sample Bill" onPress={printSample} />
//         </View>
//       )}
//     </View>
//   );
// }

























// import React, { useEffect, useState } from "react";
// import { View, Text, Button, PermissionsAndroid, Platform, ToastAndroid } from "react-native";

// export default function PrinterScreen() {
//   const [permissionStatus, setPermissionStatus] = useState("⏳ Checking...");

//   const requestBluetoothPermission = async () => {
//     if (Platform.OS !== "android") return;

//     try {
//       const result = await PermissionsAndroid.requestMultiple([
//         PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
//         PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//       ]);

//       console.log("🔍 Bluetooth permissions result:", result);

//       const allGranted = Object.values(result).every(
//         (status) => status === PermissionsAndroid.RESULTS.GRANTED
//       );

//       if (allGranted) {
//         ToastAndroid.show("✅ Bluetooth permission granted", ToastAndroid.SHORT);
//         setPermissionStatus("✅ Granted");
//       } else {
//         ToastAndroid.show("❌ Bluetooth permission denied", ToastAndroid.SHORT);
//         setPermissionStatus("❌ Denied");
//       }
//     } catch (error) {
//       console.error("⚠️ Permission error:", error);
//       setPermissionStatus("⚠️ Error requesting permission");
//     }
//   };

//   useEffect(() => {
//     // auto-run permission check when screen opens
//     requestBluetoothPermission();
//   }, []);

//   return (
//     <View
//       style={{
//         flex: 1,
//         alignItems: "center",
//         justifyContent: "center",
//         backgroundColor: "#f5f5f5",
//       }}
//     >
//       <Text style={{ fontSize: 20, marginBottom: 20 }}>
//         Bluetooth Permission Test
//       </Text>
//       <Text style={{ marginBottom: 20 }}>Status: {permissionStatus}</Text>
//       <Button title="🔁 Re-check Bluetooth Permission" onPress={requestBluetoothPermission} />
//     </View>
//   );
// }
















// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   Button,
//   PermissionsAndroid,
//   Platform,
//   ToastAndroid,
//   ActivityIndicator,
//   StyleSheet,
// } from "react-native";

// export default function PrinterScreen() {
//   const [permissionStatus, setPermissionStatus] = useState("⏳ Checking...");
//   const [isLoading, setIsLoading] = useState(true);
//   const [granted, setGranted] = useState(false);

//   const requestBluetoothPermission = async () => {
//     if (Platform.OS !== "android") {
//       setPermissionStatus("⚠️ iOS doesn't need manual Bluetooth permission");
//       setIsLoading(false);
//       return;
//     }

//     try {
//       setIsLoading(true);
//       const result = await PermissionsAndroid.requestMultiple([
//         PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
//         PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//       ]);

//       console.log("🔍 Bluetooth permissions result:", result);

//       const allGranted = Object.values(result).every(
//         (status) => status === PermissionsAndroid.RESULTS.GRANTED
//       );

//       if (allGranted) {
//         ToastAndroid.show("✅ Bluetooth permission granted", ToastAndroid.SHORT);
//         setPermissionStatus("✅ Granted");
//         setGranted(true);
//       } else {
//         ToastAndroid.show("❌ Bluetooth permission denied", ToastAndroid.SHORT);
//         setPermissionStatus("❌ Denied");
//         setGranted(false);
//       }
//     } catch (error) {
//       console.error("⚠️ Permission error:", error);
//       setPermissionStatus("⚠️ Error requesting permission");
//       setGranted(false);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     requestBluetoothPermission();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>🖨️ Bluetooth Printer Permission</Text>

//       {isLoading ? (
//         <View style={{ alignItems: "center" }}>
//           <ActivityIndicator size="large" color="#4F46E5" />
//           <Text style={styles.statusText}>Checking permission...</Text>
//         </View>
//       ) : (
//         <>
//           <Text
//             style={[
//               styles.statusText,
//               granted ? styles.statusGranted : styles.statusDenied,
//             ]}
//           >
//             {permissionStatus}
//           </Text>

//           <Button
//             title="🔁 Re-check Bluetooth Permission"
//             color="#4F46E5"
//             onPress={requestBluetoothPermission}
//           />

//           {granted ? (
//             <Text style={styles.successNote}>
//               🎉 You're ready to connect your Bluetooth printer!
//             </Text>
//           ) : (
//             <Text style={styles.warningNote}>
//               ⚠️ Please allow permissions from Settings if denied.
//             </Text>
//           )}
//         </>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#F9FAFB",
//     padding: 20,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "bold",
//     marginBottom: 30,
//     color: "#111827",
//   },
//   statusText: {
//     fontSize: 18,
//     marginBottom: 20,
//   },
//   statusGranted: {
//     color: "green",
//     fontWeight: "600",
//   },
//   statusDenied: {
//     color: "red",
//     fontWeight: "600",
//   },
//   successNote: {
//     marginTop: 15,
//     color: "green",
//     fontWeight: "500",
//   },
//   warningNote: {
//     marginTop: 15,
//     color: "orange",
//     fontWeight: "500",
//     textAlign: "center",
//   },
// });





//';lkjihygtfresrdrtyuiop[poiugtfdgfgjhj]]



























// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   Button,
//   PermissionsAndroid,
//   Platform,
//   ToastAndroid,
//   ActivityIndicator,
//   StyleSheet,
// } from "react-native";

// export default function PrinterScreen() {
//   const [permissionStatus, setPermissionStatus] = useState("⏳ Checking...");
//   const [isLoading, setIsLoading] = useState(true);
//   const [granted, setGranted] = useState(false);
//   const [mockConnection, setMockConnection] = useState(null);

//   // Request Bluetooth permissions
//   const requestBluetoothPermission = async () => {
//     if (Platform.OS !== "android") {
//       setPermissionStatus("⚠️ iOS doesn't need manual Bluetooth permission");
//       setIsLoading(false);
//       return;
//     }

//     try {
//       setIsLoading(true);
//       const result = await PermissionsAndroid.requestMultiple([
//         PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
//         PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//       ]);

//       console.log("🔍 Bluetooth permissions result:", result);

//       const allGranted = Object.values(result).every(
//         (status) => status === PermissionsAndroid.RESULTS.GRANTED
//       );

//       if (allGranted) {
//         ToastAndroid.show("✅ Bluetooth permission granted", ToastAndroid.SHORT);
//         setPermissionStatus("✅ Granted");
//         setGranted(true);
//         // After permission granted, run mock test
//         mockBluetoothTest();
//       } else {
//         ToastAndroid.show("❌ Bluetooth permission denied", ToastAndroid.SHORT);
//         setPermissionStatus("❌ Denied");
//         setGranted(false);
//         setMockConnection(null);
//       }
//     } catch (error) {
//       console.error("⚠️ Permission error:", error);
//       setPermissionStatus("⚠️ Error requesting permission");
//       setGranted(false);
//       setMockConnection(null);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Mock Bluetooth test function
//   const mockBluetoothTest = async () => {
//     try {
//       // Simulate connection delay
//       setMockConnection("⏳ Testing...");
//       await new Promise((res) => setTimeout(res, 1000));

//       // Simulate success
//       const isConnected = true; 
//       console.log("Bluetooth mock test: ", isConnected ? "SUCCESS" : "FAIL");

//       setMockConnection(isConnected ? "✅ Mock connection SUCCESS" : "❌ Mock connection FAIL");
//     } catch (e) {
//       console.log("Bluetooth mock test failed:", e);
//       setMockConnection("❌ Mock connection FAIL");
//     }
//   };

//   useEffect(() => {
//     requestBluetoothPermission();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>🖨️ Bluetooth Printer Permission</Text>

//       {isLoading ? (
//         <View style={{ alignItems: "center" }}>
//           <ActivityIndicator size="large" color="#4F46E5" />
//           <Text style={styles.statusText}>Checking permission...</Text>
//         </View>
//       ) : (
//         <>
//           <Text
//             style={[
//               styles.statusText,
//               granted ? styles.statusGranted : styles.statusDenied,
//             ]}
//           >
//             {permissionStatus}
//           </Text>

//           <Button
//             title="🔁 Re-check Bluetooth Permission"
//             color="#4F46E5"
//             onPress={requestBluetoothPermission}
//           />

//           {granted && mockConnection && (
//             <Text
//               style={[
//                 styles.statusText,
//                 mockConnection.includes("SUCCESS") ? styles.statusGranted : styles.statusDenied,
//               ]}
//             >
//               {mockConnection}
//             </Text>
//           )}

//           {granted ? (
//             <Text style={styles.successNote}>
//               🎉 You're ready to connect your Bluetooth printer!
//             </Text>
//           ) : (
//             <Text style={styles.warningNote}>
//               ⚠️ Please allow permissions from Settings if denied.
//             </Text>
//           )}
//         </>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#F9FAFB",
//     padding: 20,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "bold",
//     marginBottom: 30,
//     color: "#111827",
//   },
//   statusText: {
//     fontSize: 18,
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   statusGranted: {
//     color: "green",
//     fontWeight: "600",
//   },
//   statusDenied: {
//     color: "red",
//     fontWeight: "600",
//   },
//   successNote: {
//     marginTop: 15,
//     color: "green",
//     fontWeight: "500",
//   },
//   warningNote: {
//     marginTop: 15,
//     color: "orange",
//     fontWeight: "500",
//     textAlign: "center",
//   },
// });










// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   Button,
//   PermissionsAndroid,
//   Platform,
//   ToastAndroid,
//   ActivityIndicator,
//   StyleSheet,
//   ScrollView,
// } from "react-native";

// export default function PrinterScreen() {
//   const [permissionStatus, setPermissionStatus] = useState("⏳ Checking...");
//   const [isLoading, setIsLoading] = useState(true);
//   const [granted, setGranted] = useState(false);
//   const [logs, setLogs] = useState([]); // Store logs

//   // Helper to add log
//   const addLog = (message) => {
//     console.log(message);
//     setLogs((prev) => [...prev, `• ${message}`]);
//   };

//   // Request Bluetooth & location permissions
//   const requestBluetoothPermission = async () => {
//     if (Platform.OS !== "android") {
//       addLog("⚠️ iOS doesn't need manual Bluetooth permission");
//       setPermissionStatus("⚠️ iOS doesn't need manual Bluetooth permission");
//       setIsLoading(false);
//       return;
//     }

//     try {
//       setIsLoading(true);
//       addLog("Requesting Bluetooth permissions...");

//       const result = await PermissionsAndroid.requestMultiple([
//         PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
//         PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
//         PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADVERTISE, // Android 12+
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//         PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION, // scanning in background
//       ]);

//       addLog(`Permissions result: ${JSON.stringify(result)}`);

//       const allGranted = Object.values(result).every(
//         (status) => status === PermissionsAndroid.RESULTS.GRANTED
//       );

//       if (allGranted) {
//         addLog("✅ All required permissions granted");
//         ToastAndroid.show("✅ Bluetooth permission granted", ToastAndroid.SHORT);
//         setPermissionStatus("✅ Granted");
//         setGranted(true);
//       } else {
//         addLog("❌ Some permissions denied");
//         ToastAndroid.show("❌ Bluetooth permission denied", ToastAndroid.SHORT);
//         setPermissionStatus("❌ Denied");
//         setGranted(false);
//       }
//     } catch (error) {
//       addLog(`⚠️ Permission request error: ${error}`);
//       setPermissionStatus("⚠️ Error requesting permission");
//       setGranted(false);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Mock scan function to simulate printer detection
//   const scanForPrinters = async () => {
//     if (!granted) {
//       addLog("⚠️ Cannot scan, permissions not granted");
//       return;
//     }

//     try {
//       addLog("🔍 Starting mock scan for printers...");
//       setIsLoading(true);
//       await new Promise((res) => setTimeout(res, 1500)); // simulate delay
//       addLog("📡 Mock printer found: 'Printer_001'");
//     } catch (error) {
//       addLog(`❌ Scan failed: ${error}`);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     requestBluetoothPermission();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>🖨️ Bluetooth Printer Permission & Debug</Text>

//       {isLoading && (
//         <View style={{ alignItems: "center", marginBottom: 15 }}>
//           <ActivityIndicator size="large" color="#4F46E5" />
//           <Text style={styles.statusText}>Processing...</Text>
//         </View>
//       )}

//       <Button
//         title="🔁 Re-check Bluetooth Permission"
//         color="#4F46E5"
//         onPress={requestBluetoothPermission}
//       />

//       <Button
//         title="📡 Scan for Printers"
//         color="#10B981"
//         onPress={scanForPrinters}
//         disabled={!granted}
//       />

//       <Text
//         style={[
//           styles.statusText,
//           granted ? styles.statusGranted : styles.statusDenied,
//         ]}
//       >
//         {permissionStatus}
//       </Text>

//       {granted && (
//         <Text style={styles.successNote}>
//           🎉 You're ready to scan & connect your Bluetooth printer!
//         </Text>
//       )}

//       {!granted && (
//         <Text style={styles.warningNote}>
//           ⚠️ Please allow permissions from Settings if denied.
//         </Text>
//       )}

//       <Text style={styles.logTitle}>📝 Debug Logs:</Text>
//       <ScrollView style={styles.logContainer}>
//         {logs.map((log, index) => (
//           <Text key={index} style={styles.logText}>
//             {log}
//           </Text>
//         ))}
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#F9FAFB",
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "bold",
//     marginBottom: 20,
//     color: "#111827",
//     textAlign: "center",
//   },
//   statusText: {
//     fontSize: 16,
//     marginVertical: 8,
//     textAlign: "center",
//   },
//   statusGranted: { color: "green", fontWeight: "600" },
//   statusDenied: { color: "red", fontWeight: "600" },
//   successNote: { color: "green", fontWeight: "500", marginBottom: 10, textAlign: "center" },
//   warningNote: { color: "orange", fontWeight: "500", marginBottom: 10, textAlign: "center" },
//   logTitle: { fontSize: 16, fontWeight: "bold", marginTop: 20 },
//   logContainer: { maxHeight: 200, marginTop: 5, backgroundColor: "#E5E7EB", padding: 10, borderRadius: 8 },
//   logText: { fontSize: 14, fontFamily: "monospace", marginBottom: 4 },
// });



// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   Button,
//   PermissionsAndroid,
//   Platform,
//   ToastAndroid,
//   ActivityIndicator,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
// } from "react-native";
// import { BluetoothManager, BluetoothEscposPrinter } from "react-native-bluetooth-escpos-printer";

// export default function PrinterScreen() {
//   const [logs, setLogs] = useState<string[]>([]);
//   const [devices, setDevices] = useState<any[]>([]);
//   const [connectedDevice, setConnectedDevice] = useState<any>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [granted, setGranted] = useState(false);

//   const addLog = (msg: string) => setLogs((prev) => [...prev, `• ${msg}`]);

//   const requestPermissions = async () => {
//     if (Platform.OS !== "android") return true;

//     try {
//       addLog("Requesting Bluetooth & Location permissions...");
//       const result = await PermissionsAndroid.requestMultiple([
//         PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
//         PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
//         PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADVERTISE,
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//         PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
//       ]);
//       addLog("Permissions result: " + JSON.stringify(result));

//       const allGranted = Object.values(result).every(
//         (status) => status === PermissionsAndroid.RESULTS.GRANTED
//       );

//       if (!allGranted) {
//         addLog("❌ Some permissions denied");
//         ToastAndroid.show("❌ Permissions denied", ToastAndroid.SHORT);
//       } else {
//         addLog("✅ All required permissions granted");
//         setGranted(true);
//       }
//       return allGranted;
//     } catch (e) {
//       addLog("⚠️ Permission request error: " + e);
//       return false;
//     }
//   };

//   const scanDevices = async () => {
//     const hasPermission = await requestPermissions();
//     if (!hasPermission) return;

//     try {
//       addLog("🔍 Scanning for nearby printers...");
//       setIsLoading(true);

//       const paired = await BluetoothManager.list(); // paired devices
//       addLog("Paired devices: " + JSON.stringify(paired));

//       const unpairedRes = await BluetoothManager.scanDevices(); // returns {found: [], paired: []}
//       addLog("Scan result: " + JSON.stringify(unpairedRes));

//       const allDevices = [...paired, ...unpairedRes.found];
//       setDevices(allDevices);
//       addLog(`📡 Total devices found: ${allDevices.length}`);
//     } catch (e) {
//       addLog("❌ Scan failed: " + e);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const connectDevice = async (device: any) => {
//     try {
//       addLog("🔗 Connecting to " + (device.name || device.address));
//       await BluetoothManager.connect(device.address);
//       setConnectedDevice(device);
//       ToastAndroid.show(`✅ Connected to ${device.name || device.address}`, ToastAndroid.SHORT);
//       addLog("✅ Connected successfully");
//     } catch (e) {
//       addLog("❌ Connection failed: " + e);
//       setConnectedDevice(null);
//     }
//   };

//   const printSample = async () => {
//     if (!connectedDevice) {
//       ToastAndroid.show("⚠️ Connect to a printer first", ToastAndroid.SHORT);
//       return;
//     }

//     try {
//       addLog("🖨️ Printing sample bill...");
//       await BluetoothEscposPrinter.printText("🎉 Kravy Billing App\n\n", {});
//       await BluetoothEscposPrinter.printText("Item 1    100\nItem 2    200\nTotal: 300\n\n\n", {});
//       addLog("✅ Print command sent");
//     } catch (e) {
//       addLog("❌ Print failed: " + e);
//     }
//   };

//   useEffect(() => {
//     requestPermissions();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>🖨️ Bluetooth Printer & Debug</Text>

//       <Button title="🔁 Re-check Permissions" onPress={requestPermissions} color="#4F46E5" />
//       <Button title="📡 Scan Nearby Printers" onPress={scanDevices} color="#10B981" disabled={!granted} />
//       <Button title="🖨️ Print Sample Bill" onPress={printSample} color="#F59E0B" disabled={!connectedDevice} />

//       {isLoading && <ActivityIndicator size="large" color="#4F46E5" style={{ marginVertical: 10 }} />}

//       <Text style={styles.statusText}>
//         {granted ? "✅ Permissions granted" : "❌ Permissions not granted"}
//       </Text>

//       <Text style={styles.subTitle}>Available Devices:</Text>
//       <ScrollView style={styles.devicesList}>
//         {devices.map((d, i) => (
//           <TouchableOpacity key={i} style={styles.deviceButton} onPress={() => connectDevice(d)}>
//             <Text>{d.name || d.address}</Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>

//       <Text style={styles.subTitle}>📝 Logs:</Text>
//       <ScrollView style={styles.logContainer}>
//         {logs.map((log, i) => (
//           <Text key={i} style={styles.logText}>
//             {log}
//           </Text>
//         ))}
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: "#F9FAFB" },
//   title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
//   statusText: { fontSize: 16, textAlign: "center", marginVertical: 5 },
//   subTitle: { fontSize: 16, fontWeight: "bold", marginTop: 15 },
//   devicesList: { maxHeight: 150, marginVertical: 5 },
//   deviceButton: { padding: 10, marginVertical: 3, backgroundColor: "#E5E7EB", borderRadius: 5 },
//   logContainer: { flex: 1, backgroundColor: "#E5E7EB", padding: 10, borderRadius: 8, marginTop: 10 },
//   logText: { fontSize: 14, fontFamily: "monospace", marginBottom: 3 },
// });










// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   Button,
//   PermissionsAndroid,
//   Platform,
//   ToastAndroid,
//   ActivityIndicator,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
// } from "react-native";
// import { BluetoothManager, BluetoothEscposPrinter } from "react-native-bluetooth-escpos-printer";

// export default function PrinterScreen() {
//   const [logs, setLogs] = useState<string[]>([]);
//   const [devices, setDevices] = useState<any[]>([]);
//   const [connectedDevice, setConnectedDevice] = useState<any>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [granted, setGranted] = useState(false);

//   const addLog = (msg: string) => {
//     console.log(msg);
//     setLogs((prev) => [...prev, `• ${msg}`]);
//   };

//   const requestPermissions = async () => {
//     if (Platform.OS !== "android") return true;

//     try {
//       addLog("Requesting Bluetooth & Location permissions...");
//       const result = await PermissionsAndroid.requestMultiple([
//         PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
//         PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
//         PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADVERTISE,
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//         PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
//       ]);
//       addLog("Permissions result: " + JSON.stringify(result));

//       const allGranted = Object.values(result).every(
//         (status) => status === PermissionsAndroid.RESULTS.GRANTED
//       );

//       if (!allGranted) {
//         addLog("❌ Some permissions denied");
//         ToastAndroid.show("❌ Permissions denied", ToastAndroid.SHORT);
//         setGranted(false);
//       } else {
//         addLog("✅ All required permissions granted");
//         setGranted(true);
//       }
//       return allGranted;
//     } catch (e) {
//       addLog("⚠️ Permission request error: " + e);
//       return false;
//     }
//   };

//   const scanDevices = async () => {
//     const hasPermission = await requestPermissions();
//     if (!hasPermission) {
//       addLog("❌ Cannot scan, permissions not granted");
//       return;
//     }

//     try {
//       addLog("🔍 Starting scan for printers...");
//       setIsLoading(true);

//       addLog("📌 Fetching paired devices...");
//       const paired = await BluetoothManager.getPairedDevices();
//       addLog("Paired devices: " + JSON.stringify(paired));

//       addLog("📌 Scanning for nearby devices...");
//       const scanRes = await BluetoothManager.scanDevices();
//       addLog("Scan result: " + JSON.stringify(scanRes));

//       const found = scanRes.found || [];
//       const allDevices = [...paired, ...found];
//       setDevices(allDevices);
//       addLog(`📡 Total devices found: ${allDevices.length}`);
//       addLog(`✅ Devices: ${allDevices.map((d) => d.name || d.address).join(", ")}`);
//     } catch (e) {
//       addLog("❌ Scan failed: " + e);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const connectDevice = async (device: any) => {
//     try {
//       addLog("🔗 Connecting to device: " + (device.name || device.address));
//       setIsLoading(true);

//       await BluetoothManager.connect(device.address);
//       setConnectedDevice(device);
//       addLog("✅ Connected successfully to: " + (device.name || device.address));
//       ToastAndroid.show(`✅ Connected to ${device.name || device.address}`, ToastAndroid.SHORT);
//     } catch (e) {
//       addLog("❌ Connection failed: " + e);
//       setConnectedDevice(null);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const printSample = async () => {
//     if (!connectedDevice) {
//       addLog("⚠️ Connect to a printer first");
//       ToastAndroid.show("⚠️ Connect to a printer first", ToastAndroid.SHORT);
//       return;
//     }

//     try {
//       addLog("🖨️ Sending print command...");
//       setIsLoading(true);

//       await BluetoothEscposPrinter.printText("🎉 Kravy Billing App\n\n", {});
//       await BluetoothEscposPrinter.printText("Item 1    100\nItem 2    200\nTotal: 300\n\n\n", {});
//       addLog("✅ Print command sent successfully");
//     } catch (e) {
//       addLog("❌ Print failed: " + e);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     requestPermissions();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>🖨️ Bluetooth Printer Debug</Text>

//       <Button title="🔁 Re-check Permissions" onPress={requestPermissions} color="#4F46E5" />
//       <Button title="📡 Scan Nearby Printers" onPress={scanDevices} color="#10B981" disabled={!granted} />
//       <Button title="🖨️ Print Sample Bill" onPress={printSample} color="#F59E0B" disabled={!connectedDevice} />

//       {isLoading && <ActivityIndicator size="large" color="#4F46E5" style={{ marginVertical: 10 }} />}

//       <Text style={styles.statusText}>{granted ? "✅ Permissions granted" : "❌ Permissions not granted"}</Text>

//       <Text style={styles.subTitle}>Available Devices:</Text>
//       <ScrollView style={styles.devicesList}>
//         {devices.map((d, i) => (
//           <TouchableOpacity key={i} style={styles.deviceButton} onPress={() => connectDevice(d)}>
//             <Text>{d.name || d.address}</Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>

//       <Text style={styles.subTitle}>📝 Debug Logs:</Text>
//       <ScrollView style={styles.logContainer}>
//         {logs.map((log, i) => (
//           <Text key={i} style={styles.logText}>{log}</Text>
//         ))}
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: "#F9FAFB" },
//   title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
//   statusText: { fontSize: 16, textAlign: "center", marginVertical: 5 },
//   subTitle: { fontSize: 16, fontWeight: "bold", marginTop: 15 },
//   devicesList: { maxHeight: 150, marginVertical: 5 },
//   deviceButton: { padding: 10, marginVertical: 3, backgroundColor: "#E5E7EB", borderRadius: 5 },
//   logContainer: { flex: 1, backgroundColor: "#E5E7EB", padding: 10, borderRadius: 8, marginTop: 10 },
//   logText: { fontSize: 14, fontFamily: "monospace", marginBottom: 3 },
// });








// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   Button,
//   PermissionsAndroid,
//   Platform,
//   ToastAndroid,
//   ActivityIndicator,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
// } from "react-native";

// // Use react-native-bluetooth-classic for scanning & connecting
// import RNBluetoothClassic from "react-native-bluetooth-classic";
// import { BluetoothEscposPrinter } from "react-native-bluetooth-escpos-printer";

// export default function PrinterScreen() {
//   const [logs, setLogs] = useState<string[]>([]);
//   const [devices, setDevices] = useState<any[]>([]);
//   const [connectedDevice, setConnectedDevice] = useState<any>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [granted, setGranted] = useState(false);

//   const addLog = (msg: string) => {
//     console.log(msg);
//     setLogs((prev) => [...prev, `• ${msg}`]);
//   };

//   // Request permissions
//   const requestPermissions = async () => {
//     if (Platform.OS !== "android") return true;

//     try {
//       addLog("Requesting Bluetooth & Location permissions...");
//       const result = await PermissionsAndroid.requestMultiple([
//         PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
//         PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
//         PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADVERTISE,
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//       ]);

//       addLog("Permissions result: " + JSON.stringify(result));
//       const allGranted = Object.values(result).every(
//         (status) => status === PermissionsAndroid.RESULTS.GRANTED
//       );

//       if (!allGranted) {
//         addLog("❌ Some permissions denied");
//         ToastAndroid.show("❌ Permissions denied", ToastAndroid.SHORT);
//         setGranted(false);
//       } else {
//         addLog("✅ All required permissions granted");
//         setGranted(true);
//       }

//       return allGranted;
//     } catch (e) {
//       addLog("⚠️ Permission request error: " + e);
//       return false;
//     }
//   };

//   // Scan for printers (Option 1)
//   const scanDevices = async () => {
//     const hasPermission = await requestPermissions();
//     if (!hasPermission) {
//       addLog("❌ Cannot scan, permissions not granted");
//       return;
//     }

//     try {
//       addLog("🔍 Scanning for nearby printers...");
//       setIsLoading(true);

//       // Get paired devices first
//       const paired = await RNBluetoothClassic.getBondedDevices();
//       addLog(`📌 Paired devices: ${JSON.stringify(paired)}`);

//       // Discover new devices
//       const found = await RNBluetoothClassic.startDiscovery();
//       addLog(`📌 Newly found devices: ${JSON.stringify(found)}`);

//       const allDevices = [...paired, ...found];
//       setDevices(allDevices);
//       addLog(`📡 Total devices found: ${allDevices.length}`);
//       addLog(`✅ Devices: ${allDevices.map((d) => d.name || d.address).join(", ")}`);
//     } catch (e) {
//       addLog("❌ Scan failed: " + e);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Connect to a selected device
//   const connectDevice = async (device: any) => {
//     try {
//       addLog("🔗 Connecting to device: " + (device.name || device.address));
//       setIsLoading(true);

//       await RNBluetoothClassic.connect(device.address);
//       setConnectedDevice(device);
//       addLog("✅ Connected successfully to: " + (device.name || device.address));
//       ToastAndroid.show(`✅ Connected to ${device.name || device.address}`, ToastAndroid.SHORT);
//     } catch (e) {
//       addLog("❌ Connection failed: " + e);
//       setConnectedDevice(null);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Print sample bill
//   const printSample = async () => {
//     if (!connectedDevice) {
//       addLog("⚠️ Connect to a printer first");
//       ToastAndroid.show("⚠️ Connect to a printer first", ToastAndroid.SHORT);
//       return;
//     }

//     try {
//       addLog("🖨️ Sending print command...");
//       setIsLoading(true);

//       await BluetoothEscposPrinter.printText("🎉 Kravy Billing App\n\n", {});
//       await BluetoothEscposPrinter.printText(
//         "Item 1    100\nItem 2    200\nTotal: 300\n\n\n",
//         {}
//       );
//       addLog("✅ Print command sent successfully");
//     } catch (e) {
//       addLog("❌ Print failed: " + e);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     requestPermissions();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>🖨️ Bluetooth Printer Debug</Text>

//       <Button
//         title="🔁 Re-check Permissions"
//         onPress={requestPermissions}
//         color="#4F46E5"
//       />
//       <Button
//         title="📡 Scan Nearby Printers"
//         onPress={scanDevices}
//         color="#10B981"
//         disabled={!granted}
//       />
//       <Button
//         title="🖨️ Print Sample Bill"
//         onPress={printSample}
//         color="#F59E0B"
//         disabled={!connectedDevice}
//       />

//       {isLoading && (
//         <ActivityIndicator size="large" color="#4F46E5" style={{ marginVertical: 10 }} />
//       )}

//       <Text style={styles.statusText}>
//         {granted ? "✅ Permissions granted" : "❌ Permissions not granted"}
//       </Text>

//       <Text style={styles.subTitle}>Available Devices:</Text>
//       <ScrollView style={styles.devicesList}>
//         {devices.map((d, i) => (
//           <TouchableOpacity
//             key={i}
//             style={styles.deviceButton}
//             onPress={() => connectDevice(d)}
//           >
//             <Text style={{ fontWeight: connectedDevice?.address === d.address ? "bold" : "normal" }}>
//               {d.name || d.address}
//               {connectedDevice?.address === d.address && " (Connected)"}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>

//       <Text style={styles.subTitle}>📝 Debug Logs:</Text>
//       <ScrollView style={styles.logContainer}>
//         {logs.map((log, i) => (
//           <Text key={i} style={styles.logText}>
//             {log}
//           </Text>
//         ))}
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: "#F9FAFB" },
//   title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
//   statusText: { fontSize: 16, textAlign: "center", marginVertical: 5 },
//   subTitle: { fontSize: 16, fontWeight: "bold", marginTop: 15 },
//   devicesList: { maxHeight: 150, marginVertical: 5 },
//   deviceButton: { padding: 10, marginVertical: 3, backgroundColor: "#E5E7EB", borderRadius: 5 },
//   logContainer: { flex: 1, backgroundColor: "#E5E7EB", padding: 10, borderRadius: 8, marginTop: 10 },
//   logText: { fontSize: 14, fontFamily: "monospace", marginBottom: 3 },
// });












// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   Button,
//   PermissionsAndroid,
//   Platform,
//   ToastAndroid,
//   ActivityIndicator,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
// } from "react-native";

// import RNBluetoothClassic from "react-native-bluetooth-classic";
// import { BluetoothEscposPrinter } from "react-native-bluetooth-escpos-printer";

// export default function PrinterScreen() {
//   const [logs, setLogs] = useState<string[]>([]);
//   const [devices, setDevices] = useState<any[]>([]);
//   const [connectedDevice, setConnectedDevice] = useState<any>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [granted, setGranted] = useState(false);

//   const addLog = (msg: string) => {
//     console.log(msg);
//     setLogs((prev) => [...prev, `• ${msg}`]);
//   };

//   // 🟢 Request Bluetooth permissions
//   const requestPermissions = async () => {
//     if (Platform.OS !== "android") return true;

//     try {
//       addLog("Requesting Bluetooth & Location permissions...");
//       const result = await PermissionsAndroid.requestMultiple([
//         PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
//         PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
//         PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADVERTISE,
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//       ]);

//       addLog("Permissions result: " + JSON.stringify(result));
//       const allGranted = Object.values(result).every(
//         (status) => status === PermissionsAndroid.RESULTS.GRANTED
//       );

//       if (!allGranted) {
//         addLog("❌ Some permissions denied");
//         ToastAndroid.show("❌ Permissions denied", ToastAndroid.SHORT);
//         setGranted(false);
//       } else {
//         addLog("✅ All required permissions granted");
//         setGranted(true);
//       }

//       return allGranted;
//     } catch (e) {
//       addLog("⚠️ Permission request error: " + e);
//       return false;
//     }
//   };

//   // 🟡 Scan for paired + nearby Bluetooth devices
//   const scanDevices = async () => {
//     const hasPermission = await requestPermissions();
//     if (!hasPermission) {
//       addLog("❌ Cannot scan, permissions not granted");
//       return;
//     }

//     try {
//       addLog("🔍 Scanning for nearby printers...");
//       setIsLoading(true);

//       const paired = await RNBluetoothClassic.getBondedDevices();
//       addLog(`📌 Paired devices: ${JSON.stringify(paired.map(d => d.name))}`);

//       const found = await RNBluetoothClassic.startDiscovery();
//       addLog(`📡 Newly found devices: ${JSON.stringify(found.map(d => d.name))}`);

//       const allDevices = [...paired, ...found];
//       setDevices(allDevices);
//       addLog(`✅ Total devices found: ${allDevices.length}`);
//     } catch (e) {
//       addLog("❌ Scan failed: " + e);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // 🟠 Connect to a device
//   const connectDevice = async (device: any) => {
//     try {
//       addLog(`🔗 Connecting to device: ${device.name || device.address}`);
//       setIsLoading(true);

//       // ✅ Correct method name
//       const connection = await RNBluetoothClassic.connectToDevice(device.address);
//       if (connection) {
//         setConnectedDevice(device);
//         addLog(`✅ Connected successfully to: ${device.name || device.address}`);
//         ToastAndroid.show(
//           `✅ Connected to ${device.name || device.address}`,
//           ToastAndroid.SHORT
//         );
//       } else {
//         addLog("❌ Connection returned null");
//       }
//     } catch (e) {
//       addLog("❌ Connection failed: " + e);
//       setConnectedDevice(null);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // 🖨️ Print sample bill
//   const printSample = async () => {
//     if (!connectedDevice) {
//       addLog("⚠️ Connect to a printer first");
//       ToastAndroid.show("⚠️ Connect to a printer first", ToastAndroid.SHORT);
//       return;
//     }

//     try {
//       addLog("🖨️ Sending print command...");
//       setIsLoading(true);

//       await BluetoothEscposPrinter.printText("🎉 Kravy Billing App\n\n", {
//         encoding: "GBK",
//         codepage: 0,
//       });
//       await BluetoothEscposPrinter.printText(
//         "Item 1    100\nItem 2    200\nTotal: 300\n\n\n",
//         { encoding: "GBK" }
//       );

//       addLog("✅ Print command sent successfully");
//     } catch (e) {
//       addLog("❌ Print failed: " + e);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     requestPermissions();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>🖨️ Bluetooth Printer Debug</Text>

//       <Button
//         title="🔁 Re-check Permissions"
//         onPress={requestPermissions}
//         color="#4F46E5"
//       />
//       <Button
//         title="📡 Scan Nearby Printers"
//         onPress={scanDevices}
//         color="#10B981"
//         disabled={!granted}
//       />
//       <Button
//         title="🖨️ Print Sample Bill"
//         onPress={printSample}
//         color="#F59E0B"
//         disabled={!connectedDevice}
//       />

//       {isLoading && (
//         <ActivityIndicator size="large" color="#4F46E5" style={{ marginVertical: 10 }} />
//       )}

//       <Text style={styles.statusText}>
//         {granted ? "✅ Permissions granted" : "❌ Permissions not granted"}
//       </Text>

//       <Text style={styles.subTitle}>Available Devices:</Text>
//       <ScrollView style={styles.devicesList}>
//         {devices.map((d, i) => (
//           <TouchableOpacity
//             key={i}
//             style={styles.deviceButton}
//             onPress={() => connectDevice(d)}
//           >
//             <Text
//               style={{
//                 fontWeight: connectedDevice?.address === d.address ? "bold" : "normal",
//               }}
//             >
//               {d.name || d.address}
//               {connectedDevice?.address === d.address && " (Connected)"}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>

//       <Text style={styles.subTitle}>📝 Debug Logs:</Text>
//       <ScrollView style={styles.logContainer}>
//         {logs.map((log, i) => (
//           <Text key={i} style={styles.logText}>
//             {log}
//           </Text>
//         ))}
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: "#F9FAFB" },
//   title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
//   statusText: { fontSize: 16, textAlign: "center", marginVertical: 5 },
//   subTitle: { fontSize: 16, fontWeight: "bold", marginTop: 15 },
//   devicesList: { maxHeight: 150, marginVertical: 5 },
//   deviceButton: {
//     padding: 10,
//     marginVertical: 3,
//     backgroundColor: "#E5E7EB",
//     borderRadius: 5,
//   },
//   logContainer: {
//     flex: 1,
//     backgroundColor: "#E5E7EB",
//     padding: 10,
//     borderRadius: 8,
//     marginTop: 10,
//   },
//   logText: { fontSize: 14, fontFamily: "monospace", marginBottom: 3 },
// });



















//corect connect kijygdtreswasrdtyhjiop'['pljkjggdfsfghjkl;'lkdsgvnm,./
















// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   Button,
//   PermissionsAndroid,
//   Platform,
//   ToastAndroid,
//   ActivityIndicator,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
// } from "react-native";

// import RNBluetoothClassic from "react-native-bluetooth-classic";
// import { BluetoothManager } from "react-native-bluetooth-escpos-printer";

// export default function PrinterScreen() {
//   const [logs, setLogs] = useState<string[]>([]);
//   const [devices, setDevices] = useState<any[]>([]);
//   const [connectedDevice, setConnectedDevice] = useState<any>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [granted, setGranted] = useState(false);

//   const addLog = (msg: string) => {
//     console.log(msg);
//     setLogs((prev) => [...prev, `• ${msg}`]);
//   };

//   // 🟢 Request permissions
//   const requestPermissions = async () => {
//     if (Platform.OS !== "android") return true;
//     try {
//       addLog("Requesting Bluetooth & Location permissions...");
//       const result = await PermissionsAndroid.requestMultiple([
//         PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
//         PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
//         PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADVERTISE,
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//       ]);
//       const allGranted = Object.values(result).every(
//         (status) => status === PermissionsAndroid.RESULTS.GRANTED
//       );
//       setGranted(allGranted);
//       addLog(allGranted ? "✅ All permissions granted" : "❌ Some permissions denied");
//       if (!allGranted) ToastAndroid.show("❌ Permissions denied", ToastAndroid.SHORT);
//       return allGranted;
//     } catch (e) {
//       addLog("⚠️ Permission error: " + e);
//       return false;
//     }
//   };

//   // 🟡 Scan for devices
//   const scanDevices = async () => {
//     const ok = await requestPermissions();
//     if (!ok) return;

//     try {
//       setIsLoading(true);
//       addLog("🔍 Scanning for nearby printers...");
//       const paired = await RNBluetoothClassic.getBondedDevices();
//       const discovered = await RNBluetoothClassic.startDiscovery();
//       const all = [...paired, ...discovered];
//       setDevices(all);
//       addLog(`✅ Total devices found: ${all.length}`);
//     } catch (e) {
//       addLog("❌ Scan failed: " + e);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // 🟠 Connect to printer using RNBluetoothClassic
//   const connectDevice = async (device: any) => {
//     try {
//       addLog(`🔗 Connecting to: ${device.name || device.address}`);
//       setIsLoading(true);

//       const connection = await RNBluetoothClassic.connectToDevice(device.address);
//       if (connection) {
//         setConnectedDevice(device);
//         addLog(`✅ Connected to ${device.name || device.address}`);
//         ToastAndroid.show(`✅ Connected to ${device.name || device.address}`, ToastAndroid.SHORT);
//       } else {
//         addLog("❌ Connection returned null");
//         ToastAndroid.show("❌ Connection failed", ToastAndroid.SHORT);
//       }
//     } catch (e) {
//       addLog("❌ Connection failed: " + e);
//       setConnectedDevice(null);
//       ToastAndroid.show("❌ Connection failed", ToastAndroid.SHORT);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // 🖨️ Print using raw ESC/POS commands
//   const printSample = async () => {
//     if (!connectedDevice) {
//       addLog("⚠️ Connect to a printer first");
//       ToastAndroid.show("⚠️ Connect to a printer first", ToastAndroid.SHORT);
//       return;
//     }

//     try {
//       setIsLoading(true);
//       addLog("🖨️ Sending raw print command...");

//       const ESC = "\x1B";
//       const CMD = [
//         `${ESC}@`, // initialize printer
//         `${ESC}a\x01`, // center align
//         "🎉 Kravy Billing App\n",
//         `${ESC}a\x00`, // left align
//         "-----------------------------\n",
//         "Item           Qty   Price\n",
//         "-----------------------------\n",
//         "Burger          2     100\n",
//         "Pizza           1     200\n",
//         "-----------------------------\n",
//         "Total                 300\n",
//         `${ESC}a\x01`,
//         "Thank You!\n\n\n",
//       ].join("");

//       await BluetoothManager.write(CMD);
//       addLog("✅ Print command sent successfully");
//       ToastAndroid.show("✅ Print success", ToastAndroid.SHORT);
//     } catch (e) {
//       addLog("❌ Print failed: " + e);
//       ToastAndroid.show("❌ Print failed", ToastAndroid.SHORT);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     requestPermissions();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>🖨️ MT580P Bluetooth Printer</Text>

//       <Button title="🔁 Re-check Permissions" onPress={requestPermissions} color="#4F46E5" />
//       <Button title="📡 Scan Printers" onPress={scanDevices} color="#10B981" disabled={!granted} />
//       <Button title="🖨️ Print Sample Bill" onPress={printSample} color="#F59E0B" disabled={!connectedDevice} />

//       {isLoading && <ActivityIndicator size="large" color="#4F46E5" style={{ marginVertical: 10 }} />}

//       <Text style={styles.statusText}>{granted ? "✅ Permissions granted" : "❌ Permissions not granted"}</Text>

//       <Text style={styles.subTitle}>Available Devices:</Text>
//       <ScrollView style={styles.devicesList}>
//         {devices.map((d, i) => (
//           <TouchableOpacity key={i} style={styles.deviceButton} onPress={() => connectDevice(d)}>
//             <Text style={{ fontWeight: connectedDevice?.address === d.address ? "bold" : "normal" }}>
//               {d.name || d.address}
//               {connectedDevice?.address === d.address && " (Connected)"}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>

//       <Text style={styles.subTitle}>📝 Debug Logs:</Text>
//       <ScrollView style={styles.logContainer}>
//         {logs.map((log, i) => (
//           <Text key={i} style={styles.logText}>{log}</Text>
//         ))}
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: "#F9FAFB" },
//   title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
//   statusText: { fontSize: 16, textAlign: "center", marginVertical: 5 },
//   subTitle: { fontSize: 16, fontWeight: "bold", marginTop: 15 },
//   devicesList: { maxHeight: 150, marginVertical: 5 },
//   deviceButton: { padding: 10, marginVertical: 3, backgroundColor: "#E5E7EB", borderRadius: 5 },
//   logContainer: { flex: 1, backgroundColor: "#E5E7EB", padding: 10, borderRadius: 8, marginTop: 10 },
//   logText: { fontSize: 14, fontFamily: "monospace", marginBottom: 3 },
// });






// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   Button,
//   PermissionsAndroid,
//   Platform,
//   ToastAndroid,
//   ActivityIndicator,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
// } from "react-native";

// import RNBluetoothClassic from "react-native-bluetooth-classic";

// export default function PrinterScreen() {
//   const [logs, setLogs] = useState<string[]>([]);
//   const [devices, setDevices] = useState<any[]>([]);
//   const [connectedDevice, setConnectedDevice] = useState<any>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [granted, setGranted] = useState(false);

//   const addLog = (msg: string) => {
//     console.log(msg);
//     setLogs((prev) => [...prev, `• ${msg}`]);
//   };

//   // Permissions
//   const requestPermissions = async () => {
//     if (Platform.OS !== "android") return true;
//     try {
//       addLog("Requesting Bluetooth & Location permissions...");
//       const result = await PermissionsAndroid.requestMultiple([
//         PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
//         PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
//         PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADVERTISE,
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//       ]);
//       const allGranted = Object.values(result).every(
//         (status) => status === PermissionsAndroid.RESULTS.GRANTED
//       );
//       setGranted(allGranted);
//       addLog(allGranted ? "✅ All permissions granted" : "❌ Some permissions denied");
//       if (!allGranted) ToastAndroid.show("❌ Permissions denied", ToastAndroid.SHORT);
//       return allGranted;
//     } catch (e) {
//       addLog("⚠️ Permission error: " + e);
//       return false;
//     }
//   };

//   // Scan devices
//   const scanDevices = async () => {
//     const ok = await requestPermissions();
//     if (!ok) return;

//     try {
//       setIsLoading(true);
//       addLog("🔍 Scanning for nearby printers...");
//       const paired = await RNBluetoothClassic.getBondedDevices();
//       const discovered = await RNBluetoothClassic.startDiscovery();
//       const all = [...paired, ...discovered];
//       setDevices(all);
//       addLog(`✅ Total devices found: ${all.length}`);
//     } catch (e) {
//       addLog("❌ Scan failed: " + e);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Connect
//   const connectDevice = async (device: any) => {
//     try {
//       addLog(`🔗 Connecting to: ${device.name || device.address}`);
//       setIsLoading(true);
//       const connection = await RNBluetoothClassic.connectToDevice(device.address);
//       if (connection) {
//         setConnectedDevice(device);
//         addLog(`✅ Connected to ${device.name || device.address}`);
//         ToastAndroid.show(`✅ Connected to ${device.name || device.address}`, ToastAndroid.SHORT);
//       } else {
//         addLog("❌ Connection returned null");
//       }
//     } catch (e) {
//       addLog("❌ Connection failed: " + e);
//       setConnectedDevice(null);
//       ToastAndroid.show("❌ Connection failed", ToastAndroid.SHORT);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Print using RNBluetoothClassic.write()
//   const printSample = async () => {
//     if (!connectedDevice) {
//       addLog("⚠️ Connect to a printer first");
//       ToastAndroid.show("⚠️ Connect to a printer first", ToastAndroid.SHORT);
//       return;
//     }

//     try {
//       setIsLoading(true);
//       addLog("🖨️ Sending print command...");

//       const text = `
// 🎉 Kravy Billing App

// -----------------------------
// Item           Qty   Price
// -----------------------------
// Burger          2     100
// Pizza           1     200
// -----------------------------
// Total                 300

// Thank You!\n\n\n`;

//       await RNBluetoothClassic.write(text);
//       addLog("✅ Print command sent successfully");
//       ToastAndroid.show("✅ Print success", ToastAndroid.SHORT);
//     } catch (e) {
//       addLog("❌ Print failed: " + e);
//       ToastAndroid.show("❌ Print failed", ToastAndroid.SHORT);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     requestPermissions();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>🖨️ MT580P Bluetooth Printer</Text>

//       <Button title="🔁 Re-check Permissions" onPress={requestPermissions} color="#4F46E5" />
//       <Button title="📡 Scan Printers" onPress={scanDevices} color="#10B981" disabled={!granted} />
//       <Button title="🖨️ Print Sample Bill" onPress={printSample} color="#F59E0B" disabled={!connectedDevice} />

//       {isLoading && <ActivityIndicator size="large" color="#4F46E5" style={{ marginVertical: 10 }} />}

//       <Text style={styles.statusText}>{granted ? "✅ Permissions granted" : "❌ Permissions not granted"}</Text>

//       <Text style={styles.subTitle}>Available Devices:</Text>
//       <ScrollView style={styles.devicesList}>
//         {devices.map((d, i) => (
//           <TouchableOpacity key={i} style={styles.deviceButton} onPress={() => connectDevice(d)}>
//             <Text style={{ fontWeight: connectedDevice?.address === d.address ? "bold" : "normal" }}>
//               {d.name || d.address}
//               {connectedDevice?.address === d.address && " (Connected)"}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>

//       <Text style={styles.subTitle}>📝 Debug Logs:</Text>
//       <ScrollView style={styles.logContainer}>
//         {logs.map((log, i) => (
//           <Text key={i} style={styles.logText}>{log}</Text>
//         ))}
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: "#F9FAFB" },
//   title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
//   statusText: { fontSize: 16, textAlign: "center", marginVertical: 5 },
//   subTitle: { fontSize: 16, fontWeight: "bold", marginTop: 15 },
//   devicesList: { maxHeight: 150, marginVertical: 5 },
//   deviceButton: { padding: 10, marginVertical: 3, backgroundColor: "#E5E7EB", borderRadius: 5 },
//   logContainer: { flex: 1, backgroundColor: "#E5E7EB", padding: 10, borderRadius: 8, marginTop: 10 },
//   logText: { fontSize: 14, fontFamily: "monospace", marginBottom: 3 },
// });










// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   Button,
//   PermissionsAndroid,
//   Platform,
//   ToastAndroid,
//   ActivityIndicator,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
// } from "react-native";

// import RNBluetoothClassic from "react-native-bluetooth-classic";

// export default function PrinterScreen() {
//   const [logs, setLogs] = useState<string[]>([]);
//   const [devices, setDevices] = useState<any[]>([]);
//   const [connectedDevice, setConnectedDevice] = useState<any>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [granted, setGranted] = useState(false);

//   const addLog = (msg: string) => {
//     console.log(msg);
//     setLogs((prev) => [...prev, `• ${msg}`]);
//   };

//   // Request permissions
//   const requestPermissions = async () => {
//     if (Platform.OS !== "android") return true;

//     try {
//       addLog("Requesting Bluetooth & Location permissions...");
//       const result = await PermissionsAndroid.requestMultiple([
//         PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
//         PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
//         PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADVERTISE,
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//       ]);

//       const allGranted = Object.values(result).every(
//         (status) => status === PermissionsAndroid.RESULTS.GRANTED
//       );

//       setGranted(allGranted);
//       addLog(allGranted ? "✅ All permissions granted" : "❌ Some permissions denied");
//       if (!allGranted) ToastAndroid.show("❌ Permissions denied", ToastAndroid.SHORT);

//       return allGranted;
//     } catch (e) {
//       addLog("⚠️ Permission error: " + e);
//       return false;
//     }
//   };

//   // Ensure Bluetooth is ON
//   const ensureBluetoothEnabled = async () => {
//     try {
//       const enabled = await RNBluetoothClassic.isBluetoothEnabled();
//       if (!enabled) {
//         addLog("⚠️ Bluetooth is off, requesting enable...");
//         await RNBluetoothClassic.requestEnabled();
//       }
//     } catch (e) {
//       addLog("❌ Bluetooth enable failed: " + e);
//     }
//   };

//   // Scan for devices
//   const scanDevices = async () => {
//     const ok = await requestPermissions();
//     if (!ok) return;

//     await ensureBluetoothEnabled();

//     try {
//       setIsLoading(true);
//       addLog("🔍 Scanning for nearby printers...");

//       const paired = await RNBluetoothClassic.getBondedDevices();
//       const discovered = await RNBluetoothClassic.startDiscovery();
//       const all = [...paired, ...discovered];

//       setDevices(all);
//       addLog(`✅ Total devices found: ${all.length}`);
//     } catch (e) {
//       addLog("❌ Scan failed: " + e);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Connect to a device
//   const connectDevice = async (device: any) => {
//     try {
//       addLog(`🔗 Connecting to: ${device.name || device.address}`);
//       setIsLoading(true);

//       const connection = await RNBluetoothClassic.connectToDevice(device.address);
//       if (connection) {
//         setConnectedDevice(connection); // Save the connection object
//         addLog(`✅ Connected to ${device.name || device.address}`);
//         ToastAndroid.show(`✅ Connected to ${device.name || device.address}`, ToastAndroid.SHORT);
//       }
//     } catch (e) {
//       addLog("❌ Connection failed: " + e);
//       setConnectedDevice(null);
//       ToastAndroid.show("❌ Connection failed", ToastAndroid.SHORT);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Print sample bill
//   const printSample = async () => {
//     if (!connectedDevice) {
//       addLog("⚠️ Connect to a printer first");
//       ToastAndroid.show("⚠️ Connect to a printer first", ToastAndroid.SHORT);
//       return;
//     }

//     try {
//       setIsLoading(true);
//       addLog("🖨️ Sending print command...");

//       const text = `
// 🎉 Kravy Billing App

// -----------------------------
// Item       Qty   Price
// -----------------------------
// Burger      2     100
// Pizza       1     200
// -----------------------------
// Total             300

// Thank You!\n\n\n`;

//       await connectedDevice.write(text); // ✅ Correct write method
//       addLog("✅ Print command sent successfully");
//       ToastAndroid.show("✅ Print success", ToastAndroid.SHORT);
//     } catch (e) {
//       addLog("❌ Print failed: " + e);
//       ToastAndroid.show("❌ Print failed", ToastAndroid.SHORT);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     requestPermissions();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>🖨️ MT580P Bluetooth Printer</Text>

//       <Button title="🔁 Re-check Permissions" onPress={requestPermissions} color="#4F46E5" />
//       <Button title="📡 Scan Printers" onPress={scanDevices} color="#10B981" disabled={!granted} />
//       <Button title="🖨️ Print Sample Bill" onPress={printSample} color="#F59E0B" disabled={!connectedDevice} />

//       {isLoading && <ActivityIndicator size="large" color="#4F46E5" style={{ marginVertical: 10 }} />}

//       <Text style={styles.statusText}>{granted ? "✅ Permissions granted" : "❌ Permissions not granted"}</Text>

//       <Text style={styles.subTitle}>Available Devices:</Text>
//       <ScrollView style={styles.devicesList}>
//         {devices.map((d, i) => (
//           <TouchableOpacity key={i} style={styles.deviceButton} onPress={() => connectDevice(d)}>
//             <Text style={{ fontWeight: connectedDevice?.address === d.address ? "bold" : "normal" }}>
//               {d.name || d.address}
//               {connectedDevice?.address === d.address && " (Connected)"}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>

//       <Text style={styles.subTitle}>📝 Debug Logs:</Text>
//       <ScrollView style={styles.logContainer}>
//         {logs.map((log, i) => (
//           <Text key={i} style={styles.logText}>{log}</Text>
//         ))}
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: "#F9FAFB" },
//   title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
//   statusText: { fontSize: 16, textAlign: "center", marginVertical: 5 },
//   subTitle: { fontSize: 16, fontWeight: "bold", marginTop: 15 },
//   devicesList: { maxHeight: 150, marginVertical: 5 },
//   deviceButton: { padding: 10, marginVertical: 3, backgroundColor: "#E5E7EB", borderRadius: 5 },
//   logContainer: { flex: 1, backgroundColor: "#E5E7EB", padding: 10, borderRadius: 8, marginTop: 10 },
//   logText: { fontSize: 14, fontFamily: "monospace", marginBottom: 3 },
// });










import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import RNBluetoothClassic from "react-native-bluetooth-classic";

export default function PrinterScreen() {
  const [logs, setLogs] = useState<string[]>([]);
  const [devices, setDevices] = useState<any[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [granted, setGranted] = useState(false);

  const addLog = (msg: string) => {
    console.log(msg);
    setLogs((prev) => [...prev, `• ${msg}`]);
  };

  // Request Bluetooth & Location permissions
  const requestPermissions = async () => {
    if (Platform.OS !== "android") return true;
    try {
      addLog("Requesting Bluetooth & Location permissions...");
      const result = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADVERTISE,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ]);

      const allGranted = Object.values(result).every(
        (status) => status === PermissionsAndroid.RESULTS.GRANTED
      );
      setGranted(allGranted);
      addLog(allGranted ? "✅ All permissions granted" : "❌ Some permissions denied");
      if (!allGranted) ToastAndroid.show("❌ Permissions denied", ToastAndroid.SHORT);
      return allGranted;
    } catch (e) {
      addLog("⚠️ Permission error: " + e);
      return false;
    }
  };

  // Ensure Bluetooth is ON
  const ensureBluetoothEnabled = async () => {
    try {
      const enabled = await RNBluetoothClassic.isBluetoothEnabled();
      if (!enabled) {
        addLog("⚠️ Bluetooth is off, requesting enable...");
        await RNBluetoothClassic.requestEnabled();
      }
    } catch (e) {
      addLog("❌ Bluetooth enable failed: " + e);
    }
  };

  // Scan for paired + nearby devices
  const scanDevices = async () => {
    const ok = await requestPermissions();
    if (!ok) return;

    await ensureBluetoothEnabled();

    try {
      setIsLoading(true);
      addLog("🔍 Scanning for nearby printers...");

      const paired = await RNBluetoothClassic.getBondedDevices();
      const discovered = await RNBluetoothClassic.startDiscovery();
      const all = [...paired, ...discovered];

      setDevices(all);
      addLog(`✅ Total devices found: ${all.length}`);
    } catch (e) {
      addLog("❌ Scan failed: " + e);
    } finally {
      setIsLoading(false);
    }
  };

  // Connect to printer
  const connectDevice = async (device: any) => {
    try {
      addLog(`🔗 Connecting to: ${device.name || device.address}`);
      setIsLoading(true);

      const connection = await RNBluetoothClassic.connectToDevice(device.address);
      if (connection) {
        setConnectedDevice(connection);
        addLog(`✅ Connected to ${device.name || device.address}`);
        ToastAndroid.show(`✅ Connected to ${device.name || device.address}`, ToastAndroid.SHORT);
      }
    } catch (e) {
      addLog("❌ Connection failed: " + e);
      setConnectedDevice(null);
      ToastAndroid.show("❌ Connection failed", ToastAndroid.SHORT);
    } finally {
      setIsLoading(false);
    }
  };

  // Disconnect printer
  const disconnectDevice = async () => {
    if (!connectedDevice) return;
    try {
      await connectedDevice.disconnect();
      addLog("⚠️ Printer disconnected");
      setConnectedDevice(null);
      ToastAndroid.show("⚠️ Printer disconnected", ToastAndroid.SHORT);
    } catch (e) {
      addLog("❌ Disconnect failed: " + e);
    }
  };

  // Auto-reconnect (optional)
  const autoReconnect = async () => {
    if (!connectedDevice) return;
    try {
      const isConnected = await connectedDevice.isConnected();
      if (!isConnected) {
        addLog("⚠️ Printer disconnected, attempting reconnect...");
        await connectDevice(connectedDevice);
      }
    } catch (e) {
      addLog("❌ Auto-reconnect failed: " + e);
    }
  };

  // Print sample receipt
  const printSample = async () => {
    if (!connectedDevice) {
      addLog("⚠️ Connect to a printer first");
      ToastAndroid.show("⚠️ Connect to a printer first", ToastAndroid.SHORT);
      return;
    }

    try {
      setIsLoading(true);
      addLog("🖨️ Sending print command...");

      const text = `
🎉 Kravy Billing App

-----------------------------
Item       Qty   Price
-----------------------------
Burger      2     100
Pizza       1     200
-----------------------------
Total             300

Thank You!\n\n\n`;

      await connectedDevice.write(text);
      addLog("✅ Print command sent successfully");
      ToastAndroid.show("✅ Print success", ToastAndroid.SHORT);
    } catch (e) {
      addLog("❌ Print failed: " + e);
      ToastAndroid.show("❌ Print failed", ToastAndroid.SHORT);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    requestPermissions();
    const interval = setInterval(autoReconnect, 5000); // Auto-reconnect every 5s
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🖨️ MT580P Bluetooth Printer</Text>

      <Button title="🔁 Re-check Permissions" onPress={requestPermissions} color="#4F46E5" />
      <Button title="📡 Scan Printers" onPress={scanDevices} color="#10B981" disabled={!granted} />
      <Button title="🖨️ Print Sample Bill" onPress={printSample} color="#F59E0B" disabled={!connectedDevice} />
      <Button title="❌ Disconnect Printer" onPress={disconnectDevice} color="#EF4444" disabled={!connectedDevice} />

      {isLoading && <ActivityIndicator size="large" color="#4F46E5" style={{ marginVertical: 10 }} />}

      <Text style={styles.statusText}>{granted ? "✅ Permissions granted" : "❌ Permissions not granted"}</Text>

      <Text style={styles.subTitle}>Available Devices:</Text>
      <ScrollView style={styles.devicesList}>
        {devices.map((d, i) => (
          <TouchableOpacity key={i} style={styles.deviceButton} onPress={() => connectDevice(d)}>
            <Text style={{ fontWeight: connectedDevice?.address === d.address ? "bold" : "normal" }}>
              {d.name || d.address}
              {connectedDevice?.address === d.address && " (Connected)"}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.subTitle}>📝 Debug Logs:</Text>
      <ScrollView style={styles.logContainer}>
        {logs.map((log, i) => (
          <Text key={i} style={styles.logText}>{log}</Text>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F9FAFB" },
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
  statusText: { fontSize: 16, textAlign: "center", marginVertical: 5 },
  subTitle: { fontSize: 16, fontWeight: "bold", marginTop: 15 },
  devicesList: { maxHeight: 150, marginVertical: 5 },
  deviceButton: { padding: 10, marginVertical: 3, backgroundColor: "#E5E7EB", borderRadius: 5 },
  logContainer: { flex: 1, backgroundColor: "#E5E7EB", padding: 10, borderRadius: 8, marginTop: 10 },
  logText: { fontSize: 14, fontFamily: "monospace", marginBottom: 3 },
});
