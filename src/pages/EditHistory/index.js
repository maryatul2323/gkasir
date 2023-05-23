import React, { useEffect, useState } from 'react';
import ApiManager from "../../api/ApiManager";
import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  StatusBar,
  ToastAndroid
} from 'react-native';
import Swiper from 'react-native-swiper';
import Api from '../../api/Api';
import {
  HomeBackground
} from '../../assets/images';
import helpers from '../../helpers';
import { getData } from '../../localStorage';
import { COLOURS } from '../../database/Database';




const EditHistory = ({ navigation,route }) => {
  const {id_checkout} = route.params;
  const [token, settoken] = useState('')
  const [dataProduct, setdataProduct] = useState([])
  const [count, setcount] = useState(1)
  const [modalVisible, setModalVisible] = useState(false);
  const [jumlah_pemesanan, setjumlah_pemesanan] = useState("")
  


  const getToken = () => {
    getData('AccessToken').then(res =>
      getProduct(res)
    )
  }


  const getProduct = async (res) => {
    settoken(res)
    try {
      const response = await Api.getEditCO(res,id_checkout)
      setdataProduct(response.data.data);
    } catch (error) {

    }
  }



  const tambah = async (item) => {
    const jp=item.item?.jumlah_pemesanan
    let url = 'http://koperasiukm.bengkaliskab.go.id/express/'
    let path = 'dinein/checkout/'+item.item?.id;

    return ApiManager(`${url}${path}`, {
        method: 'PUT',
        data: {
            'jumlah_pemesanan':jp+1 
        },
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    },getProduct())
    
}
const kurang = async (item) => {
  const jp=item.item?.jumlah_pemesanan

  if (jp<=1){

  }else {
    const count =jp-1
    let url = 'http://koperasiukm.bengkaliskab.go.id/express/'
    let path = 'dinein/checkout/'+item.item?.id;
  
    return ApiManager(`${url}${path}`, {
        method: 'PUT',
        data: {
            'jumlah_pemesanan':jp-1
        },
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        
    },getProduct())
  }
  
}

  useEffect(() => {
    getToken(),getProduct()
  }, [setdataProduct])

  const ItemProduct = (item) => (
    <View style={styles.card} key={item.id}>
      <View style={{ flexDirection: 'row' }}>
        <Image
          source={{ uri: item.item.products?.image }}
          style={{
            width: 80,
            height: 61,
            borderRadius: 8,
            marginTop: 10,
            marginVertical: 12
          }}
        />
        <View>
          <Text style={{
            fontSize: 15,
            fontWeight: 'bold',
            color: '#09051C',
            marginLeft: 12
          }}>{item.item.products?.name}</Text>
          <Text style={{
            fontSize: 15,
            fontWeight: 'bold',
            color: '#09051C',
            marginLeft: 12
          }}>Jumlah pesanan : {item.item.jumlah_pemesanan}</Text>
          <Text style={{
            fontSize: 15,
            fontWeight: 'bold',
            color: '#FEAD1D',
            marginLeft: 12
          }}>{helpers.convertToRupiah(item.item.products?.price.slice(0, item.item.products?.price.length - 5))}</Text>
          <View style={{ marginLeft: 12, flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
            <TouchableOpacity style={{ backgroundColor: '#BE1515', width: 24, height: 24, borderRadius: 4, alignItems: 'center', justifyContent: 'center' }} onPress={()=> kurang(item)}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>-</Text>
            </TouchableOpacity>
            <Text style={{ color: 'black', fontSize: 12, marginHorizontal: 12 }}>{item.item.jumlah_pemesanan}</Text>
            <TouchableOpacity style={{ backgroundColor: '#E85353', width: 24, height: 24, borderRadius: 4, alignItems: 'center', justifyContent: 'center' }} onPress={()=> tambah(item)}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.beranda}>
      <ImageBackground source={HomeBackground} style={styles.home}>
        <ScrollView style={styles.container}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 16,
            }}>
            <StatusBar backgroundColor={COLOURS.white} barStyle="dark-content" />
            <Image
              source={HomeBackground}
              style={{ position: 'absolute', top: 0, left: -100 }}
            />
          </View>
          <View
            style={{
              marginBottom: 10,
              padding: 16,
            }}>
            <Text
              style={{
                fontSize: 26,
                color: COLOURS.black,
                fontWeight: 'bold',
                letterSpacing: 1,
                marginBottom: 30,
              }}>
              Edit Checkout Items
            </Text>
          </View>
          <FlatList
            data={dataProduct}
            renderItem={({ item }) => <ItemProduct item={item} />}
            keyExtractor={item => item.id}
          />
          <View style={{ height: 96 }} />
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default EditHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  beranda: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  home: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    height: 850,
  },
  dashboard: {
    width: 233,
    height: 41,
    fontFamily: 'BentonsSans Bold',
    fontWeight: 'bold',
    fontSize: 31,
    lineHeight: 40.62,
    color: '#09051C',
    marginTop: 85,
    marginLeft: 30,
    marginRight: 100,
  },
  sliderContainer: {
    height: 200,
    width: '90%',
    marginTop: 4,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 8,
  },
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 8,
  },
  sliderImage: {
    alignSelf: 'center',
    borderRadius: 8,
  },
  categoryContainerr: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    marginTop: 5,
    marginBottom: 15,
  },
  categoryContainer: {
    flexDirection: 'row',
    width: 147,
    height: 150,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 15,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 22,
    shadowColor: '#7F5DF0',
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 9,
  },
  categoryBtn: {
    flex: 1,
    width: '30%',
    marginHorizontal: 0,
    alignSelf: 'center',
  },
  categoryBtnTxt: {
    alignSelf: 'center',
    marginTop: 5,
    fontWeight: 'bold',
    color: '#09051C',
  },
  categoryFoodTxt: {
    alignSelf: 'center',
    marginTop: -60,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#09051C',
    // marginRight: 105,
  },
  categoryTokoTxt: {
    alignSelf: 'center',
    fontSize: 10,
    marginTop: 0,
    fontWeight: 'bold',
    // marginRight: 100,
    color: '#09051C',
  },
  categoryHargaTxt: {
    fontFamily: 'BentonsSans Bold',
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 20,
    lineHeight: 19.65,
    color: '#FF7C32',
    marginTop: -25,
    marginLeft: 215,
  },
  toko: {
    // width: 139,
    // height: 31,
    fontFamily: 'BentonsSans Bold',
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 19.65,
    color: '#09051C',
    marginTop: -10,
    marginLeft: 10
    // marginRight: 100,
  },
  viewmore: {
    fontFamily: 'BentonsSans Bold',
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 19.65,
    color: '#FF7C32',
    marginTop: -5,
    marginLeft: 265,
  },
  cardsWrapper: {
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
  },
  card: {
    margin: 10,
    shadowColor: '#999',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
    backgroundColor: 'white',
    padding: 12
  },
  card1: {
    height: 80,
    width: '90%',
    marginVertical: 10,
    flexDirection: 'row',
    shadowColor: '#999',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
    backgroundColor: 'white',
  },
  cardImg: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
});
