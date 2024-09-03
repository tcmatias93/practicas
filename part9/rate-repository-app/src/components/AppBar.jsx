import React from "react";
import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import Constants from "expo-constants";
import theme from "../theme";
import Text from "./Text";

const AppBar = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <View style={styles.navBar}>
          <Pressable onPress={() => navigation.navigate("Main")}>
            <Text color={"white"} fontWeight={"bold"} fontSize={"subheading"}>
              Repositories
            </Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate("SingIn")}>
            <Text color={"white"} fontWeight={"bold"} fontSize={"subheading"}>
              Sing In
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.textPimary,
    paddingLeft: 20,
    height: "20%",
    textAlign: "center",
    justifyContent: "center",
  },
  navBar: {
    flexDirection: "row",
    gap: 10,
  },
});

export default AppBar;
