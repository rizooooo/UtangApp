import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Fonts } from '../core/enums/font';

const FlatButton = ({ onPress, text }: any) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.button}>
      <Text style={styles.buttonText}>{text}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: '#f01d71',
    marginVertical: 3,
  },
  buttonText: {
    color: '#fff',
    fontFamily: Fonts.NunitoBold,
    textTransform: 'uppercase',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default FlatButton;
