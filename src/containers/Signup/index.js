import React from 'react';
import {View,Text, Image, TextInput,TouchableOpacity,ActivityIndicator} from 'react-native';
import Header from '../../components/HeaderCustom';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import DropDownPicker from 'react-native-dropdown-picker';

class Signup extends React.Component {
    state={
        fname:'',
        lname:'',
        email:'',
        password:'',
        c_passowrd:'',
        mobile_num:'',
        loader:false,
        identity:''
    }
    register=()=>{
        const {fname,lname,password,c_passowrd,mobile_num,email,identity}=this.state;
        this.setState({loader:true})
        auth().createUserWithEmailAndPassword(email, password)
        .then(({ user: { uid } }) => {
          const details = {
            fname,
            lname,
            email,
            password,
            c_passowrd,
            mobile_num
            ,uid,
            identity
          }
          firestore().collection("users").doc(uid)
            .set({
              ...details
            })
            .then(() => {
              this.setState({loader:false})
              this.props.navigation.navigate("login")
            })
            .catch((err) => {
              this.setState({loader:false})
              console.log(err.message)
           })
        })
        .catch((error) => {
          this.setState({loader:false})
         console.log(error.message);
          // ..
        });
    }
  render() {
      const {fname,lname,password,c_passowrd,mobile_num,email,loader,identity}=this.state;
    return (
      <View style={{flex: 1,backgroundColor:"white",justifyContent:'flex-start'}}>
         {loader ? <View style={{position:"absolute",zIndex:99,justifyContent:'center',top:0,bottom:0,right:0,left:0,backgroundColor:'rgba(0,0,0,0.5)'}}>
              <ActivityIndicator size="large" color="black"  />
              </View>:null 
         }
          <Header />
          <View style={{padding:20}}>
            <Text style={{fontSize:20,fontWeight:'700'}}>S I G N U P</Text>
            <Text style={{marginTop:10}}>Please fill the form</Text>
            <TextInput value={fname} onChangeText={(fname)=>this.setState({fname})} placeholder="First Name" style={{marginTop:10,padding:10,borderColor:'gray',borderWidth:1}} />
            <TextInput value={lname} onChangeText={(lname)=>this.setState({lname})} placeholder="Last Name" style={{marginTop:10,padding:10,borderColor:'gray',borderWidth:1}} />
            <TextInput value={email} onChangeText={(email)=>this.setState({email})} placeholder="Email" style={{marginTop:10,padding:10,borderColor:'gray',borderWidth:1}} />
            <TextInput value={password} onChangeText={(password)=>this.setState({password})} placeholder="Enter Password" style={{marginTop:10,padding:10,borderColor:'gray',borderWidth:1}} />
            <TextInput value={c_passowrd} onChangeText={(c_passowrd)=>this.setState({c_passowrd})} placeholder="Confirm Password" style={{marginTop:10,padding:10,borderColor:'gray',borderWidth:1}} />
            <TextInput value={mobile_num} onChangeText={(mobile_num)=>this.setState({mobile_num})}  placeholder="Mobile Number" style={{marginTop:10,padding:10,borderColor:'gray',borderWidth:1}} />                
            <TextInput value={identity} onChangeText={(identity)=>this.setState({identity})} placeholder="Who are you" style={{marginTop:10,padding:10,borderColor:'gray',borderWidth:1}} />
           
           <TouchableOpacity onPress={this.register} style={{marginTop:40,borderRadius:30,padding:10,width:'100%',alignSelf:'center',backgroundColor:'#33CAFF'}}>
                <Text style={{textAlign:'center'}}>REGISTER</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('Login')} style={{marginTop:10,borderRadius:30,padding:10,width:'100%',alignSelf:'center',backgroundColor:'#33CAFF'}}>
                <Text style={{textAlign:'center'}}>LOGIN</Text>
            </TouchableOpacity>
         </View>
      </View>
    );
  }
}

 
export default Signup;