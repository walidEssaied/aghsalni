import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, SafeAreaView, Image, TextInput, TouchableOpacity } from 'react-native';
//import bgImage from './assets/logo.jpg'
import logo from '../assets/loggg.jpg'
import { Dimensions, input } from 'react-native-web';
import Icon from 'react-native-vector-icons/Ionicons'
import { Component } from 'react/cjs/react.production.min';
const { width: WIDTH } = Dimensions.get('window')
import * as ImagePicker from 'expo-image-picker';
import { StackActions } from '@react-navigation/native';
import { ErrorMessage } from 'formik';
//import {AuthContext} from '../contexte/AuthContext';
const Register = ({ navigation }) => {
  const [Nom_station, setNom_station] = useState('');
  const [type_lavage, setType_lavage] = useState('');
  const [ville, setVille] = useState('');
  const [adresse, setAdresse] = useState('');
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Role, setRole] = useState('')
  const [profileImage, setProfileImage] = useState('');
  const [progress, setProgress] = useState(0);


  //  const {isLoading, register} = useContext(AuthContext);
  async function Add() {
    // const formData = new FormData()
    // formData.append("Nom_station", Nom_station)
    // formData.append("type_lavage", type_lavage)
    // formData.append("ville", ville)
    // formData.append("adresse", adresse)
    // formData.append("longitude", longitude)
    // formData.append("latitude", latitude)
    // formData.append("email", email)
    // formData.append("password", password)
    // formData.append("avatar", profileImage.splite[','][1])
    // formData.append("Role", "lavage")

    fetch("http://192.168.1.4:3001/utilisateur/register", {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json',
      },
      body: 
        JSON.stringify({
          Nom_station: Nom_station,
          type_lavage: type_lavage,
          ville: ville,
          adresse: adresse,
          longitude: longitude,
          latitude: latitude,
          email: email,
          password: password,
          Role: 'lavage',
          avatar: profileImage
        }),
    }).then(res => res.json())
      .then(async data => {
        if (data) {
          if (data.email != '' && data.password != '') {
            navigation.navigate('signin')
          }
        }
      })
      .catch(err => {
        console.log(err)
      });
  }

  const openImageLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
    }

    if (status === 'granted') {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
      });
      console.log({response: response})
      if (!response.cancelled) {
        setProfileImage(response.uri);
      }
    }
  };

  const uploadProfileImage = async () => {
    const formData = new FormData();
    formData.append('profile', {
      name: new Date() + '_profile',
      uri: profileImage,
      type: 'image/jpg',
    });

    try {
      const res = await station.post('/register', formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',

        },
      });

      if (res.data.success) {
        props.navigation.dispatch(StackActions.replace('StationProfile'));
      }
    } catch (error) {
      console.log(error.message);
    }
  };


  return (
    <SafeAreaView style={{ backgroundColor: 'white' }}>
      <ScrollView style={styles.scrollView}>
        <View style={{ alignItems: 'center', alignSelf: 'center' }}>
          <Text style={{ color: '#4A919E', fontWeight: 'bold', marginBottom: 20, fontSize: 20 }}>Register</Text>
        </View>
        <View style={styles.containerr}>
          <View>
            <TouchableOpacity
              onPress={openImageLibrary}
              style={styles.uploadBtnContainer}
            >
              {profileImage ? (
                <Image
                  source={{ uri: profileImage }}
                  style={{ width: '100%', height: '100%' }}
                />
              ) : (
                <Text style={styles.uploadBtn} onChangeText={(text) => setProfileImage(text)}>Upload Profile Image</Text>
              )}
            </TouchableOpacity>


          </View>

        </View>




        <View  >


          <TextInput
            style={styles.input}
            placeholder={'Nom station'}
            placeholderTextColor={'grey'}
            underLineColorAndroid='transparent'
            onChangeText={text => setNom_station(text)}
          />
        </View>
        <View  >


          <TextInput
            style={styles.input}
            placeholder={'Type lavage'}
            placeholderTextColor={'grey'}
            underLineColorAndroid='transparent'
            onChangeText={text => setType_lavage(text)}
          />
        </View>
        <View  >


          <TextInput
            style={styles.input}
            placeholder={'Ville'}
            placeholderTextColor={'grey'}
            underLineColorAndroid='transparent'
            onChangeText={text => setVille(text)}
          />
        </View>
        <View  >


          <TextInput
            style={styles.input}
            placeholder={'Adresse'}
            placeholderTextColor={'grey'}
            underLineColorAndroid='transparent'
            onChangeText={text => setAdresse(text)}
          />
        </View>

        <View  >


          <TextInput
            style={styles.input}
            placeholder={'logitude'}
            placeholderTextColor={'grey'}
            underLineColorAndroid='transparent'
            onChangeText={text => setLongitude(text)}
          />
        </View>
        <View  >


          <TextInput
            style={styles.input}
            placeholder={'latitude'}
            placeholderTextColor={'grey'}
            underLineColorAndroid='transparent'
            onChangeText={text => setLatitude(text)}
          />
        </View>
        <View  >


          <TextInput
            style={styles.input}
            placeholder={'Email'}
            placeholderTextColor={'grey'}
            underLineColorAndroid='transparent'
            onChangeText={text => setEmail(text)}
          />
        </View>
        <View >

          <TextInput
            style={styles.input}
            placeholder={'Password'}
            placeholderTextColor={'grey'}
            secureTextEntry
            underLineColorAndroid='black'
            onChangeText={text => setPassword(text)}
            required
          />



        </View>
        <TouchableOpacity style={styles.btnLogin} onPress={() => {
          Add();
        }}>
          <Text style={styles.TextBtn}>Register</Text>

        </TouchableOpacity>
        <View style={{
          flexDirection: 'row', marginTop: 20, marginBottom: 30, alignItems: 'center',
          alignSelf: 'center'
        }}>
          <Text>Already have an accoutn? </Text>
          <TouchableOpacity >
            <Text style={styles.link} onPress={() => navigation.navigate('signin')}>Login</Text>
          </TouchableOpacity>
        </View>



      </ScrollView>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    backgroundColor: 'white',
    marginVertical: 10,
  },
  icon: {

    top: 8,
    left: 37,
  },
  btnLogin: {
    width: 200,
    height: 45,
    borderRadius: 25,
    backgroundColor: 'black',
    justifyContent: 'center',
    marginTop: 20,
    alignItems: 'center',
    alignSelf: 'center'
  },
  TextBtn: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center'
  },
  link: {
    color: 'blue',
  },
  input: {
    width: 300,
    height: 45,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 25,
    fontSize: 10,
    paddingLeft: 45,
    backgroundColor: '#f5f5f5',
    color: 'black',
    marginHorizontal: 15,
    alignSelf: 'center',
    alignItems: 'center'

  },
  logoContainer: {
    alignItems: 'center'
  },
  btnEye: {

    top: 17,
    right: 60,
  }
  ,
  logoText: {
    color: 'black',
    fontWeight: 600,
    fontSize: 20,
    fontWeight: '400',
    marginTop: 10,
    opacity: 0.5,
    marginBottom: 10
  },
  logo: {
    width: 150,
    height: 180,
    marginBottom: 20
  },
  container1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    width: '80%',
  },

  link: {
    color: 'blue',
  },
  uploadBtnContainer: {
    height: 125,
    width: 125,
    borderRadius: 125 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
    borderWidth: 1,
    overflow: 'hidden',
  },
  uploadBtn: {
    textAlign: 'center',
    fontSize: 16,
    opacity: 0.3,
    fontWeight: 'bold',
  },
  skip: {
    textAlign: 'center',
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    opacity: 0.5,
  },
  containerr: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

});
export default Register;