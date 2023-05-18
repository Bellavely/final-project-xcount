import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button } from '@rneui/base';
import InvoiceAddPayment from './InvoicePayments/InvoiceAddPayment';
import InvoiceApp from './InvoicePayments/InvoiceApp';
import InvoiceBank from './InvoicePayments/InvoiceBank';
import InvoiceCheckBook from './InvoicePayments/InvoiceCheckBook';
import InvoiceCash from './InvoicePayments/InvoiceCash';
import InvoicePaypal from './InvoicePayments/InvoicePaypal';
import InvoiceCreditCard from './InvoicePayments/InvoiceCreditCard';

const InvoicePayment = ({ navigation, route }) => {
  const { setIsSumPayment, sumPrice, sumPricePayment } = route?.params;
  const [openModal, setOpenModal] = useState(false);
  const [payment, setPayment] = useState({
    addPayment: true,
    creditCard: false,
    checkBook: false,
    bank: false,
    app: false,
    cash: false,
    paypal: false,
  });

  const handleSubmit = (from, obj) => {
    setPayment({ ...payment, [from]: false });
    setIsSumPayment(true);
    navigation.navigate('חשבונית מס/קבלה', { payment: obj, isSum: true });
  };

  return (
    <View style={{ backgroundColor: openModal ? '#a9a9a9' : 'white' }}>
      <View
        style={{
          backgroundColor: '#CCCCFF',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
        }}
      >
        <Text style={{ textAlign: 'left', lineHeight: 40, fontSize: 20 }}>יתרה לתשלום</Text>
        <Text style={{ textAlign: 'left', lineHeight: 40, fontSize: 20 }}>
          {'\u20AA'}
          {(sumPrice - sumPricePayment).toFixed(2)}
        </Text>
      </View>
      {payment.addPayment && <InvoiceAddPayment setPayment={setPayment} />}
      {payment.app && (
        <InvoiceApp
          setPayment={setPayment}
          handleSubmit={handleSubmit}
          sumPrice={sumPrice}
          sumPricePayment={sumPricePayment}
        />
      )}
      {payment.bank && (
        <InvoiceBank
          setPayment={setPayment}
          handleSubmit={handleSubmit}
          sumPrice={sumPrice}
          sumPricePayment={sumPricePayment}
        />
      )}
      {payment.checkBook && (
        <InvoiceCheckBook
          setPayment={setPayment}
          handleSubmit={handleSubmit}
          sumPrice={sumPrice}
          sumPricePayment={sumPricePayment}
        />
      )}
      {payment.creditCard && (
        <InvoiceCreditCard
          setPayment={setPayment}
          handleSubmit={handleSubmit}
          sumPrice={sumPrice}
          sumPricePayment={sumPricePayment}
        />
      )}
      {payment.cash && (
        <InvoiceCash
          setPayment={setPayment}
          handleSubmit={handleSubmit}
          sumPrice={sumPrice}
          sumPricePayment={sumPricePayment}
        />
      )}
      {payment.paypal && (
        <InvoicePaypal
          setPayment={setPayment}
          handleSubmit={handleSubmit}
          sumPrice={sumPrice}
          sumPricePayment={sumPricePayment}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 130,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: '50%',
    width: '90%',
  },
  text: {
    textAlign: 'left',
  },
});

export default InvoicePayment;


