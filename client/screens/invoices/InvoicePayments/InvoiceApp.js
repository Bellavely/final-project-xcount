import React, { useState } from 'react';
import { View, Text, Dimensions, Alert } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Input } from '@rneui/themed';
import { Button } from '@rneui/base';
import DateCalendar from '../../../components/DateCalendar';
import { Platform } from 'react-native';
import DateSelect from '../../../components/DateSelect';

const InvoiceApp = ({ handleSubmit, sumPrice, sumPricePayment }) => {
  const [appObj, setAppObj] = useState({
    title: 'דרך אפליקציה',
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
              <DateCalendar title="תאריך החשבונית:" setCardObj={setAppObj} cardObj={appObj} />
            ) : (
             <DateSelect/>
            )}
          </View>
          <View style={{ marginTop: '10%' }}>
            <Input
              textAlign="right"
              keyboardType='numeric'
              textAlignVertical="center"
              disabledInputStyle={{ background: '#ddd' }}
              placeholder="סכום"
              value={appObj.sumPrice}
              onChangeText={(e) => {
                if (e <= (sumPricePayment ? sumPrice - sumPricePayment : sumPrice)) {
                  setAppObj({ ...appObj, sumPrice: e });
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
            <Button
              onPress={() => {
                handleSubmit('app', appObj);
              }}
            >
              הוספה
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default InvoiceApp;
