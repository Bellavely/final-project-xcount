import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
  Image,
  LogBox,
} from 'react-native';
import { Card, Input } from '@rneui/themed';
import DateSelect from '../../components/DateSelect';
import DateCalendar from '../../components/DateCalendar';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import PhotoLibraryPicker from '../../components/PhotoLibraryPicker';
import NumberFormat from 'react-number-format';
import SwitchSelector from 'react-native-switch-selector';
import ExpenseDataService from '../../services/expense.service';
import { generateImageForm, uploadImage } from '../../helpers/imageUtil';
import { Categories } from '../../components/Categories';
import * as RootNavigation from '../../navigation/RootNavigation';

const options = [
  { label: '€', value: '0', testID: 'switch-zero', accessibilityLabel: 'switch-zero' },
  { label: '₪', value: '1', testID: 'switch-one', accessibilityLabel: 'switch-one' },
  { label: '$', value: '2', testID: 'switch-two', accessibilityLabel: 'switch-two' },
];
LogBox.ignoreAllLogs(true);

const ExpenditureScreen = ({ navigation }) => {
  const [sum, setSum] = useState();
  const [currency, setCurrency] = useState(1);
  const [imageBase64, setImageBase64] = useState(null);
  const [image, setImage] = useState(null);
  const [selectedCategory, setCategory] = useState('');
  const [selectedDate, setDate] = useState(new Date());
  const [title, setTitle] = useState('');

  const addCategoryHandler = (category) => {
    setCategory(category);
  };
  const addDateHandler = (date) => {
    setDate(date);
  };
  const childRef = useRef();

  const saveExpense = async () => {
    const imageform = generateImageForm(image, imageBase64);
    const uploadedImage = await uploadImage(imageform);

    let data = {
      date: selectedDate,
      VatType: selectedCategory['id'],
      name: title,
      category: selectedCategory['title'],
      expenseImg: uploadedImage == null ? null : uploadedImage,
      expenseSum: sum,
      currency: currency,
    };
    ExpenseDataService.create(data)
      .then((response) => {
        RootNavigation.navigate('תנועות');
        console.log(response.data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data); // => the response payload
        }
      });
  };

  const handleChange = (e) => {
    childRef.current.changeButtonState(e != 0 ? false : true);
    setSum(e);
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        enabled
      >
        <Card>
          <Input
            textAlign="center"
            textAlignVertical="center"
            maxLength={24}
            onChangeText={setTitle}
            disabledInputStyle={{ background: '#ddd' }}
            placeholder="תיאור הוצאה"
          ></Input>

          {Platform.OS === 'ios' ? (
            <DateCalendar title="תאריך: " setCardObj={setDate} cardObj={selectedDate} />
          ) : (
            <DateSelect onDateSelect={addDateHandler} />
          )}
          {!image && (
                  <Categories onCategorySelect={addCategoryHandler} />
          )}
          <Card.Title
            style={{
              textAlign: 'center',
              color: 'grey',
              marginTop: 15,
              fontSize: 14,
            }}
          >
            סכום ההוצאה (כולל מע"מ)
          </Card.Title>
          <NumberFormat
            thousandsGroupStyle="thousand"
            value={sum}
            renderText={(value) => (
              <Input
                placeholder="סכום"
                placeholderTextColor={'#d3d3d3'}
                editable={!image}
                style={{ textAlign: 'center', fontSize: 50, fontWeight: 'bold' }}
                maxLength={10}
                onChangeText={handleChange}
                autoCorrect={false}
                inputContainerStyle={{ borderBottomWidth: 0 }}
                value={image == null ? value : options[currency].label + value}
                keyboardType="numeric"
              />
            )}
            decimalSeparator="."
            displayType="text"
            type="text"
            thousandSeparator={true}
          />
          {image && selectedCategory && (
            <Text style={styles.title}>{selectedCategory['title']}</Text>
      
          )}
          {!image && (
              <Text style={{ opacity: 0.2 }} ellipsizeMode="clip" numberOfLines={1}>
                - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                - - - - - - - - - - - - - - - - - - - - - - - -
              </Text>
            ) && (
              <SwitchSelector
                initial={1}
                onPress={(value) => setCurrency(value)}
                textColor="#274c77"
                selectedColor="white"
                buttonColor="#274c77"
                borderColor="#274c77"
                fontWeight="bold"
                hasPadding
                fontSize={20}
                options={options}
              />
            )}
          <View>
            {image && (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text style={{ opacity: 0.2 }} ellipsizeMode="clip" numberOfLines={1}>
                  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                  - - - - - - - - - - - - - - - - - - - - - - - - -
                </Text>
                <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
              </View>
            )}
          </View>
        </Card>
        <View style={styles.bottomContainer}>
          <View style={{ flex: 1 }}>
            {!image && (
              <PhotoLibraryPicker
                ref={childRef}
                avatarIcon="person"
                image={image}
                setImageBase64={setImageBase64}
                setImage={setImage}
              />
            )}
          </View>
        </View>

        <View style={styles.bottomContainer}>
          <View style={{ flex: 1 }}>
            {image && (
              <TouchableOpacity style={styles.panelButton} onPress={saveExpense}>
                <Text style={styles.panelButtonTitle}>הוספת הוצאה</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {

    flexDirection: 'row',
    padding: 5,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#6096ba',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
  },
  scrollContainer: {
    flex: 1,
  },
  container: {
    paddingTop: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
  },

  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 3,
  },
});

export default ExpenditureScreen;
