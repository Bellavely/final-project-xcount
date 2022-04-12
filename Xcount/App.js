import React from 'react'
import { Provider } from 'react-native-paper'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { createStackNavigator } from '@react-navigation/stack'
import { theme } from './core/theme'
import {
  LoginScreen,
  RegisterScreen,
  Dashboard,
} from './screens'
const Stack = createStackNavigator()



export default function App() {
  return (
  <Provider theme={theme}>
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="Dashboard" component={Dashboard}  options={{title:" הוספת הכנסה או הוצאה",headerShown:true,headerBackVisble:false,headerTitleAlign:'center'}}/>
    </Stack.Navigator>
  </NavigationContainer>
</Provider>

  );
}


