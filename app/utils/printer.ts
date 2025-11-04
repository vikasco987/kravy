import RNBluetoothClassic from "react-native-bluetooth-classic";
import { ToastAndroid } from "react-native";

let connectedDevice: any = null;

// ESC/POS command for partial paper cut
const CUT_COMMAND = '\x1D\x56\x41\x10'; // GS V A n (auto cut)

export async function connectPrinter(targetName = "MT580P") {
  try {
    const paired = await RNBluetoothClassic.getBondedDevices();
    const device = paired.find((d) => d.name?.includes(targetName));

    if (!device) throw new Error("Printer not found. Pair it first via Bluetooth settings.");

    const conn = await RNBluetoothClassic.connectToDevice(device.address);
    connectedDevice = conn;
    ToastAndroid.show(`✅ Connected to ${device.name}`, ToastAndroid.SHORT);
    return conn;
  } catch (err: any) {
    ToastAndroid.show("❌ Printer connection failed", ToastAndroid.SHORT);
    console.log("Printer connect error:", err);
    return null;
  }
}

export async function printBill(text: string) {
  if (!connectedDevice) {
    ToastAndroid.show("⚠️ No printer connected", ToastAndroid.SHORT);
    return false;
  }

  try {
    await connectedDevice.write(text);
    await connectedDevice.write(CUT_COMMAND); // 🧾 Auto paper cut
    ToastAndroid.show("🖨️ Print success", ToastAndroid.SHORT);
    return true;
  } catch (err) {
    console.log("❌ Print failed:", err);
    ToastAndroid.show("❌ Print failed", ToastAndroid.SHORT);
    connectedDevice = null; // reset connection if broken
    return false;
  }
}

export async function ensurePrinterConnected() {
  if (connectedDevice) {
    try {
      const ok = await connectedDevice.isConnected();
      if (ok) return connectedDevice;
    } catch {}
  }
  return await connectPrinter(); // auto-reconnect
}
