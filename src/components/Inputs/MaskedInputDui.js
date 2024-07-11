import React, { useState } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

export default function MaskedInputDui({dui, setDui}) {
    return (
            <TextInputMask
                style={styles.Input}
                placeholder="Dui"
                placeholderTextColor="#ACACAD"
                type={'custom'}
                options={{
                    mask: '99999999-9' // Formato para el número de teléfono
                }}
                value={dui}
                onChangeText={setDui}
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