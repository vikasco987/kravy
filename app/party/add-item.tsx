"use client";

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";

export default function AddItemPage() {
  const router = useRouter();

  // Fields matching your JSON structure
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [mrp, setMrp] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [unit, setUnit] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [loading, setLoading] = useState(false);

  // Submit
  const handleSubmit = async () => {
    if (!name || !price || !unit || !categoryId) {
      Alert.alert("Validation Error", "Name, Price, Unit, and Category are required!");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        name,
        description,
        price: Number(price),
        mrp: mrp ? Number(mrp) : undefined,
        purchasePrice: purchasePrice ? Number(purchasePrice) : undefined,
        sellingPrice: sellingPrice ? Number(sellingPrice) : undefined,
        unit,
        categoryId,
      };

      // Replace with your backend endpoint
      const res = await axios.post(
        "https://billing-backend-sable.vercel.app/api/items",
        payload
      );

      if (res.status === 201 || res.status === 200) {
        Alert.alert("✅ Success", "Item added successfully!");
        // Reset fields
        setName("");
        setDescription("");
        setPrice("");
        setMrp("");
        setPurchasePrice("");
        setSellingPrice("");
        setUnit("");
        setCategoryId("");
        router.back();
      }
    } catch (err: any) {
      console.error(err);
      Alert.alert("❌ Error", err.response?.data?.error || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>➕ Add New Item</Text>

      <TextInput placeholder="Name *" value={name} onChangeText={setName} style={styles.input} />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={[styles.input, { height: 80 }]}
        multiline
      />
      <TextInput
        placeholder="Price *"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="MRP"
        value={mrp}
        onChangeText={setMrp}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Purchase Price"
        value={purchasePrice}
        onChangeText={setPurchasePrice}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Selling Price"
        value={sellingPrice}
        onChangeText={setSellingPrice}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput placeholder="Unit *" value={unit} onChangeText={setUnit} style={styles.input} />
      <TextInput
        placeholder="Category ID *"
        value={categoryId}
        onChangeText={setCategoryId}
        style={styles.input}
      />

      <View style={{ marginVertical: 10 }}>
        <Button title={loading ? "Saving..." : "Save Item"} onPress={handleSubmit} disabled={loading} />
      </View>

      <Button title="Go Back" onPress={() => router.back()} color="#888" />
      {loading && <ActivityIndicator size="large" color="#4f46e5" style={{ marginTop: 10 }} />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingTop: 50 },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 12, marginBottom: 15, backgroundColor: "white" },
});
