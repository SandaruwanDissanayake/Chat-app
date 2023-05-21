import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Alert, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

export function My_Profile({route, navigation}) {
  const ui = (
    <SafeAreaView style={styles.main}>
      <View style={styles.view1}>
        <Image
          source={{
            uri: 'http://10.0.2.2/react_chat_app/' + route.params.cover_Pic_url,
          }}
          style={styles.profileimg}
        />
        <Image
          source={{
            uri: 'http://10.0.2.2/react_chat_app/' + route.params.profile_url,
          }}
          style={styles.coverimg}
        />
        <View style={styles.view2}>
          <Text style={styles.text1}>{route.params.name}</Text>
          <Text style={styles.text2}>{route.params.mobile}</Text>
        </View>
        <Pressable onPress={signOut} style={styles.btn}>
          <Text style={styles.btnText}>Sign Out</Text>
          <Icon style={styles.signOutIcon} name="sign-in" />
        </Pressable>
        <Image source={require('./b.png')} style={styles.signInImage} />
        <View style={styles.view32}>
          {/* <View style={styles.view1}>
          <Text style={styles.homeText1}>Massage</Text>
        </View> */}
          <Pressable style={styles.viewdown}>
            <Icon style={styles.signUpIcon2} name="wechat" />
          </Pressable>
          <Pressable style={styles.view22}>
            <Icon style={styles.signUpIcon1} name="gear" />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
  return ui;

  //   async function signOut() {

  //   }

  async function signOut() {
    //    await AsyncStorage.setItem('user', JSON.stringify(null));

    navigation.navigate('Sign In');

    // try {
    //   await AsyncStorage.removeItem('user');
    //   navigation.navigate('Sign In');
    // } catch (e) {
    //   // handle errors here
    //   console.error(e);
    //   Alert.alert('Error', 'Failed to sign out');
    // }
  }
}
export default My_Profile;

const styles = StyleSheet.create({
  btn: {
    width: 200,
    backgroundColor: '#16a085',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    top: 50,
    flexDirection: 'row',
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  text1: {
    fontSize: 30,
    fontWeight: 'bold',
    right: 100,
    color: 'white',
    // top: 30,
    start: 0,
  },
  text2: {
    fontSize: 20,
    fontWeight: 'bold',
    // right: 90,
    color: 'white',
    // top: 30,
    start: 0,
  },
  coverimg: {
    width: 100,
    height: 100,
    borderRadius: 30,
    // top: 10,
    bottom: 150,
    position: 'absolute',
  },
  profileimg: {
    width: 410,
    height: 300,
    borderRadius: 20,
    // top: 10,
    bottom: 200,
    position: 'absolute',
  },
  view1: {
    justifyContent: 'center',
    alignItems: 'center',
    // bottom: 70,
  },
  view2: {
    alignItems: 'center',
    // color: 'red',

    width: 400,
    height: 200,
    // backgroundColor: '#ccc',
    // justifyContent:'center',
    top: 150,
    borderRadius: 20,
  },
  signInImage: {
    width: 130,
    // maxHeight:150,
    opacity: 0.4,
    top: 150,
    height: 120,
    // borderRadius: 0,
    position: 'absolute',
    zIndex: -1,
  },
  signUpIcon1: {
    fontSize: 35,
    left: 30,
    color: '#ccc',

    //  right:100,
  },
  signOutIcon: {
    fontSize: 35,
    left: 20,
    color: '#ccc',

    //  right:100,
  },
  signUpIcon2: {
    fontSize: 35,
    left: 30,
    color: 'white',

    //  right:100,
  },
  view3: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 40,
    bottom: 0,
  },
  view22: {
    width: '50%',
    alignItems: 'center',
    backgroundColor: '#16a085',

    height: 45,
    justifyContent: 'center',
  },
  viewdown: {
    width: '50%',
    alignItems: 'center',
    height: 45,
    justifyContent: 'center',
    backgroundColor: '#ccc',
  },
  view12: {
    width: '80%',
  },
  view32: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 40,
    // bottom:0,
    top: 160,
  },
});

// async function signOut() {
//   try {
//     await AsyncStorage.removeItem('user');
//     navigation.navigate('Sign In');
//   } catch (e) {
//     // handle errors here
//     console.error(e);
//     Alert.alert('Error', 'Failed to sign out');
//   }
// }

// <Pressable onPress={signOut} style={styles.btn}>
//   <Text style={styles.btnText}>Sign Out</Text>
// </Pressable>
