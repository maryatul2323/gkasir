import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Swiper from 'react-native-swiper';
import Api from '../../api/Api';
import {
  HomeBackground,
  IconBox,
  IconInbox,
  Promo,
  Promo2,
  Promo3,
  Promo4
} from '../../assets/images';
import helpers from '../../helpers';
import { getData } from '../../localStorage';
import Icon from 'react-native-vector-icons/FontAwesome';

const Home = ({ navigation }) => {
  const [dataPopular, setDataPopular] = useState('')
  const [token, settoken] = useState('')
  const [dataProduct, setdataProduct] = useState([])
  const [count, setcount] = useState(1)
  const getToken = () => {
    getData('AccessToken').then(res =>
      getPopuler(res)
    )
    getData('AccessToken').then(res =>
      getProduct(res)
    )
  }

  const getPopuler = async (res) => {
    settoken(res)
    try {
      const response = await Api.getPopuler(res)
      setDataPopular(response.data.data);
    } catch (error) {

    }
  }
  const getProduct = async (res) => {
    try {
      const response = await Api.getPopular(res)
      setdataProduct(response.data.data);
    } catch (error) {

    }
  }

  const tambah = () => {
    setcount(count + 1)
  }

  const kurang = () => {
    if (count < 1) {

    } else {
      setcount(count - 1)
    }
  }

  const addToCart = async(item) => {
    try {
      const data = {
        id_product: item.item?.id,
        jumlah_pemesanan: count
      }
      const response = await Api.addCart(token, data)
    } catch (error) {
      
    }
  }

  useEffect(() => {
    getToken()
  }, [])



  const Item = (item) => (
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
          <View style={{ marginLeft: 12, flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
            <Text style={{ color: 'black', fontSize: 12, marginHorizontal: 12 }}>{item.item.products?.toko}</Text>
            <Text style={{
            fontSize: 15,
            fontWeight: 'bold',
            color: '#FEAD1D',
            marginLeft: 12
          }}>{helpers.convertToRupiah(item.item.products?.price.slice(0, item.item.products?.price.length - 5))}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.beranda}>
      <ImageBackground source={HomeBackground} style={styles.home}>
        <ScrollView style={styles.container}>
          <Text style={styles.dashboard}>Dashboard</Text>
          <View style={styles.sliderContainer}>
            <Swiper
              autoplay={true}
              horizontal
              height={200}
              activeDotColor="white">
              <View style={styles.slide}>
                <Image
                  source={Promo2}
                  resizeMode="cover"
                  style={styles.sliderImage}
                />
              </View>
              <View style={styles.slide}>
                <Image
                  source={Promo3}
                  resizeMode="cover"
                  style={styles.sliderImage}
                />
              </View>
              <View style={styles.slide}>
                <Image
                  source={Promo4}
                  resizeMode="cover"
                  style={styles.sliderImage}
                />
              </View>
            </Swiper>
          </View>
          <Text style={styles.toko}>Pilih Pesanan</Text>
          <View style={styles.categoryContainerr}>
            <View style={styles.categoryContainer}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Takeaway');
                }}
                style={styles.categoryBtn}>
                <Image
                  source={IconBox}
                  resizeMode="contain"
                  style={{
                    width: 66,
                    height: 61,
                    marginTop: 10,
                    marginBottom: 10,
                    marginHorizontal: 0,
                    alignSelf: 'center',
                  }}
                />
                <Text style={styles.categoryBtnTxt}>Take Away</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.categoryContainer}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Datameja');
                }}
                style={styles.categoryBtn}>
                <Image
                  source={IconInbox}
                  resizeMode="contain"
                  style={{
                    width: 66,
                    height: 61,
                    marginTop: 10,
                    marginBottom: 10,
                    marginHorizontal: 0,
                    alignSelf: 'center',
                  }}
                />
                <Text style={styles.categoryBtnTxt}>Dine In</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={{ height: 24 }} />

        </ScrollView>

      </ImageBackground>
    </View>
  );
};

export default Home;

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
    width:325,
    height:150
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
