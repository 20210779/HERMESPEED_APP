import React, { useState } from 'react';
import { Platform, TextInput, StyleSheet } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

export default function MaskedInputTelefono({telefono, setTelefono}) {
    return (
            <TextInputMask
                style={styles.Input}
                placeholder="Teléfono"
                placeholderTextColor="#fff"
                type={'custom'}
                options={{
                    mask: '9999-9999' // Formato para el número de teléfono
                }}
                value={telefono}
                onChangeText={setTelefono}
            />
    );
}

const styles = StyleSheet.create({
    Input: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#FFBE00',
        padding: 5,
        width: '80%',
        marginTop: 45,
        paddingStart: 5,
        borderRadius: 4,
    },
  
  });