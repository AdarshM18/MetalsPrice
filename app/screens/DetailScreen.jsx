import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { fetchMetalPrice } from "../api/goldApi";

export default function DetailScreen({ route }) {
  const { metal } = route.params;
  const [data, setData] = useState(null);

  useEffect(() => {
    const loadDetails = async () => {
      const result = await fetchMetalPrice(metal);
      setData(result);
    };
    loadDetails();
  }, [metal]);

  if (!data) return <ActivityIndicator style={{ flex: 1 }} size="large" />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{metal} Details</Text>
      <Text>Price: ${data.price}</Text>
      <Text>Prev Close: ${data.prev_close_price}</Text>
      <Text>Open Price: ${data.open_price}</Text>
      <Text>Time: {new Date(data.timestamp * 1000).toLocaleTimeString()}</Text>
      <Text>Date: {new Date(data.timestamp * 1000).toLocaleDateString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
});