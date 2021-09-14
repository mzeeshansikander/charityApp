import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator, AsyncStorage, ScrollView } from 'react-native';
import Header from '../../components/HeaderCustom';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {  Card } from 'native-base';

class CaseDetail extends React.Component {
    state = {
        username: '',
        alldata: this.props.navigation.getParam('item'),
        newamount:'',
        visible:true,
        currentcaseupdateData:[]
    }
    componentDidMount = () => {
        const { navigation } = this.props;
        const { alldata,newamount } = this.state;  
        const {id}=alldata
        console.log(alldata,'alll')
        firestore().collection("createPost").doc(id)
        .onSnapshot((doc) => {
            this.setState({currentcaseupdateData:doc.data()})
        });
 
    }
    help=()=>{
       const {alldata,newamount}=this.state;
       if (!newamount) return alert('Please enter Donation Amount')
       const {uid,id,username}=alldata;
       console.log(uid,id,username)
       const ref = firestore().collection("createPost").doc(id).collection("helpuser").doc()
       const helperdocid = ref.id;     
       ref.set({
         helperdocid,
         uid,
         username,
         newamount
       })
       .then(() => {
           alert(`Thankyou! You have donated ${newamount} rupees`)
           const newAmount= parseInt(newamount);
           //    console.log(typeof(newAmount))
           firestore().collection("createPost").doc(id).set({"amountArrange":firestore.FieldValue.increment(newAmount)},{merge:true});
       })
       .catch((err) => {
         console.log(err.message)
       })
       //getting old amount
    //    var updatedAmount= alldata.price - newamount;
    //    console.log(updatedAmount,'updated amount');
    //    firestore().collection("createPost").doc(id).set({"price":updatedAmount},{merge:true});

    }
    render() {
        const { alldata,newamount,visible ,currentcaseupdateData} = this.state;
        return (
            <View style={{ flex: 1, backgroundColor: "white", justifyContent: 'flex-start' }}>
                <Header back pageName="Case Details" logoutvisible navigation={this.props.navigation} />
                <Card style={{ padding: 10}}>
                    <ScrollView>
                        <TouchableOpacity style={{borderRadius: 20 }}>
                            <Image source={{uri:currentcaseupdateData.image}} style={{width:'100%',height:150}} />
                            <Text style={{fontSize:15,marginTop:12,fontWeight:'500'}}>Contact Details:{currentcaseupdateData.phonenumber}</Text>
                            <Text style={{fontSize:15,fontWeight:'500'}}>Blood Group Required:{currentcaseupdateData.bgroup}</Text>
                            <Text style={{fontSize:15,fontWeight:'500'}}>Total Amount Required:{currentcaseupdateData.total_amount}</Text>
                            <Text style={{fontSize:15,fontWeight:'500'}}>Quality:{currentcaseupdateData.quality}</Text>
                            <Text style={{fontSize:15,fontWeight:'500'}}>Amount Arranged:{currentcaseupdateData.amountArrange==''? '0': currentcaseupdateData.amountArrange}</Text>
                        </TouchableOpacity>
                         <TextInput value={newamount} onChangeText={(newamount)=>this.setState({newamount})}  placeholder="Enter the Amount you want to donate" style={{marginTop:10,padding:10,borderColor:'gray',borderWidth:1}} />
                         
                         
                        
                        <TouchableOpacity onPress={()=>this.help()} style={{marginTop:10,borderRadius:30,padding:10,width:'100%',alignSelf:'center',backgroundColor:'#A3D343'}}>
                            <Text style={{textAlign:'center',color:'white',fontWeight:'700'}}>Donate</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </Card>
            </View>
        );
    }
}


export default CaseDetail;