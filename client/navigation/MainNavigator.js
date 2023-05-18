import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import TabsNavigator from '../navigation/TabNavigation';
import InvoiceFormNavigator from './InvoiceFormNavigator';
import { TabContextProvider } from '../context/TabContext';
import ExpenditureNavigator from './ExpenditureNavigator';
import { navigationRef } from './RootNavigation';

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <TabContextProvider>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator initialRouteName="Root" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Root" component={TabsNavigator} options={{animationTypeForReplace:'push'}} />
          <Stack.Screen
            name="InvoicesStack"
            component={InvoiceFormNavigator}
            options={{
              headerShown: false,
              presentation: 'modal',
            }}
          />
          <Stack.Screen
            name="ExpenditureStack"
            component={ExpenditureNavigator}
            options={{
              headerShown: false,
              presentation: 'modal',

            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </TabContextProvider>
  );
};

export default MainNavigator;
