
import { StyleSheet, TextInput, View, Platform} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function InputEmail({placeHolder, setValor, setTextChange}) {

  return (
    <View style={styles.inputEmail}>
      <MaterialCommunityIcons name="email-outline" size={35} color="#ACACAD" style={styles.icon} />
        <TextInput
          placeholder={placeHolder}
          placeholderTextColor={'#ACACAD'}
          style={styles.textinput}
          value={setValor}
          keyboardType='email-address'
          onChangeText={setTextChange}
        />
      </View>
  );
}

const styles = StyleSheet.create({

  inputEmail: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FFBE00',
    padding: 5,
    width: '80%',
    marginTop: 35,
    paddingStart: 5,
    borderRadius: 4,
  },
  icon: {
    marginRight: 15,
  },
  textinput: {
    flex: 1,
    justifyContent: 'center',
    color: '#ffffff',
    fontWeight: 'bold', 
  },

});