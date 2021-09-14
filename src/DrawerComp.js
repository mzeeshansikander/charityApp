import React, {Component} from 'react';
// import { useState } from 'react';
import { SafeAreaView,ImageBackground,View,Text,TouchableOpacity,Image,ScrollView,Dimensions,AsyncStorage } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


class DrawerComp extends React.Component{ 
    state={
        email:"",
        fname:'',
        lname:""
    }  
    logout=()=>{
        AsyncStorage.removeItem('user_info',()=>{
           console.log("deleted")
          this.props.navigation.navigate("Signup")
         })
      }
      componentDidMount=async()=>{
        let user = await AsyncStorage.getItem('user_info');
        user=JSON.parse(user)
        const  User = user ? user :{} 
        this.setState({uid:User.uid})
       // getting user detail
        firestore().collection("users").doc(User.uid)
        .onSnapshot((doc) => {
            this.setState({email:doc.data().email})
            this.setState({fname:doc.data().fname})
            this.setState({lname:doc.data().lname})
        });
      }
 render(){
     const {email,fname,lname}=this.state;
     console.log(fname,"this is fname")
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor:'#A3D343',flex:1,marginTop:getStatusBarHeight()}}>
         <Image source={{ uri: 'https://www.w3schools.com/howto/img_avatar2.png' }} style={{ width: 100, height: 100, borderRadius: 80, alignSelf: 'center' }} />
         <View style={{flexDirection:'row',justifyContent:'center',marginTop:5}}>
          <Text style={{fontSize:14,color:'white',fontWeight:'700'}}>{fname}{lname}</Text>
          <View style={{borderLeftColor:'white',borderLeftWidth:1,marginLeft:7}}>
              <Text style={{fontSize:14,color:'white' ,marginLeft:7,fontWeight:'700'}}>{email}</Text>
          </View>
        </View>
        
         <View style={{paddingTop:40}}>
           <TouchableOpacity onPress={()=> {this.props.navigation.navigate('Dashboard'); }} >
              <View style={{flexDirection:'row',paddingLeft:10,marginTop:10}}>
                <MaterialCommunityIcons  name="view-dashboard" size={20} color='white' />
                <Text style={{fontSize:18,color:'white', marginLeft:10,fontWeight:'600'}}>Dashboard</Text>
              </View>
          </TouchableOpacity >
          <TouchableOpacity onPress={()=> {this.props.navigation.navigate('Profile'); }} >
              <View style={{flexDirection:'row',paddingLeft:10,marginTop:20}}>
                <Entypo  name="user" size={20} color='white' />
                <Text style={{fontSize:18,color:'white', marginLeft:10,fontWeight:'600'}}>Profile</Text>
              </View>
          </TouchableOpacity >
          <TouchableOpacity onPress={()=> {this.props.navigation.navigate('About') }} >
              <View style={{flexDirection:'row',paddingLeft:10,marginTop:20}}>
                <Ionicons  name="shapes" size={20} color='white' />
                <Text style={{fontSize:18,color:'white', marginLeft:10,fontWeight:'600'}}>About Us</Text>
              </View>
          </TouchableOpacity >
          
          <TouchableOpacity onPress={()=> this.logout()} >
              <View style={{flexDirection:'row',paddingLeft:10,marginTop:20}}>
                <Ionicons  name="shapes" size={20} color='white' />
                <Text style={{fontSize:18,color:'white', marginLeft:10,fontWeight:'600'}}>Logout</Text>
              </View>
          </TouchableOpacity >
          
            
    
           {/* <TouchableOpacity  >
           <View style={{flexDirection:'row',padding:20}}>
           <Ionicons  name="ios-power-outline" size={20} color='white' />
             <Text style={{fontSize:18,color:'white', marginLeft:10}}>Logout</Text>
           </View>
           </TouchableOpacity> */}
         
      
            </View>
        </ScrollView>
        )
 }
  }

  export default DrawerComp;