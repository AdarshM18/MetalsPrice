import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { fetchMetalPrice } from "../api/goldApi";

export default function MetalTile({ metal, onPress }) {
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadPrice = async () => {
      setLoading(true);
      const data = await fetchMetalPrice(metal);
      if (mounted && data) {
        setPrice(data.price);
      }
      setLoading(false);
    };

    loadPrice();
    const interval = setInterval(loadPrice, 30000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [metal]);

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(metal)}>
      <Text style={styles.title}>{metal.toUpperCase()}</Text>
      {loading ? (
        <ActivityIndicator size="small" color="#FFD700" />
      ) : (
        <Text style={styles.price}>${price}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 10,
    padding: 20,
    borderRadius: 12,
    elevation: 4,
    alignItems: "center",
  },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  price: { fontSize: 16, color: "#333" },
});
