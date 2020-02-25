import React from 'react';
import {
  View,
  Picker,
  StyleSheet,
  Text,
  ActivityIndicator,
} from 'react-native';
import { GLOBAL_STYLES } from '../styles/global.styles';
import { Fonts } from '../core/enums/font';

const Spinner = ({ text }: any) => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#0000ff" />
    <Text style={styles.loadingText}>{text ? text : 'LOADING'}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  loadingText: {
    alignSelf: 'center',
    fontFamily: Fonts.NunitoBold,
    fontSize: 15,
    textTransform: 'capitalize',
  },
});

export default Spinner;
