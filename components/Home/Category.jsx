import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import { StyleSheet } from "react-native";

export default function Category({ category }) {
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const GetCategories = async () => {
    const snapshot = await getDocs(collection(db, "Categories"));
    let categoryData = [];
    categoryData = snapshot.docs.map((doc) => doc.data());
    setData(categoryData);
  };

  useEffect(() => {
    GetCategories();
  }, []);
  const handleSelectedCategory = (item) => {
    setSelectedCategory(item.name);
    category(item.name);
  };
  const renderItem = ({ item }) => {
    const isSelected = selectedCategory === item.name;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={isSelected ? styles.selectedCategory : styles.categoryItem}
          onPress={() => handleSelectedCategory(item)}
        >
          <Image source={{ uri: item.iconUrl }} style={styles.categoryIcon} />
        </TouchableOpacity>
        <Text style={styles.categoryText}>{item.name}</Text>
      </View>
    );
  };
  return (
    <View>
      <Text style={styles.title}>Category</Text>
      <View style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          horizontal
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  categoryIcon: {
    width: 40,
    height: 40,
  },
  categoryItem: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.5,
    borderRadius: 10,
    margin: 5,
    width: 80,
  },
  selectedCategory: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.5,
    borderRadius: 10,
    margin: 5,
    width: 80,
    backgroundColor: "#fda18b",
  },
  categoryText: {
    fontSize: 13,
    fontFamily: "outfit",
    marginTop: 3,
  },
  title: {
    fontSize: 20,
    fontFamily: "outfit-bold",
    marginLeft: 18,
    marginBottom: 5,
  },
});
