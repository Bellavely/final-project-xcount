import React, { useEffect, useState,useCallback } from 'react';
import { Text, View, StyleSheet,RefreshControl,FlatList} from 'react-native';
import { Card } from '@rneui/themed';
import TabContainer from '../components/TabContainer';
import { COLORS } from '../core/theme';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ExpenseDataService from '../services/expense.service';
import InvoiceDataService from '../services/invoice.service';



export default function Dashboard({ navigation }) {
const [invoiceSum,SetInvoiceSum]=useState(0);
  const [sum, setSum] = useState(0);
  const [sumVat, setSumVat] = useState(0);
  const [sumIrs, setSumIrs] = useState(0);

  const getInvoiceSum =async()=>{
    InvoiceDataService.invoiceSum().then((response)=>{
      if(response.data[0].incomeSum!=null)
      {
        SetInvoiceSum(response.data[0].incomeSum);
      }
    }).catch((error) => {
      if (error.response) {
        console.log(error.response.data); // => the response payload
      }
    });

  }

  const getExpenseSum = async()=>{
    ExpenseDataService.exppenseSum().then((response)=>{
      if(response.data[0].expenseSum!=null)
          setSum(response.data[0].expenseSum)
    }).catch((error) => {
      if (error.response) {
        console.log(error.response.data); // => the response payload
      }
    });
  }
 
  const getExpenseSumVat= async()=>{
    ExpenseDataService.exppenseVatSum().then((response)=>{
      if(response.data[0].VatRefund!=null)
         setSumVat(response.data[0].VatRefund)
    }).catch((error) => {
      if (error.response) {
        console.log(error.response.data); // => the response payload
      }
    });
  }

  const getExpenseSumIrs= async()=>{
    ExpenseDataService.exppenseIrsSum().then((response)=>{
      if(response.data[0].IrsRefund!=null)
      setSumIrs(response.data[0].IrsRefund)
    }).catch((error) => {
      if (error.response) {
        console.log(error.response.data); // => the response payload
      }
    });
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
    getInvoiceSum();
    getExpenseSum();
    getExpenseSumVat();
    getExpenseSumIrs();
    });
  }, [navigation]);


  return (
    <TabContainer>
      <View style={styles.screenContainer}>
        <Card>
          <View style={styles.user}>
            <View
              style={{
                width: 20,
                height: 20,
                marginRight: 10,
                borderRadius: 6,
                backgroundColor: '#80ffdb',
                resizeMode: 'cover',
              }}
            ></View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>יתרה מוערכת</Text>
              </View>
              <View style={{ flex: 1 }}></View>
            </View>
          </View>
          <Text
            style={{
              textAlign: 'left',
              fontSize: 24,
              marginLeft: 18,
              fontWeight: 'bold',
            }}
          >
            {'\u20AA'}{invoiceSum-sum}
          </Text>
        </Card>

        <View style={styles.space}>
          <Card>
            <View style={styles.container}>
              <View style={styles.box1}></View>
              <View style={styles.box2}></View>
              <View style={styles.box3}></View>
              <View style={styles.box4}></View>
            </View>
            <Card.Divider width={1}></Card.Divider>
            <View style={styles.user}>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.name}>סך הכנסות כללית</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ textAlign: 'right', fontWeight: 'bold' }}>{'\u20AA'}{invoiceSum}</Text>
                </View>
              </View>
            </View>
            <Card.Divider width={1}></Card.Divider>

            <View style={styles.user}>
              <View
                style={{
                  width: 20,
                  height: 20,
                  marginRight: 10,
                  borderRadius: 6,
                  backgroundColor: '#a3cef1',
                  resizeMode: 'cover',
                }}
              ></View>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.name}>סך הוצאות כללית</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ textAlign: 'right', fontWeight: 'bold' }}>{'\u20AA'}{sum}</Text>
                </View>
              </View>
            </View>
            <Card.Divider width={1}></Card.Divider>
            <View style={styles.user}>
              <View
                style={{
                  width: 20,
                  height: 20,
                  marginRight: 10,
                  borderRadius: 6,
                  backgroundColor: '#6096ba',
                  resizeMode: 'cover',
                }}
              ></View>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.name}>מס הכנסה</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ textAlign: 'right', fontWeight: 'bold' }}>{'\u20AA'}{sumIrs}</Text>
                </View>
              </View>
            </View>
            <Card.Divider width={1}></Card.Divider>
            <View style={styles.user}>
              <View
                style={{
                  width: 20,
                  height: 20,
                  marginRight: 10,
                  borderRadius: 6,
                  backgroundColor: '#274c77',
                  resizeMode: 'cover',
                }}
              ></View>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.name}>מע"מ </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ textAlign: 'right', fontWeight: 'bold' }}>{'\u20AA'}{sumVat}</Text>
                </View>
              </View>
            </View>
          </Card>
        </View>
      </View>
    </TabContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 25,
    borderRadius: 4,
    marginTop: 14,
    overflow: 'hidden',
    justifyContent: 'space-around',
    alignItems: 'stretch',
    marginBottom: 38,
  },
  screenContainer: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: COLORS.bg
  },
  box1: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#a3cef1',
  },
  box2: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6096ba',
  },
  box3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#274c77',
  },
  space: {
    marginTop: 14,
  },
  box4: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#80ffdb',
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  price: {
    textAlign: 'right',
  },
  name: {
    fontSize: 16,
    paddingRight: 6,
    textAlign: 'left',
  },
  borderText: {
    marginTop: -27,
    marginLeft: 10,
    fontSize: 14,
    textAlign: 'left',
    color: 'grey',
  },
});
