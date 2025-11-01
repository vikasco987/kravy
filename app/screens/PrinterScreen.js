import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  Alert,
  ScrollView,
  PermissionsAndroid,
  Platform,
} from "react-native";
import {
  BluetoothManager,
  BluetoothEscposPrinter,
} from "react-native-bluetooth-escpos-printer";

export default function PrinterScreen() {
  const [devices, setDevices] = useState([]);
  const [connected, setConnected] = useState(false);

  // Request Bluetooth permissions (Android 12+)
  const requestBluetoothPermissions = async () => {
    if (Platform.OS === "android" && Platform.Version >= 31) {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ]);

        const allGranted = Object.values(granted).every(
          (status) => status === PermissionsAndroid.RESULTS.GRANTED
        );

        if (!allGranted) {
          Alert.alert(
            "Permission Denied",
            "Bluetooth permissions are required to connect to the printer."
          );
          return false;
        }
        return true;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      return true;
    }
  };

  // Scan for paired Bluetooth printers
  useEffect(() => {
    (async () => {
      const hasPermission = await requestBluetoothPermissions();
      if (!hasPermission) return;

      BluetoothManager.enableBluetooth()
        .then((r) => {
          const paired = JSON.parse(r);
          setDevices(paired);
        })
        .catch((e) => Alert.alert("Bluetooth Error", e.message));
    })();
  }, []);

  const connectPrinter = async (address) => {
    try {
      await BluetoothManager.connect(address);
      setConnected(true);
      Alert.alert("✅ Connected", "Printer connected successfully!");
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  };

  const printBill = async () => {
    if (!connected) {
      Alert.alert("⚠️ Not Connected", "Please connect a printer first.");
      return;
    }

    await BluetoothEscposPrinter.printerInit();
    await BluetoothEscposPrinter.printText("🧾 Magic Billing System\n", {
      encoding: "GBK",
      codepage: 0,
      widthtimes: 2,
      heigthtimes: 2,
      fonttype: 1,
    });
    await BluetoothEscposPrinter.printText("-----------------------------\n", {});
    await BluetoothEscposPrinter.printText("Item: Tea x2\nPrice: ₹40\n", {});
    await BluetoothEscposPrinter.printText("-----------------------------\n", {});
    await BluetoothEscposPrinter.printText("TOTAL: ₹40\n", {});
    await BluetoothEscposPrinter.printText("Thank you for visiting!\n\n\n", {});
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        🖨️ Nivyam BT-58 Printer Setup
      </Text>

      {devices.length === 0 ? (
        <Text>No Paired Printers Found</Text>
      ) : (
        devices.map((d, i) => (
          <Button
            key={i}
            title={`Connect to ${d.name}`}
            onPress={() => connectPrinter(d.address)}
          />
        ))
      )}

      <View style={{ marginTop: 20 }}>
        <Button title="🧾 Print Sample Bill" onPress={printBill} />
      </View>
    </ScrollView>
  );
}
