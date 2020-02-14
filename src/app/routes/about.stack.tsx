import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AboutScreen from '../screens/about.screen';
import { Routes } from '../core/enums/routes';

const Stack = createStackNavigator();

const AboutStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={Routes.About} component={AboutScreen} />
    </Stack.Navigator>
  );
};

export default AboutStack;
