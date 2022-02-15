import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./components/HomeScreen";
import Device from "./components/DeviceScreen";

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'Muistijooga' }}
        />
		<Stack.Screen
          name="Device"
          component={Device}
          options={{ title: 'Laite ikkuna' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MyStack;
