import React from 'react';
import {View,Text, Image, TextInput,TouchableOpacity,ActivityIndicator,ScrollView,AsyncStorage} from 'react-native';
import Header from '../../components/HeaderCustom';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import DropDownPicker from 'react-native-dropdown-picker';

class EditProfile extends React.Component {
    state = {
        email: '',
        fname: 'Maheen',
        lname: 'Riaz',
        loader: false,
        mobile:'03323475755',
        uid: '',
        role: '',
        newid: '',
        userDetails:[]
      }
      componentDidMount=async()=>{
        let user = await AsyncStorage.getItem('user_info');
        user=JSON.parse(user)
        const  User = user ? user :{} 
        this.setState({uid:User.uid})
       // getting user detail
        firestore().collection("users").doc(User.uid)
        .onSnapshot((doc) => {
            this.setState({userDetails:doc.data()})
            this.setState({email:doc.data().email})
            this.setState({fname:doc.data().fname})
            this.setState({lname:doc.data().lname})
            this.setState({mobile:doc.data().mobile_num})
        });
      }
      edit=()=>{
          const {uid,email,fname,lname,mobile}=this.state;
       // getting all the post
       this.setState({loader:true})
        firestore().collection("users").doc(uid).set({
            email,
            fname,
            lname,
            mobile
        },{merge:true})
        .then(() => {
            this.setState({loader:false})
            alert("Profile Updated!!")
        })
        .catch((error) => {
            alert(error.message)
        });
      }
  render() {
      const {loader,email,fname,lname,mobile,userDetails}=this.state;
      console.log(userDetails,"thi is user detailssss")
    return (
      <View style={{flex: 1,backgroundColor:"white",justifyContent:'flex-start'}}>
         {loader ? <View style={{position:"absolute",zIndex:99,justifyContent:'center',top:0,bottom:0,right:0,left:0,backgroundColor:'rgba(0,0,0,0.5)'}}>
              <ActivityIndicator size="large" color="black"  />
              </View>:null 
         }
         <Header back pageName="Edit Profile" logoutvisible navigation={this.props.navigation} />
         <ScrollView contentContainerStyle={{textAlign:'center'}}> 
            <Image source={{ uri: 'https://www.w3schools.com/howto/img_avatar2.png' }} style={{ width: 140, height: 140, borderRadius: 80, alignSelf: 'center' }} />
            <TextInput value={email} onChangeText={(email) => this.setState({ email })}  style={{ marginTop: 40, padding: 10, borderColor: 'gray', borderWidth: 1,borderRadius:5,width:'86%',alignSelf:'center' }} />
            <TextInput value={fname} onChangeText={(fname) => this.setState({ fname })}  style={{ marginTop: 10, padding: 10, borderColor: 'gray', borderWidth: 1 ,borderRadius:5,width:'86%',alignSelf:'center' }} />
            <TextInput value={lname} onChangeText={(lname) => this.setState({ lname })}  style={{ marginTop: 10, padding: 10, borderColor: 'gray', borderWidth: 1 ,borderRadius:5,width:'86%',alignSelf:'center' }} />
            <TextInput value={mobile} onChangeText={(mobile) => this.setState({ mobile })}  style={{ marginTop: 10, padding: 10, borderColor: 'gray', borderWidth: 1 ,borderRadius:5,width:'86%',alignSelf:'center' }} />
            <TouchableOpacity onPress={this.edit} style={{ marginTop: 10, borderRadius: 5, padding: 10, width: '86%', alignSelf: 'center', backgroundColor: '#A3D343' }}>
                <Text style={{ textAlign: 'center',color:"white" }}>Edit Profile</Text>
            </TouchableOpacity>
         </ScrollView>
     </View>
    );
  }
}

 
export default EditProfile;