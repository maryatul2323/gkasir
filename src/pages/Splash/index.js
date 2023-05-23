import React, {useEffect} from 'react';
import {StyleSheet, Text, View, ImageBackground, Image} from 'react-native';
import {Background, Logo} from '../../assets';

const Splash = ({navigation}) => {
  return (
    <ImageBackground source={Background} style={styles.background}>
      <Image source={Logo} style={styles.logo} />
      <Text style={styles.garuda}>Garuda Kasir</Text>
      <View>
        <Text style={styles.footer}>Powered By Garuda Cyber</Text>
      </View>
    </ImageBackground>
  );
};

export default Splash;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 178,
    height: 178,
    marginTop: 200,
  },
  garuda: {
    textAlign: 'center',
    letterSpacing: 0.02,
    fontSize: 25,
    fontFamily: 'Viga',
    lineHeight: 33.6,
    fontWeight: 'bold',
    color: '#FA0000',
  },
  footer: {
    textAlign: 'center',
    letterSpacing: 0.05,
    fontSize: 10,
    fontFamily: 'Viga',
    fontWeight: '400',
    lineHeight: 13.44,
    color: '#373333',
    marginTop: 290,
    marginBottom: 20,
  },
});
