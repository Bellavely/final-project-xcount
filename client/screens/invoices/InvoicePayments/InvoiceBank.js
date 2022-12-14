import React, { useState } from 'react';
import { View, Text, Dimensions, Alert } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Input } from '@rneui/themed';
import { Button } from '@rneui/base';
import DateCalendar from '../../../components/DateCalendar';
import DateSelect from '../../../components/DateSelect';
import { Platform } from 'react-native';

const InvoiceBank = ({ handleSubmit, sumPrice, sumPricePayment }) => {
  const [bankObj, setBankObj] = useState({
    title: 'העברה בנקאית',
    date: `${new Date().getDate().toString().padStart(2, '0')}/${(new Date().getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${new Date().getFullYear()}`,
    sumPrice: '',
  });
  return (
    <View style={{ height: Dimensions.get('window').height }}>
      <ScrollView>
        <View
          style={{
            marginTop: 20,
            borderWidth: 1,
            borderColor: 'white',
            shadowColor: 'black',
            shadowOpacity: 2,
            shadowRadius: 6,
            shadowOffset: {
              width: 0,
              height: -4,
            },
          }}
        />

        <View style={{ paddingHorizontal: 20 }}>
          <View style={{ marginTop: '10%' }}>
        

            {Platform.OS === 'ios' ? (
              <DateCalendar title="תאריך החשבונית:" setCardObj={setBankObj} cardObj={bankObj} />
            ) : (
              <DateSelect />
            )}
          </View>
          <View style={{ marginTop: '10%' }}>
            <Input
              textAlign="right"
              textAlignVertical="center"
              disabledInputStyle={{ background: 'r#ddd' }}
              keyboardType="number-pad"
              placeholder="סכום"
              value={bankObj.sumPrice}
              onChangeText={(e) => {
                if (e <= (sumPricePayment ? sumPrice - sumPricePayment : sumPrice)) {
                  setBankObj({ ...bankObj, sumPrice: e });
                } else {
                  Alert.alert(
                    'שגיאה',
                    `סכום התשלום גדול מסכום היתרה, אנא בחר סכום נמוך מסכום היתרה`,
                    [{ text: 'אישור', onPress: () => console.log('OK Pressed') }]
                  );
                }
              }}
            />
          </View>
          <View
            style={{
              height: Dimensions.get('window').height / 3,
              justifyContent: 'flex-end',
            }}
          >
            <Button onPress={() => handleSubmit('bank', bankObj)}>הוספה</Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default InvoiceBank;
