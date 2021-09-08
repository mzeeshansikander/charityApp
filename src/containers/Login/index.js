import React from 'react';
import {View,Text, Image, TextInput,TouchableOpacity,ActivityIndicator,AsyncStorage} from 'react-native';
import Header from '../../components/HeaderCustom';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

class Login extends React.Component {
  state={
    email:'',
    password:'',
    loader:false
  }
  componentDidMount=()=>{
    AsyncStorage.getItem('user_info').then((data) => {
      if(data || data != null){
        const data1=JSON.parse(data);
       
        if(data1.identity=="User"){
          this.props.navigation.navigate("Dashboard")
        }
        else{
          this.props.navigation.navigate("AdminView")
        }
       }
      else{
          this.props.navigation.navigate("Login")
      }
      });
  }
 login=()=>{
   const {email,password}=this.state;
   this.setState({loader:true})
  auth().signInWithEmailAndPassword(email, password)
  .then(({user:{uid}})=>{
     firestore().collection("users").doc(uid).get()
      .then((doc) => {
        const data = doc.data()
        if(data){
        console.log(doc.data(),'login data')
        this.setState({loader:false})
        const data = JSON.stringify(doc.data())
        console.log(data,"stringify data")
        AsyncStorage.setItem('user_info',data)
        console.log(doc.data().identity)
        if(doc.data().identity === "User"){
          this.props.navigation.navigate("Dashboard")     
        }
        else this.props.navigation.navigate("AdminView")  
        }
        else alert("You're not signed up as a User!")
      })
      .catch((err)=>{
        this.setState({loader:false})
        alert(err.message)
    })
 }) 
.catch((err)=>{
  alert(err.message)
  this.setState({loader:false})
})
 }
  render() {
    const {email,password,loader}=this.state;
    return (
      <View style={{flex: 1,backgroundColor:"white",justifyContent:'flex-start'}}>
         {loader ? <View style={{position:"absolute",zIndex:99,justifyContent:'center',top:0,bottom:0,right:0,left:0,backgroundColor:'rgba(0,0,0,0.5)'}}>
              <ActivityIndicator size="large" color="black"  />
              </View>:null 
         }
          <Header />
          <View style={{padding:20}}>
           <Text style={{fontSize:20,fontWeight:'700'}}>L O G I N</Text>
            <Text style={{marginTop:10}}>Please fill the form</Text>
            <TextInput value={email} onChangeText={(email)=>this.setState({email})}  placeholder="Email" style={{marginTop:10,padding:10,borderColor:'gray',borderWidth:1}} />
            <TextInput value={password} onChangeText={(password)=>this.setState({password})}  placeholder="Password" style={{marginTop:10,padding:10,borderColor:'gray',borderWidth:1}} />
           <TouchableOpacity onPress={this.login} style={{marginTop:10,borderRadius:30,padding:10,width:'100%',alignSelf:'center',backgroundColor:'#33CAFF'}}>
                <Text style={{textAlign:'center'}}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('Signup')} style={{marginTop:10,borderRadius:30,padding:10,width:'100%',alignSelf:'center',backgroundColor:'#33CAFF'}}>
                <Text style={{textAlign:'center'}}>SIGNUP</Text>
            </TouchableOpacity>
         </View>
      </View>
    );
  }
}

 
export default Login;