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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Api from '../../api/Api';
import {
  HomeBackground
} from '../../assets/images';
import helpers from '../../helpers';
import { getData } from '../../localStorage';

const History = ({ navigation }) => {
  const [dataHistory, setDataHistory] = useState([])
  const getToken = () => {
    getData('AccessToken').then(res =>
      getDataHistory(res)
    )
  }

  const getDataHistory = async (res) => {
    try {
      const response = await Api.getHistory(res)
      setDataHistory(response.data.data);
    } catch (error) {

    }
  }

  const Item = (item) => (
    <View>
      {
        item.item.pesanan.map(data => {
          console.log(data);
          return <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12, padding: 12 }}>
            <Image style={{ height: 62, width: 62, borderRadius: 8 }} source={{ uri: data.product?.productImage }} />
            <View style={{ marginLeft: 12 }}>
              <Text style={{ color: 'black' }}>{data.product.product?.name}</Text>
              <Text style={{ color: 'black' }}>{data.customer.nama_customer}</Text>
              <Text style={{ color: '#FEAD1D', fontSize: 19, fontWeight: '400' }}>{helpers.convertToRupiah(item.item?.checkout.total.slice(0, item.item?.checkout.total.length - 5))}</Text>
            </View>
          </View>
        })
      }
    </View>
  );

  useEffect(() => {
    getToken()
  }, [])

  return (
    <View style={styles.beranda}>
      <ImageBackground source={HomeBackground} style={styles.home}>
        <ScrollView style={styles.container}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              paddingTop: 46,
              paddingHorizontal: 36,
              justifyContent: 'space-between',
              //   alignItems: 'left',
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialCommunityIcons
                name="chevron-left"
                style={{
                  fontSize: 18,
                  color: '#DA6317',
                  padding: 12,
                  backgroundColor: '#ffe4c4',
                  borderRadius: 12,
                }}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.dashboard}>History</Text>
          <FlatList
            data={dataHistory}
            renderItem={({ item }) => <Item item={item} />}
            keyExtractor={item => item.id}
          />
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  beranda: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  home: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    borderRadius: 20,
    height: '100%',
    width: '100%',
  },
  dashboard: {
    width: 250,
    height: 41,
    fontFamily: 'BentonsSans Bold',
    fontWeight: 'bold',
    fontSize: 29,
    lineHeight: 40.62,
    color: '#09051C',
    marginTop: 5,
    marginLeft: 30,
    marginRight: 100,
  },
});
