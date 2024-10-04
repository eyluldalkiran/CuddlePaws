import { View, Text, SafeAreaView, Image, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import PetInfo from "../../components/Pet Details/PetInfo";
import PetInfoCard from "../../components/Pet Details/PetInfoCard";

export default function PetDetails() {
  const pet = useLocalSearchParams();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <SafeAreaView>
      <PetInfo pet={pet} />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 200,
  },
});
