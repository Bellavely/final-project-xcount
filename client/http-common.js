import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';


const ax = axios.create({
  baseURL: Platform.OS === 'ios' ? 'http://localhost:8080/api' : 'http://10.0.2.2:8080/api', // for web expo / ios
  headers: {
    'Content-type': 'application/json',
  },
});


export default ax;
