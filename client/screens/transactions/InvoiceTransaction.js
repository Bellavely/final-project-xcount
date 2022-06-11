import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  Alert,
  Image,
} from 'react-native';
import InvoiceService from '../../services/invoice.service';
import { useIsFocused } from '@react-navigation/native';
import { base64ArrayBuffer } from '../../helpers/bufferToBase64';
import { Card } from '@rneui/themed';
import { Chip } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../../components/Header';

const currency = [
  { label: '€', value: '0' },
  { label: '₪', value: '1' },
  { label: '$', value: '2' },
];
const monthsShort = [
  'ינואר',
  'פברואר',
  'מרץ',
  'אפריל',
  'מאי',
  'יוני',
  'יולי',
  'אוגוסט',
  'ספטמבר',
  'אוקטובר',
  'נובמבר',
  'דצמבר',
];
const InvoiceTransaction = ({ route, navigation }) => {
  const { data, onDelete } = route.params;
  const timeToString = (time) => {
    const date = new Date(time);
    const splitDate = date.toISOString().split('T')[0].split('-');
    const month = monthsShort[parseInt(splitDate[1], 10) - 1];
    return splitDate[2] + ' ' + month + ', ' + splitDate[0];
  };

  const deleteTransaction = () => {
    InvoiceService.delete(data.incomeId)
      .then((response) => {
        console.log('transaction deleted');
        navigation.pop();
        if (onDelete && typeof onDelete == 'function') {
          onDelete();
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data); // => the response payload
        }
      });
  };

  const deleteAlert = () =>
    Alert.alert('מחיקת הכנסה', 'האם אתה בטוח שברצונך למחוק הכנסה זו?', [
      {
        text: 'ביטול',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'מחק',
        onPress: () => deleteTransaction(),
      },
    ]);
  return (
    <ScrollView>
      <View>
        <Card>
          <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ height: 20, width: 20 }}>
              <Text style={{ alignSelf: 'center' }}></Text>
            </View>
            <Chip
              style={{
                borderColor: `lightgreen`,
                backgroundColor: `lightgreen`,
                alignSelf: 'center',
              }}
              icon="check-circle"
            >
              {data.description}
            </Chip>
            <TouchableOpacity
              // onPress={() => navigation.navigate('אפשרויות')}
              onPress={deleteAlert}
              style={{
                alignSelf: 'center',
              }}
            >
              <Icon name="delete-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
          {/* <Header style={{ color: 'black', fontSize: 18 }}>{data.category}</Header> */}
          <Header style={{ textAlign: 'center', color: 'black' }}>
            {/* 24 יולי, 2022 */}
            {timeToString(data.date)}
          </Header>
          <Text style={{ opacity: 0.2 }} ellipsizeMode="clip" numberOfLines={1}>
            - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            - - - - - - - - - - - - - - - - - - - - - -
          </Text>
          <Card.Title
            style={{
              textAlign: 'center',
              color: 'grey',
              marginTop: 10,
              fontSize: 14,
            }}
          >
            סכום ההכנסה (כולל מע"מ)
          </Card.Title>
          <Header
            style={{
              textAlign: 'center',
              fontSize: 50,
              paddingVertical: 0,
              marginTop: -15,
              color: 'black',
            }}
          >
            {currency[1].label}
            {data.incomeSum}
          </Header>
          <Text style={{ opacity: 0.2 }} ellipsizeMode="clip" numberOfLines={1}>
            - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            - - - - - - - - - - - - - - - - - - - - - -
          </Text>
          <View style={{ flex: 1, padding: 5, flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: 'grey' }}>סה"כ מע"מ:</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: 'black',
                  textAlign: 'right',
                  fontWeight: 'bold',
                }}
              >
                {currency[1].label}
                {(data.incomeSum * 0.17).toFixed()}
              </Text>
            </View>
          </View>
          <Text style={{ opacity: 0.2 }} ellipsizeMode="clip" numberOfLines={1}>
            - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            - - - - - - - - - - - - - - - - - - - - - -{/* insert itemlist */}
          </Text>
        </Card>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  stretch: {
    width: '100%',
    height: 300,
    resizeMode: 'stretch',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
export default InvoiceTransaction;
