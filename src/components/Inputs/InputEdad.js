import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const InputEdad = ({ value, onChangeText }) => {
  return (
    <View style={styles.inputContainer}>
      <MaterialIcons name="cake" size={24} color="#ACACAD" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Edad"
        placeholderTextColor="#ACACAD"
        keyboardType="numeric"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#FFBE00",
    padding: 5,
    width: "80%",
    marginTop: 20,
    paddingStart: 5,
    borderRadius: 4,
  },
  input: {
    flex: 1,
    color: "#ffffff",
    padding: 10,
  },
  icon: {
    marginRight: 10,
  },
});

export default InputEdad;
