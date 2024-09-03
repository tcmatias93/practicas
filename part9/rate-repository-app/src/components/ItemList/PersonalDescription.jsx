import React from "react";
import { StyleSheet, View } from "react-native";
import Text from "../Text";
import theme from "../../theme";

const PersonalDescription = ({ fullName, description, lenguage }) => {
  return (
    <View style={styles.container}>
      <Text fontWeight={"bold"} fontSize={"subheading"} color={"textSecondary"}>
        {fullName}
      </Text>
      <Text>{description} </Text>
      <View style={styles.buttonContainer}>
        <Text color={"white"} style={styles.button}>
          {lenguage}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
    gap: 8,
  },
  buttonContainer: {
    alignSelf: "flex-start",
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 5,
    borderRadius: 5,
    textAlign: "center",
    overflow: "hidden",
  },
});

export default PersonalDescription;
