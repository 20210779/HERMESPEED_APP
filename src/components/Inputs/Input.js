import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Input({
  placeHolder,
  setValor,
  contra,
  setTextChange,
}) {
  return (
    <View style={styles.input}>
      <Icon name="lock" size={35} color="#ACACAD" style={styles.icon} />
      <TextInput
        style={styles.textinput}
        placeholder={placeHolder}
        value={setValor}
        placeholderTextColor={"#ACACAD"}
        secureTextEntry={contra}
        onChangeText={setTextChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FFBE00',
    padding: 5,
    width: '80%',
    marginTop: 25,
    paddingStart: 11,
    borderRadius: 4,
  },
  icon: {
    marginRight: 19,
  },
  textinput: {
    flex: 1,
    justifyContent: "center",
    color: "#ffffff",
    fontWeight: "bold",
  },
});
