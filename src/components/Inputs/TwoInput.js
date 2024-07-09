// components/TwoColumnInput.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import IconTextInput from './IconTextInput';

export default function TwoInput({
leftIconName,
 leftPlaceholder, 
 leftValue, 
 leftOnChangeText, 
 rightIconName, 
 rightPlaceholder, 
 rightValue, 
 rightOnChangeText,
  secureTextEntry,
}){
    return (
        <View style={styles.row}>
          <IconTextInput
            iconName={leftIconName}
            placeholder={leftPlaceholder}
            value={leftValue}
            onChangeText={leftOnChangeText}
            secureTextEntry={secureTextEntry}
          />
          <IconTextInput
            iconName={rightIconName}
            placeholder={rightPlaceholder}
            value={rightValue}
            onChangeText={rightOnChangeText}
            secureTextEntry={secureTextEntry}
          />
        </View>
      );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
});
