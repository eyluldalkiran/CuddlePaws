import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "expo-router";
export default function favorite() {
  const favorites = useSelector((state) => state.favorites.favoritePets);
  const router = useRouter();
  const navigateToScreen = (pet) => {
    router.push({
      pathname: "/pet_details",
      params: pet,
    });
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => navigateToScreen(item)}
      >
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
        <View style={styles.innerContainer}>
          <Text style={styles.text}>{item.name}</Text>
          <View style={styles.ageContainer}>
            <Text>{item.age} YRS</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView>
      <Text style={styles.title}>Favorite Pets</Text>
      <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    borderWidth: 0.2,
    borderRadius: 5,
    margin: 3,
  },
  image: {
    width: "60%",
    height: 100,
    borderRadius: 5,
  },
  ageContainer: {
    backgroundColor: "#f8cfd0",
    padding: 2,
    margin: 3,
    width: 80,
    borderRadius: 5,
    alignItems: "center",
  },
  text: {
    fontFamily: "outfit-bold",
    fontSize: 20,
  },
  title: {
    fontFamily: "outfit-bold",
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  innerContainer: {
    flexDirection: "column",
    margin: 15,
  },
});
