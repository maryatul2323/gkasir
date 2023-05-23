import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Api from '../../api/Api';
import { Background, Logo } from '../../assets';
import { MainApp } from '../Home';
import { storeData } from '../../localStorage';

export default function Login({ navigation, setIsLogin, isLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [seePassword, setSeePassword] = useState(true);
  const [checkValidEmail, setCheckValidEmail] = useState(false);

  const handleCheckEmail = text => {
    let re = /\S+@\S+\.\S+/;
    let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    setEmail(text);
    if (re.test(text) || regex.test(text)) {
      setCheckValidEmail(false);
    } else {
      setCheckValidEmail(true);
    }
  };

  const checkPasswordValidity = value => {
    const isNonWhiteSpace = /^\S*$/;
    // if (!isNonWhiteSpace.test(value)) {
    //   return 'Password must not contain Whitespaces.';
    // }

    // const isContainsNumber = /^(?=.*[0-9]).*$/;
    // if (!isContainsNumber.test(value)) {
    //   return 'Password must contain at least one Digit.';
    // }

    // const isValidLength = /^.{8,16}$/;
    // if (!isValidLength.test(value)) {
    //   return 'Password must be 8-16 Characters Long.';
    // }

    // const isContainsSymbol =
    //   /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
    // if (!isContainsSymbol.test(value)) {
    //   return 'Password must contain at least one Special Symbol.';
    // }

    return null;
  };

  // const authLogin = () => {
  //   console.log('navigation : ', navigation);
  //   const checkPassowrd = checkPasswordValidity(password);
  //   if (!checkPassowrd) {
  //     try {
  //       const data = {
  //         email: email.toLocaleLowerCase(),
  //       password: password,
  //       }
  //       const res = user_login(data)
  //       console.log('sukses', res);
  //     } catch (error) {
  //       console.log(error, 'error');
  //     }
  //     // user_login({
  //     //   email: email.toLocaleLowerCase(),
  //     //   password: password,
  //     // })
  //     //   .then(result => {
  //     //     console.log('tes : ', result);
  //     //     if (result.status !== 200) throw new Error();
  //     //     AsyncStorage.setItem('AccessToken', result.data.accessToken);
  //     //     alert('Login Berhasil');
  //     //     console.log('token res : ', result.data);
  //     //     setIsLogin(result.data.accessToken);
  //     //   })
  //     //   .catch(err => {
  //     //     alert('username atau password salah');
  //     //   });
  //   } else {
  //     alert(checkPassowrd);
  //   }
  // };

  const authLogin = async () => {
    const checkPassowrd = checkPasswordValidity(password);
    if (!checkPassowrd) {
      try {
        const res = await Api.login(email, password)
        AsyncStorage.setItem('AccessToken', res.data.accessToken);
        storeData('AccessToken', res.data.accessToken)
        alert('Login Berhasil');
        setIsLogin(res.data.accessToken);
        navigation.navigate('MainApp')
      } catch (error) {
        alert('email atau password salah');
      }
    } else {
      alert(checkPassowrd);
    }
  };


  return (
    <ImageBackground source={Background} style={styles.background}>
      <Image source={Logo} style={styles.logo} />
      <Text style={styles.garuda}>Garuda Kasir {isLogin} </Text>
      <Text style={styles.footer}>Login To Your Account</Text>

      <View style={email}>
        <TextInput
          value={email}
          style={styles.email}
          placeholder="Masukkan Email/Username"
          onChangeText={email => setEmail(email)}
        />
        {checkValidEmail ? (
          <Text style={styles.textFailed}>Wrong format email</Text>
        ) : (
          <Text style={styles.textFailed}> </Text>
        )}
      </View>
      <View style={password}>
        <TextInput
          value={password}
          style={styles.password}
          placeholder="Masukkan Password"
          onChangeText={password => setPassword(password)}
          secureTextEntry
        />
        <TouchableOpacity
          style={styles.wrapperIcon}
          onPress={() => setSeePassword(!seePassword)}></TouchableOpacity>
      </View>

      <Text style={styles.footer1}>Forgot Your Password?</Text>

      {email == '' || password == '' || checkValidEmail == true ? (
        <TouchableOpacity
          disabled
          style={styles.buttonDisable}
          onPress={MainApp}>
          <Text style={styles.text}>Login</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={authLogin}>
          <Text style={styles.text}>Login</Text>
        </TouchableOpacity>
      )}
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  logo: {
    width: 178,
    height: 150,
    marginTop: 1,
  },
  garuda: {
    textAlign: 'center',
    letterSpacing: 0.02,
    fontSize: 25,
    fontFamily: 'Viga',
    lineHeight: 33.6,
    fontWeight: 'bold',
    color: '#FA0000',
    marginBottom: 40,
  },
  footer: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'BentonSans Bold',
    fontWeight: 'bold',
    lineHeight: 26.2,
    color: '#09051C',
    marginTop: 10,
    marginBottom: 25,
    marginLeft: 82,
    marginRight: 82,
  },
  email: {
    backgroundColor: '#FFFFFF',
    width: 325,
    height: 57,
    borderRadius: 15,
    elevation: 5,
    paddingHorizontal: 25,
  },
  password: {
    backgroundColor: '#FFFFFF',
    width: 325,
    height: 57,
    borderRadius: 15,
    elevation: 5,
    paddingHorizontal: 25,
    marginBottom: 10,
  },
  footer1: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'BentonSans Medium',
    fontWeight: 'bold',
    lineHeight: 23.31,
    color: '#E85353',
    marginTop: 10,
    marginBottom: 60,
  },
  button: {
    width: 157,
    height: 57,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E85353',
    borderRadius: 15,
    marginTop: 15,
    marginBottom: 15,
  },
  buttonDisable: {
    width: 157,
    height: 57,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey',
    borderRadius: 15,
    marginTop: 15,
    marginBottom: 15,
  },
  text: {
    color: 'white',
    fontWeight: '700',
  },
  textFailed: {
    alignSelf: 'flex-end',
    color: 'red',
  },
});
