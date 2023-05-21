import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import SelectDropdown from 'react-native-select-dropdown';
import {
  Alert,
  Button,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Signup({navigation, route}) {
  const [mobileNumber, setMobileNumber] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [country, setcountry] = useState('');
  const [ProfileImage, setProfileImage] = useState('');
  const [veryfyPassword, setveryfyPassword] = useState('');
  const [countries, setCountry] = useState([]);
  const [loadMobile, setloadMobile] = useState([]);
  const [coverImage, setCoverImage] = useState();

  const ui = (
    <SafeAreaView style={styles2.signupMain}>
      <Image source={require('./b.png')} style={styles2.signInImage} />
      {/* <Text style={styles2.text3}>Sign Up</Text> */}
      <Pressable style={styles2.coverImage} onPress={selectCoverPhoto}>
        <Image
          source={coverImage ? {uri: coverImage.uri} : require('./3.png')}
          style={styles2.coverImg}
        />

        {/* <View>{ProfileImage}</View> */}

        {/* <Text style={styles2.text2}>Select Profile Picture</Text> */}
      </Pressable>
      <Pressable onPress={selectProfilePicture}>
        <Image
          source={
            ProfileImage ? {uri: ProfileImage.uri} : require('./user.webp')
          }
          style={styles2.signInImage2}
        />

        {/* <View>{ProfileImage}</View> */}

        {/* <Text style={styles2.text2}>Select Profile Picture</Text> */}
      </Pressable>

      {/* <View style={styles2.nameView}>
        <View style={styles2.view2}>
          <Text style={styles2.text1}>Name</Text>
        </View>
        <View style={styles2.view2}>
          <Icon style={styles2.signUpIcon1} name="user" />

          <TextInput
            style={styles2.input1}
            autoCorrect={false}
            onChangeText={setName}
          />
        </View>
      </View> */}

      <View style={styles2.view1}>
        <View style={styles2.mobleView}>
          <Text style={styles2.text1}>Name</Text>
        </View>

        <View style={styles2.view2}>
        {/* <Icon style={styles2.signUpIcon1} name="user"  /> */}

          {/* <Icon style={styles2.signUpIcon1} name="mobile" /> */}
          
          <TextInput
            style={styles2.input2}
            autoCorrect={false}
            onChangeText={setName}
          />
        </View>
      </View>

      <View style={styles2.view1}>
        <View style={styles2.mobleView}>
          <Text style={styles2.text1}>Mobile</Text>
        </View>

        <View style={styles2.view2}>
          {/* <Icon style={styles2.signUpIcon1} name="mobile" /> */}
          <View style={styles2.view2}>
            <SelectDropdown
              buttonStyle={styles2.numberDropdown}
              rowTextStyle={styles2.dropdowntext}
              data={loadMobile}
              onSelect={setloadMobile}
            />
          </View>
          <TextInput
            style={styles2.mobileInput}
            onChangeText={setMobileNumber}
            maxLength={10}
            keyboardType={'numeric'}
          />
        </View>
      </View>

      <View style={styles2.view1}>
        <View style={styles2.view2}>
          <Text style={styles2.text1}>Password</Text>
        </View>
        <View style={styles2.view2}>
          <Icon style={styles2.signUpIcon1} name="lock" />

          <TextInput
            style={styles2.input1}
            autoCorrect={false}
            secureTextEntry={true}
            onChangeText={setPassword}
          />
        </View>
      </View>

      <View style={styles2.view1}>
        <View style={styles2.view2}>
          <Text style={styles2.text1}>Verify Password</Text>
        </View>
        <View style={styles2.view2}>
          <Icon style={styles2.signUpIcon1} name="lock" />

          <TextInput
            style={styles2.input1}
            autoCorrect={false}
            secureTextEntry={true}
            onChangeText={setveryfyPassword}
          />
        </View>
      </View>

      <View style={styles2.view1}>
        <View style={styles2.view2}>
          <Text style={styles2.text1}>Country</Text>
        </View>
        <View style={styles2.view2}>
          <SelectDropdown
            buttonStyle={styles2.dropdown1}
            rowTextStyle={styles2.dropdowntext}
            data={countries}
            onSelect={setcountry}
          />
        </View>
        <View></View>
      </View>

      {/* <Button title="Select Profile Picture" onPress={selectProfilePicture} /> */}
      <View style={styles2.view4}>
        <View style={styles2.view3}>
          <Pressable style={styles2.selectImgBtn1} onPress={signIn}>
            <Text style={styles2.text2}>Sign In</Text>
          </Pressable>
        </View>
        <View style={styles2.view3}>
          <Pressable style={styles2.selectImgBtn2} onPress={signupRequest}>
            <Text style={styles2.text2}>Sign Up</Text>
          </Pressable>
        </View>
      </View>

      {/* <Button title="Sign Up" onPress={signupRequest} /> */}
    </SafeAreaView>
  );

  function loadCountries() {
    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        // Alert.alert(request.responseText);
        var contryArray = JSON.parse(request.responseText);
        setCountry(contryArray);
      }
    };

    request.open(
      'GET',
      'http://10.0.2.2/react_chat_app/load_country.php',
      true,
    );
    request.send();
  }
  useEffect(loadCountries, []);

  function loadMobileNum() {
    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        // Alert.alert(request.responseText);
        var mobile = JSON.parse(request.responseText);
        setloadMobile(mobile);
      }
    };

    request.open(
      'GET',
      'http://10.0.2.2/react_chat_app/loadMobleNum.php',
      true,
    );
    request.send();
  }
  useEffect(loadMobileNum, []);

  async function selectProfilePicture() {
    const options = {
      mediaType: 'photo',
    };
    const result = await launchImageLibrary(options);

    if (result.didCancel) {
      Alert.alert('Massage', 'No Image');
    } else {
      //const content= result.assets[0].uri;
      // Alert.alert("Massage",content);
      const imageObject = {
        uri: result.assets[0].uri,
        name: 'profile.png',
        type: 'image/png',
      };

      // uploadProfilePic(imageObject);
      setProfileImage(imageObject);
    }
  }

  async function selectCoverPhoto() {
    const options = {
      mediaType: 'photo',
    };
    const result = await launchImageLibrary(options);

    if (result.didCancel) {
      Alert.alert('Massage', 'No Image');
    } else {
      //const content= result.assets[0].uri;
      // Alert.alert("Massage",content);
      const imageObject = {
        uri: result.assets[0].uri,
        name: 'coverPhoto.png',
        type: 'image/png',
      };

      // uploadProfilePic(imageObject);
      setCoverImage(imageObject);
    }
  }

  function signupRequest() {
    // var mobile = setMobileNumber;

    // var profile_pic = imageObject;

    var form = new FormData();

    form.append('mobile', mobileNumber);
    form.append('name', name);
    form.append('password', password);
    form.append('veryfyPassword', veryfyPassword);
    form.append('country', country);
    form.append('coverPhoto',coverImage);

    form.append('profile_pic', ProfileImage);

    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        // Alert.alert('massage',request.responseText);
        var t = request.responseText;





         
        if (t == 'uploaded') {
          // const obj = {
          //   mobile: mobileNumber,
          //   selct: loadMobile,
          // };

          

          // navigation.navigate('Sign In', obj);

          // navigation.navigate('Chat', obj);
        } else if (t == '2') {
          Alert.alert('Massage', 'Pleace enter Your Mobile Number');
        // } else if (t == '1') {
        //   Alert.alert('Massage', '');
        } else if (t == '1') {
          Alert.alert('Massage', 'Pleace Enter Yor Name');
        } else if (t == '3') {
          Alert.alert('Massage', 'Pleace Enter Your Password');
        } else if (t == '4') {
          Alert.alert('Massage', 'Pleace Re-Entry Password4');
        } else if (t== '6') {
          Alert.alert('Massage', 'Password Do Not Match');
        }else{
        // var jsResponseObject = JSON.parse(t);

        // var userObject = jsResponseObject.user;

          // AsyncStorage.setItem('user', JSON.stringify(userObject));
        
          navigation.navigate('Sign In');

        }
      }
    };

    request.open('POST', 'http://10.0.2.2/react_chat_app/signUp.php', true);
    request.send(form);
  }
  function signIn() {
    // await AsyncStorage.clear();
    // navigation.navigate("Signup");
    const obj = {
      mobile: mobileNumber,
      selct: loadMobile,
    };

    navigation.navigate('Sign In', obj);

    // navigation.navigate('Sign In');

    // Alert.alert("massage","hello");
  }
  return ui;
}

const styles2 = StyleSheet.create({
  coverImg: {
    width: '100%',
    height: 150,
  },
  coverImage: {
    position: 'absolute',
    // width:"10%",
    width: '100%',
    height: 150,
    // right:250,
    bottom: 480,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameView: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    top: 45,
  },
  mobleView: {
    width: '80%',
    top: 40,
  },
  mobileInput: {
    width: '70%',
    left: 99,
    height: 40,
    borderStyle: 'solid',
    borderColor: 'black',
    borderRadius: 10,
    // borderWidth: 1,
    paddingStart: 5,
    fontSize: 20,
    borderBottomWidth: 1,
    borderEndWidth: 1,
    borderTopWidth: 1,
    borderStartWidth: 0,
    borderTopStartRadius: 0,
    borderBottomStartRadius: 0,
  },

  numberDropdown: {
    width: '40%',
    // borderColor: 'black',
    borderBottomWidth: 1,
    borderStartWidth: 1,
    borderTopWidth: 1,
    borderBottomColor: 'black',
    borderStyle: 'solid',
    // borderWidth: ,
    borderRadius: 10,
    height: 40,
    backgroundColor: '#ccc',
    top: 40,
    borderTopEndRadius: 0,
    borderBottomEndRadius: 0,

    // left:30,
  },
  view4: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  view3: {
    width: '50%',
  },
  signUpIcon1: {
    fontSize: 22,
    position: 'absolute',
    start: 15,
    color: 'black',
    top: 7,
    color: '#16a085',
  },
  // signUpIcon2: {
  //   fontSize: 22,
  //   position: 'absolute',
  //   start: 15,
  //   color: 'black',
  //   top: 7,
  //   color: '#16a085',
  // },
  text3: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#16a085',
    // fontStyle:'italic',
    // textDecorationLine:'underline',
    // textDecorationStyle:'dotted',
  },
  text2: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    // flexDirection:'row',
  },
  selectImgBtn2: {
    width: '100%',
    height: 35,
    backgroundColor: '#222222',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  selectImgBtn1: {
    width: '100%',
    height: 35,
    backgroundColor: '#16a085',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  view2: {
    width: '80%',
  },
  signupMain: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#ccc',
  },
  view1: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  text1: {
    fontSize: 20,
    paddingEnd: 10,
    fontWeight: 'bold',
    color: 'black',
  },
  input1: {
    width: '100%',
    height: 40,
    borderStyle: 'solid',
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
    paddingStart: 35,
    fontSize: 20,
  },
  input2: {
    width: '100%',
    height: 40,
    borderStyle: 'solid',
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
    paddingStart: 35,
    fontSize: 20,
    // position:'absolute',
    top:38,
  },

  signInImage: {
    width: 280,
    opacity: 0.4,
    // top:90,
    height: 270,
    // borderRadius: 0,
    position: 'absolute',
  },
  signInImage2: {
    width: 100,
    // opacity:0.4,
    // top:90,
    height: 100,
    borderRadius: 50,
    top: 60,
    // position:'absolute',
  },
  dropdown1: {
    //  backgroundColor:"none",
    width: '100%',
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 10,
    height: 40,
    backgroundColor: '#ccc',
  },
  dropdowntext: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 20,
  },
});
