import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export function SignIn({navigation, route}) {
  const [mobile, setMobile] = useState(null);
  const [password, setPassword] = useState(null);

  const ui = (
    <SafeAreaView style={styles.signInMain}>
      <Image
        source={require("./b.png")}
        
        

        style={styles.signInImage}
      />
<View style={styles.view1}>

<Text style={styles.text1}>Wel </Text>
<Text style={styles.text2}>Come</Text>


</View>
<View style={styles.view1}>

<Text style={styles.text3}>Pleace Enter Your Mobile Number & Password </Text>



</View>

      <View style={styles.signInView1}>
        <Icon style={styles.signInIcon1} name="mobile" />
        <TextInput
          style={styles.signInInput1}
          autoCorrect={false}
          inputMode="numeric"
          maxLength={10}
          placeholder="Your Mobile"
          onChangeText={setMobile}
        />
      </View>

      <View style={styles.signInView1}>
        <Icon style={styles.signInIcon1} name="lock" />
        <TextInput
          style={styles.signInInput1}
          secureTextEntry={true}
          placeholder="Your Password"
          onChangeText={setPassword}
        />
      </View>

      <Pressable style={styles.signInButton1} onPress={signInProcess}>
        <Text style={styles.signInButtonText2}>Sign In</Text>
      </Pressable>
      <Pressable style={styles.signInButton2} onPress={goSignUp}>
        <View style={styles.view3}>
        <Text style={styles.signInButtonText1}>New User ?</Text>
        <Text style={styles.signInButtonText2}>Go to Sign Up</Text>
        </View>
        

      </Pressable>
    </SafeAreaView>
  );
  return ui;

  function signInProcess() {
    var jsRequestObject = {mobile: mobile, password: password};
    var jsonRequestText = JSON.stringify(jsRequestObject);

    var formData = new FormData();
    formData.append('jsonRequestText', jsonRequestText);

    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {


        var t = request.responseText;
        // Alert.alert("massage",t);
        
        if (request.responseText == 'success') {
          Alert.alert('message', 'sucsess');
        } else {
          
          
          // Alert.alert('message', 'error');
        }
        var jsonResponsetext = request.responseText;
        var jsResponseObject = JSON.parse(jsonResponsetext);
        // Alert.alert('message', 'sucsess');

        if (jsResponseObject.msg == 'Error') {
          Alert.alert('Message', 'Invalid Details');
        } else {
          var userObject = jsResponseObject.user;
          // Alert.alert('Message', 'Hello ' + userObject.name);
          AsyncStorage.setItem('user', JSON.stringify(userObject));
          // Alert.alert('message', 'sucsess');
          // Navigate to Home
          navigation.navigate('Home');
        }
      }
    };

    request.open('POST', 'http://10.0.2.2/react_chat_app/signIn.php', true);
    request.send(formData);
  }
  function goSignUp(){
    navigation.navigate("Sign Up");
  }
}



const styles = StyleSheet.create({
  text3:{
fontSize:13,
fontWeight:'bold',
  },
  view3:{
flexDirection:'row',
alignItems:'center',
justifyContent:'center',
  },
  view1:{
flexDirection:"row",
  },
  text1:{
fontWeight:'bold',
fontSize:30,
color:"black",
  },
  text2:{
    fontWeight:'bold',
    fontSize:30,
    // left:5,
    color:"#16a085",
      },
  
  signInButtonText1: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
  
  signInButtonText2: {
    fontSize: 19,
    fontWeight: 'bold',
    color: 'white',
    left:4,
  },


  signInButton1: {
    width: '80%',
    height: 45,
    backgroundColor: '#222222',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },

  signInButton2: {
    width: '80%',
    height: 45,
    backgroundColor: '#16a085',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },

  signInView1: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  signInIcon1: {
    fontSize: 22,
    position: 'absolute',
    start: 15,
    color: 'black',
    color:"#16a085",

  },

  signInInput1: {
    width: '80%',
    height: 47,
    fontSize: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'black',
    paddingStart: 38,
  },

  signInImage: {
    width: 80,
    height: 80,
    // borderRadius: 0,
  },

  signInMain: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 25,
    backgroundColor:"#ccc",
  },
});
