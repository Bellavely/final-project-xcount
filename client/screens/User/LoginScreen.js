import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import { Text } from 'react-native-paper';
import Background from '../../components/Background';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import { theme } from '../../core/theme';
import { emailValidator } from '../../helpers/emailValidator';
import { passwordValidator } from '../../helpers/passwordValidator';
import { AuthContext } from '../../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const { signIn } = React.useContext(AuthContext);
  const [username, setUsername] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const onLoginPressed = () => {
    const passwordError = passwordValidator(password.value);
    if (passwordError) {
      setPassword({ ...password, error: passwordError });
      return;
    }
    signIn(username.value, password.value);
  };

  return (
    <Background>
      <Logo />
      <Header>ברוך הבא!</Header>
      <TextInput
        label="שם משתמש"
        returnKeyType="next"
        value={username.value}
        onChangeText={(text) => setUsername({ value: text, error: '' })}
        error={!!username.error}
        errorText={username.error}
      />
      {/* <TextInput
        label="מייל"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      /> */}
      <TextInput
        label="סיסמה"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <Button mode="contained" onPress={onLoginPressed}>
        התחבר
      </Button>
      <View style={styles.row}>
        <Text>עדיין אין לך משתמש? </Text>
        <TouchableOpacity onPress={() => navigation.push('RegisterScreen')}>
          <Text style={styles.link}> הרשם</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});
