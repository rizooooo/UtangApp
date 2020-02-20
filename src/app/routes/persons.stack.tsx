import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DetailScreen from '../screens/detail.screen';
import { Routes } from '../core/enums/routes';
import Header from '../shared/header.component';
import PersonsScreen from '../screens/persons.screen';

const Stack = createStackNavigator();

const PersonsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Routes.Home}
        component={PersonsScreen}
        options={{ header: props => <Header {...props} title={'Utang App'} /> }}
      />
      <Stack.Screen
        name={Routes.Detail}
        component={DetailScreen}
        options={{ title: 'Detail' }}
      />
    </Stack.Navigator>
  );
};

export default PersonsStack;
