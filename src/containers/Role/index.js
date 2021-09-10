import React from 'react';
import {View,Text, Image, TextInput,TouchableOpacity,ActivityIndicator,AsyncStorage} from 'react-native';
import Header from '../../components/HeaderCustom';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

class Role extends React.Component {
  state={
   role:'',
    loader:false,
    docid:'',
    userData:[]
  }
  componentDidMount=()=>{
    const data= this.props.navigation.getParam("data");
    console.log(data,'this is getparams')
    this.setState({userData:data})
  }

role=()=>{
    const {userData,role}=this.state;
    firestore().collection("users").doc(userData.uid).set({
        role
      },{merge:true}).then((doc)=>{
        firestore().collection("users").doc(userData.uid).get()
        .then((doc) => {
          const {email,displayName,uid,role}=doc.data();
          const data={
            email,
            displayName,
            uid,
            role
          }
          console.log(data,'role page data')
          if(data.role == "Admin"){
            this.props.navigation.navigate("AdminView");
          }
          else{
            this.props.navigation.navigate("Dashboard");
          }

        })

      })
      .catch((err)=>{
        console.log(err.message)
      })
}
  render() {
    const {email,password,loader,role}=this.state;
    return (
      <View style={{flex: 1,backgroundColor:"white",justifyContent:'flex-start'}}>
         {loader ? <View style={{position:"absolute",zIndex:99,justifyContent:'center',top:0,bottom:0,right:0,left:0,backgroundColor:'rgba(0,0,0,0.5)'}}>
              <ActivityIndicator size="large" color="black"  />
              </View>:null 
         }
          <Header />
          <View style={{padding:20}}>
           <Text style={{fontSize:20,fontWeight:'700'}}>L O G I N</Text>
            <Text style={{marginTop:10}}>Please enter your role</Text>
            <TextInput value={role} onChangeText={(role)=>this.setState({role})}  placeholder="Who are you" style={{marginTop:10,padding:10,borderColor:'gray',borderWidth:1}} />
           <TouchableOpacity onPress={this.role} style={{marginTop:10,borderRadius:30,padding:10,width:'100%',alignSelf:'center',backgroundColor:'#33CAFF'}}>
                <Text style={{textAlign:'center'}}>LOGIN</Text>
            </TouchableOpacity>

         </View>
      </View>
    );
  }
}

 
export default Role;