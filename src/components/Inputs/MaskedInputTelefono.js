import React, { useState } from 'react';
import { Platform, TextInput, StyleSheet } from 'react-native';
import { MaskedTextInput } from 'react-native-mask-text';

export default function MaskedInputTelefono({telefono, setTelefono}) {
    return (
            <MaskedTextInput
            mask="9999-9999"
            placeholder='Telefono'
            placeholderTextColor="#fff"
            onChangeText={(text) => {
                setTelefono(text);
            }}
            style={styles.Input}
            keyboardType="numeric"
            value={telefono}  
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
  
  });