import React from 'react';
import {View,Text, Image, TextInput,TouchableOpacity,ActivityIndicator,AsyncStorage,ScrollView,FlatList} from 'react-native';
import Header from '../../components/HeaderCustom';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


class Dashboard extends React.Component {
  state={
    username:'',
    alldata:[],
    count:2
  }
  componentDidMount=async()=>{
   this.getCases();
  }
  getCases=async()=>{
    const {count}=this.state;
    console.log(count,'this is count')
    let user = await AsyncStorage.getItem('user_info');
    user=JSON.parse(user)
    const  User = user ? user :{} 
    this.setState({username:User.fname});
    // console.log(User,'dashboard');
    //getting all approved cases
    firestore().collection("createPost").where("approve", "==", "true")
    // .orderBy('amountArrange')
    .limit(this.state.count)
    .onSnapshot((querySnapshot) => {
        var usercases = [];
        querySnapshot.forEach((doc) => {
            usercases.push(doc.data());
            // console.log("hello world",doc.data())
         });
        this.setState({alldata:usercases})
    });
  }
  incrementCount=()=>{
    this.setState({count:this.state.count+2})
    this.getCases();
  }
  render() {
    const {username,alldata,count}=this.state;
    return (
      <View style={{flex: 1,backgroundColor:"white",justifyContent:'flex-start'}}>
          <Header logoutvisible navigation={this.props.navigation} />
          <View style={{padding:20,flex:1}}>
             <Text>Hello {username}</Text>
             <TouchableOpacity onPress={()=>this.props.navigation.navigate("CreatePost")} style={{marginTop:10,borderRadius:30,padding:10,width:'100%',alignSelf:'center',backgroundColor:'#33CAFF'}}>
                <Text style={{textAlign:'center'}}>Create Post</Text>
            </TouchableOpacity>
            <FlatList 
                data={alldata}
                // style={{marginBottom:120}}
                showsVerticalScrollIndicator={false}
                renderItem={({item})=>{
                  return(
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate("CaseDetail",{item})} style={{padding:20,marginTop:10,borderWidth:1,borderColor:'gray',borderRadius:20}}>
                      <Text>Name:{item.username}</Text>
                      <Text>Phone Number:{item.phonenumber}</Text>
                      <Text>Blood Group:{item.bgroup}</Text>
                      <Text>Total Amount:{item.total_amount}</Text>
                      <Text>Quality:{item.quality}</Text>
                      <Text>Amount Arranged:{item.amountArrange==''? '0': item.amountArrange}</Text>
                  </TouchableOpacity> 
                  );
                }}
                  />
            {/* {
              alldata.map((data,index)=>{   
                // console.log(data.total_amount,"jjfjjfjf"); 
                 return(
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate("CaseDetail",{data})} style={{padding:20,marginTop:10,borderWidth:1,borderColor:'gray',borderRadius:20}}>
                         <Text>Name:{data.username}</Text>
                         <Text>Phone Number:{data.phonenumber}</Text>
                         <Text>Blood Group:{data.bgroup}</Text>
                         <Text>Total Amount:{data.total_amount}</Text>
                         <Text>Quality:{data.quality}</Text>
                         <Text>Amount Arranged:{data.amountArrange==''? '0': data.amountArrange}</Text>
                     </TouchableOpacity> 
                  )
              })
             } */}
             <TouchableOpacity   onPress={this.incrementCount}>
                <Text style={{paddingTop:10,fontSize:27}}>Load more..</Text>
             </TouchableOpacity>
            
          </View>
      </View>
    );
  }
}

 
export default Dashboard;