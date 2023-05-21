import React, {useEffect, useState} from 'react';
import {
  Alert,
  Button,
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
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Home({navigation, route}) {
  const [items, setItems] = useState([]);
  const [searchText, setSearchText] = useState('');

  async function loadFriendList() {
    const userJSONText = await AsyncStorage.getItem('user');

    const obj = JSON.parse(userJSONText);

    const formData = new FormData();

    formData.append('userJSONText', userJSONText);
    formData.append('text', searchText);

    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        // Alert.alert("massage","hello");
if(request.responseText=="Error"){
  // Alert.alert("Massage","Pleace Log In Frist");
  navigation.navigate("Sign In");
}else{
  // Alert.alert("Response",request.responseText);
  setItems(JSON.parse(request.responseText));
}
       
      }
    };

    request.open('POST', 'http://10.0.2.2/react_chat_app/load_users.php', true);
    request.send(formData);
  }
  function start() {
    loadFriendList();
  }

  useEffect(start, []);

  const ui = (
    <SafeAreaView style={styles.home}>
    

      <View style={styles.homeView1}>
        <TextInput
          style={styles.homeInput1}
          autoCorrect={false}
          onChangeText={setSearchText}
          onTextInput={loadFriendList}
          placeholder="Search Friends"
          placeholderTextColor="#16a085"

        />

        {/* <TouchableOpacity onPress={loadFriendList}>
       <Icon
          name="search"
          size={35}
          color="#2b2b2b"
          style={styles.homeInput1Image}
        />
       </TouchableOpacity> */}
      </View>

      <FlatList data={items} renderItem={itemUI} />
      <View style={styles.view3}>
        {/* <View style={styles.view1}>
          <Text style={styles.homeText1}>Massage</Text>
        </View> */}
        <Pressable  style={styles.viewdown}>
          <Icon style={styles.signUpIcon2} name="wechat" />
        </Pressable>
        <Pressable onPress={g} style={styles.view2}>
          <Icon style={styles.signUpIcon1} name="gear" />
        </Pressable>
      </View>
    </SafeAreaView>
  );

  return ui;

  function itemUI({item}) {
    const ui = (
      <Pressable onPress={m}>
        <View style={styles.item}>
          {/* <Image source={require('./a.jpeg')} style={styles.itemImage} /> */}
          <Image
            source={{uri: 'http://10.0.2.2/react_chat_app/' + item.pic}}
            style={styles.itemImage}
          />

          {/* <Image source={{uri:`${item.pic}`}}/> */}
          <View style={styles.itemView1}>
            <Text style={styles.itemText1}>{item.name}</Text>
            <Text style={styles.itemText2}>{item.msg}</Text>
          </View>
          <View style={styles.itemView2}>
            <Text style={styles.itemText3}>{item.time}</Text>
            <View style={styles.itemShape1}>
              <Text style={styles.itemText4}>{item.count}</Text>
            </View>
          </View>
        </View>
      </Pressable>
    );
    return ui;
    function m() {
      // Alert.alert("Sucsess","Massage");

      const obj = {
        name: item.name,
        id: item.id,
        img: 'http://10.0.2.2/react_chat_app/' + item.pic,
        cover: 'http://10.0.2.2/react_chat_app/' + item.cover, 
        mobile: item.mobile,
      };
      navigation.navigate('Chat', obj);
      changeChatStatus(item.id);
    }
  }
  async function changeChatStatus(id) {
    // Alert.alert("msg",id);
    const userJSONText = await AsyncStorage.getItem('user');

    // Alert.alert("Massage",obj.name);
    // Alert.alert("Massage",userJSONText);

    const f = new FormData();

    f.append('userJSONText', userJSONText);
    f.append('user_Id', id);

    var r = new XMLHttpRequest();

    r.onreadystatechange = function () {
      if (r.readyState == 4 && r.status == 200) {
        // Alert.alert("Response",r.responseText);
        // setItems(JSON.parse(request.responseText));
      }
    };

    r.open(
      'POST',
      'http://10.0.2.2/react_chat_app/change_chat_status.php',
      true,
    );
    r.send(f);
  }
  async function g() {
    const userJSONText = await AsyncStorage.getItem('user');
    const obj = JSON.parse(userJSONText);

    navigation.navigate('My Profile', obj);
  }
}

const styles = StyleSheet.create({
  signUpIcon1: {
    fontSize: 35,
    left: 30,
    color:"white",
  //  right:100,
  },
  signUpIcon2: {
    fontSize: 35,
    left: 30,
    color:"#ccc",
  //  right:100,
  },
  view3: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    width: '100%',
    height:40,
    bottom:0,
    
   

  },
  view2: {
    width: '50%',
    alignItems:'center',
    backgroundColor:"#ccc",
    height:45,
    justifyContent:'center',
    },
    viewdown: {
      width: '50%',
      alignItems:'center',
      backgroundColor:"#16a085",
      height:45,
      justifyContent:'center',
      },
  view1: {
    width: '80%',
  },
  clearbtn: {
    width: 100,
    height: 30,
    backgroundColor: 'red',
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
    height: 40,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 20,
    paddingLeft: 10,
    justifyContent: 'center',
  },
  chatIcon1: {
    paddingHorizontal: 10,
    color: 'green',
    fontSize: 32,
  },
  chatText3: {
    fontSize: 10,
    color: 'green',
  },
  chatIconSeen: {
    paddingLeft: 10,
    color: 'green',
  },
  chatIconSent: {
    paddingLeft: 10,
    color: 'yellow',
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
    backgroundColor: '#C1E8FF',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  chatViewRight: {
    width: '45%',
    marginTop: 10,
    backgroundColor: '#C1E8FF',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  chat: {
    flex: 1,
    alignItems: 'center',
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
borderRadius:10,
borderWidth:2,
borderColor:"#16a085",
top:20,
bottom:50,

maxHeight:130,
    // borderColor:"black",
    // borderWidth: 1,
  },
  itemText1: {
    color: '#16a085',
    fontSize: 22,
    fontWeight: 'bold',
  },
  itemText2: {
    fontSize: 18,
    color: 'white',
    fontWeight:'bold',
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
    // borderBottomWidth:1,
    // borderBottomColor:"black",
  },
  itemView2: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: '20%',
  },
  home: {
    flex: 1,
    alignItems: 'center',
    backgroundColor:"black",

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
    borderColor: '#16a085',
    color:"white",
  },
  homeView1: {
    flexDirection: 'row',
    alignItems: 'center',
    top:5,
  },
  homeInput1Image: {
    position: 'absolute',
    right: 17,
    bottom: 1,
  },
});
