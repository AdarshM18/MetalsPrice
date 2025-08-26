import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import MetalTile from "../components/metalTile.jsx";

const metals = ["XAU", "XAG", "XPT", "XPD"]; // Gold, Silver, Platinum, Palladium

export default function HomeScreen({ navigation }) {
  const handlePress = (metal) => {
    navigation.navigate("Details", { metal });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={metals}
        numColumns={2}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <MetalTile metal={item} onPress={handlePress} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", paddingTop: 10 },
});