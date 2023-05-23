import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Image, Modal, SafeAreaView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View, Alert } from "react-native";
import { Caption, Title } from "react-native-paper";
import Api from "../../api/Api";
import { getData } from "../../localStorage";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { removeUserDetail } from '../../localStorage';


const Profile = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [telp, settelp] = useState("")
  const [tempatlahir, settempatlahir] = useState("")
  const [alamat, setalamat] = useState("")
  const [tanggallahir, settanggallahir] = useState("")
  const [token, setToken] = useState("")


  const logout = async () => {
    try {
        await AsyncStorage.removeItem('AccessToken')
        storeData('AccessToken', '')
        setIsLogin('');
        alert('Log Out Success');
        // await AsyncStorage.removeItem('@OrderList:key')
        navigation.navigate('ScreenLogin');
    } catch (err) {
        
    }
}

  const showConfirmDialog = () => {
    return Alert.alert(
      "Are your sure?",
      "Are you sure you want to Log Out?",
      [
        // The "Yes" button
        {
          text: "Yes",
          onPress: () => {logout},
          
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "No",
        },
      ]
    );
  };

  const [dataProfile, setDataProfile] = useState([])
  const getToken = () => {
    getData('AccessToken').then(res =>
      getProfile(res)
    )
  }

  const getProfile = async (res) => {
    try {
      const response = await Api.getProfile(res)
      setToken(res)
      setDataProfile(response.data.data);
    } catch (error) {

    }
  }

  const onsimpan = async () => {
    try {
      const data = {
        telp: telp,
        tempat_lahir: tempatlahir,
        alamat: alamat,
        tanggal_lahir: tanggallahir
      }
      const response = await Api.editProfile(token, data)
      ToastAndroid.show('Edit profile berhasil', ToastAndroid.SHORT);
      settelp('')
      setalamat('')
      settanggallahir('')
      settempatlahir('')
      setModalVisible(!modalVisible)
      getProfile(token)
    } catch (error) {

    }
  }

  useEffect(() => {
    getToken()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Image source={{ uri: dataProfile.image }} style={{ width: '100%', height: 200 }} />
      
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: 'row', marginTop: 15, justifyContent: "space-between", alignItems: "center" }}>
          <View style={{ marginLeft: 20 }}>
            <Title
              style={[
                styles.title,
                {
                  marginTop: 15,
                  marginBottom: 5,
                },
              ]}>
              {dataProfile.name}
            </Title>
            <Caption style={styles.caption}>{dataProfile.email}</Caption>
            <Caption style={styles.caption}>{dataProfile.telp}</Caption>
            <Caption style={styles.caption}>{dataProfile.tanggal_lahir}</Caption>
          </View>
          <TouchableOpacity style={{ backgroundColor: 'blue', padding: 8, borderRadius: 4 }} onPress={() => setModalVisible(!modalVisible)}>
            <Text style={{ color: 'white' }}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 150 }} />
        <TouchableOpacity onPress={()=> showConfirmDialog()}>
            <View style={{marginTop: 16, marginBottom: 16, borderRadius: 10,padding: 8, backgroundColor: '#ffe4c4', width:'80%',flexDirection: 'row', alignSelf:'center', justifyContent:'center'}}>
              <MaterialCommunityIcons
                name="logout"
                style={{
                  fontSize: 16,
                  color: '#DA6317',
                  padding: 8,
                  alignSelf: 'flex-start',
                  
                }}/>
              <Text style={{ color: '#DA6317',fontSize:16,padding: 8  }}>Log Out</Text>
            </View>
        </TouchableOpacity>

      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Edit Profile</Text>
            <TextInput style={styles.textinput} placeholder="Telp" value={telp} onChangeText={(value) => settelp(value)} />
            <TextInput style={styles.textinput} placeholder="Tempat lahir" value={tempatlahir} onChangeText={(value) => settempatlahir(value)} />
            <TextInput style={styles.textinput} placeholder="Alamat" value={alamat} onChangeText={(value) => setalamat(value)} />
            <TextInput style={styles.textinput} placeholder="Tanggal Lahir" value={tanggallahir} onChangeText={(value) => settanggallahir(value)} />
            <TouchableOpacity style={styles.button} onPress={onsimpan}>
              <Text style={{ color: 'white' }}>Simpan</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 14,
    marginBottom: 14,
    marginTop: -18,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: 'white',
    flex: 1
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
  centeredView: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000000AA',
    alignItems: "center",
    justifyContent: "center"
  },
  modalView: {
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 8,
    width: '90%'
  },
  textinput: {
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 4,
    color: "#000000",
    fontSize: 14,
    marginVertical: 12
  },
  button: {
    backgroundColor: 'green',
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center"
  }
});
