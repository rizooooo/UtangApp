import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/home.screen';
import DetailScreen from '../screens/detail.screen';
import { Routes } from '../core/enums/routes';
import Header from '../shared/header.component';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Routes.Home}
        component={HomeScreen}
        options={{
          header: props => <Header {...props} title={'Expenses'} />,
        }}
      />
      <Stack.Screen
        name={Routes.Detail}
        component={DetailScreen}
        options={{ title: 'Detail' }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
