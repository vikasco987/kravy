// // SimpleBill.ts
// import RNBluetoothClassic from "react-native-bluetooth-classic";
// import { ToastAndroid } from "react-native";

// type CartItem = {
//   id: string;
//   name: string;
//   price?: number;
//   quantity: number;
// };

// type BillData = {
//   customerName: string;
//   phone: string;
//   cart: CartItem[];
//   billNo: string;
//   date: string;
// };

// let connectedDevice: any = null;

// export default async function SimpleBill(data: BillData) {
//   try {
//     // 1️⃣ Scan and connect if not already connected
//     if (!connectedDevice) {
//       const devices = await RNBluetoothClassic.getBondedDevices();
//       const printer = devices.find((d) => d.name?.toLowerCase().includes("tish"));
//       if (!printer) {
//         ToastAndroid.show("⚠️ Tish printer not found!", ToastAndroid.SHORT);
//         return;
//       }
//       connectedDevice = await RNBluetoothClassic.connectToDevice(printer.address);
//       if (!connectedDevice) {
//         ToastAndroid.show("⚠️ Failed to connect printer!", ToastAndroid.SHORT);
//         return;
//       }
//     }

//     // 2️⃣ Prepare the bill content
//     let text = `🎉 Kravy Billing App\n\n`;
//     text += `Bill No: ${data.billNo}\nDate: ${data.date}\n`;
//     if (data.customerName) text += `Customer: ${data.customerName}\n`;
//     if (data.phone) text += `Phone: ${data.phone}\n`;
//     text += `-----------------------------\n`;
//     text += `Item         Qty   Price\n`;
//     text += `-----------------------------\n`;
//     data.cart.forEach((item) => {
//       const name = item.name.padEnd(12, " ");
//       const qty = item.quantity.toString().padStart(3, " ");
//       const price = ((item.price || 0) * item.quantity).toString().padStart(5, " ");
//       text += `${name}${qty} ${price}\n`;
//     });
//     text += `-----------------------------\n`;
//     const total = data.cart.reduce((sum, i) => sum + (i.price || 0) * i.quantity, 0);
//     text += `Total:             ${total}\n\n`;
//     text += `Thank You!\n\n\n`;

//     // 3️⃣ Send to printer
//     await connectedDevice.write(text);

//     ToastAndroid.show("✅ Bill Printed Successfully", ToastAndroid.SHORT);
//   } catch (e) {
//     console.error("Print error:", e);
//     ToastAndroid.show("❌ Print failed", ToastAndroid.SHORT);
//     connectedDevice = null; // reset connection
//   }
// }









// // SimpleBill.ts
// import RNBluetoothClassic from "react-native-bluetooth-classic";
// import { ToastAndroid, Platform } from "react-native";

// type CartItem = {
//   id: string;
//   name: string;
//   price?: number;
//   quantity: number;
// };

// type BillData = {
//   customerName: string;
//   phone: string;
//   cart: CartItem[];
//   billNo: string;
//   date: string;
// };

// let connectedDevice: RNBluetoothClassic.BluetoothDevice | null = null;

// export default async function SimpleBill(data: BillData) {
//   if (Platform.OS === "web") {
//     console.log("Printing bill (web fallback):", data);
//     return;
//   }

//   try {
//     // 1️⃣ Connect to printer if not connected
//     if (!connectedDevice) {
//       const devices = await RNBluetoothClassic.getBondedDevices();
//       const printer = devices.find((d) =>
//         d.name?.toLowerCase().includes("tish")
//       );

//       if (!printer) {
//         ToastAndroid.show("⚠️ Tish printer not found!", ToastAndroid.SHORT);
//         return;
//       }

//       connectedDevice = await RNBluetoothClassic.connectToDevice(printer.address);
//       if (!connectedDevice || !connectedDevice.isConnected) {
//         ToastAndroid.show("⚠️ Failed to connect printer!", ToastAndroid.SHORT);
//         connectedDevice = null;
//         return;
//       }
//     }

//     // 2️⃣ Prepare bill text
//     let text = `🎉 Kravy Billing App\n\n`;
//     text += `Bill No: ${data.billNo}\nDate: ${data.date}\n`;
//     if (data.customerName) text += `Customer: ${data.customerName}\n`;
//     if (data.phone) text += `Phone: ${data.phone}\n`;
//     text += `-----------------------------\n`;
//     text += `Item         Qty   Price\n`;
//     text += `-----------------------------\n`;

//     data.cart.forEach((item) => {
//       const name = item.name.padEnd(12, " ");
//       const qty = item.quantity.toString().padStart(3, " ");
//       const price = ((item.price || 0) * item.quantity).toString().padStart(5, " ");
//       text += `${name}${qty} ${price}\n`;
//     });

//     text += `-----------------------------\n`;
//     const total = data.cart.reduce((sum, i) => sum + (i.price || 0) * i.quantity, 0);
//     text += `Total:             ${total}\n\n`;
//     text += `Thank You!\n\n\n`;

//     // 3️⃣ Print
//     await connectedDevice.write(text);
//     ToastAndroid.show("✅ Bill Printed Successfully", ToastAndroid.SHORT);
//   } catch (err) {
//     console.error("Print error:", err);
//     ToastAndroid.show("❌ Print failed", ToastAndroid.SHORT);
//     connectedDevice = null; // reset to retry next time
//   }
// }











// // SimpleBill.ts
// import { ToastAndroid, Platform } from "react-native";
// import RNBluetoothClassic from "react-native-bluetooth-classic";

// // ✅ Types
// type CartItem = {
//   id: string;
//   name: string;
//   price?: number;
//   quantity: number;
// };

// type BillData = {
//   customerName?: string;
//   phone?: string;
//   cart: CartItem[];
//   billNo: string;
//   date: string;
// };

// let connectedPrinter: RNBluetoothClassic.BluetoothDevice | null = null;

// // ✅ Step 1: Ensure Printer Connected
// export async function ensurePrinterConnected() {
//   try {
//     if (connectedPrinter && (await connectedPrinter.isConnected())) {
//       return connectedPrinter;
//     }

//     const devices = await RNBluetoothClassic.getBondedDevices();
//     const printer = devices.find((d) =>
//       d.name?.toLowerCase().includes("tish") ||
//       d.name?.toLowerCase().includes("mt580")
//     );

//     if (!printer) {
//       ToastAndroid.show("⚠️ Tish printer not found!", ToastAndroid.SHORT);
//       return null;
//     }

//     connectedPrinter = await RNBluetoothClassic.connectToDevice(printer.address);

//     if (!connectedPrinter || !(await connectedPrinter.isConnected())) {
//       ToastAndroid.show("❌ Failed to connect printer!", ToastAndroid.SHORT);
//       connectedPrinter = null;
//       return null;
//     }

//     ToastAndroid.show(`✅ Connected: ${printer.name}`, ToastAndroid.SHORT);
//     return connectedPrinter;
//   } catch (err) {
//     console.log("Printer connect error:", err);
//     ToastAndroid.show("⚠️ Printer connection failed", ToastAndroid.SHORT);
//     connectedPrinter = null;
//     return null;
//   }
// }

// // ✅ Step 2: Actual Printing Utility
// export async function printBill(text: string) {
//   try {
//     if (!connectedPrinter) {
//       const printer = await ensurePrinterConnected();
//       if (!printer) return;
//     }

//     // Send data to printer
//     await connectedPrinter?.write(text);

//     // 🧩 ESC/POS command for auto paper cut (many thermal printers support this)
//     const CUT_PAPER = Buffer.from([0x1D, 0x56, 0x42, 0x00]);
//     await connectedPrinter?.write(CUT_PAPER);

//     ToastAndroid.show("🧾 Bill Printed & Paper Cut!", ToastAndroid.SHORT);
//   } catch (err) {
//     console.log("Print error:", err);
//     ToastAndroid.show("❌ Print failed", ToastAndroid.SHORT);
//   }
// }

// // ✅ Step 3: Main Bill Function
// export default async function SimpleBill(data: BillData) {
//   if (Platform.OS === "web") {
//     console.log("Web preview (no printer):", data);
//     return;
//   }

//   try {
//     const printer = await ensurePrinterConnected();
//     if (!printer) return;

//     // Format bill layout
//     const itemsText = data.cart
//       .map(
//         (i) =>
//           `${i.name.padEnd(10)} ${String(i.quantity).padEnd(3)} ₹${(
//             (i.price || 0) * i.quantity
//           )
//             .toString()
//             .padStart(5)}`
//       )
//       .join("\n");

//     const total = data.cart.reduce(
//       (sum, i) => sum + (i.price || 0) * i.quantity,
//       0
//     );

//     const billText = `
// 🧾 KRAVY BILLING APP
// -----------------------------
// Bill No: ${data.billNo}
// Date: ${data.date}
// Customer: ${data.customerName || "Walk-in"}
// Phone: ${data.phone || "-"}
// -----------------------------
// Item        Qty   Price
// ${itemsText}
// -----------------------------
// TOTAL              ₹${total}
// -----------------------------
// Thank You! Visit Again 🙏
// \n\n`;

//     // Print the bill
//     await printBill(billText);
//   } catch (err) {
//     console.log("Bill print error:", err);
//     ToastAndroid.show("❌ Unable to print", ToastAndroid.SHORT);
//   }
// }










// // SimpleBill.ts
// import { ToastAndroid, Platform } from "react-native";
// import RNBluetoothClassic from "react-native-bluetooth-classic";

// const API_BASE_URL = "https://billing-backend-sable.vercel.app/api"; // ✅ your backend domain

// // ✅ Types
// type CartItem = {
//   id: string;
//   name: string;
//   price?: number;
//   quantity: number;
// };

// type BillData = {
//   customerName?: string;
//   phone?: string;
//   cart: CartItem[];
//   billNo: string;
//   date: string;
// };

// // Global printer connection
// let connectedPrinter: RNBluetoothClassic.BluetoothDevice | null = null;

// // ✅ Step 1: Ensure Printer Connected
// export async function ensurePrinterConnected() {
//   try {
//     if (connectedPrinter && (await connectedPrinter.isConnected())) {
//       return connectedPrinter;
//     }

//     const devices = await RNBluetoothClassic.getBondedDevices();
//     const printer = devices.find(
//       (d) =>
//         d.name?.toLowerCase().includes("tish") ||
//         d.name?.toLowerCase().includes("mt580")
//     );

//     if (!printer) {
//       ToastAndroid.show("⚠️ Tish printer not found!", ToastAndroid.SHORT);
//       return null;
//     }

//     connectedPrinter = await RNBluetoothClassic.connectToDevice(printer.address);

//     if (!connectedPrinter || !(await connectedPrinter.isConnected())) {
//       ToastAndroid.show("❌ Failed to connect printer!", ToastAndroid.SHORT);
//       connectedPrinter = null;
//       return null;
//     }

//     ToastAndroid.show(`✅ Connected: ${printer.name}`, ToastAndroid.SHORT);
//     return connectedPrinter;
//   } catch (err) {
//     console.log("Printer connect error:", err);
//     ToastAndroid.show("⚠️ Printer connection failed", ToastAndroid.SHORT);
//     connectedPrinter = null;
//     return null;
//   }
// }

// // ✅ Step 2: Actual Printing Utility
// export async function printBill(text: string) {
//   try {
//     if (!connectedPrinter) {
//       const printer = await ensurePrinterConnected();
//       if (!printer) return;
//     }

//     await connectedPrinter?.write(text);

//     // 🧩 ESC/POS command for auto paper cut
//     const CUT_PAPER = Buffer.from([0x1D, 0x56, 0x42, 0x00]);
//     await connectedPrinter?.write(CUT_PAPER);

//     ToastAndroid.show("🧾 Bill Printed & Paper Cut!", ToastAndroid.SHORT);
//   } catch (err) {
//     console.log("Print error:", err);
//     ToastAndroid.show("❌ Print failed", ToastAndroid.SHORT);
//   }
// }

// // ✅ Step 3: Save Bill to Database
// async function saveBillToDatabase(data: BillData) {
//   try {
//     const products = data.cart.map((item) => ({
//       productName: item.name,
//       quantity: item.quantity,
//       price: item.price || 0,
//       total: (item.price || 0) * item.quantity,
//     }));

//     const res = await fetch(`${API_BASE_URL}/billing`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         customerName: data.customerName || "Walk-in",
//         phone: data.phone || "-",
//         billNo: data.billNo,
//         date: data.date,
//         products,
//         total: products.reduce((sum, p) => sum + p.total, 0),
//       }),
//     });

//     if (!res.ok) throw new Error(`HTTP ${res.status}`);
//     const result = await res.json();
//     ToastAndroid.show("💾 Bill saved to database", ToastAndroid.SHORT);
//     return result;
//   } catch (err) {
//     console.log("Bill save failed:", err);
//     ToastAndroid.show("❌ Failed to save bill", ToastAndroid.SHORT);
//     return null;
//   }
// }

// // ✅ Step 4: Main Bill Function (Save + Print)
// export default async function SimpleBill(data: BillData) {
//   if (Platform.OS === "web") {
//     console.log("Web preview (no printer):", data);
//     return;
//   }

//   try {
//     // 1️⃣ Save to backend first
//     const saved = await saveBillToDatabase(data);
//     if (!saved) return;

//     // 2️⃣ Connect printer
//     const printer = await ensurePrinterConnected();
//     if (!printer) return;

//     // 3️⃣ Format bill
//     const itemsText = data.cart
//       .map(
//         (i) =>
//           `${i.name.padEnd(10)} ${String(i.quantity).padEnd(3)} ₹${(
//             (i.price || 0) * i.quantity
//           )
//             .toString()
//             .padStart(5)}`
//       )
//       .join("\n");

//     const total = data.cart.reduce(
//       (sum, i) => sum + (i.price || 0) * i.quantity,
//       0
//     );

//     const billText = `
// 🧾 KRAVY BILLING APP
// -----------------------------
// Bill No: ${data.billNo}
// Date: ${data.date}
// Customer: ${data.customerName || "Walk-in"}
// Phone: ${data.phone || "-"}
// -----------------------------
// Item        Qty   Price
// ${itemsText}
// -----------------------------
// TOTAL              ₹${total}
// -----------------------------
// Thank You! Visit Again 🙏
// \n\n`;

//     // 4️⃣ Print bill with paper cut
//     await printBill(billText);
//   } catch (err) {
//     console.log("Bill print error:", err);
//     ToastAndroid.show("❌ Unable to print", ToastAndroid.SHORT);
//   }
// }








// // SimpleBill.ts
// import { ToastAndroid, Platform } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import RNBluetoothClassic from "react-native-bluetooth-classic";

// const API_BASE_URL = "https://billing-backend-sable.vercel.app/api"; // your backend

// // Types
// type CartItem = {
//   id: string;
//   name: string;
//   price?: number;
//   quantity: number;
// };

// type BillData = {
//   customerName?: string;
//   phone?: string;
//   cart: CartItem[];
//   billNo: string;
//   date: string;
// };

// // Global printer connection
// let connectedPrinter: RNBluetoothClassic.BluetoothDevice | null = null;

// // ---------- Utility: push to local unsynced queue ----------
// async function enqueueLocalBill(bill: any) {
//   try {
//     const raw = await AsyncStorage.getItem("unsynced_bills");
//     const arr = raw ? JSON.parse(raw) : [];
//     arr.push({ bill, createdAt: new Date().toISOString() });
//     await AsyncStorage.setItem("unsynced_bills", JSON.stringify(arr));
//     console.log("[SimpleBill] Saved bill to local queue (unsynced_bills). Queue length:", arr.length);
//     ToastAndroid.show("📥 Bill queued locally (will retry later)", ToastAndroid.SHORT);
//   } catch (err) {
//     console.error("[SimpleBill] enqueueLocalBill error:", err);
//   }
// }

// // ---------- Utility: drain local queue (call manually or on app startup) ----------
// export async function tryFlushLocalQueue() {
//   try {
//     const raw = await AsyncStorage.getItem("unsynced_bills");
//     if (!raw) {
//       console.log("[SimpleBill] No local queued bills to flush.");
//       return;
//     }
//     const arr = JSON.parse(raw);
//     if (!Array.isArray(arr) || arr.length === 0) {
//       console.log("[SimpleBill] Local queue empty.");
//       await AsyncStorage.removeItem("unsynced_bills");
//       return;
//     }

//     console.log(`[SimpleBill] Attempting to flush ${arr.length} queued bills...`);
//     const successes = [];
//     const failures = [];

//     for (const entry of arr) {
//       try {
//         const res = await fetch(`${API_BASE_URL}/billing`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(entry.bill),
//         });
//         const text = await res.text();
//         console.log("[SimpleBill][flush] Response status:", res.status, "body:", text);
//         if (res.ok) successes.push(entry);
//         else {
//           failures.push({ entry, status: res.status, body: text });
//         }
//       } catch (err) {
//         console.error("[SimpleBill][flush] network error:", err);
//         failures.push({ entry, error: String(err) });
//       }
//     }

//     if (failures.length === 0) {
//       await AsyncStorage.removeItem("unsynced_bills");
//       ToastAndroid.show(`✅ Flushed ${successes.length} local bills`, ToastAndroid.SHORT);
//     } else {
//       // keep failures only
//       await AsyncStorage.setItem("unsynced_bills", JSON.stringify(failures.map(f => f.entry)));
//       ToastAndroid.show(
//         `⚠️ Flushed ${successes.length} bills, ${failures.length} failed (kept)`,
//         ToastAndroid.SHORT
//       );
//     }
//   } catch (err) {
//     console.error("[SimpleBill] tryFlushLocalQueue error:", err);
//   }
// }

// // ---------- Printer connection ----------
// export async function ensurePrinterConnected() {
//   try {
//     if (connectedPrinter) {
//       try {
//         const isConnected = await connectedPrinter.isConnected();
//         console.log("[SimpleBill] existing connectedPrinter.isConnected:", isConnected);
//         if (isConnected) return connectedPrinter;
//       } catch (err) {
//         console.warn("[SimpleBill] existing connection check failed:", err);
//         connectedPrinter = null;
//       }
//     }

//     console.log("[SimpleBill] Looking up bonded devices...");
//     const devices = await RNBluetoothClassic.getBondedDevices();
//     console.log("[SimpleBill] Bonded devices:", devices.map((d: any) => ({ name: d.name, address: d.address })));

//     const printer = devices.find((d: any) =>
//       (d.name || "")
//         .toString()
//         .toLowerCase()
//         .includes("tish") ||
//       (d.name || "").toString().toLowerCase().includes("mt580") ||
//       (d.name || "").toString().toLowerCase().includes("nivyam") // add other possible names
//     );

//     if (!printer) {
//       console.warn("[SimpleBill] No matching printer found in bonded devices.");
//       ToastAndroid.show("⚠️ Tish printer not found among paired devices", ToastAndroid.SHORT);
//       return null;
//     }

//     console.log("[SimpleBill] Attempting connect to:", printer);
//     connectedPrinter = await RNBluetoothClassic.connectToDevice(printer.address);
//     console.log("[SimpleBill] connectToDevice returned:", connectedPrinter);

//     if (!connectedPrinter) {
//       ToastAndroid.show("❌ Printer connection returned null", ToastAndroid.SHORT);
//       return null;
//     }

//     // verify connected
//     try {
//       const isConnected = await connectedPrinter.isConnected();
//       console.log("[SimpleBill] Post-connect isConnected:", isConnected);
//       if (!isConnected) {
//         ToastAndroid.show("❌ Printer not connected after connect call", ToastAndroid.SHORT);
//         connectedPrinter = null;
//         return null;
//       }
//     } catch (err) {
//       console.warn("[SimpleBill] isConnected check failed:", err);
//     }

//     ToastAndroid.show(`✅ Connected: ${printer.name}`, ToastAndroid.SHORT);
//     return connectedPrinter;
//   } catch (err) {
//     console.error("[SimpleBill] ensurePrinterConnected error:", err);
//     ToastAndroid.show("⚠️ Printer connection failed", ToastAndroid.SHORT);
//     connectedPrinter = null;
//     return null;
//   }
// }

// // ---------- Print function (text + cut) ----------
// export async function printBill(text: string) {
//   try {
//     if (!connectedPrinter) {
//       const p = await ensurePrinterConnected();
//       if (!p) {
//         console.warn("[SimpleBill] printBill aborted: no connected printer");
//         return false;
//       }
//     }

//     console.log("[SimpleBill] Sending text to printer. length:", text.length);
//     // write string (most Bluetooth printers accept plain string input as bytes)
//     await connectedPrinter!.write(text);

//     // Many printers support ESC/POS cut command: GS V B n => 0x1D 0x56 0x42 0x00
//     // Some libraries require sending as binary. RNBluetoothClassic.write accepts string or base64.
//     // We'll send a raw string containing those bytes (escape sequences).
//     const cutCmd = "\x1D\x56\x42\x00";
//     console.log("[SimpleBill] Sending cut command bytes.");
//     await connectedPrinter!.write(cutCmd);

//     ToastAndroid.show("🧾 Bill Printed & Paper Cut!", ToastAndroid.SHORT);
//     console.log("[SimpleBill] printBill success");
//     return true;
//   } catch (err) {
//     console.error("[SimpleBill] printBill error:", err);
//     ToastAndroid.show("❌ Print failed", ToastAndroid.SHORT);
//     // on error, drop connection so next attempt will reconnect
//     try { connectedPrinter = null; } catch {}
//     return false;
//   }
// }

// // ---------- Save to backend with retries + detailed debug ----------
// async function saveBillToDatabaseWithRetries(data: BillData, maxRetries = 3) {
//   const payload = {
//     customerName: data.customerName || "Walk-in",
//     phone: data.phone || "-",
//     billNo: data.billNo,
//     date: data.date,
//     products: data.cart.map((c) => ({
//       productId: c.id,
//       productName: c.name,
//       quantity: c.quantity,
//       price: c.price || 0,
//       total: (c.price || 0) * c.quantity,
//     })),
//     total: data.cart.reduce((s, i) => s + (i.price || 0) * i.quantity, 0),
//   };

//   console.log("[SimpleBill] saveBillToDatabaseWithRetries payload:", JSON.stringify(payload, null, 2));

//   let attempt = 0;
//   let lastError: any = null;

//   while (attempt < maxRetries) {
//     attempt++;
//     try {
//       console.log(`[SimpleBill] POST attempt ${attempt} -> ${API_BASE_URL}/billing`);
//       const res = await fetch(`${API_BASE_URL}/billing`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const text = await res.text().catch(() => "<no-body>");
//       console.log(`[SimpleBill] Response attempt ${attempt} status: ${res.status} body:`, text);

//       if (res.ok) {
//         // try parse json
//         try {
//           const json = JSON.parse(text);
//           console.log("[SimpleBill] Saved bill response json:", json);
//           ToastAndroid.show("💾 Bill saved to database", ToastAndroid.SHORT);
//           return json;
//         } catch (parseErr) {
//           console.warn("[SimpleBill] saved response not JSON, returning text:", text);
//           ToastAndroid.show("💾 Bill saved (no-json response)", ToastAndroid.SHORT);
//           return { rawResponse: text };
//         }
//       } else {
//         lastError = new Error(`HTTP ${res.status}: ${text}`);
//         console.warn(`[SimpleBill] Attempt ${attempt} failed:`, lastError);
//         // on 5xx, retry; on 4xx, don't retry
//         if (res.status >= 500) {
//           // wait a bit before retry
//           await new Promise((r) => setTimeout(r, 800 * attempt));
//           continue;
//         } else {
//           // client error, don't retry
//           break;
//         }
//       }
//     } catch (err) {
//       lastError = err;
//       console.error(`[SimpleBill] Network/exception on attempt ${attempt}:`, err);
//       await new Promise((r) => setTimeout(r, 800 * attempt));
//     }
//   }

//   console.error("[SimpleBill] All save attempts failed. lastError:", lastError);
//   return { error: lastError ? String(lastError) : "unknown" };
// }

// // ---------- Main function: save to DB (with debug) and print ----------
// export default async function SimpleBill(data: BillData) {
//   if (Platform.OS === "web") {
//     console.log("[SimpleBill] Web preview (no printer). Data:", data);
//     return;
//   }

//   try {
//     console.log("[SimpleBill] Starting SimpleBill for:", data.billNo, "items:", data.cart.length);

//     // 1) Save to backend with retries
//     const saved = await saveBillToDatabaseWithRetries(data, 3);
//     if (!saved || (saved as any).error) {
//       console.warn("[SimpleBill] Bill save failed after retries. Will queue locally. debug:", saved);
//       // enqueue locally so operator can retry later
//       await enqueueLocalBill({
//         ...data,
//         lastSaveError: (saved as any).error || "save-failed",
//       });
//       // continue to attempt print anyway (local queued)
//     }

//     // 2) Ensure printer connected
//     const printer = await ensurePrinterConnected();
//     if (!printer) {
//       console.warn("[SimpleBill] Printer not available, aborting print but bill queued/saved.");
//       return;
//     }

//     // 3) Format bill text (detailed)
//     const itemsText = data.cart
//       .map(
//         (i) => {
//           const name = (i.name || "").slice(0, 16).padEnd(16, " ");
//           const qty = String(i.quantity).padStart(3, " ");
//           const price = ((i.price || 0) * i.quantity).toFixed(0).padStart(6, " ");
//           return `${name}${qty}${price}`;
//         }
//       )
//       .join("\n");

//     const total = data.cart.reduce((s, i) => s + (i.price || 0) * i.quantity, 0);

//     const billText = [
//       "🧾 KRAVY BILLING APP",
//       "-----------------------------",
//       `Bill No: ${data.billNo}`,
//       `Date: ${data.date}`,
//       `Customer: ${data.customerName || "Walk-in"}`,
//       `Phone: ${data.phone || "-"}`,
//       "-----------------------------",
//       "Item             QTY  PRICE",
//       itemsText,
//       "-----------------------------",
//       `TOTAL:            ₹${total}`,
//       "-----------------------------",
//       "Thank You! Visit Again 🙏",
//       "\n\n"
//     ].join("\n");

//     console.log("[SimpleBill] Final bill text:\n", billText);

//     // 4) Print and cut
//     const printed = await printBill(billText);
//     if (!printed) {
//       console.warn("[SimpleBill] Print failed; connection may be reset. Will set connectedPrinter=null");
//       connectedPrinter = null;
//     } else {
//       console.log("[SimpleBill] Print completed successfully.");
//     }
//   } catch (err) {
//     console.error("[SimpleBill] Unexpected error:", err);
//     ToastAndroid.show("❌ Unexpected print/save error", ToastAndroid.SHORT);
//     // ensure connection reset so next attempt reconnects
//     connectedPrinter = null;
//   }
// }





// // app/bill/SimpleBill.ts
// export type CartItem = {
//   id: string;
//   name: string;
//   quantity: number;
//   price: number;
//   sellingPrice: number;
// };

// export const SimpleBill = async (
//   cartItems: CartItem[],
//   token: string, // Clerk token passed from component
//   options?: { customerName?: string; phone?: string; notes?: string }
// ) => {
//   try {
//     if (!token) {
//       throw new Error("Clerk token missing!");
//     }

//     console.log("🔑 [SimpleBill] Clerk Token:", token); // ✅ log clerk token

//     const date = new Date();
//     const billNo = `MS-${Math.floor(Math.random() * 10000) + 5000}`;

//     const products = cartItems.map((item) => ({
//       productId: item.id,
//       productName: item.name,
//       quantity: item.quantity,
//       price: item.sellingPrice,
//       total: item.sellingPrice * item.quantity,
//     }));

//     const total = products.reduce((sum, p) => sum + p.total, 0);

//     const payload = {
//       customerName: options?.customerName || "Walk-in",
//       phone: options?.phone || "-",
//       date: date.toLocaleDateString(),
//       billNo,
//       products,
//       total,
//       discount: 0,
//       gst: 0,
//       grandTotal: total,
//       paymentMode: "CASH",
//       paymentStatus: "PAID",
//       notes: options?.notes || `Bill No ${billNo}`,
//       companyName: "KRAVY Billing",
//       companyAddress: "New Delhi, India",
//       companyPhone: "+91-9999999999",
//       contactPerson: options?.customerName || "Walk-in",
//     };

//     console.log("🧾 [SimpleBill] Prepared Payload:", payload);

//     const res = await fetch(
//       "https://billing-backend-sable.vercel.app/api/billing",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`, // send clerk token in header
//         },
//         body: JSON.stringify(payload),
//       }
//     );

//     if (!res.ok) {
//       const text = await res.text();
//       console.error("❌ [SimpleBill] Backend Error:", text);
//       return;
//     }

//     const data = await res.json();
//     console.log("✅ [SimpleBill] Bill saved successfully!", data);
//     return data;
//   } catch (err) {
//     console.error("❌ [SimpleBill] Error:", err);
//   }
// };





