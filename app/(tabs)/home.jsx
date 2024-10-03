import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import Header from "../../components/Home/Header";
import Slider from "../../components/Home/Slider";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Slider />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
});
