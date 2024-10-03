import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";

export default function Header() {
  const { user } = useUser();
  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <Text style={styles.welcomeText}>Welcome</Text>
        <Text style={styles.text}>{user?.fullName}</Text>
      </View>
      <Image style={styles.image} source={{ uri: user?.imageUrl }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 5,
  },
  nameContainer: {
    padding: 10,
  },
  welcomeText: {
    fontSize: 20,
    fontFamily: "outfit",
    marginLeft: 10,
    marginBottom: 2,
    color: "#4A4A4A",
  },
  text: {
    fontSize: 22,
    fontFamily: "outfit",
    marginLeft: 10,
    color: "#4A4A4A",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 999,
    marginRight: 20,
  },
});
