// components/IconTextInput.js
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const IconTextInput = ({ iconName, placeholder, value, onChangeText, secureTextEntry }) => {
  return (
    <View style={styles.inputContainer}>
      <Icon name={iconName} size={20} color="#ACACAD" style={styles.icon} />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#ACACAD"
        style={styles.textinput}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FFBE00',
    padding: 10,
    margin: 2,
    width: '45%',
    marginTop: 15,
    paddingStart: 10,
    borderRadius: 4,
  },
  icon: {
    marginRight: 10,
  },
  textinput: {
    flex: 1,
    color: '#ACACAD',
    fontWeight: 'bold', // Hace que el texto sea negrita
  },
});

export default IconTextInput;
