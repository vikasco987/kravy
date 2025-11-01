









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
} from "react-native";

export default function PrinterScreen() {
  const [permissionStatus, setPermissionStatus] = useState("⏳ Checking...");
  const [isLoading, setIsLoading] = useState(true);
  const [granted, setGranted] = useState(false);
  const [mockConnection, setMockConnection] = useState(null);

  // Request Bluetooth permissions
  const requestBluetoothPermission = async () => {
    if (Platform.OS !== "android") {
      setPermissionStatus("⚠️ iOS doesn't need manual Bluetooth permission");
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const result = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ]);

      console.log("🔍 Bluetooth permissions result:", result);

      const allGranted = Object.values(result).every(
        (status) => status === PermissionsAndroid.RESULTS.GRANTED
      );

      if (allGranted) {
        ToastAndroid.show("✅ Bluetooth permission granted", ToastAndroid.SHORT);
        setPermissionStatus("✅ Granted");
        setGranted(true);
        // After permission granted, run mock test
        mockBluetoothTest();
      } else {
        ToastAndroid.show("❌ Bluetooth permission denied", ToastAndroid.SHORT);
        setPermissionStatus("❌ Denied");
        setGranted(false);
        setMockConnection(null);
      }
    } catch (error) {
      console.error("⚠️ Permission error:", error);
      setPermissionStatus("⚠️ Error requesting permission");
      setGranted(false);
      setMockConnection(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Mock Bluetooth test function
  const mockBluetoothTest = async () => {
    try {
      // Simulate connection delay
      setMockConnection("⏳ Testing...");
      await new Promise((res) => setTimeout(res, 1000));

      // Simulate success
      const isConnected = true; 
      console.log("Bluetooth mock test: ", isConnected ? "SUCCESS" : "FAIL");

      setMockConnection(isConnected ? "✅ Mock connection SUCCESS" : "❌ Mock connection FAIL");
    } catch (e) {
      console.log("Bluetooth mock test failed:", e);
      setMockConnection("❌ Mock connection FAIL");
    }
  };

  useEffect(() => {
    requestBluetoothPermission();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🖨️ Bluetooth Printer Permission</Text>

      {isLoading ? (
        <View style={{ alignItems: "center" }}>
          <ActivityIndicator size="large" color="#4F46E5" />
          <Text style={styles.statusText}>Checking permission...</Text>
        </View>
      ) : (
        <>
          <Text
            style={[
              styles.statusText,
              granted ? styles.statusGranted : styles.statusDenied,
            ]}
          >
            {permissionStatus}
          </Text>

          <Button
            title="🔁 Re-check Bluetooth Permission"
            color="#4F46E5"
            onPress={requestBluetoothPermission}
          />

          {granted && mockConnection && (
            <Text
              style={[
                styles.statusText,
                mockConnection.includes("SUCCESS") ? styles.statusGranted : styles.statusDenied,
              ]}
            >
              {mockConnection}
            </Text>
          )}

          {granted ? (
            <Text style={styles.successNote}>
              🎉 You're ready to connect your Bluetooth printer!
            </Text>
          ) : (
            <Text style={styles.warningNote}>
              ⚠️ Please allow permissions from Settings if denied.
            </Text>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F9FAFB",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#111827",
  },
  statusText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  statusGranted: {
    color: "green",
    fontWeight: "600",
  },
  statusDenied: {
    color: "red",
    fontWeight: "600",
  },
  successNote: {
    marginTop: 15,
    color: "green",
    fontWeight: "500",
  },
  warningNote: {
    marginTop: 15,
    color: "orange",
    fontWeight: "500",
    textAlign: "center",
  },
});
