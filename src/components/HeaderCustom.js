import React from 'react';
import {View, Text, StyleSheet, Dimensions, StatusBar,AsyncStorage,TouchableOpacity} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

// import { connect } from 'react-redux';

class HeaderCustom extends React.Component {
  state={
    logout:true,
  }
  logout=()=>{
    AsyncStorage.removeItem('user_info',()=>{
       console.log("deleted")
      this.props.navigation.navigate("Login")
     })
  }
  render(){
    const {navigation,title,back,rightIcon,mode,logoutvisible} = this.props;
    return (
      <View style={{ width: '100%', backgroundColor: "GREEN"}}>
      <StatusBar barStyle="light-content" translucent />
      <View style={{ marginTop: getStatusBarHeight(), padding: 10,paddingHorizontal:15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
           <Text style={{ fontSize: 16, color: 'black' }}>back</Text>
       </TouchableOpacity>
        <Text style={{ fontSize: 22, color: 'black' }}>Blood Bank App</Text>
       {
          logoutvisible ? <TouchableOpacity onPress={this.logout}><Text>LOGOUT</Text></TouchableOpacity> : null
       }  
      </View>
    </View>
    )
  }
  
}
    
export default HeaderCustom

