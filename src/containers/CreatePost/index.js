import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator, AsyncStorage, ScrollView } from 'react-native';
import Header from '../../components/HeaderCustom';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';

class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      phonenumber: "",
      bgroup: '',
      quality: '',
      price: '',
      description: '',
      uid: '',
      id: '', //documentid
      approve: 'false',
      image: "",
      amountArrange:'',
      loader:false
    }
}
  componentDidMount = async () => {
    const { username, phonenumber, bgroup, quality, price, uid, approve } = this.state;
    let user = await AsyncStorage.getItem('user_info');
    user = JSON.parse(user)
    const User = user ? user : {}
    this.setState({ username: User.fname });
    this.setState({ phonenumber: User.mobile_num });
    this.setState({ uid: User.uid });
  
  }
  createPost = () => {
    const { username, phonenumber, bgroup, quality, price, uid, approve, image,amountArrange ,description} = this.state;
    if (!username) return alert('Please enter your Username')
    else if (!phonenumber) return alert('Please enter your Phone Number')
    else if (!bgroup) return alert('Please enter your Blood Group')
    else if (!quality) return alert('Please enter the Quality')
    else if (!price) return alert('Please enter the Price')
    else if (!image) return alert('Please select Image')
    else if (!description) return alert('Please select Image')
    this.setState({loader:true})
    const ref = firestore().collection("createPost").doc()
    const id = ref.id;
    this.setState({ id })
    var details={
        username,
        phonenumber,
        bgroup,
        quality,
        total_amount:price,
        approve,
        uid,
        image,
        amountArrange,
        description,
        id    
    }
    console.log(details,'this is detail')
    ref.set(details)
      .then((docRef) => {
        this.setState({loader:false})
        console.log("addedd")
        alert("Post Added!!")
        this.props.navigation.navigate("Dashboard");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }
  choosePhoto = () => {
    console.log("choose phot function called");
    this.setState({loader:true})
    const { id } = this.state;
    console.log(id,'this is id')
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      // console.log(new Date('October 15, 1996 05:35:32').getTime());
      // this.setState({ image: image.path })
      let reference = storage().ref(`images/${new Date('October 15, 1996 05:35:32').getTime()}/${image.filename}`);         // 2
      let task = reference.putFile(image.path);
      console.log(task);
      task.then(async() => {
        const fileurl =  reference.getDownloadURL();
     const data=   await fileurl.then((data) => {
          console.log(data,'this is data' )
          this.setState({loader:false})
         return data 
        })
        .catch((err) => {
          this.setState({loader:false})
          console.log(err.message)
        })
        this.setState({ image: data })
         
      })
      .catch((err) => {
          this.setState({loader:false})
          console.log(err.message);
      })
    });
  }
  removePhoto = () => {
    this.setState({image: ""})
    console.log(this.state.image,"img")
  }
  render() {
    console.log("image state",this.state.image);
    const { username, phonenumber, bgroup, quality, price, description, image,loader } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: "white", justifyContent: 'flex-start' }}>
       {loader ? <View style={{ position: "absolute", zIndex: 99, justifyContent: 'center', top: 0, bottom: 0, right: 0, left: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <ActivityIndicator size="large" color="black" />
        </View> : null
        }
        <Header back pageName="Donate" logoutvisible navigation={this.props.navigation} />
        <ScrollView>
          <View style={{ padding: 20 }}>
            <Text style={{ marginTop: 10,fontSize:18,fontWeight:'500' }}>Enter the Case Details!</Text>
            <TextInput value={username} onChangeText={(username) => this.setState({ username })} placeholder="Username" style={{ marginTop: 10, padding: 10, borderColor: 'gray', borderWidth: 1 }} />
            <TextInput value={phonenumber} onChangeText={(phonenumber) => this.setState({ phonenumber })} placeholder="Phone Number" style={{ marginTop: 10, padding: 10, borderColor: 'gray', borderWidth: 1 }} />
            <TextInput value={bgroup} onChangeText={(bgroup) => this.setState({ bgroup })} placeholder="Blood Group" style={{ marginTop: 10, padding: 10, borderColor: 'gray', borderWidth: 1 }} />
            <TextInput value={quality} onChangeText={(quality) => this.setState({ quality })} placeholder="Quality" style={{ marginTop: 10, padding: 10, borderColor: 'gray', borderWidth: 1 }} />
            <TextInput value={price} onChangeText={(price) => this.setState({ price })} placeholder="Price" style={{ marginTop: 10, padding: 10, borderColor: 'gray', borderWidth: 1 }} />
            <TextInput value={description} multiline={true} onChangeText={(description) => this.setState({ description })} placeholder="Description" style={{ marginTop: 10, padding: 10, borderColor: 'gray', borderWidth: 1, height: 80 }} />
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={this.choosePhoto} style={{ marginTop: 20, borderWidth: 1, padding: 10, width: '50%', borderRadius: 3 ,borderColor:'#A3D343'}}>
                <Text style={{ textAlign: 'center' }}>Choose Photo</Text>
              </TouchableOpacity>
              {this.state.image ?
                <Image source={{  uri:image}} style={{ width: '40%', height: '80%', marginTop: 20, padding: 10, marginLeft: 20, borderRadius: 4 }} />
                : null
              }
              
            </View>
            {
              this.state.image ?
                  <TouchableOpacity onPress={()=>this.removePhoto()} style={{ marginTop: 20, padding: 10 }}>
                  <Text>Remove photo</Text>
                </TouchableOpacity>
            : null
            }
        
            <TouchableOpacity onPress={()=>this.createPost()} style={{ marginTop: 10, borderRadius: 30, padding: 10, width: '100%', alignSelf: 'center', backgroundColor: '#A3D343' }}>
              <Text style={{ textAlign: 'center' }}>POST</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}


export default CreatePost;