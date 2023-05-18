import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { ListItem } from "@rneui/themed";
import { Agenda } from "react-native-calendars";
import { Card, Avatar } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as RootNavigation from "../../navigation/RootNavigation";

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split("T")[0];
};
const ExpenditureNotYetConfirmed = ({ navigation, props }) => {
  const [items, setItems] = useState({});
 
  const loadItems = (day) => {
    setTimeout(() => {
      for (let i = -15; i < 12; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        if (!items[strTime]) {
          items[strTime] = [];
          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            let RandomNumber = Math.floor(Math.random() * 10000) + 1;

            items[strTime].push({
              // name: "Item for " + strTime + " #" + j,
              name: "הוצאה טרם אושרה",
              sum: "₪" + RandomNumber,
              height: Math.max(50, Math.floor(Math.random() * 150)),
            });
          }
        }
      }
      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }, 1000);
  };
  const renderItem = (item) => {
    return (
      <TouchableOpacity
        onPress={() =>
          RootNavigation.navigate("ExpenditureStack", {
            screen: "הוצאה טרם אושרה",
          })
        }
        style={{ marginRight: 10, marginTop: 27 }}
      >
        <Card>
          <Card.Content>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                minHeight: 30,
              }}
            >
              <Icon
                name="clock-outline"
                type="ionicon"
                size={20}
                color="grey"
              />
              <Text style={{ fontSize: 15 }}>{item.name}</Text>
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                {item.sum}
              </Text>
              <ListItem.Chevron
                size={20}
                style={{ transform: [{ rotateY: "180deg" }] }}
                color={"black"}
              />
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <Agenda
        renderEmptyData={() => null}
        theme={{
          "stylesheet.agenda.main": {
            header: {
              height: 0,
              width: 0,
            },
            knobContainer: {
              height: 0,
              width: 0,
            },
            knob: {
              height: 0,
              width: 0,
            },
            weekdays: {
              height: 0,
              width: 0,
            },
            weekday: {
              height: 0,
              width: 0,
            },
            reservations: {
              flex: 1,
              marginTop: 10,
              backgroundColor: "#F1F1F1",
            },
          },
        }}
      
        items={items}
        loadItemsForMonth={loadItems}
        selected={"2022-05-16"}
        renderItem={renderItem}
      />
    </View>
  );
};
export default ExpenditureNotYetConfirmed;
