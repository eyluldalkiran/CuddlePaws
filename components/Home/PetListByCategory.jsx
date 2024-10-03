import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import React, { useState } from "react";
import Category from "./Category";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";

export default function PetListByCategory() {
  const [data, setData] = useState([]);
  const GetPetList = async (category) => {
    const q = query(collection(db, "Pets"), where("category", "==", category));
    const querySnapShot = await getDocs(q);
    setData(querySnapShot.docs.map((doc) => doc.data()));
    console.log(data);
  };
  const renderItem = ({ item }) => {
    return (
      <View style={styles.petContainer}>
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
        <Text style={styles.text}>{item.name}</Text>
        <Text style={styles.text}>Age: {item.age}</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Category category={(value) => GetPetList(value)} />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  petContainer: {
    borderWidth: 0.2,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 250,
    padding: 20,
    borderRadius: 5,
  },
  image: {
    width: 200,
    height: 150,
  },
  text: {
    fontFamily: "outline-medium",
    fontSize: 15,
  },
});
