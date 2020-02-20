import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  ImageBackground,
} from 'react-native';
import { Fonts } from '../core/enums/font';
import { Images } from '../styles/images';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Header = ({ title, navigation }: any) => {
  const openMenu = () => {
    navigation.toggleDrawer();
  };
  return (
    <ImageBackground source={Images.headerImage} style={styles.header}>
      <Icon
        onPress={() => openMenu()}
        style={styles.icon}
        name="hamburger"
        size={30}
        color="#900"
      />
      <View style={styles.headerTitle}>
        <Image source={Images.headerLogo} style={styles.headerImage} />
        <Text style={styles.headerText}>{title}</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eee',
  },
  headerText: {
    fontSize: 25,
    color: '#333',
    letterSpacing: 1,
    fontFamily: Fonts.NunitoBold,
  },
  icon: {
    position: 'absolute',
    left: 10,
  },
  headerTitle: {
    flexDirection: 'row',
  },
  headerImage: {
    width: 26,
    height: 26,
    marginHorizontal: 8,
  },
});

export default Header;
