import React from "react";
import { StyleSheet, View } from "react-native";
import RepositoryList from "./RepositoryList";
import theme from "../theme";

const Main = () => {
  return (
    <View style={style.container}>
      <RepositoryList />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.backGround,
  },
});

export default Main;
