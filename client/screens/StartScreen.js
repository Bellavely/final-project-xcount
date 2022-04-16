import React, { useEffect, useState } from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import Paragraph from "../components/Paragraph";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function StartScreen({ navigation }) {
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    AsyncStorage.getItem('user').then((value) => {
      if (value) {
        setCurrentUser(JSON.parse(value));
        navigation.replace("Dashboard");
      }else{
        console.log('blat')
      }
    });
  }, []);

  return (
    <Background>
      <Logo />
      <Header>Login Template</Header>
      <Paragraph>
        The easiest way to start with your amazing application.
      </Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("LoginScreen")}
      >
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate("RegisterScreen")}
      >
        Sign Up
      </Button>
    </Background>
  );
}
