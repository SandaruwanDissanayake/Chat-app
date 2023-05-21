import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Image, StyleSheet, Text, View} from 'react-native';

export function Contact_Info({navigation, route}) {
  const ui = (
    <SafeAreaView style={styles.main}>
      <View style={styles.view1}>
        {/* <Image style={styles.img} source={route.params.img} /> */}
        <Image source={{uri: route.params.cover}} style={styles.cover} />
        <Image source={{uri: route.params.img}} style={styles.img} />

        <View style={styles.view2}>
          <Text style={styles.text1}>{route.params.name}</Text>
          <Text style={styles.text2}>{route.params.mobile}</Text>
        </View>
      <Image source={require('./b.png')} style={styles.signInImage} />

      </View>
    </SafeAreaView>
  );
  return ui;
}
export default Contact_Info;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    // justifyContent:"center",
    alignItems: 'center',
    backgroundColor:"black",
  },
  text1: {
    fontSize: 30,
    fontWeight: 'bold',
    
    color: 'black',
    top: 30,
  },
  text2: {
    fontSize: 20,
    fontWeight: 'bold',
   
    color: 'black',
    top: 30,
  },
cover: {
    width: 410,
    height: 300,
    borderRadius: 20,
    // top: 10,
    position:'absolute',
    bottom:50,

  },
  img:{
width:150,
height:150,
borderRadius:30,
top:150,
  },
  view1: {
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  view2: {
    alignItems:'center',
  
   
    width:400,
    height:100,
    backgroundColor:"#ccc",
    // justifyContent:'center',
    top:170,
    borderRadius:20,
  },
  signInImage: {
    width: 130,
    // maxHeight:150,
    opacity: 0.4,
    top: 450,
    height: 120,
    // borderRadius: 0,
    position: 'absolute',
    zIndex: -1,
  },
});
