import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useOAuth, useUser } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import React from "react";
import { useCallback, useEffect } from "react";
import { Link } from "expo-router";

export const useWarmUpBrowser = () => {
  useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const { user } = useUser();
  const onPress = useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow({
          redirectUrl: Linking.createURL("/home", { scheme: "myapp" }),
        });

      if (createdSessionId) {
        ({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

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
        {user ? (
          <TouchableOpacity style={styles.button}>
            <Link href="/home">
              <Text style={styles.buttonText}>Get Started</Text>
            </Link>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        )}
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
