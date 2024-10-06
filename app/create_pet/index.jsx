import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import Input from "../../components/Forms/TextInput";
import DropDownPicker from "react-native-dropdown-picker";
import { collection, getDocs, setDoc, doc, addDoc } from "firebase/firestore";

import { db } from "../../config/FirebaseConfig";

export default function CreatePet() {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [category, setCategory] = useState("");
  const [breed, setBreed] = useState("");
  const [categories, setCategories] = useState([]);
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [open, setOpen] = useState(false);
  const { user } = useUser();

  const GetCategories = async () => {
    const snapshot = await getDocs(collection(db, "Categories"));
    let categoryData = [];
    categoryData = snapshot.docs.map((doc) => doc.data());
    const formattedCategories = categoryData.map((item) => ({
      label: item.name,
      value: item.name,
    }));
    setCategories(formattedCategories);
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  useEffect(() => {
    GetCategories();
  }, []);
  const addPet = async () => {
    const petData = {
      name: name,
      about: about,
      breed: breed,
      age: age,
      category: category,
      sex: gender,
      userID: user.id,
    };
    try {
      addDoc(collection(db, "Pets"), petData);
      console.log("Successfuly created pet!");
    } catch (error) {
      console.error("Error creating pet ", error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          source={require("../../assets/images/addpet.jpg")}
          style={styles.image}
        />
        <Text style={styles.title}>Add New Pet</Text>
      </View>
      <Input placeholder="Name" value={name} onChangeText={setName} />
      <Input placeholder="Age" value={age} onChangeText={setAge} />
      <Input placeholder="About" value={about} onChangeText={setAbout} />
      <Input placeholder="Breed" value={breed} onChangeText={setBreed} />
      <Input placeholder="Gender" value={gender} onChangeText={setGender} />
      <DropDownPicker
        open={open}
        value={category}
        items={categories}
        setOpen={setOpen}
        setValue={setCategory}
        setItems={setCategories}
        placeholder="Select Category"
      />
      <TouchableOpacity style={styles.button} onPress={() => addPet()}>
        <Text>Add Pet</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  image: {
    resizeMode: "stretch",
    width: "%100",
    height: 200,
  },
  title: {
    fontFamily: "outfit",
    fontSize: 20,
    textAlign: "center",
    marginTop: 10,
  },
  button: {
    flexDirection: "row",
    padding: 10,
    margin: 10,
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
});
