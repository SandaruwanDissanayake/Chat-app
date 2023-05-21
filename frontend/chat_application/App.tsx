
import React,{useState} from "react";
import { Chat } from "./Chat";
import { Home } from "./Home";
import { Signup } from "./SignUp";
import { SignIn } from "./SignIn";
import {Contact_Info} from "./Contact_info";
import {My_Profile} from "./My_profile";

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { createStackNavigator } from '@react-navigation/stack';

const Stack = createNativeStackNavigator();



function App(){

  async function checkUser() {
 const user = await AsyncStorage.getItem('user');   
 return user;
  }

  const ui=(
    <NavigationContainer>
      <Stack.Navigator initialRouteName={checkUser!=null?"Home":"Sign In"}>
      <Stack.Screen name="Sign In" component={SignIn} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="Sign Up" component={Signup} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Contact Info" component={Contact_Info} />
        <Stack.Screen name="My Profile" component={My_Profile} />
        

      </Stack.Navigator>
    </NavigationContainer>
  );

  return ui;
}






export default App;