import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Card, Input, Divider } from '@rneui/themed';
import { Button } from '@rneui/base';
import { DataTable } from 'react-native-paper';
import CustomDivider from '../../components/CustomDivider';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import invoiceDataService from '../../services/invoice.service';

import ReactDOMServer from 'react-dom/server';

const InvoiceSecond = ({ navigation, route }) => {
  console.log('****************InvoiceSecond*******************');
  console.log(route.params);
  console.log('**************************************');
  const {
    description,
    dataTableValues,
    sumPrice,
    sumPriceVAT,
    sumPriceWithVAT,
    paymentTableValues,
    sumPricePayment,
    clientObj,
    date,
    saveCustomer,
  } = route?.params;

  const saveNewCustomer = () => {
    if (saveCustomer) {
      console.log('SAVE CUSTOMER');
      console.log(clientObj);
      invoiceDataService.createCustomer(clientObj);
    }
  };
  const html = ReactDOMServer.renderToStaticMarkup(
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'left',
        direction: 'rtl',
      }}
    >
      <Card style={{ display: 'flex', flexDirection: 'column' }}>
        <View style={{ marginBottom: '5%', display: 'flex', flexDirection: 'column' }}>
          <Card.Title style={{ textAlign: 'right', fontSize: 20 }}>פרטי הלקוח</Card.Title>
          <Text style={{ textAlign: 'right', fontSize: 15 }}>
            <Text style={{ fontWeight: 'bold' }}>שם:</Text> {clientObj?.name}
          </Text>
          <Text style={{ textAlign: 'right', fontSize: 15, marginVertical: 10 }}>
            <Text style={{ fontWeight: 'bold' }}>טלפון:</Text> {clientObj?.phone}
          </Text>
          <Text style={{ textAlign: 'right', fontSize: 15 }}>
            <Text style={{ fontWeight: 'bold' }}>מספר עוסק או ח.פ:</Text> {clientObj?.companyNumber}
          </Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'column' }}>
          <Card.Title style={{ textAlign: 'right', fontSize: 20 }}>פרטי המסמך</Card.Title>
          <Card.Title style={{ textAlign: 'right', color: 'grey', fontSize: 15 }}>
            סוג מסמך:
          </Card.Title>
          <Card.Title style={{ textAlign: 'right', color: 'darkblue', fontSize: 24 }}>
            חשבונית מס / קבלה
          </Card.Title>
        </View>
        <CustomDivider />

        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            direction: 'ltr',
          }}
        >
          <Card.Title style={{ textAlign: 'right' }}>פירוט עסקה ושירותים</Card.Title>
          <DataTable style={{ display: 'flex', flexDirection: 'column' }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}
            >
              <DataTable.Title numeric>סה"כ</DataTable.Title>
              <DataTable.Title>מחיר ליח'</DataTable.Title>
              <DataTable.Title>כמות</DataTable.Title>
              <DataTable.Title>פריט</DataTable.Title>
              {/* <DataTable.Title numeric></DataTable.Title> */}
            </View>
            <View style={{ display: 'flex', flexDirection: 'column' }}>
              {dataTableValues.map((obj, index) => {
                return (
                  <View key={index} style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <DataTable.Cell numeric>
                      {'\u20AA'}
                      {Number(obj?.price) * Number(obj?.intity)}
                    </DataTable.Cell>
                    <DataTable.Cell>
                      {'\u20AA'}
                      {obj?.price}
                    </DataTable.Cell>
                    <DataTable.Cell>{obj?.intity}</DataTable.Cell>
                    <DataTable.Cell>{obj?.itemName}</DataTable.Cell>
                    {/* <DataTable.Cell numeric>{<Icon name="dots-vertical" size={20} />}</DataTable.Cell> */}
                  </View>
                );
              })}
            </View>
            <View style={{ display: 'flex', flexDirection: 'column' }}>
              <Divider style={{ elevation: 0.5 }} />
              <View style={{ flex: 1, padding: 5, flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ textAlign: 'right' }}>סה"כ:</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ textAlign: 'right', fontWeight: 'bold' }}>
                    {'\u20AA'}
                    {sumPrice}
                  </Text>
                </View>
              </View>
              <Text ellipsizeMode="clip" numberOfLines={1}>
                - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                - - - - - - - - - - - - - - - - - - - - - - - -
              </Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'column' }}>
              <View style={{ flex: 1, padding: 5, flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ textAlign: 'right' }}>מע"מ:</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ textAlign: 'right', fontWeight: 'bold' }}>
                    {'\u20AA'}
                    {sumPriceVAT}
                  </Text>
                </View>
              </View>
              <Divider style={{ elevation: 0.5 }} />
              <View
                style={{
                  flex: 1,
                  padding: 5,
                  marginTop: 10,
                  flexDirection: 'row',
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={{ textAlign: 'right', fontWeight: 'bold' }}>
                    {'\u20AA'}
                    {sumPriceWithVAT}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ textAlign: 'right' }}>:סה"כ לתשלום</Text>
                </View>
              </View>
            </View>
          </DataTable>
        </View>

        <CustomDivider />
        <View style={{ display: 'flex', flexDirection: 'column' }}>
          <Card.Title style={{ textAlign: 'right' }}>תקבולים</Card.Title>
          <DataTable style={{ display: 'flex', flexDirection: 'column' }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginBottom: '3%',
              }}
            >
              <DataTable.Title>סוג א. תשלום</DataTable.Title>
              <DataTable.Title numeric>תאריך</DataTable.Title>
              <DataTable.Title numeric>סכום</DataTable.Title>
              <DataTable.Title numeric></DataTable.Title>
            </View>
            {/* <DataTable.Row>
              <DataTable.Cell>כ.אשראי</DataTable.Cell>
              <DataTable.Cell numeric>20/04/22</DataTable.Cell>
              <DataTable.Cell numeric>{'\u20AA'}345</DataTable.Cell>
              <DataTable.Cell numeric>{<Icon name="dots-vertical" size={20} />}</DataTable.Cell>
            </DataTable.Row> */}
            <View style={{ display: 'flex', flexDirection: 'column' }}>
              {paymentTableValues.map((obj, index) => {
                return (
                  <View key={index} style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <DataTable.Cell>{obj?.title}</DataTable.Cell>
                    <DataTable.Cell>{obj?.date}</DataTable.Cell>
                    <DataTable.Cell>
                      {'\u20AA'}
                      {obj?.sumPrice}
                    </DataTable.Cell>
                  </View>
                );
              })}
            </View>
          </DataTable>
        </View>
        <Divider style={{ elevation: 0.5 }} />
        <View style={{ display: 'flex', flexDirection: 'column' }}>
          <View style={{ flex: 1, padding: 5, marginTop: 10, flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <Text style={{ textAlign: 'right' }}>סה"כ שולם:</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ textAlign: 'right', fontWeight: 'bold' }}>
                {'\u20AA'}
                {sumPricePayment}
              </Text>
            </View>
          </View>
        </View>
      </Card>
    </View>
  );

  return (
    <ScrollView>
      <View>
        <Card>
          <View style={{ marginBottom: '5%' }}>
            <Card.Title style={{ textAlign: 'left', fontSize: 20 }}>פרטי הלקוח</Card.Title>
            <Text style={{ textAlign: 'left', fontSize: 15 }}>
              <Text style={{ fontWeight: 'bold' }}>שם:</Text> {clientObj?.name}
            </Text>
            <Text style={{ textAlign: 'left', fontSize: 15, marginVertical: 10 }}>
              <Text style={{ fontWeight: 'bold' }}>טלפון:</Text> {clientObj?.phone}
            </Text>
            <Text style={{ textAlign: 'left', fontSize: 15 }}>
              <Text style={{ fontWeight: 'bold' }}>מספר עוסק או ח.פ:</Text>{' '}
              {clientObj?.companyNumber}
            </Text>
          </View>
          <Card.Title style={{ textAlign: 'left', fontSize: 20 }}>פרטי המסמך</Card.Title>
          <Card.Title style={{ textAlign: 'left', color: 'grey', fontSize: 15 }}>
            סוג מסמך:
          </Card.Title>
          <Card.Title style={{ textAlign: 'left', color: 'darkblue', fontSize: 24 }}>
            חשבונית מס / קבלה
          </Card.Title>

          <CustomDivider />

          <Card.Title style={{ textAlign: 'left' }}>פירוט עסקה ושירותים</Card.Title>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>פריט</DataTable.Title>
              <DataTable.Title>כמות</DataTable.Title>
              <DataTable.Title>מחיר ליח'</DataTable.Title>
              <DataTable.Title numeric>סה"כ</DataTable.Title>
              {/* <DataTable.Title numeric></DataTable.Title> */}
            </DataTable.Header>
            {dataTableValues.map((obj, index) => {
              return (
                <DataTable.Row key={index}>
                  <DataTable.Cell>{obj?.itemName}</DataTable.Cell>
                  <DataTable.Cell>{obj?.intity}</DataTable.Cell>
                  <DataTable.Cell>
                    {'\u20AA'}
                    {obj?.price}
                  </DataTable.Cell>
                  <DataTable.Cell numeric>
                    {'\u20AA'}
                    {Number(obj?.price) * Number(obj?.intity)}
                  </DataTable.Cell>
                  {/* <DataTable.Cell numeric>{<Icon name="dots-vertical" size={20} />}</DataTable.Cell> */}
                </DataTable.Row>
              );
            })}
            <Divider style={{ elevation: 0.5 }} />
            <View style={{ flex: 1, padding: 5, flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <Text style={{ textAlign: 'left' }}>סה"כ:</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ textAlign: 'right', fontWeight: 'bold' }}>
                  {'\u20AA'}
                  {sumPrice}
                </Text>
              </View>
            </View>
            <Text ellipsizeMode="clip" numberOfLines={1}>
              - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
              - - - - - - - - - - - - - - - - - - - - - - -
            </Text>
            <View style={{ flex: 1, padding: 5, flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <Text style={{ textAlign: 'left' }}>מע"מ:</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ textAlign: 'right', fontWeight: 'bold' }}>
                  {'\u20AA'}
                  {sumPriceVAT}
                </Text>
              </View>
            </View>
            <Divider style={{ elevation: 0.5 }} />
            <View
              style={{
                flex: 1,
                padding: 5,
                marginTop: 10,
                flexDirection: 'row',
              }}
            >
              <View style={{ flex: 1 }}>
                <Text style={{ textAlign: 'left' }}>סה"כ לתשלום:</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ textAlign: 'right', fontWeight: 'bold' }}>
                  {'\u20AA'}
                  {sumPriceWithVAT}
                </Text>
              </View>
            </View>
          </DataTable>
          <CustomDivider />

          <Card.Title style={{ textAlign: 'left' }}>תקבולים</Card.Title>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>סוג א. תשלום</DataTable.Title>
              <DataTable.Title numeric>תאריך</DataTable.Title>
              <DataTable.Title numeric>סכום</DataTable.Title>
              <DataTable.Title numeric></DataTable.Title>
            </DataTable.Header>
            {/* <DataTable.Row>
              <DataTable.Cell>כ.אשראי</DataTable.Cell>
              <DataTable.Cell numeric>20/04/22</DataTable.Cell>
              <DataTable.Cell numeric>{'\u20AA'}345</DataTable.Cell>
              <DataTable.Cell numeric>{<Icon name="dots-vertical" size={20} />}</DataTable.Cell>
            </DataTable.Row> */}
            {paymentTableValues.map((obj, index) => {
              return (
                <DataTable.Row key={index}>
                  <DataTable.Cell>{obj?.title}</DataTable.Cell>
                  <DataTable.Cell>{obj?.date}</DataTable.Cell>
                  <DataTable.Cell>
                    {'\u20AA'}
                    {obj?.sumPrice}
                  </DataTable.Cell>
                </DataTable.Row>
              );
            })}
          </DataTable>
          <Divider style={{ elevation: 0.5 }} />
          <View style={{ flex: 1, padding: 5, marginTop: 10, flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <Text style={{ textAlign: 'left' }}>סה"כ שולם:</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ textAlign: 'right', fontWeight: 'bold' }}>
                {'\u20AA'}
                {sumPricePayment}
              </Text>
            </View>
          </View>
        </Card>
        <Button
          title={'הפקת חשבונית מס / קבלה'}
          onPress={async () => {
            try {
              console.log('****************onPressTry*******************');
              console.log(date, sumPrice, dataTableValues, paymentTableValues);
              console.log('**************************************');
              const result = await onPressCreateInvoice(
                saveCustomer,
                1,
                date.date,
                description,
                sumPrice,
                dataTableValues,
                paymentTableValues
              );
              await saveNewCustomer();
              console.log('*******************onPressResult*******************');
              console.log(result);
              console.log('**************************************');
            } catch (error) {
              console.log('*******************onPressError*******************');
              console.log(error);
              console.log('**************************************');
            }
    
            navigation.navigate('הפקת חשבונית מס/קבלה', {
              sumPrice: sumPrice,
              sumPriceWithVAT: sumPriceWithVAT,
              date: date,
              html,
            });
          }}
          containerStyle={{
            padding: 15,
            marginVertical: 10,
          }}
        />
      </View>
    </ScrollView>
  );
  function onPressCreateInvoice(
    saveCustomer,
    customerId,
    date,
    description,
    incomeSum,
    items,
    paymentMethods
  ) {
    return invoiceDataService.create({
      saveCustomer,
      customerId,
      date,
      description,
      items,
      incomeSum,
      paymentMethods,
    });
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default InvoiceSecond;
