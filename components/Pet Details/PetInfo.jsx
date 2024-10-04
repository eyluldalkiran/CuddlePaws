import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "expo-router";
import PetInfoCard from "./PetInfoCard";
export default function PetInfo({ pet }) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image source={{ uri: pet.imageUrl }} style={styles.image} />
      <TouchableOpacity
        style={styles.goBackIcon}
        onPress={() => navigation.goBack()}
      >
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.innerContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.nameText}>{pet.name}</Text>
          <Text style={styles.addressText}>{pet.location}</Text>
        </View>
        <TouchableOpacity style={styles.favoriteButton}>
          <AntDesign name="hearto" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row" }}>
        <PetInfoCard
          iconUrl={require("../../assets/icons/gender.png")}
          title="Gender"
          value={pet.sex}
        />
        <PetInfoCard
          iconUrl={require("../../assets/icons/age.png")}
          title="Age"
          value={pet.age}
        />
      </View>
      <View style={{ flexDirection: "row" }}>
        <PetInfoCard
          iconUrl={require("../../assets/icons/weight.png")}
          title="Weight"
        />
        <PetInfoCard
          iconUrl={require("../../assets/icons/species.png")}
          title="Breed"
          value={pet.breed}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  image: {
    height: 300,

    borderRadius: 5,
  },
  infoContainer: {
    // marginTop: 10,
  },
  nameText: {
    fontSize: 30,
    fontFamily: "outfit",
  },
  addressText: {
    fontSize: 15,
    fontFamily: "outfit",
  },
  innerContainer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
  },
  favoriteButton: {
    alignSelf: "flex-end",
    margin: 15,
  },
  goBackIcon: {
    position: "absolute",
    top: 15,
    left: 20,
  },
});
