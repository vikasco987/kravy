"use client";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  FlatList,
  Dimensions,
  Modal,
  ScrollView,
} from "react-native";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Feather, Ionicons } from "@expo/vector-icons";

// ✅ Import AddPartyScreen
import AddPartyScreen from "../party/AddPartyScreen";

const THEME_PRIMARY = "#4F46E5";
const COLOR_BG_LIGHT = "#F5F5F5";
const SCREEN_HEIGHT = Dimensions.get("window").height;

type Party = {
  id: string;
  name: string;
  phone: string;
  address?: string;
  dob?: string;
  balance?: number;
  isFavorite?: boolean;
  hasCheckedOut?: boolean;
};

const PartyListItem: React.FC<{ item: Party; onSelect: (party: Party) => void }> = ({
  item,
  onSelect,
}) => (
  <TouchableOpacity style={styles.partyRow} onPress={() => onSelect(item)}>
    <View style={styles.partyInfo}>
      <Text style={styles.partyName} numberOfLines={1}>
        {item.name || item.phone}
      </Text>
      <Text style={styles.partyPhone}>{item.phone}</Text>
      <Text style={styles.billingType}>Billing Type: REGULAR</Text>
    </View>

    <View style={styles.iconGroup}>
      <View style={styles.balanceIndicator}>
        <Text style={styles.balanceText}>₹{item.balance ? item.balance.toFixed(0) : 0}</Text>
      </View>
      <Ionicons name="call-outline" size={20} color="#FFD700" style={styles.icon} />
      <Ionicons name="logo-whatsapp" size={20} color="#25D366" style={styles.icon} />
      <Ionicons
        name={item.isFavorite ? "star" : "star-outline"}
        size={20}
        color="#FFC107"
        style={styles.icon}
      />
      {item.hasCheckedOut && (
        <Ionicons name="checkmark-circle" size={20} color="#10B981" style={styles.icon} />
      )}
    </View>
  </TouchableOpacity>
);

export default function CustomersScreen() {
  const { getToken } = useAuth();
  const { isLoaded, isSignedIn } = useUser();

  const [parties, setParties] = useState<Party[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"parties" | "categories">("parties");
  const [showAddPartyForm, setShowAddPartyForm] = useState(false);

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
    } catch (err) {
      console.error("Error fetching parties:", err);
    }
  };

  useEffect(() => {
    fetchParties();
  }, [isLoaded, isSignedIn]);

  const handleSelectParty = (party: Party) => {
    Alert.alert("Selected", `Selected: ${party.name}`);
  };

  const filteredParties = parties.filter(
    (p) =>
      p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.phone.includes(searchTerm)
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerBar}>
        <Ionicons name="arrow-back" size={24} color="#1F2937" style={{ marginRight: 10 }} />
        <View>
          <Text style={styles.infoText}>FAST V38.25 | 9289507882 | 1630</Text>
          <Text style={styles.infoDate}>{new Date().toLocaleString()}</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "parties" && styles.activeTab]}
          onPress={() => setActiveTab("parties")}
        >
          <Text style={[styles.tabText, activeTab === "parties" && styles.activeTabText]}>
            PARTIES ({parties.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "categories" && styles.activeTab]}
          onPress={() => setActiveTab("categories")}
        >
          <Text style={[styles.tabText, activeTab === "categories" && styles.activeTabText]}>
            CATEGORIES
          </Text>
        </TouchableOpacity>
      </View>

      {/* Search Filter */}
      <TextInput
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholder="FILTER"
        placeholderTextColor="#6B7280"
        style={styles.filterInput}
      />

      {/* Party List */}
      {activeTab === "parties" ? (
        <FlatList
          data={filteredParties}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PartyListItem item={item} onSelect={handleSelectParty} />}
          contentContainerStyle={{ paddingHorizontal: 15, paddingBottom: 100 }}
          style={{ height: SCREEN_HEIGHT * 0.7 }}
        />
      ) : (
        <View style={{ padding: 20 }}>
          <Text style={{ color: "#6B7280" }}>📁 Categories feature coming soon...</Text>
        </View>
      )}

      {/* Floating Add Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setShowAddPartyForm(true)}
      >
        <Feather name="plus-circle" size={20} color="#fff" />
        <Text style={styles.fabText}>ADD CUSTOMER/PARTY</Text>
      </TouchableOpacity>

      {/* ✅ Modal for Add Party Form */}
      <Modal
        visible={showAddPartyForm}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setShowAddPartyForm(false)}
      >
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
          {/* Modal Header */}
          <View style={{ flexDirection: "row", alignItems: "center", padding: 16 }}>
            <TouchableOpacity onPress={() => setShowAddPartyForm(false)}>
              <Ionicons name="arrow-back" size={26} color="#111" />
            </TouchableOpacity>
            <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 10 }}>
              Add New Customer / Party
            </Text>
          </View>

          {/* Scrollable Form */}
          <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16 }}>
            <AddPartyScreen
              onSuccess={() => {
                setShowAddPartyForm(false);
                fetchParties();
              }}
              onBack={() => setShowAddPartyForm(false)} // ✅ pass onBack
            />
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLOR_BG_LIGHT },
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
    paddingTop: 40,
  },
  infoText: { fontSize: 12, color: "#6B7280" },
  infoDate: { fontSize: 14, fontWeight: "500", color: "#1F2937" },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#E0E0E0",
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 8,
  },
  tab: { flex: 1, paddingVertical: 12, alignItems: "center", borderRadius: 8 },
  activeTab: {
    backgroundColor: THEME_PRIMARY,
    elevation: 4,
  },
  tabText: { color: "#1F2937", fontWeight: "600" },
  activeTabText: { color: "#fff", fontWeight: "bold" },
  filterInput: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 15,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F2937",
  },
  partyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginVertical: 4,
    elevation: 2,
  },
  partyInfo: { flex: 1 },
  partyName: { fontSize: 18, fontWeight: "bold", color: "#1F2937", marginBottom: 2 },
  partyPhone: { fontSize: 14, color: "#6B7280" },
  billingType: { fontSize: 12, color: "#A0AEC0", marginTop: 4 },
  iconGroup: { flexDirection: "row", alignItems: "center", paddingLeft: 10 },
  icon: { marginLeft: 8 },
  balanceIndicator: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 5,
    backgroundColor: "#E6E0F8",
    marginRight: 10,
  },
  balanceText: { fontSize: 12, fontWeight: "bold", color: THEME_PRIMARY },
  fab: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    flexDirection: "row",
    backgroundColor: THEME_PRIMARY,
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 30,
    elevation: 8,
  },
  fabText: { color: "#fff", fontWeight: "bold", fontSize: 16, marginLeft: 10 },
});
