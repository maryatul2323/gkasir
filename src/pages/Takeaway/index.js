import React, { useEffect, useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
// import RNPickerSelect from "react-native-picker-select";

import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View
} from 'react-native';
import Api from '../../api/Api';
import { Background, Logo } from '../../assets';
import { getData } from '../../localStorage';

const Takeaway = ({ navigation }) => {
  const [namaCustomer, setnamaCustomer] = useState("")
  const [token, settoken] = useState("")
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' }
  ]);

  // const getData = async () => {
  //   const token = await AsyncStorage.getItem('AccessToken');
  //   axios
  //     .get('http://10.0.2.2:3001/products', {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then(res => {
  //       console.log(res.data);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  const [datameja, setdatameja] = useState([])
  const getToken = () => {
    getData('AccessToken').then(res =>
      getMeja(res)
    )
  }

  const getMeja = async (res) => {
    try {
      const response = await Api.getMeja(res)
      settoken(res)
      let datameja = []
      for (let index = 0; index < response.data.data.data.length; index++) {
        datameja.push({
          label: response.data.data.data[index].nama_meja,
          value: response.data.data.data[index].id_meja
        })
    }
      setdatameja(datameja);
    } catch (error) {

    }
  }

  const buatpesanan = async() => {
    try {
      const data = {
        nama_customer: namaCustomer,
        id_meja: value
      }
      const response = await Api.addCustomer(token, data)
      ToastAndroid.show('Tambah customer berhasil', ToastAndroid.SHORT);
      navigation.navigate('KategoriPesanan');
    } catch (error) {
      
    }
  }

  useEffect(() => {
    getToken()
  }, [])

  const meja = ({ nama_meja }) => (
    <View style={styles.nama_meja}>
      <Text style={styles.nama_meja}>{nama_meja}</Text>
    </View>
  );

  return (
    <ImageBackground source={Background} style={styles.background}>
      {/* <FlatList
        data={getData}
        renderItem={({ meja }) => <meja nama_meja={meja.nama_meja} />}
        keyExtractor={meja => meja.id}
      /> */}
      <Image source={Logo} style={styles.logo} />
      <Text style={styles.garuda}>Garuda Kasir</Text>
      <Text style={styles.footer}>Buat Pesanan</Text>

      <Text style={styles.customer}> Nama Customer </Text>
      <View style={styles.namacustomer}>
        <TextInput placeholder={'Nama Customer'} value={namaCustomer} onChangeText={(value)=> setnamaCustomer(value)}/>
      </View>
      
      
      <TouchableOpacity
        style={styles.next}
        // onPress={() => {
        //   navigation.navigate('KategoriPesanan');
        // }}
        onPress={buatpesanan}
        >
        <Text style={styles.nxttext}>Buat Pesanan</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default Takeaway;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 150,
  },
  garuda: {
    textAlign: 'center',
    fontSize: 22,
    fontFamily: 'BentonSans Bold',
    fontWeight: 'bold',
    color: '#E85353',
    marginTop: 0,
    marginBottom: 40,
    marginLeft: 82,
    marginRight: 82,
  },
  footer: {
    fontSize: 14,
    fontFamily: 'BentonSans Bold',
    fontWeight: 'bold',
    color: 'black',
    marginTop: 0,
    marginBottom: 20,
    marginLeft: 1,
    marginRight: 200,
  },
  customer: {
    fontSize: 14,
    fontFamily: 'BentonSans Bold',
    fontWeight: 'bold',
    color: 'black',
    marginTop: 0,
    marginBottom: 20,
    marginLeft: 1,
    marginRight: 187,
  },
  namacustomer: {
    backgroundColor: '#FFFFFF',
    width: 325,
    height: 57,
    borderRadius: 15,
    elevation: 5,
    paddingHorizontal: 25,
    marginBottom: 20,
  },
  meja: {
    fontSize: 14,
    fontFamily: 'BentonSans Bold',
    fontWeight: 'bold',
    color: 'black',
    marginTop: 0,
    marginBottom: 20,
    marginLeft: 1,
    marginRight: 230,
  },
  NoMeja: {
    backgroundColor: '#FFFFFF',
    width: 325,
    height: 57,
    borderRadius: 15,
    elevation: 5,
    paddingHorizontal: 25,
    marginBottom: 20,
  },

  next: {
    width: 132,
    height: 37,
    fontFamily: 'BentonSans Book',
    fontWeight: '400',
    lineHeight: 21.66,
    backgroundColor: '#E85353',
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 1,
    marginRight: 190,
  },
  nxttext: {
    textAlign: 'center',
    fontFamily: 'BentonSans Bold',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20.96,
    color: '#FFFFFF',
    marginTop: 7,
  },
});
