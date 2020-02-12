import React from 'react';
import { Text, StyleSheet } from 'react-native';

const App = () => {
  return <Text style={styles.title}>Hellow</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Nunito-Regular',
    fontSize: 50,
  },
});

export default App;
