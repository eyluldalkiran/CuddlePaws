import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "expo-router";
import PetInfoCard from "./PetInfoCard";
import PetInfoCardContainer from "./PetInfoCardContainer";
import { getPetAndOwner } from "../../services/getPetOwner";
import TabButton from "./TabButton";

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
  const renderAboutTab = () => {
    return (
      <View style={styles.aboutContainer}>
        <Text style={styles.aboutTitle}>About {pet.name}</Text>
        <Text style={styles.addressText}>{pet.about}</Text>
      </View>
    );
  };
  const renderContactTab = () =>
    petOwner && (
      <View style={styles.aboutContainer}>
        <Text style={styles.aboutTitle}>Contact Information</Text>
        <Text style={styles.addressText}>
          Owner: {petOwner.name} {petOwner.surname}
        </Text>
        <Text style={styles.addressText}>Phone: {petOwner.phoneNumber}</Text>
        <Text style={styles.addressText}>Email: {petOwner.email}</Text>
        <TouchableOpacity style={styles.messageButton}>
          <AntDesign name="mail" size={24} color="black" />
          <Text style={styles.messageText}>Send Message</Text>
        </TouchableOpacity>
      </View>
    );
  const renderContent = () => {
    switch (activeTab) {
      case "about":
        return renderAboutTab();
      case "contact":
        return renderContactTab();
      default:
        return renderAboutTab();
    }
  };
  return (
    <ScrollView style={styles.container}>
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
        <TabButton
          title="About"
          onPress={() => setActiveTab("about")}
          active={activeTab === "about"}
        />
        <TabButton
          title="Contact"
          onPress={() => setActiveTab("contact")}
          active={activeTab === "contact"}
        />
      </View>
      {renderContent()}
    </ScrollView>
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
  messageButton: {
    flexDirection: "row",
    padding: 10,
    margin: 10,
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  aboutTitle: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: "outfit",
    marginBottom: 5,
  },
});
