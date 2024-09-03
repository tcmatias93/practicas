import React from "react";
import { StyleSheet, View } from "react-native";
import Text from "../Text";

const Stadistic = ({ numbers, text }) => {
  let number = "";

  if (numbers < 1000) {
    number = numbers;
  } else {
    number = `${(numbers / 1000).toFixed(1)} K`;
  }
  return (
    <View style={styles.container}>
      <Text fontWeight={"bold"} style={styles.number}>
        {number}
      </Text>
      <Text color={"textSecondary"} fontSize={"subheading"}>
        {text}{" "}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  number: {
    marginBottom: 5,
  },
});
export default Stadistic;
