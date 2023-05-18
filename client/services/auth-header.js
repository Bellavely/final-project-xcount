import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function authHeader() {
  let token;
  try {
    token = await AsyncStorage.getItem('token');
  } catch (e) {
    // read error
  }
  if (token) {
    return { 'x-access-token': token }; // for Node.js Express back-end
  } else {
    return {};
  }
}
