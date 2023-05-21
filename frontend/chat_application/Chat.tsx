import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchImageLibrary} from 'react-native-image-picker';

export function Chat({route, navigation}) {
  const [chatText, setChatText] = useState('');
  const [ProfileImage, setProfileImage] = useState('');

  // const [id,setId]=useState(null);
  const [chatHistory, setChatHistory] = useState([]);

  // async function m() {
  //   var userJSONText =await AsyncStorage.getItem('user');
  //   var userJSONObject=JSON.parse(userJSONText);
  //   setId(userJSONObject.id);
  // }
  // m();

  async function sendRequest() {
    const form = new FormData();
    var userJSONText = await AsyncStorage.getItem('user');
    var userJSONObject = JSON.parse(userJSONText);
    form.append('id1', userJSONObject.id);
    form.append('id2', route.params.id);

    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        var responseText = request.responseText;
        var responseArry = JSON.parse(responseText);
        setChatHistory(responseArry);
      }
    };

    request.open('POST', 'http://10.0.2.2/react_chat_app/load_chat.php', true);
    request.send(form);
  }

  const ui = (
    <SafeAreaView style={styles.chat}>
      {/* <Text style={styles.chatText1}>Chat</Text> */}
      <Pressable onPress={Contact_info}>
        <View style={styles.view1}>
          <View style={styles.view2}>
            <Image source={{uri: route.params.img}} style={styles.itemImage} />
          </View>
          <View style={styles.view3}>
            <Text style={styles.chatText2}>{route.params.name}</Text>
          </View>
        </View>
      </Pressable>

      <FlatList
        data={chatHistory}
        renderItem={chatItem}
        style={styles.chatList}
      />
      <Image source={require('./b.png')} style={styles.signInImage} />

      <View style={styles.chatSendView}>
        <TouchableOpacity onPress={selectProfilePicture}>
          <Icon name="image" style={styles.chatIcon1} />
        </TouchableOpacity>



        <TextInput
          style={styles.chatInput1}
          placeholder={'Enter Your Message'}
          onChangeText={setChatText}
          placeholderTextColor="#16a085"
          id='input1'
        />
        <TouchableOpacity onPress={saveChat} >
          <Icon name="sc-telegram" style={styles.chatIcon1} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );

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

  function start() {
    setInterval(sendRequest, 2000);
  }
  useEffect(start, []);
  function Contact_info() {
    const obj = {
      id: route.params.id,
      name: route.params.name,
      img: route.params.img,
      mobile: route.params.mobile,
      cover: route.params.cover,
    };

    navigation.navigate('Contact Info', obj);
  }
  return ui;
  async function saveChat() {
    var userJSONText = await AsyncStorage.getItem('user');
    var fromUserJSONObject = JSON.parse(userJSONText);

    var requestObject = {
      from_user_id: fromUserJSONObject.id,
      to_user_id: route.params.id,
      message: chatText,
    };

    const formData = new FormData();
    formData.append('requestJSON', JSON.stringify(requestObject));
    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        //   Alert.alert("massage",request.responseText);
        // setItems(JSON.parse(request.responseText));
        //  chatText("");
        setChatText('');
      }
    };

    request.open('POST', 'http://10.0.2.2/react_chat_app/saveChat.php', true);
    request.send(formData);
  }
}

function chatItem({item}) {
  const itemUI = (
    <View
      style={item.side == 'right' ? styles.chatViewLeft : styles.chatViewRight}>
      <Text style={styles.msg}>{item.msg}</Text>
      <View style={styles.chatView1}>
        <Text style={styles.chatText3}>{item.time}</Text>
        {item.side == 'left' ? (
          <Icon
            name="check"
            size={20}
            style={
              item.status == 'seen' ? styles.chatIconSeen : styles.chatIconSent
            }
          />
        ) : null}
      </View>
    </View>
  );
  return itemUI;
}

const styles = StyleSheet.create({
  view2: {
    width: '40%',
    alignItems: 'center',
  },
  view3: {
    width: '60%',
  },

  view1: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#ccc',
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  msg: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  chatSendView: {
    flexDirection: 'row',
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  chatInput1: {
    width: '80%',
    height: 50,
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 10,
    fontSize: 20,
    paddingLeft: 10,
    justifyContent: 'center',
    borderColor: '#16a085',
    color: 'white',
  },
  chatIcon1: {
    paddingHorizontal: 10,
    color: 'green',
    fontSize: 32,
  },
  chatText3: {
    fontSize: 15,
    color: '#ccc',
  },
  chatIconSeen: {
    paddingLeft: 80,
    color: 'green',
  },
  chatIconSent: {
    paddingLeft: 80,
    color: 'red',
  },
  chatList: {
    width: '100%',
  },
  chatView1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatViewLeft: {
    width: '55%',
    marginTop: 10,
    // backgroundColor: '#C1E8FF',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginLeft: 10,
    borderColor: 'red',
    borderWidth: 2,
  },
  chatViewRight: {
    width: '45%',
    marginTop: 10,
    // backgroundColor: '#ccc',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    marginRight: 10,
    borderColor: '#16a085',
    borderWidth: 2,
  },
  chat: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'black',
  },
  chatText1: {
    fontSize: 28,
    paddingVertical: 15,
    color: '#2b2b2b',
    fontFamily: 'DancingScript-VariableFont_wght',
  },
  chatText2: {
    fontSize: 22,
    color: '#303030',
    fontWeight: 'bold',
    paddingVertical: 10,
  },
  itemImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  item: {
    flexDirection: 'row',
    paddingVertical: 20,
  },
  itemText1: {
    color: '#303030',
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemText2: {
    fontSize: 16,
    color: '#9E9F9F',
  },
  itemText3: {
    fontSize: 14,
    color: '#9E9F9F',
    paddingBottom: 5,
  },
  itemText4: {
    fontSize: 14,
    color: '#ffffff',
  },
  itemShape1: {
    width: 24,
    height: 24,
    backgroundColor: '#2675EC',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemView1: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    width: '60%',
  },
  itemView2: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  home: {
    flex: 1,
    alignItems: 'center',
  },
  homeText1: {
    fontSize: 28,
    paddingVertical: 15,
    color: '#2b2b2b',
    fontFamily: 'DancingScript-VariableFont_wght',
  },
  homeInput1: {
    height: 45,
    borderStyle: 'solid',
    borderWidth: 2,
    width: '90%',
    borderRadius: 20,
    fontSize: 20,
    paddingLeft: 15,
    paddingRight: 50,
    borderColor: '#2b2b2b',
  },
  homeView1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  homeInput1Image: {
    position: 'absolute',
    right: 20,
  },
  signInImage: {
    width: 330,
    // maxHeight:150,
    opacity: 0.4,
    top: 200,
    height: 310,
    // borderRadius: 0,
    position: 'absolute',
    zIndex: -1,
  },
});
