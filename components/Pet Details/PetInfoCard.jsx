import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";

export default function PetInfoCard({ iconUrl, title, value }) {
  return (
    <View style={styles.container}>
      <Image source={iconUrl} style={styles.icon} />
      <View style={styles.infoContainer}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.valueText}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginVertical: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    width: "45%",
    margin: 10,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  infoContainer: {
    //  flex: 1,
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  valueText: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
});
