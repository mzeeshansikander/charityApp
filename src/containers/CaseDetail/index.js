import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator, AsyncStorage, ScrollView } from 'react-native';
import Header from '../../components/HeaderCustom';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


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
       if (!newamount) return alert('Please enter New Amount')
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
                <Header logoutvisible navigation={this.props.navigation} />
                <View style={{ padding: 20 }}>
                    <ScrollView>
                        <TouchableOpacity style={{ padding: 20, marginTop: 10, borderWidth: 1, borderColor: 'gray', borderRadius: 20 }}>
                            {/* <Text>Name:{currentcaseupdateData.username}</Text> */}
                            <Text>Phone Number:{currentcaseupdateData.phonenumber}</Text>
                            <Text>Blood Group:{currentcaseupdateData.bgroup}</Text>
                            <Text>Total Amount:{currentcaseupdateData.total_amount}</Text>
                            <Text>Quality:{currentcaseupdateData.quality}</Text>
                            <Text>Amount Arranged:{currentcaseupdateData.amountArrange==''? '0': currentcaseupdateData.amountArrange}</Text>
                        </TouchableOpacity>
                           <View>
                             <TextInput value={newamount} onChangeText={(newamount)=>this.setState({newamount})}  placeholder="Enter Your Amount" style={{marginTop:10,padding:10,borderColor:'gray',borderWidth:1}} />
                           </View>
                         
                        
                        <TouchableOpacity onPress={()=>this.help()} style={{marginTop:10,borderRadius:30,padding:10,width:'100%',alignSelf:'center',backgroundColor:'#33CAFF'}}>
                            <Text style={{textAlign:'center'}}>Help</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>
        );
    }
}


export default CaseDetail;