import React from 'react';
import {View, Text, StyleSheet, Dimensions, StatusBar,AsyncStorage,TouchableOpacity,Image} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

// import { connect } from 'react-redux';

class HeaderCustom extends React.Component {
  state={
    logout:true,
  }
  logout=()=>{
    AsyncStorage.removeItem('user_info',()=>{
       console.log("deleted")
      this.props.navigation.push("Signup")
     })
  }
  render(){
    const {navigation,title,back,rightIcon,mode,logoutvisible,showLogo,pageName} = this.props;
    return (
      <View style={{ width: '100%', backgroundColor: "GREEN"}}>
      <StatusBar barStyle="light-content" translucent />
      <View style={{ marginTop: getStatusBarHeight(), padding: 10,paddingHorizontal:15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
       {
         back ? 
         <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
         <Icon name="arrow-back-outline" size={20} />
     </TouchableOpacity>
     : 
     <TouchableOpacity onPress={()=>this.props.navigation.openDrawer()}>
     <Icon name="menu" size={20} />
 </TouchableOpacity>
       }
       {
         showLogo ?
         <View style={{flexDirection:'row'}}>
         <Image source={require("../assets/logo.png")} style={{width:40,height:40}} />
          <Text style={{ fontSize: 20, color: 'black',alignSelf:'center',marginLeft:3 }}>CHARITY APP</Text>
          </View>
          : 
           <Text style={{ fontSize: 20, color: 'black',alignSelf:'center' }}>{pageName}</Text>
       }
      
       {
          logoutvisible ? 
          <TouchableOpacity onPress={this.logout}> 
          <AntDesign name="logout" size={17} />
          </TouchableOpacity> : null
       }  
      </View>
    </View>
    )
  }
  
}
    
export default HeaderCustom

