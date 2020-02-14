import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Fonts } from '../core/enums/font';

const Card = ({ children }: any) => (
  <View style={styles.card}>
    <View style={styles.cardContent}>
      <Text>LOAD</Text>
      {children}
    </View>
    <View style={styles.numberContainer}>
      <Text style={styles.numberText}>-₱84</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 6,
    elevation: 3,
    backgroundColor: '#fff',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 4,
  },
  cardContent: {
    marginLeft: 10,
    marginVertical: 10,
  },
  numberContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
  },
  numberText: {
    fontFamily: Fonts.NunitoBold,
    fontSize: 15,
  }
});

export default Card;
