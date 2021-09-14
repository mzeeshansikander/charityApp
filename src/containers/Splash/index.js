import React from 'react';
import {View,Text, Image} from 'react-native';


class Splash extends React.Component {
 componentDidMount(){
   setTimeout(() => {
     this.props.navigation.navigate('Login')
   }, 2000);
 }
  render() {
   
    return (
      <View style={{flex: 1,backgroundColor:"#A3D343",justifyContent:'center',alignItems:'center'}}>
       <Image source={require("../../assets/logo.png")} style={{width:130,height:130}} />
      </View>
    );
  }
}

 
export default Splash;

