import React from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {HomeBackground, Promo, IconBox, Makanan2, Minuman2, Dessert} from '../../assets';

const KategoriPesanan = ({navigation}) => {
  return (
    <View style={styles.beranda}>
      <ImageBackground source={HomeBackground} style={styles.home}>
        <ScrollView style={styles.container}>
          <Text style={styles.dashboard}>Kategori Pesanan</Text>
          <View style={styles.sliderContainer}>
            <Swiper
              autoplay={true}
              horizontal
              height={200}
              activeDotColor="white">
              <View style={styles.slide}>
                <Image
                  source={Promo}
                  resizeMode="cover"
                  style={styles.sliderImage}
                />
              </View>
              <View style={styles.slide}>
                <Image
                  source={Promo}
                  resizeMode="cover"
                  style={styles.sliderImage}
                />
              </View>
              <View style={styles.slide}>
                <Image
                  source={Promo}
                  resizeMode="cover"
                  style={styles.sliderImage}
                />
              </View>
            </Swiper>
          </View>
          <Text style={styles.toko}>Toko Harian Family</Text>
          <View style={styles.categoryContainerr}>
            <View style={styles.categoryContainer}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Makanan');
                }}
                style={styles.categoryBtn}>
                <Image
                  source={Makanan2}
                  resizeMode="contain"
                  style={{
                    width: 56,
                    height: 61,
                    marginTop: 10,
                    marginBottom: 10,
                    marginHorizontal: 0,
                    alignSelf: 'center',
                  }}
                />
                <Text style={styles.categoryBtnTxt}>Makanan</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.categoryContainer}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Minuman');
                }}
                style={styles.categoryBtn}>
                <Image
                  source={Minuman2}
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
                <Text style={styles.categoryBtnTxt}>Minuman</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.categoryBawah}>
            <View style={styles.categoryContainer}>
              <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Dessert');
                  }}
                  style={styles.categoryBtn}>
                  <Image
                    source={Dessert}
                    resizeMode="contain"
                    style={{
                      width: 56,
                      height: 61,
                      marginTop: 10,
                      marginBottom: 10,
                      marginHorizontal: 0,
                      alignSelf: 'center',
                    }}
                  />
                  <Text style={styles.categoryBtnTxt}>Dessert</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ height: 50 }} />
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default KategoriPesanan;

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
    width: 250,
    height: 41,
    fontFamily: 'BentonsSans Bold',
    fontWeight: 'bold',
    fontSize: 29,
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
  categoryBawah: {
    alignItems: 'center',
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
  toko: {
    width: 139,
    height: 31,
    fontFamily: 'BentonsSans Bold',
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 19.65,
    color: '#09051C',
    marginTop: -10,
    marginLeft: 25,
    marginRight: 100,
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
});
