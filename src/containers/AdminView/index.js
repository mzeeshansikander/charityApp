import React from 'react';
import {View,Text, Image, TextInput,TouchableOpacity,ActivityIndicator,AsyncStorage,ScrollView} from 'react-native';
import Header from '../../components/HeaderCustom';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


class AdminView extends React.Component {
  state={
    username:'',
    alldata:[],
    uid:'',
  }
  componentDidMount=async()=>{
    let user = await AsyncStorage.getItem('user_info');
    user=JSON.parse(user)
   const  User = user ? user :{} 
   this.setState({username:User.fname});
   this.setState({uid:User.uid});
   console.log(User,'dashboard');
   firestore().collection("createPost").where("approve", "==", "false")
   .onSnapshot((querySnapshot) => {
       var cities = [];
       querySnapshot.forEach((doc) => {
           cities.push(doc.data());
           console.log("hello world",doc.data())
        });
       this.setState({alldata:cities})
   });
}
approve=(id)=>{
    console.log(id)
    firestore().collection("createPost").doc(id) 
    .set({
      approve: "true"
  }, { merge: true });
}
decline=(id)=>{
  firestore().collection("createPost").doc(id).delete().then(() => {
    console.log("Document successfully deleted!");
}).catch((error) => {
    console.error("Error removing document: ", error);
});
}
  render() {
    const {username,alldata}=this.state;
    console.log(alldata)
    return (
      <View style={{flex: 1,backgroundColor:"white",justifyContent:'flex-start'}}>
          <Header logoutvisible navigation={this.props.navigation} />
          <View style={{padding:20}}>
             <Text>Hello {username}</Text>
             <Text>This is Admin Dashboard</Text>
             <Text>All Cases</Text>
             <ScrollView>
             {
              alldata.map((data,index)=>{   
                console.log(data,"jjfjjfjf")   
                 return(
                    <View style={{padding:20,marginTop:10,borderWidth:1,borderColor:'gray',borderRadius:20}}>
                         <Text>Name:{data.username}</Text>
                         <Text>Phone Number:{data.phonenumber}</Text>
                         <Text>Blood Group:{data.bgroup}</Text>
                         <Text>Price:{data.price}</Text>
                         <Text>Quality:{data.quality}</Text>
                             <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
                                 <TouchableOpacity style={{backgroundColor:'green',padding:10,borderRadius:6}} onPress={()=>this.approve(data.id)}>
                                      <Text style={{color:'white'}}>Approve</Text>
                                 </TouchableOpacity>
                                 <TouchableOpacity style={{backgroundColor:'red',padding:10,borderRadius:6,marginLeft:10}} onPress={()=>this.decline(data.id)}  >
                                      <Text style={{color:'white'}}>Decline</Text>
                                 </TouchableOpacity>
                             </View>
                     </View> 
                  )
              })
             }
             </ScrollView>
           
             {/* <TouchableOpacity onPress={()=>this.props.navigation.navigate("CreatePost")} style={{marginTop:10,borderRadius:30,padding:10,width:'100%',alignSelf:'center',backgroundColor:'#33CAFF'}}>
               <Text style={{textAlign:'center'}}>Admin Dashboard</Text>     
            </TouchableOpacity> */}
          </View>
      </View>
    );
  }
}

 
export default AdminView;