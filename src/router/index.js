import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  IconHome,
  IconKeranjang,
  IconProfile
} from '../assets';
import {
  Boarding,
  Cart,
  Datameja,
  History,
  Home,
  KategoriPesanan,
  Login,
  Makanan,
  Minuman,
  MyCart,
  Profile,
  Splash,
  Takeaway,
  Dessert,
  Detail,
  EditHistory,
  Search,
} from '../pages';


const isToken = async () => {
  const token = await AsyncStorage.getItem('AccessToken');
  if (token) return token;
  return false;
};

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={{
      top: -20,
      justifyContent: 'center',
      alignItems: 'center',
      ...styles.shadow,
    }}
    onPress={onPress}>
    <View
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#E85353',
      }}>
      {children}
    </View>
  </TouchableOpacity>
);

const MainApp = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 25,
          left: 10,
          right: 10,
          elevation: 0,
          backgroundColor: '#EBE7E7',
          borderRadius: 22,
          height: 74,
          ...styles.shadow,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{ alignItems: 'center', justifyContent: 'center', top: 5 }}>
              <Image
                source={IconHome}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#E32F45' : '#748C94',
                }}
              />
              <Text
                style={{
                  fontWeight: 'bold',
                  color: focused ? '#000000' : '#748C94',
                  fontSize: 12,
                }}>
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{ alignItems: 'center', justifyContent: 'center', top: 5 }}>
              <Image
                source={IconProfile}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#E32F45' : '#748C94',
                }}
              />
              <Text
                style={{
                  fontWeight: 'bold',
                  color: focused ? '#000000' : '#748C94',
                  fontSize: 12,
                }}>
                Profile
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{ alignItems: 'center', justifyContent: 'center', top: 5 }}>
              <Image
                source={IconKeranjang}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#E32F45' : '#748C94',
                }}
              />
              <Text
                style={{
                  fontWeight: 'bold',
                  color: focused ? '#000000' : '#748C94',
                  fontSize: 12,
                }}>
                History
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const ScreenLogin = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Boarding"
        component={Boarding}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const Screen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Boarding"
        component={Boarding}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ScreenLogin"
        component={ScreenLogin}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const Router = () => {
  const [isLogin, setIsLogin] = useState('loading');

  useEffect(() => {
    checkToken();
  }, [isLogin]);

  const handleLogin = token => {
    setIsLogin(token);
  };

  const checkToken = async () => {
    const token = await isToken();
    setIsLogin(token);
  };
  if (isLogin === 'loading') return <Splash />
  return (
    <Stack.Navigator initialRouteName="Splash">
      {isLogin ? (
        <>
          <Stack.Screen
            name="MainApp"
            component={MainApp}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Datameja"
            component={Datameja}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Takeaway"
            component={Takeaway}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="KategoriPesanan"
            component={KategoriPesanan}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Makanan"
            component={Makanan}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Minuman"
            component={Minuman}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Dessert"
            component={Dessert}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Detail"
            component={Detail}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditHistory"
            component={EditHistory}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MyCart"
            component={MyCart}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Cart"
            component={Cart}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Search"
            component={Search}
            options={{ headerShown: false }}
          />



        </>
      ) : (
        <>
          <Stack.Screen
            name="Boarding"
            component={Boarding}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Login">
            {props => (
              <Login {...props} setIsLogin={handleLogin} isLogin={isLogin} />
            )}
          </Stack.Screen>
        </>
      )}
    </Stack.Navigator>
  );
};

export default Router;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  iconhome: {},
});
