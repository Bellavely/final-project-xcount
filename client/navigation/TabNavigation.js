import React, { useEffect, useState } from 'react';
import { Text,Image, StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '../screens/Dashboard';
import MyBuissnessNavigator from '../navigation/MyBuissnessNavigator';
import { useTabMenu } from '../context/TabContext';
import AddButton from '../components/AddButton';
import { COLORS } from '../core/theme';
import SettingsScreen from '../screens/Settings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TransactionsNavigation from './TransactionsNavigation';
import  SettingNavigation from './SettingNavigation'
const Tab = createBottomTabNavigator();

const getIconColor = (focused) => ({
  tintColor: focused ? COLORS.primary : COLORS.dark,
});

export default function TabNavigation() {
  const { opened, toggleOpened } = useTabMenu();
  const [user, setUser] = useState();
  const [greet, setGreet] = useState('ערב טוב');

  const findGreet = () => {
    const hrs = new Date().getHours();
    if (hrs === 0 || hrs < 12) setGreet('בוקר טוב');
    if (hrs > 12 || hrs < 16) setGreet('צהריים טובים');
    if(hrs>17 || hrs<21) setGreet('ערב טוב')
    if (hrs > 21) setGreet('לילה טוב')
  };
  const findUser = async () => {
    const username = await AsyncStorage.getItem('username');
    setUser(username);
  };

  useEffect(() => {
    findUser();
    findGreet();
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: true,
        keyboardHidesTabBar: true,
        tabBarShowLabel: true,
        tabBarLabelStyle: styles.tabLabel,
        headerTitleAlign: 'center',
        tabBarStyle: styles.tabBar,
        headerTitleStyle: { alignItems: 'center' },
        headerStyle: { height: 150, },
        headerBackTitleStyle: { color: 'transparent',} ,
        headerBackTitleVisible: false,
  
      }}
    >
      <Tab.Screen
        name="בית"
        component={Dashboard}
        options={{
          headerTitle: ()=>{
            return (
              <Text numberOfLines={2} style={styles.Text} >{greet} , {"\n"} ! {user}</Text>
            )
          },
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabIconContainer}>
              <Image
                source={require('../assets/images/Home.png')}
                resizeMode="contain"
                style={[styles.tabIcon, getIconColor(focused)]}
              />
            </View>
          ),
        }}
        listeners={{
          tabPress: (e) => opened && e.preventDefault(),
        }}
      />

      <Tab.Screen
        name="ניהול עסק"
        component={MyBuissnessNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabIconContainer}>
              <Image
                source={require('../assets/images/person.png')}
                resizeMode="contain"
                style={[styles.tabIcon, getIconColor(focused)]}
              />
            </View>
          ),
        }}
        listeners={{
          tabPress: (e) => opened && e.preventDefault(),
        }}
      />

      <Tab.Screen
        name="הוספה"
        component={Dashboard}
        options={{ tabBarButton: () => <AddButton opened={opened} toggleOpened={toggleOpened} /> }}
        listeners={{
          tabPress: (e) => opened && e.preventDefault(),
        }}
      />

      <Tab.Screen
        name="תנועות"
        component={TransactionsNavigation}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabIconContainer}>
              <Image
                source={require('../assets/images/Transactions.png')}
                resizeMode="contain"
                style={[styles.tabIcon, getIconColor(focused)]}
              />
            </View>
          ),
        }}
        listeners={{
          tabPress: (e) => opened && e.preventDefault(),
        }}
      />

      <Tab.Screen
        name="הגדרות"
        component={SettingNavigation}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabIconContainer}>
              <Image
                source={require('../assets/images/Setting.png')}
                resizeMode="contain"
                style={[styles.tabIcon, getIconColor(focused)]}
              />
            </View>
          ),
        }}
        listeners={{
          tabPress: (e) => opened && e.preventDefault(),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    display:'flex',
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
  Text:{
    textAlign:'center',
    fontSize:20,
  },
  tabIconContainer: {
    position: 'absolute',
    top: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    marginBottom: 6,
  },
  tabIcon: {
    width: 32,
    height: Platform.OS === 'ios' ? 50 : 32,
  },
});
