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
         if (!fname) return alert('Please enter your First Name')
         else if (!lname) return alert('Please enter your Last Name')
        else if (!email) return alert('Please enter your Email.')
        else if (!password && password.length > 5) return alert('Please enter your Password')
        else if (!c_passowrd && password.length > 5) return alert('Please enter your Confirm Password')
        else if(password !== c_passowrd)return alert("Passwords doesn't match")
        else if (!mobile_num) return alert('Please enter your Mobile number')
        else if (!identity) return alert('Please enter your identity')
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
              this.props.navigation.navigate("Login")
            })
            .catch((err) => {
              this.setState({loader:false})
              console.log(err.message)
           })
        })
        .catch((error) => {
          this.setState({loader:false})
          alert(error.message);
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
          <View style={{padding:20}}>
            <Text style={{ fontSize: 28, fontWeight: '700',textAlign:'center',marginTop:60,color:'#A3D343' }}>S I G N U P</Text>
            <TextInput value={fname} onChangeText={(fname)=>this.setState({fname})} placeholder="First Name" style={{marginTop:10,borderRadius:30,padding:10,borderColor:'gray',borderWidth:1}} />
            <TextInput value={lname} onChangeText={(lname)=>this.setState({lname})} placeholder="Last Name" style={{marginTop:10,borderRadius:30,padding:10,borderColor:'gray',borderWidth:1}} />
            <TextInput value={email} onChangeText={(email)=>this.setState({email})} placeholder="Email" style={{marginTop:10,borderRadius:30,padding:10,borderColor:'gray',borderWidth:1}} />
            <TextInput value={password} onChangeText={(password)=>this.setState({password})} placeholder="Enter Password" style={{marginTop:10,borderRadius:30,padding:10,borderColor:'gray',borderWidth:1}} />
            <TextInput value={c_passowrd} onChangeText={(c_passowrd)=>this.setState({c_passowrd})} placeholder="Confirm Password" style={{marginTop:10,borderRadius:30,padding:10,borderColor:'gray',borderWidth:1}} />
            <TextInput value={mobile_num} onChangeText={(mobile_num)=>this.setState({mobile_num})}  placeholder="Mobile Number" style={{marginTop:10,borderRadius:30,padding:10,borderColor:'gray',borderWidth:1}} />                
            <TextInput value={identity} onChangeText={(identity)=>this.setState({identity})} placeholder="Who are you" style={{marginTop:10,borderRadius:30,padding:10,borderColor:'gray',borderWidth:1}} />
           
           <TouchableOpacity onPress={this.register} style={{ marginTop: 10, borderRadius: 30, padding: 10, width: '100%', alignSelf: 'center', backgroundColor: '#A3D343' }}>
                <Text style={{textAlign:'center',color:"white" ,fontWeight:'600'}}>REGISTER</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('Login')} style={{ marginTop: 10, borderRadius: 30, padding: 10, width: '100%', alignSelf: 'center', backgroundColor: '#A3D343' }}>
                <Text style={{textAlign:'center',color:"white" ,fontWeight:'600'}}>LOGIN</Text>
            </TouchableOpacity>
         </View>
      </View>
    );
  }
}

 
export default Signup;