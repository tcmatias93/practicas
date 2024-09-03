import React from "react";
import { View, StyleSheet } from "react-native";
import AppBar from "./AppBar";
import theme from "../theme";
import Constants from "expo-constants";

const Layout = ({ children, navigation }) => {
  return (
    <View style={styles.container}>
      <AppBar navigation={navigation} />
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backGround,
  },
  content: {
    flex: 1,
  },
});
export default Layout;
