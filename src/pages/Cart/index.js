import React, { useEffect, useState } from 'react'
import { FlatList, Image, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import Api from '../../api/Api'
import helpers from '../../helpers'
import { getData } from '../../localStorage'

const Cart = ({navigation}) => {
    const [datacart, setDatacart] = useState([])
    const [totalBayar, settotalBayar] = useState(0)
    const [token, settoken] = useState('')
    const getToken = () => {
        getData('AccessToken').then(res =>
            getCart(res)
        )
    }

    const getCart = async (res) => {
        let rp = 0
        try {
            const response = await Api.getCart(res)
            settoken(res)
            setDatacart(response.data.keranjang);
            for (let index = 0; index < response.data.keranjang.length; index++) {
                rp = rp + parseInt(response.data.keranjang[index].harga.slice(0, response.data.keranjang[index].harga.length - 5))
                // console.log(rp);
                settotalBayar(rp)
            }
        } catch (error) {

        }
    }

    const Item = (item) => (
        <View style={{ flexDirection: 'row', padding: 12, alignItems: 'center' }}>
            <Image style={{ height: 62, width: 62, borderRadius: 16 }} source={{ uri: item.item.products?.image }} />
            <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={{ fontSize: 15, color: 'black', fontWeight: '400' }}>{item.item.products?.name}</Text>
                <Text style={{ fontSize: 15, color: '#FEAD1D', fontWeight: '500' }}>{helpers.convertToRupiah(item.item.products?.price.slice(0, item.item.products?.price.length - 5))}</Text>
            </View>
            <Text style={styles.title}>{item.item.jumlah_pemesanan} item</Text>
        </View>
    );

    const onCheckout = async() => {
        try {
            const res = await Api.onCheckout(token)
            ToastAndroid.show('Checkout sukses', ToastAndroid.SHORT)
        } catch (error) {
            ToastAndroid.show(error.toString(), ToastAndroid.SHORT)
        }
    }

    useEffect(() => {
        getToken()
    }, [])
    return (
        <View style={{ backgroundColor: 'white', padding: 24, flex: 1 }}>
            <Text style={styles.text}>Order Detail</Text>
            <FlatList
                data={datacart}
                renderItem={({ item }) => <Item item={item} />}
                keyExtractor={item => item.id}
            />
            <View style={{ height: 80 }} />
            <TouchableOpacity style={{padding: 12, marginLeft:20, width : 80,flexDirection: 'row', backgroundColor: 'red',alignItems: 'center', right: 12, bottom: 108, borderRadius: 12}} onPress={()=> navigation.navigate('KategoriPesanan')}>
              <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>Add More</Text>
            </TouchableOpacity>
            <View style={{ height: 20 }} />
            <View style={{ backgroundColor: 'red', borderRadius: 16, padding: 12 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: '500' }}>Total</Text>
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: '500' }}>{helpers.convertToRupiah(totalBayar)}</Text>
                </View>
                <TouchableOpacity style={{backgroundColor: 'white', borderRadius: 12, alignItems: 'center', justifyContent: 'center', padding: 12}} onPress={onCheckout}>
                    <Text style={{fontSize: 32, fontWeight: '400', color: 'red'}}>Checkout</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Cart

const styles = StyleSheet.create({
    text: {
        fontSize: 25,
        color: 'black',
        fontWeight: '400'
    }
})