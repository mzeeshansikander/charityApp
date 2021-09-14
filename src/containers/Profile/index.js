import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator, ScrollView,AsyncStorage } from 'react-native';
import Header from '../../components/HeaderCustom';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import DropDownPicker from 'react-native-dropdown-picker';
import { Card } from 'native-base';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';

//icons
import Entypo from 'react-native-vector-icons/Entypo'

class Profile extends React.Component {
  state = {
    allpost:[],
    userDetails:[],
    visible:false
  }
 showMenu=()=>{
   this.setState({visible:true})
 }
 hideMenu=()=>{
  this.setState({visible:false})
}
deletePost=(data)=>{
  firestore().collection("createPost").doc(data.id).delete().then(() => {
    alert("Post Deleted!")
  }).catch((error) => {
    alert(error.message)
  });
}
  componentDidMount=async()=>{
    let user = await AsyncStorage.getItem('user_info');
    user=JSON.parse(user)
    const  User = user ? user :{} 
    // getting user details
   firestore().collection("users").doc(User.uid)
    .onSnapshot((doc) => {
        this.setState({userDetails:doc.data()})
    });
    // getting all the post
    firestore().collection("createPost").where("uid", "==", User.uid)
    .get()
    .then((querySnapshot) => {
      var mypost=[]
        querySnapshot.forEach((doc) => {
            mypost.push(doc.data())
        });
        this.setState({allpost:mypost})
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
  }

  render() {
    const { loader,allpost,userDetails,visible } = this.state;
    console.log(userDetails,"this is all user")
    return (
      <View style={{ flex: 1, backgroundColor: "white", justifyContent: 'flex-start' }}>
        {loader ? <View style={{ position: "absolute", zIndex: 99, justifyContent: 'center', top: 0, bottom: 0, right: 0, left: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <ActivityIndicator size="large" color="black" />
        </View> : null
        }
        <Header pageName="Profile" logoutvisible navigation={this.props.navigation} />
        <ScrollView >
          <Image source={{ uri: 'https://www.w3schools.com/howto/img_avatar2.png' }} style={{ width: 140, height: 140, borderRadius: 80, alignSelf: 'center' }} />
          <Text style={{ textAlign: 'center', marginTop: 5, fontSize: 15 }}>{userDetails.fname} {userDetails.lname}</Text>
          <Text style={{ textAlign: 'center', marginTop: 5, fontSize: 15 }}>{userDetails.mobile_num}</Text>
          <TouchableOpacity onPress={() => this.props.navigation.push('EditProfile')} style={{ marginTop: 10, borderRadius: 30, padding: 10, width: '54%', alignSelf: 'center', borderColor: '#A3D343', borderWidth: 1 }}>
            <Text style={{ textAlign: 'center', color: "#A3D343", fontWeight: '700' }}>Edit Profile</Text>
          </TouchableOpacity>
          <View style={{padding:10}}>
            <Text style={{ marginTop: 5, fontSize: 15 }}>My Posts</Text>
            {
              allpost.map((data,index)=>{
                return(
                  <Card key={index} style={{ marginTop: 10 }}>
                  <TouchableOpacity onPress={()=>this.props.navigation.navigate("CaseDetail",{item:data})} style={{ padding: 10, borderRadius: 20 }}>
                    <View style={{ flexDirection: 'row' }}>
                      <Image source={{ uri: 'https://www.w3schools.com/howto/img_avatar2.png' }} style={{ width: 30, height: 30, borderRadius: 20 }} />
                      <View>
                        <Text style={{ fontSize: 11, alignSelf: 'center', padding: 7, fontWeight: '500' }}>{userDetails.fname} {userDetails.lname}</Text>
                      </View>
                      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                      <Menu
                          visible={visible}
                          anchor={<Text onPress={()=>this.showMenu()}>Show menu</Text>}
                          onRequestClose={()=>this.hideMenu()}
                        >
                          <MenuItem style={{color:'gray',fontSize:11}} onPress={()=>this.deletePost(data)}>Delete Post</MenuItem>
                          <MenuDivider color="#A3D343" />
                       </Menu>
                      </View>
                    </View>
                    <Text style={{ fontSize: 11, paddingTop: 20, fontWeight: '500' }}>Contact Details:{data.phonenumber}</Text>
                    <Text style={{ fontSize: 11, fontWeight: '500' }}>Blood Group: {data.bgroup}</Text>
                    <Text style={{ fontSize: 11, fontWeight: '500' }}>Total Amount:{data.total_amount}</Text>
                    <Text style={{ fontSize: 11, fontWeight: '500' }}>Quality:{data.quality}</Text>
                    <Text style={{ fontSize: 11, fontWeight: '500' }}>Amount Arranged:{data.amountArrange ==""? 0 : data.amountArrange}</Text>
                    <Text style={{ fontSize: 11, fontWeight: '500' }}>Description:{data.description}</Text>
                    <Image source={{ uri: data.image }} style={{width:'100%',height:120,marginTop:10,borderRadius:2,resizeMode:'cover'}} />
                  </TouchableOpacity>
                </Card>
                );
              })
            }         
          </View>
        </ScrollView>


      </View>
    );
  }
}


export default Profile;