import { View, TextInput, StyleSheet } from "react-native";
import React from "react";

export default function Input({
  placeholder,
  onChangeText,
  value,
  style,
  name,
}) {
  return (
    <View>
      <TextInput
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        style={[styles.input, style]}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    padding: 10,
    margin: 5,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 0.2,
  },
});
