import React from 'react';
import { View, Picker, StyleSheet, Text } from 'react-native';
import { GLOBAL_STYLES } from '../styles/global.styles';

const Label = ({ text }: any) => (
  <Text style={GLOBAL_STYLES.label}>{text}</Text>
);

export default Label;
