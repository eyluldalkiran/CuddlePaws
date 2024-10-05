import { View, Text, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "expo-router";
import PetInfoCard from "./PetInfoCard";
import PetInfoCardContainer from "./PetInfoCardContainer";
import { getPetAndOwner } from "../../services/getPetOwner";

export default function PetInfo({ pet }) {
  const [activeTab, setActiveTab] = useState("about");
  const navigation = useNavigation();
  const [petOwner, setPetOwner] = useState("");
  useEffect(() => {
    const fetchPetOwner = async () => {
      try {
        const response = await getPetAndOwner(pet.userID);
        setPetOwner(response);
      } catch (error) {
        console.log("Error fetching pet owner:", error);
      }
    };

    fetchPetOwner();
  }, []);
  const renderContent = () => {
    if (activeTab === "about") {
      return (
        <View style={styles.aboutContainer}>
          <Text style={styles.aboutTitle}>About {pet.name}</Text>
          <Text style={styles.addressText}>{pet.about}</Text>
        </View>
      );
    } else if (activeTab === "contact") {
      return (
        <View style={styles.aboutContainer}>
          <Text style={styles.aboutTitle}>Contact Information</Text>
          <Text style={styles.addressText}>
            Owner: {petOwner.name} {petOwner.surname}
          </Text>
          <Text style={styles.addressText}>Phone: {petOwner.phoneNumber}</Text>
          <Text style={styles.addressText}>Email: {petOwner.email}</Text>
          <TouchableOpacity>
            <Text>Send Message</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };
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
      <PetInfoCardContainer pet={pet} />
      <View style={styles.tabSection}>
        <TouchableOpacity onPress={() => setActiveTab("about")}>
          <Text
            style={
              activeTab === "about" ? styles.activeTabText : styles.tabText
            }
          >
            About
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab("contact")}>
          <Text
            style={
              activeTab === "contact" ? styles.activeTabText : styles.tabText
            }
          >
            Contact
          </Text>
        </TouchableOpacity>
      </View>
      {renderContent()}
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
  aboutContainer: {
    margin: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    backgroundColor: "white",
    padding: 20,
  },
  tabSection: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  activeTabText: {
    fontSize: 15,
    color: "pink",
    fontWeight: "bold",
  },
  tabText: {
    fontSize: 15,
    fontWeight: "bold",
  },
});
