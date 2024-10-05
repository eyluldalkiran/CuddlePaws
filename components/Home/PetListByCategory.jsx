import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Category from "./Category";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import { useRouter } from "expo-router";

export default function PetListByCategory() {
  const [data, setData] = useState([]);
  const GetPetList = async (category) => {
    const q = query(collection(db, "Pets"), where("category", "==", category));
    const querySnapShot = await getDocs(q);
    const petsWithId = querySnapShot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setData(petsWithId);
    console.log(data);
  };
  const router = useRouter();
  const navigateToDetailScreen = (pet) => {
    router.push({
      pathname: "/pet_details",
      params: pet,
    });
  };
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.petContainer}
        onPress={() => navigateToDetailScreen(item)}
      >
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 10,
          }}
        >
          <Text style={styles.text}>{item.name}</Text>
          <View style={styles.ageContainer}>
            <Text>{item.age} YRS</Text>
          </View>
        </View>
        <Text>{item.location}</Text>
      </TouchableOpacity>
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
    justifyContent: "center",
    padding: 10,
    borderRadius: 5,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 5,
    resizeMode: "stretch",
  },
  text: {
    fontFamily: "outfit-bold",
    fontSize: 20,
  },
  ageContainer: {
    backgroundColor: "#f8cfd0",
    padding: 2,
    margin: 3,
    width: 80,
    borderRadius: 5,
    alignItems: "center",
  },
});
