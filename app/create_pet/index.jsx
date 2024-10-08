import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
  TextInput,
  FlatList,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import Input from "../../components/Forms/TextInput";
import DropDownPicker from "react-native-dropdown-picker";
import * as ImagePicker from "expo-image-picker";
import { collection, getDocs, setDoc, doc, addDoc } from "firebase/firestore";

import { db } from "../../config/FirebaseConfig";
import { AntDesign } from "@expo/vector-icons";

export default function CreatePet() {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [category, setCategory] = useState("");
  const [breed, setBreed] = useState("");
  const [weight, setWeight] = useState("");
  const [categories, setCategories] = useState([]);
  const [genders, setGenders] = useState([
    { label: "Female", value: "Female" },
    { label: "Male", value: "Male" },
  ]);
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [openCategory, setOpenCategory] = useState(false);
  const [openGender, setOpenGender] = useState(false);
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
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const libraryStatus =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (libraryStatus.status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }

        const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
        if (cameraStatus.status !== "granted") {
          alert("Sorry, we need camera permissions to make this work!");
        }
      }
    })();
  }, []);
  const uploadImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      console.log(result.assets[0].uri);
      setImageUrl(result.assets[0].uri);
    }
  };

  const addPet = async () => {
    const petData = {
      name: name,
      about: about,
      breed: breed,
      age: age,
      category: category,
      sex: gender,
      weight: weight,
      userID: user.id,
      imageUrl: imageUrl,
    };
    try {
      addDoc(collection(db, "Pets"), petData);
      Alert.alert("Success!", "Successfuly added pet!", [
        {
          text: "Ok",
          onPress: () => navigation.goBack(),
          style: "cancel",
        },
      ]);
    } catch (error) {
      console.error("Error creating pet ", error);
    }
  };
  const renderContent = () => {
    return (
      <View>
        <View>
          <Image
            source={require("../../assets/images/addpet.jpg")}
            style={styles.image}
          />
          <TouchableOpacity
            style={styles.goBackIcon}
            onPress={() => navigation.goBack()}
          >
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>Add New Pet</Text>
        </View>
        <Input placeholder="Name" value={name} onChangeText={setName} />
        <Input placeholder="Age" value={age} onChangeText={setAge} />

        <Input placeholder="Breed" value={breed} onChangeText={setBreed} />
        <Input placeholder="Weight" value={weight} onChangeText={setWeight} />
        <TextInput
          style={styles.aboutBox}
          value={about}
          onChangeText={setAbout}
          placeholder="About..."
          multiline={true}
          numberOfLines={4}
          textAlignVertical="top"
        />
        <DropDownPicker
          open={openCategory}
          value={category}
          items={categories}
          setOpen={setOpenCategory}
          setValue={setCategory}
          setItems={setCategories}
          placeholder="Select Category"
          style={styles.dropDown}
        />
        <DropDownPicker
          open={openGender}
          value={gender}
          items={genders}
          setOpen={setOpenGender}
          setValue={setGender}
          setItems={setGenders}
          placeholder="Select Gender"
          style={styles.dropDown}
        />
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={() => uploadImage()}
        >
          <Text>Upload Image</Text>
          <AntDesign name="camera" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => addPet()}>
          <Text>Add Pet</Text>
        </TouchableOpacity>
        {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={[" "]}
        renderItem={renderContent}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
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
    height: 300,
    margin: 10,
  },
  title: {
    fontFamily: "outfit-bold",
    fontSize: 25,
    textAlign: "center",
    marginBottom: 10,
    color: "#4a4a4a",
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
  uploadButton: {
    flexDirection: "row",
    padding: 20,
    margin: 10,
    backgroundColor: "gray",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  aboutBox: {
    padding: 10,
    margin: 5,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 0.2,
    height: 100,
  },
  dropDown: {
    padding: 10,
    margin: 5,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 0.2,
    width: "%100",
  },
  goBackIcon: {
    position: "absolute",
    top: 50,
    left: 20,
    backgroundColor: "gray",
    borderRadius: 999,
    padding: 3,
  },
});
