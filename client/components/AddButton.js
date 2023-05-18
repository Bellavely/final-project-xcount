import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  // TouchableOpacity,
  View,
  StyleSheet,
  Image,
  Animated,
} from "react-native";
import { COLORS } from "../core/theme";
import { useNavigation } from "@react-navigation/native";

const AddButton = ({ opened, toggleOpened }) => {
  const animation = React.useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  React.useEffect(() => {
    Animated.timing(animation, {
      toValue: opened ? 1 : 0,
      duration: 300,
      friction: 2,
      useNativeDriver: false,
    }).start();
  }, [opened, animation]);

  const opacity = {
    opacity: animation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0, 1],
    }),
  };

  const GoToButton = (screenName) => {
    navigation.navigate(screenName);
    toggleOpened();
  };
  return (
    <View>
     
      <View style={styles.container}>
        <View style={styles.box}>
          <Animated.View
            style={[
              styles.item,
              opacity,
              {
                transform: [
                  {
                    translateX: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -60],
                    }),
                  },
                  {
                    translateY: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -50],
                    }),
                  },
                ],
              },
            ]}
          >
            <TouchableOpacity onPress={()=> GoToButton("InvoicesStack")}>
              <View style={styles.IconContainer}>
                <Image
                  source={require("../assets/images/Arrow_Down.png")}
                  resizeMode="contain"
                  style={styles.itemIcon}
                />
              </View>
            </TouchableOpacity>
          </Animated.View>
          
          <Animated.View
            style={[
              styles.item,
              opacity,
              {
                transform: [
                  {
                    translateX: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 60],
                    }),
                  },
                  {
                    translateY: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -50],
                    }),
                  },
                ],
              },
            ]}
          >
            <TouchableOpacity onPress={() => GoToButton("ExpenditureStack")}>
              <View style={styles.IconContainer}>
                <Image
                  source={require("../assets/images/Arrow_Top.png")}
                  resizeMode="contain"
                  style={styles.itemIcon}
                />
              </View>
            </TouchableOpacity>
          </Animated.View>
          <View style={styles.addButtonHolder}>
            <TouchableOpacity onPress={toggleOpened} style={styles.addButton}>
              <Animated.View
                style={[
                  styles.addButtonInner,
                  {
                    transform: [
                      {
                        rotate: animation.interpolate({
                          inputRange: [0, 1],
                          outputRange: ["0deg", "45deg"],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <Image
                  source={require("../assets/images/Add.png")}
                  resizeMode="contain"
                  style={styles.addButtonIcon}
                />
              </Animated.View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    height: 0,
  },
  box: {
    position: "relative",
    width: 60,
    height: 60,
    marginTop: -30,
  },
  addButton: {
    shadowColor: COLORS.dark,
    shadowOpacity: 10,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  addButtonInner: {
    elevation: 6,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    marginBottom: 10,
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  addButtonIcon: {
    width: 40,
    height: 40,
    tintColor: COLORS.white,
  },
  item: {
    position: "absolute",
    top: 5,
    left: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  itemIcon: {
    width: 32,
    height: 32,
    tintColor: COLORS.white,
  },
  IconContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
  },
});

export default AddButton;
