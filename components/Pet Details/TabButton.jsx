import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

export default function TabButton({ title, onPress, active }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={active ? styles.activeButtonText : styles.text}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 20,
    margin: 10,
    backgroundColor: "white",
    borderWidth: 0.2,
  },
  activeButtonText: {
    fontSize: 15,
    color: "pink",
    fontWeight: "bold",
  },
  text: {
    fontSize: 15,

    fontWeight: "bold",
  },
});
