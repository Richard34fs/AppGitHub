import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/Home';
import Perfil from './src/Perfil';
import Repositories from './src/Repositories';
import SavedUsers from './src/SavedUsers';


const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Perfil" component={Perfil} />
        <Stack.Screen name="Repositories" component={Repositories} />
        <Stack.Screen name="SavedUsers" component={SavedUsers} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;