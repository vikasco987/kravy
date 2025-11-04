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
// import { CartItem } from "./types"; // optional, your cart item type

// type BillOptions = {
//   customerName?: string;
//   phone?: string;
//   notes?: string;
// };

// /**
//  * Create a bill in backend. Clerk token must be passed from component.
//  */
// export const SimpleBill = async (
//   cartItems: CartItem[],
//   token: string, // ✅ must pass token from component
//   options?: BillOptions
// ) => {
//   try {
//     if (!token) throw new Error("Clerk token missing!");

//     console.log("🔑 Clerk Token inside SimpleBill:", token);

//     const date = new Date();
//     const billNo = `MS-${Math.floor(Math.random() * 10000) + 5000}`;

//     const products = cartItems.map((item) => ({
//       productId: item.id,
//       productName: item.name,
//       quantity: item.quantity,
//       price: item.price || 0,
//       total: (item.price || 0) * item.quantity,
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
//     };

//     console.log("🧾 Bill Payload:", payload);

//     const response = await fetch(
//       "https://billing-backend-sable.vercel.app/api/billing",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(payload),
//       }
//     );

//     const data = await response.json();
//     if (!response.ok) {
//       console.error("❌ Backend Error:", data);
//       return;
//     }

//     console.log("✅ Bill created successfully:", data);
//     return data;
//   } catch (err: any) {
//     console.error("❌ SimpleBill Error:", err.message || err);
//     throw err;
//   }
// };











// // app/bill/SimpleBill.ts
// export type CartItem = {
//   id: string;
//   name: string;
//   quantity: number;
//   price: number; // original price (optional)
//   sellingPrice: number; // price we are actually billing
// };

// export const SimpleBill = async (
//   cartItems: CartItem[],
//   token: string,        // Clerk token from getToken()
//   userClerkId: string,  // REQUIRED for backend
//   options?: { customerName?: string; phone?: string; notes?: string }
// ) => {
//   try {
//     if (!token) throw new Error("❌ Clerk token missing!");
//     if (!userClerkId) throw new Error("❌ userClerkId missing!");

//     console.log("🔑 [SimpleBill] Clerk Token:", token);

//     const date = new Date();
//     const billNo = `MS-${Math.floor(Math.random() * 10000) + 5000}`;

//     // ✅ Map cart items to backend format
//     const products = cartItems.map((item) => ({
//       productId: item.id,
//       quantity: item.quantity,
//       price: item.sellingPrice,
//       total: item.sellingPrice * item.quantity,
//     }));

//     const total = products.reduce((sum, p) => sum + p.total, 0);

//     const payload = {
//       userClerkId,
//       customerName: options?.customerName || "Walk-in",
//       phone: options?.phone || "-",
//       date: date.toISOString(),
//       billNo,
//       products,
//       total,
//       grandTotal: total,
//       discount: 0,
//       gst: 0,
//       paymentMode: "CASH",
//       paymentStatus: "PAID",
//       notes: options?.notes || `Bill No ${billNo}`,
//       companyName: "KRAVY Billing",
//       companyAddress: "New Delhi, India",
//       companyPhone: "+91-9999999999",
//       contactPerson: options?.customerName || "Walk-in",
//     };

//     console.log("🧾 [SimpleBill] Payload:", payload);

//     const res = await fetch("https://billing-backend-sable.vercel.app/api/billing", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(payload),
//     });

//     if (!res.ok) {
//       const text = await res.text();
//       console.error("❌ [SimpleBill] Backend Error:", text);
//       return;
//     }

//     const data = await res.json();
//     console.log("✅ [SimpleBill] Bill saved successfully!", data);
//     return data;
//   } catch (err: any) {
//     console.error("❌ [SimpleBill] Error:", err.message || err);
//   }
// };









// // app/bill/SimpleBill.ts
// export type CartItem = {
//   id: string;
//   name: string;
//   quantity: number;
//   // Make price/sellingPrice mandatory for safety in SimpleBill.ts
//   price: number; 
//   sellingPrice: number; 
// };

// export const SimpleBill = async (
//   cartItems: CartItem[],
//   token: string, // Clerk token from getToken()
//   userClerkId: string, // ✅ REQUIRED as a STRING for backend
//   options?: { customerName?: string; phone?: string; notes?: string }
// ) => {
//   try {
//     if (!token) throw new Error("❌ Clerk token missing!");
//     if (!userClerkId || typeof userClerkId !== 'string') {
//         throw new Error("❌ userClerkId missing or not a string! (Got: " + typeof userClerkId + ")");
//     }

//     console.log("🔑 [SimpleBill] Clerk Token:", token);
//     console.log("👤 [SimpleBill] Clerk ID:", userClerkId);

//     const date = new Date();
//     const billNo = `MS-${Math.floor(Math.random() * 10000) + 5000}`;

//     // ✅ Map cart items to backend format, ensuring price safety
//     const products = cartItems.map((item) => {
//       // Use 0 as a fallback if sellingPrice is undefined/null to prevent NaN
//       const priceToBill = item.sellingPrice > 0 ? item.sellingPrice : 0;
//       return {
//         productId: item.id,
//         quantity: item.quantity,
//         price: priceToBill, // Use sellingPrice
//         total: priceToBill * item.quantity,
//       };
//     });

//     const total = products.reduce((sum, p) => sum + p.total, 0);

//     const payload = {
//       // 🛑 This now correctly uses the string parameter
//       userClerkId: userClerkId, 
//       customerName: options?.customerName || "Walk-in",
//       phone: options?.phone || "-",
//       date: date.toISOString(),
//       billNo,
//       products,
//       total,
//       grandTotal: total,
//       discount: 0,
//       gst: 0,
//       paymentMode: "CASH",
//       paymentStatus: "PAID",
//       notes: options?.notes || `Bill No ${billNo}`,
//       companyName: "KRAVY Billing",
//       companyAddress: "New Delhi, India",
//       companyPhone: "+91-9999999999",
//       contactPerson: options?.customerName || "Walk-in",
//     };

//     console.log("🧾 [SimpleBill] Payload:", payload);

//     const res = await fetch("https://billing-backend-sable.vercel.app/api/billing", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(payload),
//     });

//     if (!res.ok) {
//       const text = await res.text();
//       console.error("❌ [SimpleBill] Backend Error:", text);
//       return;
//     }

//     const data = await res.json();
//     console.log("✅ [SimpleBill] Bill saved successfully!", data);
//     return data;
//   } catch (err: any) {
//     console.error("❌ [SimpleBill] Error:", err.message || err);
//   }
// };














// // app/bill/SimpleBill.ts
// "use client";

// import { getRecentCompanyProfile } from "../party/CompanyInfoScreen"; // ✅ Import recent company info

// export type CartItem = {
//   id: string;
//   name: string;
//   quantity: number;
//   price: number;        // Base price
//   sellingPrice: number; // Selling price to bill
// };

// export const SimpleBill = async (
//   cartItems: CartItem[],
//   token: string,          // Clerk token from getToken()
//   userClerkId: string,    // ✅ REQUIRED as a STRING for backend
//   options?: { 
//     customerName?: string; 
//     phone?: string; 
//     notes?: string 
//   }
// ) => {
//   try {
//     if (!token) throw new Error("❌ Clerk token missing!");
//     if (!userClerkId || typeof userClerkId !== 'string') {
//       throw new Error(
//         "❌ userClerkId missing or not a string! (Got: " + typeof userClerkId + ")"
//       );
//     }

//     console.log("🔑 [SimpleBill] Clerk Token:", token);
//     console.log("👤 [SimpleBill] Clerk ID:", userClerkId);

//     // ✅ Fetch recent company profile dynamically
//     const companyInfo = await getRecentCompanyProfile();
//     console.log("🏢 [SimpleBill] Recent Company Info:", companyInfo);

//     const date = new Date();
//     const billNo = `MS-${Math.floor(Math.random() * 10000) + 5000}`;

//     // Map cart items to backend format
//     const products = cartItems.map((item) => {
//       const priceToBill = item.sellingPrice > 0 ? item.sellingPrice : 0;
//       return {
//         productId: item.id,
//         quantity: item.quantity,
//         price: priceToBill,
//         total: priceToBill * item.quantity,
//       };
//     });

//     const total = products.reduce((sum, p) => sum + p.total, 0);

//     // ✅ Construct payload with dynamic company info
//     const payload = {
//       userClerkId,
//       customerName: options?.customerName || "Walk-in",
//       phone: options?.phone || "-",
//       date: date.toISOString(),
//       billNo,
//       products,
//       total,
//       grandTotal: total,
//       discount: 0,
//       gst: 0,
//       paymentMode: "CASH",
//       paymentStatus: "PAID",
//       notes: options?.notes || `Bill No ${billNo}`,
//       companyName: companyInfo?.companyName || "KRAVY Billing",
//       companyAddress: companyInfo?.companyAddress || "New Delhi, India",
//       companyPhone: companyInfo?.companyPhone || "+91-9999999999",
//       contactPerson: options?.customerName || companyInfo?.contactPerson || "Walk-in",
//     };

//     console.log("🧾 [SimpleBill] Payload:", payload);

//     const res = await fetch("https://billing-backend-sable.vercel.app/api/billing", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(payload),
//     });

//     if (!res.ok) {
//       const text = await res.text();
//       console.error("❌ [SimpleBill] Backend Error:", text);
//       return;
//     }

//     const data = await res.json();
//     console.log("✅ [SimpleBill] Bill saved successfully!", data);
//     return data;
//   } catch (err: any) {
//     console.error("❌ [SimpleBill] Error:", err.message || err);
//   }
// };




// "use client";

// import { getRecentCompanyProfile, CompanyProfile } from "../party/companyService";

// export type CartItem = {
//   id: string;
//   name: string;
//   quantity: number;
//   price: number;
//   sellingPrice: number;
// };

// export const SimpleBill = async (
//   cartItems: CartItem[],
//   token: string,
//   userClerkId: string,
//   getToken: () => Promise<string>,
//   options?: { customerName?: string; phone?: string; notes?: string }
// ) => {
//   try {
//     if (!token) throw new Error("❌ Clerk token missing!");
//     if (!userClerkId || typeof userClerkId !== "string")
//       throw new Error("❌ userClerkId missing or not a string!");

//     console.log("🔑 [SimpleBill] Clerk Token:", token);
//     console.log("👤 [SimpleBill] Clerk ID:", userClerkId);

//     // ✅ Fetch recent company profile
//     const companyInfo: CompanyProfile = await getRecentCompanyProfile(getToken);
//     console.log("🏢 [SimpleBill] Recent Company Info:", companyInfo);

//     const date = new Date();
//     const billNo = `MS-${Math.floor(Math.random() * 10000) + 5000}`;

//     const products = cartItems.map((item) => {
//       const priceToBill = item.sellingPrice > 0 ? item.sellingPrice : 0;
//       return {
//         productId: item.id,
//         quantity: item.quantity,
//         price: priceToBill,
//         total: priceToBill * item.quantity,
//       };
//     });

//     const total = products.reduce((sum, p) => sum + p.total, 0);

//     const payload = {
//       userClerkId,
//       customerName: options?.customerName || "Walk-in",
//       phone: options?.phone || "-",
//       date: date.toISOString(),
//       billNo,
//       products,
//       total,
//       grandTotal: total,
//       discount: 0,
//       gst: 0,
//       paymentMode: "CASH",
//       paymentStatus: "PAID",
//       notes: options?.notes || `Bill No ${billNo}`,
//       companyName: companyInfo.companyName,
//       companyAddress: companyInfo.companyAddress,
//       companyPhone: companyInfo.companyPhone,
//       contactPerson: options?.customerName || companyInfo.contactPerson,
//     };

//     console.log("🧾 [SimpleBill] Payload:", payload);

//     const res = await fetch("https://billing-backend-sable.vercel.app/api/billing", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(payload),
//     });

//     if (!res.ok) {
//       const text = await res.text();
//       console.error("❌ [SimpleBill] Backend Error:", text);
//       return;
//     }

//     const data = await res.json();
//     console.log("✅ [SimpleBill] Bill saved successfully!", data);
//     return data;
//   } catch (err: any) {
//     console.error("❌ [SimpleBill] Error:", err.message || err);
//   }
// };













// "use client";

// import { getRecentCompanyProfile } from "../party/companyService";

// export type CartItem = {
//   id: string;
//   name: string;
//   quantity: number;
//   price: number;        // Base price
//   sellingPrice: number; // Selling price
// };

// export const SimpleBill = async (
//   cartItems: CartItem[],
//   token: string,        // ✅ Clerk token
//   userClerkId: string,  // ✅ Clerk user ID string
//   options?: {
//     customerName?: string;
//     phone?: string;
//     notes?: string;
//   }
// ) => {
//   try {
//     if (!token) throw new Error("❌ Clerk token missing!");
//     if (!userClerkId || typeof userClerkId !== "string") {
//       throw new Error("❌ userClerkId missing or not a string!");
//     }

//     console.log("🔑 [SimpleBill] Clerk Token:", token);
//     console.log("👤 [SimpleBill] Clerk ID:", userClerkId);

//     // ✅ Fetch company info using token
//     const companyInfo = await getRecentCompanyProfile(token);
//     console.log("🏢 [SimpleBill] Recent Company Info:", companyInfo);

//     const date = new Date();
//     const billNo = `MS-${Math.floor(Math.random() * 10000) + 5000}`;

//     const products = cartItems.map((item) => {
//       const priceToBill = item.sellingPrice > 0 ? item.sellingPrice : 0;
//       return {
//         productId: item.id,
//         quantity: item.quantity,
//         price: priceToBill,
//         total: priceToBill * item.quantity,
//       };
//     });

//     const total = products.reduce((sum, p) => sum + p.total, 0);

//     const payload = {
//       userClerkId,
//       customerName: options?.customerName || "Walk-in",
//       phone: options?.phone || "-",
//       date: date.toISOString(),
//       billNo,
//       products,
//       total,
//       grandTotal: total,
//       discount: 0,
//       gst: 0,
//       paymentMode: "CASH",
//       paymentStatus: "PAID",
//       notes: options?.notes || `Bill No ${billNo}`,
//       companyName: companyInfo?.companyName || "KRAVY Billing",
//       companyAddress: companyInfo?.companyAddress || "New Delhi, India",
//       companyPhone: companyInfo?.companyPhone || "+91-9999999999",
//       contactPerson: options?.customerName || companyInfo?.contactPerson || "Walk-in",
//     };

//     console.log("🧾 [SimpleBill] Payload:", payload);

//     const res = await fetch("https://billing-backend-sable.vercel.app/api/billing", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(payload),
//     });

//     if (!res.ok) {
//       const text = await res.text();
//       console.error("❌ [SimpleBill] Backend Error:", text);
//       return;
//     }

//     const data = await res.json();
//     console.log("✅ [SimpleBill] Bill saved successfully!", data);
//     return data;
//   } catch (err: any) {
//     console.error("❌ [SimpleBill] Error:", err.message || err);
//   }
// };
//cghfdsadfgyuiop'[;



















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











// // ✅ SimpleBill.ts
// import { ToastAndroid, Platform } from "react-native";
// import RNBluetoothClassic from "react-native-bluetooth-classic";
// import { getRecentCompanyProfile } from "../party/companyService";

// export type CartItem = {
//   id: string;
//   name: string;
//   price?: number;
//   quantity: number;
// };

// export type BillOptions = {
//   customerName?: string;
//   phone?: string;
//   notes?: string;
// };

// let connectedPrinter: RNBluetoothClassic.BluetoothDevice | null = null;

// // ✅ Step 1: Connect to Bluetooth Printer
// export async function ensurePrinterConnected() {
//   try {
//     if (connectedPrinter && (await connectedPrinter.isConnected())) return connectedPrinter;

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

// // ✅ Step 2: Print helper
// export async function printBill(text: string) {
//   try {
//     if (!connectedPrinter) {
//       const printer = await ensurePrinterConnected();
//       if (!printer) return;
//     }

//     await connectedPrinter?.write(text);
//     const CUT_PAPER = Buffer.from([0x1D, 0x56, 0x42, 0x00]);
//     await connectedPrinter?.write(CUT_PAPER);

//     ToastAndroid.show("🧾 Bill Printed & Paper Cut!", ToastAndroid.SHORT);
//   } catch (err) {
//     console.log("Print error:", err);
//     ToastAndroid.show("❌ Print failed", ToastAndroid.SHORT);
//   }
// }

// // ✅ Step 3: Full SimpleBill Function (Save + Print)
// export async function SimpleBill(
//   cartItems: CartItem[],
//   token: string,
//   userClerkId: string,
//   options?: BillOptions
// ) {
//   try {
//     if (!token) throw new Error("❌ Clerk token missing!");
//     if (!userClerkId) throw new Error("❌ userClerkId missing!");

//     // 🏢 Fetch recent company info
//     const companyInfo = await getRecentCompanyProfile(token);

//     const date = new Date();
//     const billNo = `MS-${Math.floor(Math.random() * 10000) + 5000}`;

//     const products = cartItems.map((item) => ({
//       productId: item.id,
//       name: item.name,
//       quantity: item.quantity,
//       price: item.price ?? 0,
//       total: (item.price ?? 0) * item.quantity,
//     }));

//     const total = products.reduce((sum, p) => sum + p.total, 0);

//     const payload = {
//       userClerkId,
//       customerName: options?.customerName || "Walk-in",
//       phone: options?.phone || "-",
//       date: date.toISOString(),
//       billNo,
//       products,
//       total,
//       grandTotal: total,
//       discount: 0,
//       gst: 0,
//       paymentMode: "CASH",
//       paymentStatus: "PAID",
//       notes: options?.notes || `Bill No ${billNo}`,
//       companyName: companyInfo?.companyName || "KRAVY Billing",
//       companyAddress: companyInfo?.companyAddress || "New Delhi, India",
//       companyPhone: companyInfo?.companyPhone || "+91-9999999999",
//     };

//     // ✅ Save bill in backend
//     const res = await fetch("https://billing-backend-sable.vercel.app/api/billing", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(payload),
//     });

//     if (!res.ok) {
//       const errorText = await res.text();
//       console.log("❌ Backend save error:", errorText);
//       ToastAndroid.show("⚠️ Bill save failed!", ToastAndroid.SHORT);
//     } else {
//       ToastAndroid.show("✅ Bill saved!", ToastAndroid.SHORT);
//     }

//     // ✅ Prepare print text
//     const itemsText = products
//       .map(
//         (i) =>
//           `${i.name.padEnd(12)} ${String(i.quantity).padEnd(3)} ₹${i.total
//             .toFixed(2)
//             .padStart(6)}`
//       )
//       .join("\n");

//     const billText = `
// ${payload.companyName}
// ${payload.companyAddress}
// Phone: ${payload.companyPhone}
// -----------------------------
// Bill No: ${billNo}
// Date: ${date.toLocaleString()}
// Customer: ${payload.customerName}
// Phone: ${payload.phone}
// -----------------------------
// Item         Qty   Total
// ${itemsText}
// -----------------------------
// TOTAL: ₹${total.toFixed(2)}
// -----------------------------
// Thank You! Visit Again 🙏
// \n\n`;

//     // ✅ Instantly print
//     await printBill(billText);

//     return { status: "success", payload };
//   } catch (err: any) {
//     console.log("❌ [SimpleBill Error]:", err.message || err);
//     ToastAndroid.show("❌ Error creating bill", ToastAndroid.SHORT);
//   }
// }










// // ✅ SimpleBill.ts
// import { ToastAndroid } from "react-native";
// import RNBluetoothClassic from "react-native-bluetooth-classic";
// import { getRecentCompanyProfile } from "../party/companyService";

// export type CartItem = {
//   id: string;
//   name: string;
//   price?: number;
//   quantity: number;
// };

// export type BillOptions = {
//   customerName?: string;
//   phone?: string;
//   notes?: string;
// };

// let connectedPrinter: RNBluetoothClassic.BluetoothDevice | null = null;

// // ✅ Step 1: Connect to Bluetooth Printer
// export async function ensurePrinterConnected() {
//   try {
//     if (connectedPrinter && (await connectedPrinter.isConnected())) return connectedPrinter;

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

// // ✅ Step 2: Print helper
// export async function printBill(text: string) {
//   try {
//     if (!connectedPrinter) {
//       const printer = await ensurePrinterConnected();
//       if (!printer) return;
//     }

//     await connectedPrinter?.write(text);
//     const CUT_PAPER = Buffer.from([0x1D, 0x56, 0x42, 0x00]);
//     await connectedPrinter?.write(CUT_PAPER);

//     ToastAndroid.show("🧾 Bill Printed & Paper Cut!", ToastAndroid.SHORT);
//   } catch (err) {
//     console.log("Print error:", err);
//     ToastAndroid.show("❌ Print failed", ToastAndroid.SHORT);
//   }
// }

// // ✅ Step 3: Full SimpleBill Function (Instant Print + Async Save)
// export async function SimpleBill(
//   cartItems: CartItem[],
//   token: string,
//   userClerkId: string,
//   options?: BillOptions
// ) {
//   try {
//     if (!token) throw new Error("❌ Clerk token missing!");
//     if (!userClerkId) throw new Error("❌ userClerkId missing!");

//     const companyInfo = await getRecentCompanyProfile(token);
//     const date = new Date();
//     const billNo = `MS-${Math.floor(Math.random() * 10000) + 5000}`;

//     const products = cartItems.map((item) => ({
//       productId: item.id,
//       name: item.name,
//       quantity: item.quantity,
//       price: item.price ?? 0,
//       total: (item.price ?? 0) * item.quantity,
//     }));

//     const total = products.reduce((sum, p) => sum + p.total, 0);

//     const payload = {
//       userClerkId,
//       customerName: options?.customerName || "Walk-in",
//       phone: options?.phone || "-",
//       date: date.toISOString(),
//       billNo,
//       products,
//       total,
//       grandTotal: total,
//       discount: 0,
//       gst: 0,
//       paymentMode: "CASH",
//       paymentStatus: "PAID",
//       notes: options?.notes || `Bill No ${billNo}`,
//       companyName: companyInfo?.companyName || "KRAVY Billing",
//       companyAddress: companyInfo?.companyAddress || "New Delhi, India",
//       companyPhone: companyInfo?.companyPhone || "+91-9999999999",
//     };

//     // ✅ Format bill for instant print
//     const itemsText = products
//       .map(
//         (i) =>
//           `${i.name.padEnd(12)} ${String(i.quantity).padEnd(3)} ₹${i.total
//             .toFixed(2)
//             .padStart(6)}`
//       )
//       .join("\n");

//     const billText = `
// ${payload.companyName}
// ${payload.companyAddress}
// Phone: ${payload.companyPhone}
// -----------------------------
// Bill No: ${billNo}
// Date: ${date.toLocaleString()}
// Customer: ${payload.customerName}
// Phone: ${payload.phone}
// -----------------------------
// Item         Qty   Total
// ${itemsText}
// -----------------------------
// TOTAL: ₹${total.toFixed(2)}
// -----------------------------
// Thank You! Visit Again 🙏
// \n\n`;

//     // ✅ 1️⃣ Print Instantly First
//     await printBill(billText);

//     // ✅ 2️⃣ Save Bill in Background (Non-blocking)
//     (async () => {
//       try {
//         const res = await fetch("https://billing-backend-sable.vercel.app/api/billing", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify(payload),
//         });

//         if (!res.ok) {
//           const errorText = await res.text();
//           console.log("❌ Backend save error:", errorText);
//         } else {
//           console.log("✅ Bill saved successfully in background!");
//         }
//       } catch (err) {
//         console.log("⚠️ Background save failed:", err);
//       }
//     })();

//     return { status: "success", payload };
//   } catch (err: any) {
//     console.log("❌ [SimpleBill Error]:", err.message || err);
//     ToastAndroid.show("❌ Error creating bill", ToastAndroid.SHORT);
//   }
// }


























// // ✅ SimpleBill.ts
// import { ToastAndroid } from "react-native";
// import RNBluetoothClassic from "react-native-bluetooth-classic";
// import { getRecentCompanyProfile } from "../party/companyService";

// export type CartItem = {
//   id: string;
//   name: string;
//   price?: number;
//   quantity: number;
// };

// export type BillOptions = {
//   customerName?: string;
//   phone?: string;
//   notes?: string;
//   paymentMode?: string; // ✅ Added
// };

// let connectedPrinter: RNBluetoothClassic.BluetoothDevice | null = null;

// // ✅ Step 1: Ensure Printer Connected
// export async function ensurePrinterConnected() {
//   try {
//     if (connectedPrinter && (await connectedPrinter.isConnected())) return connectedPrinter;

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

// // ✅ Step 2: Print helper
// export async function printBill(text: string) {
//   try {
//     if (!connectedPrinter) {
//       const printer = await ensurePrinterConnected();
//       if (!printer) return;
//     }

//     await connectedPrinter?.write(text);
//     const CUT_PAPER = Buffer.from([0x1D, 0x56, 0x42, 0x00]);
//     await connectedPrinter?.write(CUT_PAPER);

//     ToastAndroid.show("🧾 Bill Printed!", ToastAndroid.SHORT);
//   } catch (err) {
//     console.log("Print error:", err);
//     ToastAndroid.show("❌ Print failed", ToastAndroid.SHORT);
//   }
// }

// // ✅ Step 3: Full Bill Function (Save + Print Instantly)
// export async function SimpleBill(
//   cartItems: CartItem[],
//   token: string,
//   userClerkId: string,
//   options?: BillOptions
// ) {
//   try {
//     console.log("🪪 Clerk Token:", token);
//     console.log("👤 userClerkId:", userClerkId);

//     if (!token) throw new Error("❌ Clerk token missing!");
//     if (!userClerkId) throw new Error("❌ userClerkId missing!");

//     // 🏢 Fetch recent company info
//     const companyInfo = await getRecentCompanyProfile(token);

//     const date = new Date();
//     const billNo = `MS-${Math.floor(Math.random() * 10000) + 5000}`;

//     const products = cartItems.map((item) => ({
//       productId: item.id,
//       name: item.name,
//       quantity: item.quantity,
//       price: item.price ?? 0,
//       total: (item.price ?? 0) * item.quantity,
//     }));

//     const total = products.reduce((sum, p) => sum + p.total, 0);

//     const paymentMode = options?.paymentMode || "CASH"; // ✅ Default if not given

//     const payload = {
//       userClerkId,
//       customerName: options?.customerName || "Walk-in",
//       phone: options?.phone || "-",
//       date: date.toISOString(),
//       billNo,
//       products,
//       total,
//       grandTotal: total,
//       discount: 0,
//       gst: 0,
//       paymentMode, // ✅ dynamic
//       paymentStatus: "PAID",
//       notes: options?.notes || `Bill No ${billNo}`,
//       companyName: companyInfo?.companyName || "KRAVY Billing",
//       companyAddress: companyInfo?.companyAddress || "New Delhi, India",
//       companyPhone: companyInfo?.companyPhone || "+91-9999999999",
//     };

//     // ✅ Print text (instantly shown)
//     const itemsText = products
//       .map(
//         (i) =>
//           `${i.name.padEnd(12)} ${String(i.quantity).padEnd(3)} ₹${i.total
//             .toFixed(2)
//             .padStart(6)}`
//       )
//       .join("\n");

//     const billText = `
// ${payload.companyName}
// ${payload.companyAddress}
// Phone: ${payload.companyPhone}
// -----------------------------
// Bill No: ${billNo}
// Date: ${date.toLocaleString()}
// Customer: ${payload.customerName}
// Phone: ${payload.phone}
// Payment: ${paymentMode} ✅
// -----------------------------
// Item         Qty   Total
// ${itemsText}
// -----------------------------
// TOTAL: ₹${total.toFixed(2)}
// -----------------------------
// Thank You! Visit Again 🙏
// \n\n`;

//     // ✅ Start saving and printing instantly in parallel
//     printBill(billText); // print immediately (non-blocking)

//     // ✅ Save bill (background)
//     const res = await fetch("https://billing-backend-sable.vercel.app/api/billing", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(payload),
//     });

//     if (!res.ok) {
//       const errorText = await res.text();
//       console.log("❌ Backend save error:", errorText);
//       ToastAndroid.show("⚠️ Bill save failed!", ToastAndroid.SHORT);
//     } else {
//       ToastAndroid.show("✅ Bill saved!", ToastAndroid.SHORT);
//     }

//     return { status: "success", payload };
//   } catch (err: any) {
//     console.log("❌ [SimpleBill Error]:", err.message || err);
//     ToastAndroid.show("❌ Error creating bill", ToastAndroid.SHORT);
//   }
// }












// import { ToastAndroid } from "react-native";
// import RNBluetoothClassic from "react-native-bluetooth-classic";
// import { getRecentCompanyProfile } from "../party/companyService";
// import { fromByteArray } from "base64-js";

// export type CartItem = {
//   id: string;
//   name: string;
//   price?: number;
//   quantity: number;
// };

// export type BillOptions = {
//   customerName?: string;
//   phone?: string;
//   notes?: string;
//   paymentMode?: string;
// };

// let connectedPrinter: RNBluetoothClassic.BluetoothDevice | null = null;

// // ✅ Step 1: Ensure Printer Connected
// export async function ensurePrinterConnected() {
//   try {
//     if (connectedPrinter && (await connectedPrinter.isConnected())) return connectedPrinter;

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

// // ✅ Step 2: Print Helper
// export async function printBill(text: string) {
//   try {
//     if (!connectedPrinter) {
//       const printer = await ensurePrinterConnected();
//       if (!printer) return;
//     }

//     // Clean up any hidden or Unicode chars
//     const cleanText = text.replace(/[^\x00-\x7F]/g, "");

//     await connectedPrinter?.write(cleanText);

//     // 🧾 ESC/POS Cut Paper Command (base64 safe)
//     const CUT_PAPER_BYTES = [0x1d, 0x56, 0x42, 0x00];
//     const base64Cut = fromByteArray(Uint8Array.from(CUT_PAPER_BYTES));
//     await connectedPrinter?.write(base64Cut);

//     ToastAndroid.show("🧾 Bill Printed!", ToastAndroid.SHORT);
//   } catch (err) {
//     console.log("Print error:", err);
//     ToastAndroid.show("❌ Print failed", ToastAndroid.SHORT);
//   }
// }

// // ✅ Step 3: Full Bill Function (Save + Print Instantly)
// export async function SimpleBill(
//   cartItems: CartItem[],
//   token: string,
//   userClerkId: string,
//   options?: BillOptions
// ) {
//   try {
//     console.log("🪪 Clerk Token:", token);
//     console.log("👤 userClerkId:", userClerkId);

//     if (!token) throw new Error("❌ Clerk token missing!");
//     if (!userClerkId) throw new Error("❌ userClerkId missing!");

//     // 🏢 Fetch recent company info
//     const companyInfo = await getRecentCompanyProfile(token);

//     const date = new Date();
//     const billNo = `MS-${Math.floor(Math.random() * 10000) + 5000}`;

//     const products = cartItems.map((item) => ({
//       productId: item.id,
//       name: item.name,
//       quantity: item.quantity,
//       price: item.price ?? 0,
//       total: (item.price ?? 0) * item.quantity,
//     }));

//     const total = products.reduce((sum, p) => sum + p.total, 0);
//     const paymentMode = options?.paymentMode || "CASH";

//     const payload = {
//       userClerkId,
//       customerName: options?.customerName || "Walk-in",
//       phone: options?.phone?.trim() || "",
//       date: date.toISOString(),
//       billNo,
//       products,
//       total,
//       grandTotal: total,
//       discount: 0,
//       gst: 0,
//       paymentMode,
//       paymentStatus: "PAID",
//       notes: options?.notes || `Bill No ${billNo}`,
//       companyName: companyInfo?.companyName || "KRAVY Billing",
//       companyAddress: companyInfo?.companyAddress || "New Delhi, India",
//       companyPhone: companyInfo?.companyPhone || "",
//     };

//     // ✅ Center-align company info
//     const companyBlock = `
//           ${payload.companyName}
//           ${payload.companyAddress}
//           ${payload.companyPhone ? "Ph: " + payload.companyPhone : ""}
//     `.trim();

//     // ✅ Items formatting
//     const itemsText = products
//       .map(
//         (i) =>
//           `${i.name.slice(0, 12).padEnd(12)} ${String(i.quantity)
//             .padEnd(3)} ₹${i.total.toFixed(2).padStart(6)}`
//       )
//       .join("\n");

//     // ✅ Optional customer phone
//     const customerDetails =
//       payload.phone && payload.phone.length > 3
//         ? `Customer: ${payload.customerName}\nPhone: ${payload.phone}`
//         : `Customer: ${payload.customerName}`;

//     // ✅ Build printable bill text
//     const billText = `
// --------------------------------
// ${companyBlock}
// --------------------------------
// Bill No: ${billNo}
// Date: ${date.toLocaleString()}
// ${customerDetails}
// Payment: ${paymentMode}
// --------------------------------
// Item          Qty   Total
// ${itemsText}
// --------------------------------
// TOTAL: ₹${total.toFixed(2)}
// --------------------------------
//      Thank You! Visit Again 🙏
// \n\n`;

//     // ✅ Print instantly (non-blocking)
//     printBill(billText);

//     // ✅ Save to backend (async)
//     const res = await fetch("https://billing-backend-sable.vercel.app/api/billing", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(payload),
//     });

//     if (!res.ok) {
//       const errText = await res.text();
//       console.log("❌ Backend Error:", errText);
//       ToastAndroid.show("⚠️ Bill save failed!", ToastAndroid.SHORT);
//     } else {
//       ToastAndroid.show("✅ Bill saved!", ToastAndroid.SHORT);
//     }

//     return { status: "success", payload };
//   } catch (err: any) {
//     console.log("❌ [SimpleBill Error]:", err.message || err);
//     ToastAndroid.show("❌ Error creating bill", ToastAndroid.SHORT);
//   }
// }




// import { ToastAndroid } from "react-native";
// import RNBluetoothClassic from "react-native-bluetooth-classic";
// import { getRecentCompanyProfile } from "../party/companyService";
// import { fromByteArray } from "base64-js";

// export type CartItem = {
//   id: string;
//   name: string;
//   price?: number;
//   quantity: number;
// };

// export type BillOptions = {
//   customerName?: string;
//   phone?: string;
//   notes?: string;
//   paymentMode?: string;
// };

// let connectedPrinter: RNBluetoothClassic.BluetoothDevice | null = null;

// // ✅ Connect printer
// export async function ensurePrinterConnected() {
//   try {
//     if (connectedPrinter && (await connectedPrinter.isConnected())) return connectedPrinter;

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

// // ✅ Print helper
// export async function printBill(text: string) {
//   try {
//     if (!connectedPrinter) {
//       const printer = await ensurePrinterConnected();
//       if (!printer) return;
//     }

//     const cleanText = text.replace(/[^\x00-\x7F]/g, ""); // Remove non-ASCII
//     await connectedPrinter?.write(cleanText);

//     // ESC/POS cut paper
//     const CUT_PAPER_BYTES = [0x1d, 0x56, 0x42, 0x00];
//     const base64Cut = fromByteArray(Uint8Array.from(CUT_PAPER_BYTES));
//     await connectedPrinter?.write(base64Cut);

//     ToastAndroid.show("🧾 Bill Printed!", ToastAndroid.SHORT);
//   } catch (err) {
//     console.log("Print error:", err);
//     ToastAndroid.show("❌ Print failed", ToastAndroid.SHORT);
//   }
// }

// // ✅ Main SimpleBill function
// export async function SimpleBill(
//   cartItems: CartItem[],
//   token: string,
//   userClerkId: string,
//   options?: BillOptions
// ) {
//   try {
//     if (!token) throw new Error("❌ Clerk token missing!");
//     if (!userClerkId) throw new Error("❌ userClerkId missing!");

//     const companyInfo = await getRecentCompanyProfile(token);
//     const date = new Date();
//     const billNo = `MS-${Math.floor(Math.random() * 10000) + 5000}`;

//     const products = cartItems.map((item) => ({
//       productId: item.id,
//       name: item.name,
//       quantity: item.quantity,
//       price: item.price ?? 0,
//       total: (item.price ?? 0) * item.quantity,
//     }));

//     const total = products.reduce((sum, p) => sum + p.total, 0);
//     const paymentMode = options?.paymentMode || "CASH";

//     const payload = {
//       userClerkId,
//       customerName: options?.customerName || "Walk-in",
//       phone: options?.phone?.trim() || "",
//       date: date.toISOString(),
//       billNo,
//       products,
//       total,
//       grandTotal: total,
//       discount: 0,
//       gst: 0,
//       paymentMode,
//       paymentStatus: "PAID",
//       notes: options?.notes || `Bill No ${billNo}`,
//       companyName: companyInfo?.companyName || "KRAVY Billing",
//       companyAddress: companyInfo?.companyAddress || "New Delhi, India",
//       companyPhone: companyInfo?.companyPhone || "",
//     };

//     // Centered Company Name & Address
//     const companyBlock = `
//         ${payload.companyName}
//         ${payload.companyAddress}
//         ${payload.companyPhone ? "Ph: " + payload.companyPhone : ""}
//     `.trim();

//     // Format Items with proper Qty & Total alignment
//     const itemsText = products
//       .map(
//         (i) =>
//           `${i.name.slice(0, 12).padEnd(12)} ${String(i.quantity)
//             .padStart(3)}   ₹${i.total.toFixed(2).padStart(7)}`
//       )
//       .join("\n");

//     // Customer details optional
//     const customerDetails =
//       payload.phone && payload.phone.length > 3
//         ? `Customer: ${payload.customerName}\nPhone: ${payload.phone}`
//         : `Customer: ${payload.customerName}`;

//     // Final bill text
//     const billText = `
// --------------------------------
// ${companyBlock}
// --------------------------------
// Bill No: ${billNo}
// Date: ${date.toLocaleString()}
// ${customerDetails}
// Payment: ${paymentMode}
// --------------------------------
// Item          Qty   Total
// ${itemsText}
// --------------------------------
// TOTAL: ₹${total.toFixed(2)}
// --------------------------------
//        Thank You! Visit Again 🙏
// \n\n`;

//     // Print instantly
//     printBill(billText);

//     // Save bill in backend
//     const res = await fetch("https://billing-backend-sable.vercel.app/api/billing", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(payload),
//     });

//     if (!res.ok) {
//       const errText = await res.text();
//       console.log("❌ Backend Error:", errText);
//       ToastAndroid.show("⚠️ Bill save failed!", ToastAndroid.SHORT);
//     } else {
//       ToastAndroid.show("✅ Bill saved!", ToastAndroid.SHORT);
//     }

//     return { status: "success", payload };
//   } catch (err: any) {
//     console.log("❌ [SimpleBill Error]:", err.message || err);
//     ToastAndroid.show("❌ Error creating bill", ToastAndroid.SHORT);
//   }
// }


















// // ✅ SimpleBill.ts
// import { ToastAndroid } from "react-native";
// import RNBluetoothClassic from "react-native-bluetooth-classic";
// import { getRecentCompanyProfile } from "../party/companyService";
// import { fromByteArray } from "base64-js";

// export type CartItem = {
//   id: string;
//   name: string;
//   price?: number;
//   quantity: number;
// };

// export type BillOptions = {
//   customerName?: string;
//   phone?: string;
//   notes?: string;
//   paymentMode?: string;
// };

// let connectedPrinter: RNBluetoothClassic.BluetoothDevice | null = null;

// // Helper to center text for a 32-character line (common for small thermal printers)
// const centerText = (text: string, width: number = 32): string => {
//     if (text.length >= width) return text;
//     const padding = Math.floor((width - text.length) / 2);
//     return ' '.repeat(padding) + text;
// };

// // Helper to pad the item block for better alignment
// const line = (char: string = '-', width: number = 32): string => char.repeat(width);


// // ✅ Connect printer
// export async function ensurePrinterConnected() {
//   try {
//     if (connectedPrinter && (await connectedPrinter.isConnected())) return connectedPrinter;

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

// // ✅ Print helper
// export async function printBill(text: string) {
//   try {
//     if (!connectedPrinter) {
//       const printer = await ensurePrinterConnected();
//       if (!printer) return;
//     }

//     const cleanText = text.replace(/[^\x00-\x7F]/g, ""); // Remove non-ASCII
//     await connectedPrinter?.write(cleanText);

//     // ESC/POS cut paper
//     const CUT_PAPER_BYTES = [0x1d, 0x56, 0x42, 0x00];
//     const base64Cut = fromByteArray(Uint8Array.from(CUT_PAPER_BYTES));
//     await connectedPrinter?.write(base64Cut);

//     ToastAndroid.show("🧾 Bill Printed!", ToastAndroid.SHORT);
//   } catch (err) {
//     console.log("Print error:", err);
//     ToastAndroid.show("❌ Print failed", ToastAndroid.SHORT);
//   }
// }

// // ✅ Main SimpleBill function
// export async function SimpleBill(
//   cartItems: CartItem[],
//   token: string,
//   userClerkId: string,
//   options?: BillOptions
// ) {
//   try {
//     if (!token) throw new Error("❌ Clerk token missing!");
//     if (!userClerkId) throw new Error("❌ userClerkId missing!");

//     const companyInfo = await getRecentCompanyProfile(token);
//     const date = new Date();
//     const billNo = `MS-${Math.floor(Math.random() * 10000) + 5000}`;

//     const products = cartItems.map((item) => ({
//       productId: item.id,
//       name: item.name,
//       quantity: item.quantity,
//       price: item.price ?? 0,
//       total: (item.price ?? 0) * item.quantity,
//     }));

//     const total = products.reduce((sum, p) => sum + p.total, 0);
//     const paymentMode = options?.paymentMode || "CASH";

//     const payload = {
//       userClerkId,
//       customerName: options?.customerName || "Walk-in",
//       phone: options?.phone?.trim() || "",
//       date: date.toISOString(),
//       billNo,
//       products,
//       total,
//       grandTotal: total,
//       discount: 0,
//       gst: 0,
//       paymentMode,
//       paymentStatus: "PAID",
//       notes: options?.notes || `Bill No ${billNo}`,
//       // 🚨 FIX: Hardcoded company name and set a default address
//       companyName: "Magic scale", 
//       companyAddress: companyInfo?.companyAddress || "New Delhi, India",
//       companyPhone: companyInfo?.companyPhone || "",
//     };

//     // --- Bill Formatting Logic ---
//     // 32 characters is a safe width for small/medium thermal printers (58mm)

//     // 1. Centered Company Block
//     const centeredCompanyName = centerText(payload.companyName, 32);
//     const centeredAddress = centerText(payload.companyAddress, 32);
//     const centeredPhone = payload.companyPhone 
//         ? centerText(`Ph: ${payload.companyPhone}`, 32) 
//         : '';
    
//     // 2. Item List Block
//     // Name (14 chars) | Qty (4 chars) | Total (10 chars) = 28 + separators
//     const itemsText = products
//       .map(
//         (i) =>
//           `${i.name.slice(0, 14).padEnd(14)} ${String(i.quantity).padStart(4)} ₹${i.total.toFixed(2).padStart(10)}`
//       )
//       .join("\n");

//     // 3. Customer Details Block
//     const customerDetails =
//       payload.phone && payload.phone.length > 3
//         ? `Customer: ${payload.customerName}\nPh: ${payload.phone}`
//         : `Customer: ${payload.customerName}`;
        
//     // 4. Final bill text
//     const billText = `
// ${line('=')}
// ${centeredCompanyName}
// ${centeredAddress}
// ${centeredPhone}
// ${line('=')}
// Bill No: ${billNo}
// Date: ${date.toLocaleString()}
// ${customerDetails}
// Payment: ${paymentMode}
// ${line('-')}
// Item           Qty      Total
// ${line('-')}
// ${itemsText}
// ${line('-')}
// TOTAL: ${total.toFixed(2).padStart(25)}
// ${line('=')}
// ${centerText("Thank You! Visit Again 🙏", 32)}
// \n\n`; // Add extra lines for good cut spacing

//     // --- Execution ---
//     // Print instantly
//     printBill(billText);

//     // Save bill in backend
//     const res = await fetch("https://billing-backend-sable.vercel.app/api/billing", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(payload),
//     });

//     if (!res.ok) {
//       const errText = await res.text();
//       console.log("❌ Backend Error:", errText);
//       ToastAndroid.show("⚠️ Bill save failed!", ToastAndroid.SHORT);
//     } else {
//       ToastAndroid.show("✅ Bill saved!", ToastAndroid.SHORT);
//     }

//     return { status: "success", payload };
//   } catch (err: any) {
//     console.log("❌ [SimpleBill Error]:", err.message || err);
//     ToastAndroid.show("❌ Error creating bill", ToastAndroid.SHORT);
//   }
// }



// import { ToastAndroid } from "react-native";
// import RNBluetoothClassic from "react-native-bluetooth-classic";
// import { getRecentCompanyProfile } from "../party/companyService";
// import { fromByteArray } from "base64-js";

// export type CartItem = {
//   id: string;
//   name: string;
//   price?: number;
//   quantity: number;
// };

// export type BillOptions = {
//   customerName?: string;
//   phone?: string;
//   notes?: string;
//   paymentMode?: string;
// };

// let connectedPrinter: RNBluetoothClassic.BluetoothDevice | null = null;

// // ✅ Step 1: Ensure Printer Connected
// export async function ensurePrinterConnected() {
//   try {
//     if (connectedPrinter && (await connectedPrinter.isConnected())) return connectedPrinter;

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

// // ✅ Step 2: Print Helper
// export async function printBill(text: string) {
//   try {
//     if (!connectedPrinter) {
//       const printer = await ensurePrinterConnected();
//       if (!printer) return;
//     }

//     // Clean up any hidden or Unicode chars
//     const cleanText = text.replace(/[^\x00-\x7F]/g, "");

//     await connectedPrinter?.write(cleanText);

//     // 🧾 ESC/POS Cut Paper Command (base64 safe)
//     const CUT_PAPER_BYTES = [0x1d, 0x56, 0x42, 0x00];
//     const base64Cut = fromByteArray(Uint8Array.from(CUT_PAPER_BYTES));
//     await connectedPrinter?.write(base64Cut);

//     ToastAndroid.show("🧾 Bill Printed!", ToastAndroid.SHORT);
//   } catch (err) {
//     console.log("Print error:", err);
//     ToastAndroid.show("❌ Print failed", ToastAndroid.SHORT);
//   }
// }

// // ✅ Step 3: Full Bill Function (Save + Print Instantly)
// export async function SimpleBill(
//   cartItems: CartItem[],
//   token: string,
//   userClerkId: string,
//   options?: BillOptions
// ) {
//   try {
//     console.log("🪪 Clerk Token:", token);
//     console.log("👤 userClerkId:", userClerkId);

//     if (!token) throw new Error("❌ Clerk token missing!");
//     if (!userClerkId) throw new Error("❌ userClerkId missing!");

//     // 🏢 Fetch recent company info
//     const companyInfo = await getRecentCompanyProfile(token);

//     const date = new Date();
//     const billNo = `MS-${Math.floor(Math.random() * 10000) + 5000}`;

//     const products = cartItems.map((item) => ({
//       productId: item.id,
//       name: item.name,
//       quantity: item.quantity,
//       price: item.price ?? 0,
//       total: (item.price ?? 0) * item.quantity,
//     }));

//     const total = products.reduce((sum, p) => sum + p.total, 0);
//     const paymentMode = options?.paymentMode || "CASH";

//     const payload = {
//       userClerkId,
//       customerName: options?.customerName || "Walk-in",
//       phone: options?.phone?.trim() || "",
//       date: date.toISOString(),
//       billNo,
//       products,
//       total,
//       grandTotal: total,
//       discount: 0,
//       gst: 0,
//       paymentMode,
//       paymentStatus: "PAID",
//       notes: options?.notes || `Bill No ${billNo}`,
//       companyName: companyInfo?.companyName || "KRAVY Billing",
//       companyAddress: companyInfo?.companyAddress || "New Delhi, India",
//       companyPhone: companyInfo?.companyPhone || "",
//     };

//     // ✅ Center-align company info
//     const companyBlock = `
//           ${payload.companyName}
//           ${payload.companyAddress}
//           ${payload.companyPhone ? "Ph: " + payload.companyPhone : ""}
//     `.trim();

//     // ✅ Items formatting
//     const itemsText = products
//       .map(
//         (i) =>
//           `${i.name.slice(0, 12).padEnd(12)} ${String(i.quantity)
//             .padEnd(3)} ₹${i.total.toFixed(2).padStart(6)}`
//       )
//       .join("\n");

//     // ✅ Optional customer phone
//     const customerDetails =
//       payload.phone && payload.phone.length > 3
//         ? `Customer: ${payload.customerName}\nPhone: ${payload.phone}`
//         : `Customer: ${payload.customerName}`;

//     // ✅ Build printable bill text
//     const billText = `
// --------------------------------
// ${companyBlock}
// --------------------------------
// Bill No: ${billNo}
// Date: ${date.toLocaleString()}
// ${customerDetails}
// Payment: ${paymentMode}
// --------------------------------
// Item          Qty   Total
// ${itemsText}
// --------------------------------
// TOTAL: ₹${total.toFixed(2)}
// --------------------------------
//      Thank You! Visit Again 🙏
// \n\n`;

//     // ✅ Print instantly (non-blocking)
//     printBill(billText);

//     // ✅ Save to backend (async)
//     const res = await fetch("https://billing-backend-sable.vercel.app/api/billing", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(payload),
//     });

//     if (!res.ok) {
//       const errText = await res.text();
//       console.log("❌ Backend Error:", errText);
//       ToastAndroid.show("⚠️ Bill save failed!", ToastAndroid.SHORT);
//     } else {
//       ToastAndroid.show("✅ Bill saved!", ToastAndroid.SHORT);
//     }

//     return { status: "success", payload };
//   } catch (err: any) {
//     console.log("❌ [SimpleBill Error]:", err.message || err);
//     ToastAndroid.show("❌ Error creating bill", ToastAndroid.SHORT);
//   }
// }


// // ✅ SimpleBill.ts
// import { ToastAndroid } from "react-native";
// import RNBluetoothClassic from "react-native-bluetooth-classic";
// import { getRecentCompanyProfile } from "../party/companyService";
// import { fromByteArray } from "base64-js";

// export type CartItem = {
//   id: string;
//   name: string;
//   price?: number;
//   quantity: number;
// };

// export type BillOptions = {
//   customerName?: string;
//   phone?: string;
//   notes?: string;
//   paymentMode?: string;
// };

// let connectedPrinter: RNBluetoothClassic.BluetoothDevice | null = null;

// // Helper to center text for a 32-character line (common for small thermal printers)
// const centerText = (text: string, width: number = 32): string => {
//     if (text.length >= width) return text;
//     const padding = Math.floor((width - text.length) / 2);
//     return ' '.repeat(padding) + text;
// };

// // Helper to pad the item block for better alignment
// const line = (char: string = '-', width: number = 32): string => char.repeat(width);


// // ✅ Connect printer
// export async function ensurePrinterConnected() {
//   try {
//     if (connectedPrinter && (await connectedPrinter.isConnected())) return connectedPrinter;

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

// // ✅ Print helper
// export async function printBill(text: string) {
//   try {
//     if (!connectedPrinter) {
//       const printer = await ensurePrinterConnected();
//       if (!printer) return;
//     }

//     const cleanText = text.replace(/[^\x00-\x7F]/g, ""); // Remove non-ASCII
//     await connectedPrinter?.write(cleanText);

//     // ESC/POS cut paper
//     const CUT_PAPER_BYTES = [0x1d, 0x56, 0x42, 0x00];
//     const base64Cut = fromByteArray(Uint8Array.from(CUT_PAPER_BYTES));
//     await connectedPrinter?.write(base64Cut);

//     ToastAndroid.show("🧾 Bill Printed!", ToastAndroid.SHORT);
//   } catch (err) {
//     console.log("Print error:", err);
//     ToastAndroid.show("❌ Print failed", ToastAndroid.SHORT);
//   }
// }

// // ✅ Main SimpleBill function
// export async function SimpleBill(
//   cartItems: CartItem[],
//   token: string,
//   userClerkId: string,
//   options?: BillOptions
// ) {
//   try {
//     if (!token) throw new Error("❌ Clerk token missing!");
//     if (!userClerkId) throw new Error("❌ userClerkId missing!");

//     const companyInfo = await getRecentCompanyProfile(token);
//     const date = new Date();
//     const billNo = `MS-${Math.floor(Math.random() * 10000) + 5000}`;

//     const products = cartItems.map((item) => ({
//       productId: item.id,
//       name: item.name,
//       quantity: item.quantity,
//       price: item.price ?? 0,
//       total: (item.price ?? 0) * item.quantity,
//     }));

//     const total = products.reduce((sum, p) => sum + p.total, 0);
//     const paymentMode = options?.paymentMode || "CASH";

//     const payload = {
//       userClerkId,
//       customerName: options?.customerName || "Walk-in",
//       phone: options?.phone?.trim() || "",
//       date: date.toISOString(),
//       billNo,
//       products,
//       total,
//       grandTotal: total,
//       discount: 0,
//       gst: 0,
//       paymentMode,
//       paymentStatus: "PAID",
//       notes: options?.notes || `Bill No ${billNo}`,
//       // 🚨 FIX: Hardcoded company name and set a default address
//       companyName: "Magic scale", 
//       companyAddress: companyInfo?.companyAddress || "New Delhi, India",
//       companyPhone: companyInfo?.companyPhone || "",
//     };

//     // --- Bill Formatting Logic ---
//     // 32 characters is a safe width for small/medium thermal printers (58mm)

//     // 1. Centered Company Block
//     const centeredCompanyName = centerText(payload.companyName, 32);
//     const centeredAddress = centerText(payload.companyAddress, 32);
//     const centeredPhone = payload.companyPhone 
//         ? centerText(`Ph: ${payload.companyPhone}`, 32) 
//         : '';
    
//     // 2. Item List Block
//     // Name (14 chars) | Qty (4 chars) | Total (10 chars) = 28 + separators
//     const itemsText = products
//       .map(
//         (i) =>
//           `${i.name.slice(0, 14).padEnd(14)} ${String(i.quantity).padStart(4)} ₹${i.total.toFixed(2).padStart(10)}`
//       )
//       .join("\n");

//     // 3. Customer Details Block
//     const customerDetails =
//       payload.phone && payload.phone.length > 3
//         ? `Customer: ${payload.customerName}\nPh: ${payload.phone}`
//         : `Customer: ${payload.customerName}`;
        
//     // 4. Final bill text
//     const billText = `
// ${line('=')}
// ${centeredCompanyName}
// ${centeredAddress}
// ${centeredPhone}
// ${line('=')}
// Bill No: ${billNo}
// Date: ${date.toLocaleString()}
// ${customerDetails}
// Payment: ${paymentMode}
// ${line('-')}
// Item           Qty      Total
// ${line('-')}
// ${itemsText}
// ${line('-')}
// TOTAL: ${total.toFixed(2).padStart(25)}
// ${line('=')}
// ${centerText("Thank You! Visit Again 🙏", 32)}
// \n\n`; // Add extra lines for good cut spacing

//     // --- Execution ---
//     // Print instantly
//     printBill(billText);

//     // Save bill in backend
//     const res = await fetch("https://billing-backend-sable.vercel.app/api/billing", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(payload),
//     });

//     if (!res.ok) {
//       const errText = await res.text();
//       console.log("❌ Backend Error:", errText);
//       ToastAndroid.show("⚠️ Bill save failed!", ToastAndroid.SHORT);
//     } else {
//       ToastAndroid.show("✅ Bill saved!", ToastAndroid.SHORT);
//     }

//     return { status: "success", payload };
//   } catch (err: any) {
//     console.log("❌ [SimpleBill Error]:", err.message || err);
//     ToastAndroid.show("❌ Error creating bill", ToastAndroid.SHORT);
//   }
// }












// // ✅ SimpleBill.ts
// import { ToastAndroid } from "react-native";
// import RNBluetoothClassic from "react-native-bluetooth-classic";
// import { getRecentCompanyProfile } from "../party/companyService";
// import { fromByteArray } from "base64-js";

// export type CartItem = {
//   id: string;
//   name: string;
//   price?: number;
//   quantity: number;
// };

// export type BillOptions = {
//   customerName?: string;
//   phone?: string;
//   notes?: string;
//   paymentMode?: string;
// };

// let connectedPrinter: RNBluetoothClassic.BluetoothDevice | null = null;

// // Helper to center text for a 32-character line (common for small thermal printers)
// const centerText = (text: string, width: number = 32): string => {
//     if (text.length >= width) return text;
//     const padding = Math.floor((width - text.length) / 2);
//     return ' '.repeat(padding) + text;
// };

// // Helper to pad the item block for better alignment
// // 🔄 FIX: Changed line separator to always use a single character
// const line = (char: string = '-', width: number = 32): string => char.repeat(width);


// // ✅ Connect printer
// export async function ensurePrinterConnected() {
//   try {
//     if (connectedPrinter && (await connectedPrinter.isConnected())) return connectedPrinter;

//     const devices = await RNBluetoothClassic.getBondedDevices();
//     const printer = devices.find(
//       (d) =>
//         d.name?.toLowerCase().includes("tish") ||
//         d.name?.toLowerCase().includes("mt580")
//     );

//     if (!printer) {
//       ToastAndroid.show("⚠️ Tish printer not found!", ToastAndroid.SHORT);
//       return null;
//     }

//     connectedPrinter = await RNBluetoothClassic.connectToDevice(printer.address);
//     if (!connectedPrinter || !(await connectedPrinter.isConnected())) {
//       ToastAndroid.show("❌ Failed to connect printer!", ToastAndroid.SHORT);
//       connectedPrinter = null;
//       return null;
//     }

//     ToastAndroid.show(`✅ Connected: ${printer.name}`, ToastAndroid.SHORT);
//     return connectedPrinter;
//   } catch (err) {
//     console.log("Printer connect error:", err);
//     ToastAndroid.show("⚠️ Printer connection failed", ToastAndroid.SHORT);
//     connectedPrinter = null;
//     return null;
//   }
// }

// // ✅ Print helper - FIX: Use raw bytes for cut command
// export async function printBill(text: string) {
//   try {
//     if (!connectedPrinter) {
//       const printer = await ensurePrinterConnected();
//       if (!printer) return;
//     }

//     // Remove non-ASCII characters to prevent printing issues
//     const cleanText = text.replace(/[^\x00-\x7F]/g, ""); 
//     
//     // Send the bill text
//     await connectedPrinter?.write(cleanText);

//     // ESC/POS commands for paper cut and feed - sent as Buffer/Uint8Array
//     const FEED_LINES_BYTES = new Uint8Array([0x1b, 0x64, 0x03]); // ESC d 3 (Feed 3 lines)
//     const CUT_PAPER_BYTES = new Uint8Array([0x1d, 0x56, 0x42, 0x00]); // GS V B 0 (Cut paper)
    
//     // We send the raw byte arrays directly to the device
//     await connectedPrinter?.write(FEED_LINES_BYTES); 
//     await connectedPrinter?.write(CUT_PAPER_BYTES);

//     ToastAndroid.show("🧾 Bill Printed!", ToastAndroid.SHORT);
//   } catch (err) {
//     console.log("Print error:", err);
//     ToastAndroid.show("❌ Print failed", ToastAndroid.SHORT);
//   }
// }

// // ✅ Main SimpleBill function
// export async function SimpleBill(
//   cartItems: CartItem[],
//   token: string,
//   userClerkId: string,
//   options?: BillOptions
// ) {
//   try {
//     if (!token) throw new Error("❌ Clerk token missing!");
//     if (!userClerkId) throw new Error("❌ userClerkId missing!");

//     const companyInfo = await getRecentCompanyProfile(token);
//     const date = new Date();
//     const billNo = `MS-${Math.floor(Math.random() * 10000) + 5000}`;

//     const products = cartItems.map((item) => ({
//       productId: item.id,
//       name: item.name,
//       quantity: item.quantity,
//       price: item.price ?? 0,
//       total: (item.price ?? 0) * item.quantity,
//     }));

//     const total = products.reduce((sum, p) => sum + p.total, 0);
//     const paymentMode = options?.paymentMode || "CASH";

//     const payload = {
//       userClerkId,
//       customerName: options?.customerName || "Walk-in",
//       phone: options?.phone?.trim() || "",
//       date: date.toISOString(),
//       billNo,
//       products,
//       total,
//       grandTotal: total,
//       discount: 0,
//       gst: 0,
//       paymentMode,
//       paymentStatus: "PAID",
//       notes: options?.notes || `Bill No ${billNo}`,
//       // Company name fixed as requested
//       companyName: "Magic scale", 
//       companyAddress: companyInfo?.companyAddress || "New Delhi, India",
//       companyPhone: companyInfo?.companyPhone || "",
//     };

//     // --- Bill Formatting Logic (32 characters wide) ---

//     // 1. Centered Company Block
//     const centeredCompanyName = centerText(payload.companyName.toUpperCase(), 32);
//     const centeredAddress = centerText(payload.companyAddress, 32);
//     const centeredPhone = payload.companyPhone 
//         ? centerText(`PH: ${payload.companyPhone}`, 32) 
//         : '';
//     
//     // 2. Item List Block: Name (14) | Qty (4) | Total (10)
//     const itemsText = products
//       .map(
//         (i) =>
//           `${i.name.slice(0, 14).padEnd(14)} ${String(i.quantity).padStart(4)} ₹${i.total.toFixed(2).padStart(10)}`
//       )
//       .join("\n");

//     // 3. Customer Details Block
//     const customerDetails =
//       payload.phone && payload.phone.length > 3
//         ? `Customer: ${payload.customerName}\nPh: ${payload.phone}`
//         : `Customer: ${payload.customerName}`; // 4. Final bill text
// const billText = `
// ${line('=')}
// ${centeredCompanyName}
// ${centeredAddress}
// ${centeredPhone}
// ${line('-')}
// Bill No: ${billNo}
// Date: ${date.toLocaleString()}
// ${customerDetails}
// Payment Mode: ${paymentMode}
// ${line('-')}
// Item                    Qty      Total
// ${line('-')}
// ${itemsText}
// ${line('-')}
// TOTAL: ${`₹${total.toFixed(2)}`.padStart(25)} 
// ${line('-')}
// ${centerText("Thank You! Visit Again 🙏", 32)}`; 

//     // --- Execution ---
//     // Print instantly
//     printBill(billText);

//     // Save bill in backend
//     const res = await fetch("https://billing-backend-sable.vercel.app/api/billing", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(payload),
//     });

//     if (!res.ok) {
//       const errText = await res.text();
//       console.log("❌ Backend Error:", errText);
//       ToastAndroid.show("⚠️ Bill save failed!", ToastAndroid.SHORT);
//     } else {
//       ToastAndroid.show("✅ Bill saved!", ToastAndroid.SHORT);
//     }

//     return { status: "success", payload };
//   } catch (err: any) {
//     console.log("❌ [SimpleBill Error]:", err.message || err);
//     ToastAndroid.show("❌ Error creating bill", ToastAndroid.SHORT);
//   }
// }




// import { ToastAndroid } from "react-native";
// import RNBluetoothClassic from "react-native-bluetooth-classic";
// import { getRecentCompanyProfile } from "../party/companyService";
// import { fromByteArray } from "base64-js";

// export type CartItem = {
//   id: string;
//   name: string;
//   price?: number;
//   quantity: number;
// };

// export type BillOptions = {
//   customerName?: string;
//   phone?: string;
//   notes?: string;
//   paymentMode?: string;
// };

// let connectedPrinter: RNBluetoothClassic.BluetoothDevice | null = null;

// // Center text for thermal printer width (32 chars)
// const centerText = (text: string, width: number = 32): string => {
//   if (text.length >= width) return text;
//   const pad = Math.floor((width - text.length) / 2);
//   return ' '.repeat(pad) + text;
// };

// // Line helper
// const line = (char: string = '-', width: number = 32) => char.repeat(width);

// // ✅ Connect printer
// export async function ensurePrinterConnected() {
//   try {
//     if (connectedPrinter && (await connectedPrinter.isConnected())) return connectedPrinter;

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

// // ✅ Print helper
// export async function printBill(text: string) {
//   try {
//     if (!connectedPrinter) {
//       const printer = await ensurePrinterConnected();
//       if (!printer) return;
//     }

//     const cleanText = text.replace(/[^\x00-\x7F]/g, "");
//     const encoder = new TextEncoder();
//     await connectedPrinter?.write(encoder.encode(cleanText));

//     // Feed 3 lines & cut paper
//     await connectedPrinter?.write(new Uint8Array([0x1b, 0x64, 0x03])); // ESC d 3
//     await connectedPrinter?.write(new Uint8Array([0x1d, 0x56, 0x42, 0x00])); // GS V B 0

//     ToastAndroid.show("🧾 Bill Printed!", ToastAndroid.SHORT);
//   } catch (err) {
//     console.log("Print error:", err);
//     ToastAndroid.show("❌ Print failed", ToastAndroid.SHORT);
//   }
// }

// // ✅ Main SimpleBill function
// export async function SimpleBill(
//   cartItems: CartItem[],
//   token: string,
//   userClerkId: string,
//   options?: BillOptions
// ) {
//   try {
//     if (!token) throw new Error("❌ Clerk token missing!");
//     if (!userClerkId) throw new Error("❌ userClerkId missing!");

//     const companyInfo = await getRecentCompanyProfile(token);
//     const date = new Date();
//     const billNo = `MS-${Math.floor(Math.random() * 10000) + 5000}`;

//     const products = cartItems.map((item) => ({
//       productId: item.id,
//       name: item.name,
//       quantity: item.quantity,
//       price: item.price ?? 0,
//       total: (item.price ?? 0) * item.quantity,
//     }));

//     const total = products.reduce((sum, p) => sum + p.total, 0);
//     const paymentMode = options?.paymentMode || "CASH";

//     const companyName = "Magic Scale";
//     const companyAddress = companyInfo?.companyAddress || "New Delhi, India";
//     const companyPhone = companyInfo?.companyPhone || "";

//     // --- Bill Formatting ---
//     const centeredCompanyName = centerText(companyName.toUpperCase(), 32);
//     const centeredAddress = centerText(companyAddress, 32);
//     const centeredPhone = companyPhone ? centerText(`PH: ${companyPhone}`, 32) : '';

//     const itemsText = products
//       .map(
//         (i) =>
//           `${i.name.slice(0, 14).padEnd(14)} ${String(i.quantity).padStart(4)} ₹${i.total.toFixed(2).padStart(10)}`
//       )
//       .join("\n");

//     const customerDetails =
//       options?.phone && options.phone.trim().length > 0
//         ? `Customer: ${options.customerName || "Walk-in"}\nPh: ${options.phone}`
//         : `Customer: ${options.customerName || "Walk-in"}`;

//     // --- Final Bill Text (no top blank lines) ---
//     const billText =
// `${line('=')}
// ${centeredCompanyName}
// ${centeredAddress}
// ${centeredPhone}
// ${line('-')}
// Bill No: ${billNo}
// Date: ${date.toLocaleString()}
// ${customerDetails}
// Payment Mode: ${paymentMode}
// ${line('-')}
// Item           Qty      Total
// ${line('-')}
// ${itemsText}
// ${line('-')}
// TOTAL: ${`₹${total.toFixed(2)}`.padStart(25)}
// ${line('-')}
// ${centerText("Thank You! Visit Again 🙏", 32)}
// `;

//     // Print instantly
//     await printBill(billText);

//     // Save bill in backend
//     const res = await fetch("https://billing-backend-sable.vercel.app/api/billing", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         userClerkId,
//         customerName: options?.customerName || "Walk-in",
//         phone: options?.phone || "",
//         date: date.toISOString(),
//         billNo,
//         products,
//         total,
//         grandTotal: total,
//         discount: 0,
//         gst: 0,
//         paymentMode,
//         paymentStatus: "PAID",
//         notes: options?.notes || `Bill No ${billNo}`,
//         companyName,
//         companyAddress,
//         companyPhone,
//       }),
//     });

//     if (!res.ok) {
//       const errText = await res.text();
//       console.log("❌ Backend Error:", errText);
//       ToastAndroid.show("⚠️ Bill save failed!", ToastAndroid.SHORT);
//     } else {
//       ToastAndroid.show("✅ Bill saved!", ToastAndroid.SHORT);
//     }

//     return { status: "success", payload: { companyName, billNo, total } };
//   } catch (err: any) {
//     console.log("❌ [SimpleBill Error]:", err.message || err);
//     ToastAndroid.show("❌ Error creating bill", ToastAndroid.SHORT);
//   }
// }


//corect





import { ToastAndroid } from "react-native";
import RNBluetoothClassic from "react-native-bluetooth-classic";
import { getRecentCompanyProfile } from "../party/companyService";

export type CartItem = {
  id: string;
  name: string;
  price?: number;
  quantity: number;
};

export type BillOptions = {
  customerName?: string;
  phone?: string;
  notes?: string;
  paymentMode?: string;
};

let connectedPrinter: RNBluetoothClassic.BluetoothDevice | null = null;

// Center text for thermal printer width (32 chars)
const centerText = (text: string, width: number = 32): string => {
  if (text.length >= width) return text;
  const pad = Math.floor((width - text.length) / 2);
  return ' '.repeat(pad) + text;
};

// Line helper
const line = (char: string = '-', width: number = 32) => char.repeat(width);

// ✅ Connect printer
export async function ensurePrinterConnected() {
  try {
    if (connectedPrinter && (await connectedPrinter.isConnected())) return connectedPrinter;

    const devices = await RNBluetoothClassic.getBondedDevices();
    const printer = devices.find(
      (d) =>
        d.name?.toLowerCase().includes("tish") ||
        d.name?.toLowerCase().includes("mt580")
    );

    if (!printer) {
      ToastAndroid.show("⚠️ Tish printer not found!", ToastAndroid.SHORT);
      return null;
    }

    connectedPrinter = await RNBluetoothClassic.connectToDevice(printer.address);
    if (!connectedPrinter || !(await connectedPrinter.isConnected())) {
      ToastAndroid.show("❌ Failed to connect printer!", ToastAndroid.SHORT);
      connectedPrinter = null;
      return null;
    }

    ToastAndroid.show(`✅ Connected: ${printer.name}`, ToastAndroid.SHORT);
    return connectedPrinter;
  } catch (err) {
    console.log("Printer connect error:", err);
    ToastAndroid.show("⚠️ Printer connection failed", ToastAndroid.SHORT);
    connectedPrinter = null;
    return null;
  }
}

// ✅ Print helper
export async function printBill(text: string) {
  try {
    if (!connectedPrinter) {
      const printer = await ensurePrinterConnected();
      if (!printer) return;
    }

    const cleanText = text.replace(/[^\x00-\x7F]/g, "");
    const encoder = new TextEncoder();
    await connectedPrinter?.write(encoder.encode(cleanText));

    // Feed 3 lines & cut paper
    await connectedPrinter?.write(new Uint8Array([0x1b, 0x64, 0x03])); // ESC d 3
    await connectedPrinter?.write(new Uint8Array([0x1d, 0x56, 0x42, 0x00])); // GS V B 0

    ToastAndroid.show("🧾 Bill Printed!", ToastAndroid.SHORT);
  } catch (err) {
    console.log("Print error:", err);
    ToastAndroid.show("❌ Print failed", ToastAndroid.SHORT);
  }
}

// ✅ Main SimpleBill function
export async function SimpleBill(
  cartItems: CartItem[],
  token: string,
  userClerkId: string,
  options?: BillOptions
) {
  try {
    if (!token) throw new Error("❌ Clerk token missing!");
    if (!userClerkId) throw new Error("❌ userClerkId missing!");

    const companyInfo = await getRecentCompanyProfile(token);
    const date = new Date();
    const billNo = `MS-${Math.floor(Math.random() * 10000) + 5000}`;

    const products = cartItems.map((item) => ({
      productId: item.id,
      name: item.name,
      quantity: item.quantity,
      price: item.price ?? 0,
      total: (item.price ?? 0) * item.quantity,
    }));

    const total = products.reduce((sum, p) => sum + p.total, 0);
    const paymentMode = options?.paymentMode || "CASH";

    const companyName = "Magic Scale";
    const companyAddress = companyInfo?.companyAddress || "New Delhi, India";
    const companyPhone = companyInfo?.companyPhone || "";

    // --- Bill Formatting ---
    const centeredCompanyName = centerText(companyName.toUpperCase(), 32);
    const centeredAddress = centerText(companyAddress, 32);
    const centeredPhone = companyPhone ? centerText(`PH: ${companyPhone}`, 32) : '';

    // Item List: Name (12) | Qty (3) | Price (6) | Total (7) = 28 + separators
    const itemsText = products
      .map(
        (i) =>
          `${i.name.slice(0, 12).padEnd(12)} ${String(i.quantity).padStart(3)} ${i.price?.toFixed(2).padStart(6)} ₹${i.total.toFixed(2).padStart(7)}`
      )
      .join("\n");

    const customerDetails =
      options?.phone && options.phone.trim().length > 0
        ? `Customer: ${options.customerName || "Walk-in"}\nPh: ${options.phone}`
        : `Customer: ${options.customerName || "Walk-in"}`;

    // --- Final Bill Text (no top blank lines) ---
    const billText =
`${line('=')}
${centeredCompanyName}
${centeredAddress}
${centeredPhone}
${line('-')}
Bill No: ${billNo}
Date: ${date.toLocaleString()}
${customerDetails}
Payment Mode: ${paymentMode}
${line('-')}
Item         Qty  Price   Total
${line('-')}
${itemsText}
${line('-')}
TOTAL: ${`₹${total.toFixed(2)}`.padStart(25)}
${line('-')}
${centerText("Thank You! Visit Again 🙏", 32)}
`;

    // Print instantly
    await printBill(billText);

    // Save bill in backend
    const res = await fetch("https://billing-backend-sable.vercel.app/api/billing", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userClerkId,
        customerName: options?.customerName || "Walk-in",
        phone: options?.phone || "",
        date: date.toISOString(),
        billNo,
        products,
        total,
        grandTotal: total,
        discount: 0,
        gst: 0,
        paymentMode,
        paymentStatus: "PAID",
        notes: options?.notes || `Bill No ${billNo}`,
        companyName,
        companyAddress,
        companyPhone,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.log("❌ Backend Error:", errText);
      ToastAndroid.show("⚠️ Bill save failed!", ToastAndroid.SHORT);
    } else {
      ToastAndroid.show("✅ Bill saved!", ToastAndroid.SHORT);
    }

    return { status: "success", payload: { companyName, billNo, total } };
  } catch (err: any) {
    console.log("❌ [SimpleBill Error]:", err.message || err);
    ToastAndroid.show("❌ Error creating bill", ToastAndroid.SHORT);
  }
}
