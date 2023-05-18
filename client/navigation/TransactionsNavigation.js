import React from 'react';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Transaction from '../screens/transactions/Transaction';
import InvoiceTransaction from '../screens/transactions/InvoiceTransaction';
import TabbedTransactions from '../screens/transactions/TabbedTransactions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { COLORS } from '../core/theme';

const Stack = createNativeStackNavigator();

const TransactionsNavigation = ({ navigation, route }) => {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'פרטי הוצאה') {
      navigation.setOptions({ tabBarStyle: { display: 'none' } });
    } else {
      navigation.setOptions({ tabBarStyle: styles.tabBar }); //fix
    }
  }, [navigation, route]);

  return (
    <Stack.Navigator initialRouteName="alltrasactions">
      <Stack.Screen
        name="פרטי הוצאה"
        component={Transaction}
        options={{
          title: 'הוצאה',
          headerShown: true,
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="פרטי הכנסה"
        component={InvoiceTransaction}
        options={{
          headerShown: true,
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="alltrasactions"
        component={TabbedTransactions}
        options={({ navigation, route }) => ({
          title: 'תנועות',
          headerShown: true,
          headerTitleAlign: 'center',
   
        })}
      />
    </Stack.Navigator>
  );
};

export default TransactionsNavigation;
const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    padding: 0,
    height: 56,
    backgroundColor: COLORS.white,
    borderTopColor: 'transparent',
    shadowColor: COLORS.dark,
    shadowOffset: {
      height: 6,
      width: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  
  },
});
