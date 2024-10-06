import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

import { styles } from "../PetInfo";

export default function ContactTab({ petOwner }) {
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
