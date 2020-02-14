import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeStack from './app/routes/home.stack';
import { Routes } from './app/core/enums/routes';
import AboutStack from './app/routes/about.stack';

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName={Routes.Home}>
        <Drawer.Screen name={Routes.Home} component={HomeStack} />
        <Drawer.Screen name={Routes.About} component={AboutStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;

// npm start -- --reset-cache
