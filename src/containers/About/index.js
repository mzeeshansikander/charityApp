import React from 'react';
import {View,Text, Image, TextInput,TouchableOpacity,ActivityIndicator,ScrollView} from 'react-native';
import Header from '../../components/HeaderCustom';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import DropDownPicker from 'react-native-dropdown-picker';
import { WebView } from 'react-native-webview';

class About extends React.Component {
    state={
     
    }
    handleButtonPress(item) {
        this.props.navigation.push('Browser', { item })
    }
  render() {
      const {loader}=this.state;
    return (
      <View style={{flex: 1,backgroundColor:"white",justifyContent:'flex-start'}}>
         {loader ? <View style={{position:"absolute",zIndex:99,justifyContent:'center',top:0,bottom:0,right:0,left:0,backgroundColor:'rgba(0,0,0,0.5)'}}>
              <ActivityIndicator size="large" color="black"  />
              </View>:null 
         }
         <Header pageName="About Us" logoutvisible navigation={this.props.navigation} />
        
         <ScrollView contentContainerStyle={{marginBottom:300,padding:8}}> 
                <Image source={{uri:'https://images.unsplash.com/photo-1560252829-804f1aedf1be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8Mnw0ODg0NDA0fHxlbnwwfHx8fA%3D%3D&w=1000&q=80'}} style={{width:'100%',height:'55%',borderRadius:4}} />
                <Text style={{fontSize:12,textAlign:'center',marginTop:10}}>Every human being wants to be a part of the development of the society, nature and contribute in disaster relief. This charity app brings users towards fulfillment of that purpose. This charity application is fully categorized with all types of charitable acts i.e. animal charity, environment charity, disaster relief charity etc. Users who donate to charity can get all information regarding specific charity type. This app provides an overview of various charity aid foundations. The users of this charity app can check the result of their charity to determine further charity aids and also can check the result of all the organizations' charity. One can also pay online to raise money for charity with higher safety & security as compared to other charity apps.</Text>
                <TouchableOpacity onPress={()=>this.props.navigation.push('CreatePost')} style={{ marginTop:20,borderRadius: 30, padding: 10, width: '100%', alignSelf: 'center', backgroundColor: '#A3D343' }}>
                    <Text style={{textAlign:'center',color:"white" ,fontWeight:'600'}}>Want to Donate?</Text>
               </TouchableOpacity>
               <TouchableOpacity onPress={() => this.handleButtonPress("https://www.npmjs.com/package/react-native-webview")} style={{ marginTop:20,borderRadius: 30, padding: 10, width: '100%', alignSelf: 'center', backgroundColor: '#A3D343' }}>
                    <Text style={{textAlign:'center',color:"white" ,fontWeight:'600'}}>Learn Blog</Text>
               </TouchableOpacity>
          
           
         </ScrollView>
     </View>
    );
  }
}

 
export default About;