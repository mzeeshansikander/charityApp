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
      <View style={{flex: 1,backgroundColor:"#33CAFF",justifyContent:'center',alignItems:'center'}}>
        <Text style={{fontSize:20}}>Blood Bank App</Text>
      </View>
    );
  }
}

 
export default Splash;

