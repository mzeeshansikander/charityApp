import React from 'react';
import {View,Text, Image, TextInput,TouchableOpacity,ActivityIndicator,AsyncStorage,ScrollView,FlatList} from 'react-native';
import Header from '../../components/HeaderCustom';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {  Card } from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo'

class Dashboard extends React.Component {
  state={
    username:'',
    alldata:[],
    count:1
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
    console.log(alldata,'this isn all adata')
    return (
      <View style={{flex: 1,backgroundColor:"white",justifyContent:'flex-start'}}>
          <Header showLogo logoutvisible navigation={this.props.navigation} />
          <View style={{padding:20,flex:1}}>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate("CreatePost")} style={{flexDirection:'row',marginBottom:10}}>
              <Image source={{uri:'https://www.w3schools.com/howto/img_avatar2.png'}} style={{width:40,height:40,borderRadius:20}} />
              <TextInput onTouchStart={()=>this.props.navigation.navigate("CreatePost")} placeholder="What is on your mind?" style={{width:'87%',borderWidth:1,borderColor:'#DCDCDC',borderRadius:10,padding:10,marginHorizontal:4}} />
            </TouchableOpacity>
             {/* <Text >Welcome {username}! Hope you are doing well!</Text>
             <TouchableOpacity onPress={()=>this.props.navigation.navigate("CreatePost")} style={{marginTop:10,borderRadius:30,padding:10,width:'100%',alignSelf:'center',backgroundColor:'#33CAFF'}}>
                <Text style={{textAlign:'center'}}>Create Post</Text>
            </TouchableOpacity> */}
            <FlatList 
                data={alldata}
                showsVerticalScrollIndicator={false}
                renderItem={({item})=>{
                  console.log(item,'this is item')
                  return(
                    <>
                    <Card style={{marginTop:10}}>
                      <TouchableOpacity onPress={()=>this.props.navigation.navigate("CaseDetail",{item})} style={{padding:10,borderRadius:20}}>
                        <View style={{flexDirection:'row'}}>
                          <Image source={{uri:'https://www.w3schools.com/howto/img_avatar2.png'}} style={{width:30,height:30,borderRadius:20}} />
                          <View>
                            <Text style={{fontSize:11,alignSelf:'center',padding:7,fontWeight:'500'}}>{item.username}</Text>
                          </View>
                          </View>
                          <Text style={{fontSize:11,paddingTop:20,fontWeight:'500'}}>Contact Details:{item.phonenumber}</Text>
                          <Text style={{fontSize:11,fontWeight:'500'}}>Blood Group:{item.bgroup}</Text>
                          <Text style={{fontSize:11,fontWeight:'500'}}>Total Amount:{item.total_amount}</Text>
                          <Text style={{fontSize:11,fontWeight:'500'}}>Quality:{item.quality}</Text>
                          <Text style={{fontSize:11,fontWeight:'500'}}>Amount Arranged:{item.amountArrange==''? '0': item.amountArrange}</Text> 
                          <Text style={{fontSize:11,fontWeight:'500'}}>Description:{item.description}</Text>
                       <Image source={{uri:item.image}} style={{width:'100%',height:120,marginTop:10,borderRadius:2,resizeMode:'cover'}} />
                      </TouchableOpacity> 
                  </Card>
                 
                  </>
                  );
                }}
                  />
                   <TouchableOpacity   onPress={this.incrementCount}>
                      <Text style={{paddingTop:10,fontSize:16,alignSelf:'flex-end',color:'gray'}}>Load more..</Text>
                  </TouchableOpacity>
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
              
          </View>
      </View>
    );
  }
}

 
export default Dashboard;