import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import All_Expenses from './All_Expenses';
import All_Incomes from './All_Incomes';

const Tab = createMaterialTopTabNavigator();

const TabbedTransactions = ({ navigation, props }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({});
  }, [navigation]);

  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        initialRouteName="הוצאות"
        screenOptions={{
          tabBarScrollEnabled: false,
          tabBarLabelStyle: { fontSize: 14 },
        }}
      >
        <Tab.Screen name="הכנסות" component={All_Incomes} />
        <Tab.Screen name="הוצאות" component={All_Expenses} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    backgroundColor: 'green',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});

export default TabbedTransactions;
