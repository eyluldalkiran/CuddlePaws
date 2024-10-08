import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import PetInfo from "../../components/Pet Details/PetInfo";

export default function PetDetails() {
  const pet = useLocalSearchParams();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <ScrollView>
      <SafeAreaView>
        <PetInfo pet={pet} />
      </SafeAreaView>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 200,
  },
});
