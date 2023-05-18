import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Card, Divider } from "@rneui/themed";
import { Chip, DataTable, Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Header from "../../components/Header";

const ExpenditureItem = ({ navigation }) => {
  return (
    <ScrollView>
      <View>
        <Card>
          <View
            style={{marginTop:20, flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ height: 20, width: 20 }}>
              <Text style={{ alignSelf: "center" }}></Text>
            </View>
            <Chip
              style={{
                borderColor: `grey`,
                // backgroundColor: `grey`,
                alignSelf: "center",
              }}
              icon="clock-outline"
            >
              ממתין לאישור רואה חשבון
            </Chip>
            <TouchableOpacity
              onPress={() => navigation.navigate("אפשרויות")}
              style={{
                alignSelf: "center",
              }}
            >
              <Icon name="delete-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <Header
            style={{ textAlign: "center", marginTop: 15, color: "black" }}
          >
            24 יולי, 2022
          </Header>
          <Text style={{ opacity: 0.2 }} ellipsizeMode="clip" numberOfLines={1}>
            - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
          </Text>
          <Card.Title
            style={{
              textAlign: "center",
              color: "grey",
              marginTop: 10,
              fontSize: 14,
            }}
          >
            סכום ההוצאה (כולל מע"מ)
          </Card.Title>
          <Header
            style={{
              textAlign: "center",
              fontSize: 50,
              paddingVertical: 0,
              marginTop: -15,
              color: "black",
            }}
          >
            ₪240
          </Header>
          <Text style={{ opacity: 0.2 }} ellipsizeMode="clip" numberOfLines={1}>
            - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
          </Text>
          <View style={{ flex: 1, padding: 5, flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: "grey" }}>סה"כ מע"מ:</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: "black",
                  textAlign: "right",
                  fontWeight: "bold",
                }}
              >
                {"\u20AA"}34
              </Text>
            </View>
          </View>
          <Text style={{ opacity: 0.2 }} ellipsizeMode="clip" numberOfLines={1}>
            - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
          </Text>
          <Image
            resizeMode="stretch"
            source={{
              url: "https://media-cdn.tripadvisor.com/media/photo-s/1a/a5/62/a4/caption.jpg",
            }}
            style={{ width: 200, height: 200 }}
          />
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ExpenditureItem;
