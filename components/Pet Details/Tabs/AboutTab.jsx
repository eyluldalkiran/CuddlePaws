import { View, Text } from "react-native";
import React from "react";
import { styles } from "../PetInfo";
export default function AboutTab({ pet }) {
  return (
    <View style={styles.aboutContainer}>
      <Text style={styles.aboutTitle}>About {pet.name}</Text>
      <Text style={styles.addressText}>{pet.about}</Text>
    </View>
  );
}
