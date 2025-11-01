



"use client";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Platform,
  FlatList,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useAuth, useUser } from "@clerk/clerk-expo";

type Party = {
  id: string;
  name: string;
  phone: string;
  address?: string;
  dob?: string;
};

export default function PartyFormScreen({ onSelectParty }: { onSelectParty?: (party: Party) => void }) {
  const { getToken } = useAuth();
  const { user, isSignedIn, isLoaded } = useUser();

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [dob, setDob] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const [parties, setParties] = useState<Party[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Fetch all existing parties
  const fetchParties = async () => {
    try {
      const token = isLoaded && isSignedIn ? await getToken() : null;
      const res = await fetch("https://billing-backend-sable.vercel.app/api/parties", {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      const data = await res.json();
      if (res.ok) setParties(data);
      else console.warn("Failed to fetch parties:", data.error || data.message);
    } catch (err) {
      console.error("Fetch parties error:", err);
    }
  };

  useEffect(() => {
    fetchParties();
  }, [isLoaded, isSignedIn]);

  // ✅ Add new party
  const handleSubmit = async () => {
    if (!customerName || !phone) {
      Alert.alert("Missing Fields", "Please enter name and phone number.");
      return;
    }

    try {
      setLoading(true);
      const token = isLoaded && isSignedIn ? await getToken() : null;
      if (!token) {
        Alert.alert("Unauthorized", "Please log in again.");
        return;
      }

      const response = await fetch(
        "https://billing-backend-sable.vercel.app/api/parties",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: customerName,
            phone,
            address: billingAddress,
            dob: dob ? dob.toISOString() : null,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        Alert.alert("✅ Success", "Party added successfully!");
        setCustomerName("");
        setPhone("");
        setBillingAddress("");
        setDob(null);
        fetchParties(); // Refresh list
        onSelectParty && onSelectParty(data); // Optionally pass selected party
      } else {
        Alert.alert("Error", data.error || "Failed to add party.");
      }
    } catch (err: any) {
      console.error("Party Add Error:", err);
      Alert.alert("Error", err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowPicker(Platform.OS === "ios");
    if (selectedDate) setDob(selectedDate);
  };

  // Filter parties by search
  const filteredParties = parties.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, padding: 20, backgroundColor: "#f9f9f9" }}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" }}>
        🧾 Select or Add Customer
      </Text>

      {/* Search existing customers */}
      <TextInput
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholder="Search customer..."
        style={[styles.input, { marginBottom: 10 }]}
      />

      {filteredParties.length > 0 && (
        <FlatList
          data={filteredParties}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.partyRow}
              onPress={() => onSelectParty && onSelectParty(item)}
            >
              <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
              <Text>{item.phone}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      <Text style={{ fontWeight: "bold", marginTop: 15 }}>Add New Customer</Text>

      <TextInput
        value={customerName}
        onChangeText={setCustomerName}
        placeholder="Customer Name"
        style={styles.input}
      />

      <TextInput
        value={phone}
        onChangeText={setPhone}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        style={styles.input}
      />

      <TextInput
        value={billingAddress}
        onChangeText={setBillingAddress}
        placeholder="Billing Address"
        multiline
        numberOfLines={3}
        style={[styles.input, { height: 90 }]}
      />

      <TouchableOpacity
        onPress={() => setShowPicker(true)}
        style={[styles.input, { justifyContent: "center" }]}
      >
        <Text>{dob ? dob.toDateString() : "Select DOB"}</Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={dob || new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleDateChange}
        />
      )}

      <TouchableOpacity
        onPress={handleSubmit}
        style={[styles.button, loading && { opacity: 0.6 }]}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? "Saving..." : "Save & Select"}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = {
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "#4f46e5",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  partyRow: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: "#ddd",
  },
};

