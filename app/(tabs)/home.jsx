import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Header from "../../components/Home/Header";
import Slider from "../../components/Home/Slider";
import PetListByCategory from "../../components/Home/PetListByCategory";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { FlatList } from "react-native";
import { router } from "expo-router";
export default function HomeScreen() {
  const navigateToCreateScreen = () => {
    router.push({
      pathname: "/create_pet",
    });
  };
  const renderContent = () => (
    <>
      <Header />
      <Slider />
      <PetListByCategory />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.addPetButton}
          onPress={() => navigateToCreateScreen()}
        >
          <MaterialIcons name="pets" size={24} color="black" />
          <Text style={styles.textButton}>Add New Pet</Text>
        </TouchableOpacity>
      </View>
    </>
  );
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={[""]}
        renderItem={renderContent}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  addPetButton: {
    flexDirection: "row",
    padding: 15,
    margin: 5,
    borderWidth: 0.2,
    backgroundColor: "#4159af",
    borderRadius: 8,
    width: "95%",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  textButton: {
    fontSize: 20,
    fontFamily: "outfit-medium",
  },
  buttonContainer: {
    alignItems: "center",
  },
});
