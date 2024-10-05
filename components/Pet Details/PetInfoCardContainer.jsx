import { View, Text } from "react-native";
import React from "react";
import PetInfoCard from "./PetInfoCard";

export default function PetInfoCardContainer({ pet }) {
  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <PetInfoCard
          iconUrl={require("../../assets/icons/gender.png")}
          title="Gender"
          value={pet.sex}
        />
        <PetInfoCard
          iconUrl={require("../../assets/icons/age.png")}
          title="Age"
          value={pet.age}
        />
      </View>
      <View style={{ flexDirection: "row" }}>
        <PetInfoCard
          iconUrl={require("../../assets/icons/weight.png")}
          title="Weight"
        />
        <PetInfoCard
          iconUrl={require("../../assets/icons/species.png")}
          title="Breed"
          value={pet.breed}
        />
      </View>
    </View>
  );
}
