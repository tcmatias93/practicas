import React from "react";
import { View, Pressable, StyleSheet, Text } from "react-native";
import FormikTextInput from "./FormikTextInput";
import { Formik } from "formik";
import theme from "../../theme";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  user: yup.string().required("User is a required field"),
  password: yup.string().required(),
});

const SingIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={{ User: "", Password: "" }}
      onSubmit={(values) => {
        onSubmit(values);
      }}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <FormikTextInput
            name="user"
            placeholder="Ingrese usuario"
            style={styles.textInput}
          />
          <FormikTextInput
            name="password"
            placeholder="Ingrese contraseña"
            style={styles.textInput}
            secureTextEntry
          />
          <Pressable onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Iniciar sesión</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  textInput: {
    padding: 20,
    borderWidth: 1,
    margin: 15,
    fontSize: theme.fontSizes.subheading,
  },
  button: {
    backgroundColor: theme.colors.primary,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    margin: 15,
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
  },
});

export default SingIn;
