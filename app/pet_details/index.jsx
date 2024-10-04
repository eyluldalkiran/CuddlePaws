import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

export default function PetDetails() {
  const pet = useLocalSearchParams();
  return (
    <View>
      <Text>{JSON.stringify(pet)}</Text>
    </View>
  );
}
