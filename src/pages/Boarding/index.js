import React from 'react'
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity } from 'react-native'
import { Boarding2, Background2 } from '../../assets'

const Boarding = ({ navigation }) => {
   return (
        <ImageBackground source={Background2} style={styles.background}>
            <Image source={Boarding2} style={styles.logo} />
            <Text style={styles.garuda}>Find your Comfort Food here</Text>
            <Text style={styles.footer}>Here You Can find a chef or dish for every taste and color. Enjoy!</Text>
            <TouchableOpacity style={styles.next} onPress={() => { navigation.navigate('Login')}}>
                <Text style={styles.nxttext}>Next</Text>
            </TouchableOpacity>
        </ImageBackground>
    )
}

export default Boarding

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        width: 333,
        height: 235,
        marginTop: 70,
        marginBottom: 5
    },
    garuda: {
        textAlign: 'center',
        fontSize:22,
        fontFamily: 'BentonSans Bold',
        lineHeight: 28.83,
        fontWeight: 'bold',
        color: '#09051C',
        marginTop: 120,
        marginBottom: 10,
        marginLeft: 82,
        marginRight: 82
    },
    footer:{
        textAlign: 'center',
        fontSize: 12,
        fontFamily: 'BentonSans Book',
        fontWeight: '400',
        lineHeight: 21.66,
        color: '#000000',
        marginTop: 10,
        marginBottom: 45,
        marginLeft: 82,
        marginRight: 82
    },
    next: {
        width: 157,
        height: 57,
        textAlign: 'center',
        fontFamily: 'BentonSans Book',
        fontWeight: '400',
        lineHeight: 21.66,
        backgroundColor: '#E85353',
        borderRadius:15,
        marginTop: 10,
        marginBottom: 5,
        marginLeft: 82,
        marginRight: 82
    },
    nxttext: {
        textAlign: 'center',
        fontFamily: 'BentonSans Bold',
        fontWeight: '400',
        fontSize: 21,
        lineHeight: 20.96,
        color: '#FFFFFF',
        marginTop: 20,
    }
})