import React from 'react';
import {View,Text, Image, TextInput,TouchableOpacity,ActivityIndicator,AsyncStorage,ScrollView} from 'react-native';
import Header from '../../components/HeaderCustom';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


class Dashboard extends React.Component {
  state={
    username:'',
    alldata:[],
  }
  componentDidMount=async()=>{
    let user = await AsyncStorage.getItem('user_info');
    user=JSON.parse(user)
    const  User = user ? user :{} 
    this.setState({username:User.fname});
    console.log(User,'dashboard');
    //getting all approved cases
    firestore().collection("createPost").where("approve", "==", "true")
    .onSnapshot((querySnapshot) => {
        var usercases = [];
        querySnapshot.forEach((doc) => {
            usercases.push(doc.data());
            console.log("hello world",doc.data())
         });
        this.setState({alldata:usercases})
    });
  }
  render() {
    const {username,alldata}=this.state;
    return (
      <View style={{flex: 1,backgroundColor:"white",justifyContent:'flex-start'}}>
          <Header logoutvisible navigation={this.props.navigation} />
          <View style={{padding:20}}>
             <Text>Hello {username}</Text>
             <TouchableOpacity onPress={()=>this.props.navigation.navigate("CreatePost")} style={{marginTop:10,borderRadius:30,padding:10,width:'100%',alignSelf:'center',backgroundColor:'#33CAFF'}}>
                <Text style={{textAlign:'center'}}>Create Post</Text>
            </TouchableOpacity>
            <ScrollView>
            {
              alldata.map((data,index)=>{   
                console.log(data,"jjfjjfjf"); 
                 return(
                    <View style={{padding:20,marginTop:10,borderWidth:1,borderColor:'gray',borderRadius:20}}>
                         <Text>Name:{data.username}</Text>
                         <Text>Phone Number:{data.phonenumber}</Text>
                         <Text>Blood Group:{data.bgroup}</Text>
                         <Text>Price:{data.price}</Text>
                         <Text>Quality:{data.quality}</Text>
                     </View> 
                  )
              })
             }
             </ScrollView>
          </View>
      </View>
    );
  }
}

 
export default Dashboard;