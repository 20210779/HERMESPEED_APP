import React, { useState } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { MaskedTextInput } from 'react-native-mask-text';

export default function MaskedInputDui({dui, setDui,  setEditable}) {
    return (
        <MaskedTextInput
        mask="99999999-9"
        placeholder='Dui'
        placeholderTextColor="#fff"
        onChangeText={(text) => {
          setDui(text);
        }}
        style={styles.Input}
        keyboardType="numeric"
        editable={setEditable}
        value={dui}  
   />
    );
}

const styles = StyleSheet.create({
    Input: {
        borderWidth: 1.5,
        borderColor: '#FFBE00',
        padding: 5,
        width: '50%',
        marginTop: 30,
        paddingStart: 5,
        borderRadius: 4,
        color: '#ffffff',
        fontWeight: 'bold',
    },
    textinput: {
        flex: 1,
        color: '#ACACAD',
        fontWeight: 'bold', // Hace que el texto sea negrita
      },
  
  });