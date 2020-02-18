import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Provider } from 'react-redux';
import HomeStack from './app/routes/home.stack';
import { Routes } from './app/core/enums/routes';
import AboutStack from './app/routes/about.stack';
import { store } from './app/redux/store';
import PersonsStack from './app/routes/persons.stack';

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName={Routes.Home}>
          <Drawer.Screen name={Routes.Home} component={HomeStack} />
          <Drawer.Screen name={Routes.Persons} component={PersonsStack} />
          <Drawer.Screen name={Routes.About} component={AboutStack} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;

// npm start -- --reset-cache
