import { useField } from "formik";
import React from "react";
import { StyleSheet } from "react-native";
import TextInput from "./TextInput";
import Text from "../Text";
import theme from "../../theme";

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
      <TextInput
        onChangeText={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error} </Text>}
    </>
  );
};

const styles = StyleSheet.create({
  errorText: {
    marginTop: 5,
    color: theme.colors.error,
    marginLeft: 15,
    fontSize: theme.fontSizes.subheading,
  },
});

export default FormikTextInput;
