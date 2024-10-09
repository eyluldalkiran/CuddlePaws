import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState, useMemo } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import PetInfoCardContainer from "./PetInfoCardContainer";
import TabButton from "./TabButton";
import { getPetAndOwner } from "../../services/getPetOwner";
import { toggleFavorites } from "../../redux/slices/favoriteSlice";

export default function PetInfo({ pet }) {
  const [activeTab, setActiveTab] = useState("about");
  const [petOwner, setPetOwner] = useState(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const favoritePets = useSelector((state) => state.favorites.favoritePets);

  const isFavorite = useMemo(
    () => favoritePets.some((item) => item.id === pet.id),
    [favoritePets, pet.id]
  );

  useEffect(() => {
    const fetchPetOwner = async () => {
      try {
        const response = await getPetAndOwner(pet.userID);
        setPetOwner(response);
      } catch (error) {
        console.error("Error fetching pet owner:", error);
      }
    };

    fetchPetOwner();
  }, [pet.userID]);

  const handleToggleFavorite = () => {
    dispatch(toggleFavorites(pet));
  };

  const renderContent = useMemo(() => {
    if (activeTab === "about") {
      return (
        <View style={styles.aboutContainer}>
          <Text style={styles.aboutTitle}>About {pet.name}</Text>
          <Text style={styles.addressText}>{pet.about}</Text>
        </View>
      );
    }
    if (activeTab === "contact" && petOwner) {
      return (
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
    }
    return null;
  }, [activeTab, petOwner, pet.name, pet.about]);

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
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={handleToggleFavorite}
        >
          <AntDesign
            name={isFavorite ? "heart" : "hearto"}
            size={24}
            color={isFavorite ? "red" : "black"}
          />
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

      {renderContent}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 250,
  },
  goBackIcon: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
  },
  innerContainer: {
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  infoContainer: {
    flexDirection: "column",
  },
  nameText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  addressText: {
    fontSize: 16,
    color: "gray",
  },
  favoriteButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  aboutContainer: {
    paddingVertical: 10,
    backgroundColor: "white",
    paddingHorizontal: 10,
    margin: 10,
    borderRadius: 5,
  },
  aboutTitle: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: "outfit",
    marginBottom: 5,
  },
  messageButton: {
    flexDirection: "row",
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  messageText: {
    marginLeft: 10,
    fontSize: 16,
    color: "black",
  },
  tabSection: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
});
