import { StyleSheet, Platform, View, TextInput } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function InputMultiline({
  placeHolder,
  setValor,
  contra,
  valor,
}) {
  return (
    <View style={styles.container}>
      <Icon name="address-card-o" size={30} color="#ACACAD" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeHolder}
        value={valor}
        onChangeText={setValor}
        placeholderTextColor={"#ACACAD"}
        secureTextEntry={contra}
        multiline={true}
        numberOfLines={3}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#FFBE00",
    padding: 5,
    width:'80%',
    paddingStart: 5,
    marginTop: 10,
    borderRadius: 4,
  },
  input: {
    flex: 1,
    justifyContent: "center",
    color: "#ffffff",
    fontWeight: "bold",
    padding: 5,
  },
  icon: {
    marginRight: 15,
  },
});
