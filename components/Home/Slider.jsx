import { View, Text, Dimensions, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import { FlatList } from "react-native";
import { Image } from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export default function Slider() {
  const [data, setData] = useState([]);
  const GetSliders = async () => {
    const snapshot = await getDocs(collection(db, "Sliders"));
    let sliderData = [];
    sliderData = snapshot.docs.map((doc) => doc.data());
    setData(sliderData);
  };

  useEffect(() => {
    GetSliders();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View>
        <Image source={{ uri: item?.imageUrl }} style={styles.bannerImage} />
      </View>
    );
  };
  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  bannerImage: {
    width: windowWidth - 15,
    height: 200,
    margin: 20,
    resizeMode: "stretch",
    borderRadius: 10,
  },
});
