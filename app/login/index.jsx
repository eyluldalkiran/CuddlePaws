import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";

export default function LoginScreen() {
  return (
    <SafeAreaView>
      <Image
        source={require("../../assets/images/login.png")}
        style={styles.image}
      />
      <View style={styles.titleContent}>
        <Text style={styles.title}>Are you ready</Text>
        <Text style={styles.title}>to embrace your new friend?</Text>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity style={styles.button} onPress={() => nav}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 500,
  },
  title: {
    fontFamily: "outfit",
    fontSize: 20,
    textAlign: "center",
  },
  titleContent: {
    padding: 20,
    marginTop: 10,
  },
  button: {
    padding: 20,
    margin: 5,
    width: "50%",
    backgroundColor: "#79a5c0",
    alignItems: "center",
    borderRadius: 20,
    marginTop: 50,
  },
  buttonText: {
    fontFamily: "outfit-bold",
    fontSize: 17,
  },
});
