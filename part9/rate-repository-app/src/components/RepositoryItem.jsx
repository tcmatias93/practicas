import React from "react";
import { View, StyleSheet, Image } from "react-native";
import Stadistic from "./ItemList/Stadistic";
import PersonalDescription from "./ItemList/PersonalDescription";
import theme from "../theme";
const RepositoryItem = ({
  fullName,
  description,
  lenguage,
  forksCount,
  stargazersCount,
  ratingAverage,
  reviewCount,
  ownerAvatarUrl,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.details}>
        <Image source={{ uri: ownerAvatarUrl }} style={styles.logo} />
        <PersonalDescription
          fullName={fullName}
          description={description}
          lenguage={lenguage}
        />
      </View>
      <View style={styles.number}>
        <Stadistic numbers={stargazersCount} text={"Stars"} />
        <Stadistic numbers={forksCount} text={"Forks"} />
        <Stadistic numbers={reviewCount} text={"Reviews"} />
        <Stadistic numbers={ratingAverage} text={"Rating"} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  details: {
    flexDirection: "row",
  },
  logo: {
    width: 40,
    height: 40,
  },
  personalData: {
    flexDirection: "column",
  },
  number: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 20,
  },
});
export default RepositoryItem;
