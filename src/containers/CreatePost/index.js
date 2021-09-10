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
      amountArrange:''
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
    console.log(User, 'create post page');
  }
  createPost = () => {
    const { username, phonenumber, bgroup, quality, price, uid, approve, image,amountArrange } = this.state;
    if (!username) return alert('Please enter your Username')
    else if (!phonenumber) return alert('Please enter your Phone Number')
    else if (!bgroup) return alert('Please enter your Blood Group')
    else if (!quality) return alert('Please enter the Quality')
    else if (!price) return alert('Please enter the Price')
    else if (!image) return alert('Please select Image')
    const ref = firestore().collection("createPost").doc()
    const id = ref.id;
    this.setState({ id })
    ref.set({
      username,
      phonenumber,
      bgroup,
      quality,
      total_amount:price,
      approve,
      uid,
      image,
      amountArrange,
      id
    })
      .then((docRef) => {
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
    const { id } = this.state;
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      console.log(image);
      this.setState({ image: image.path })
      let reference = storage().ref(image.filename);         // 2
      let task = reference.putFile(image.path);
      console.log(task);
      task.then(() => {
        const fileurl = reference.getDownloadURL();
        fileurl.then((data) => {
          this.setState({ image: data })
        })
          .catch((err) => {
            console.log(err.message)
          })
      })
      .catch((err) => {
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
    const { username, phonenumber, bgroup, quality, price, description, image } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: "white", justifyContent: 'flex-start' }}>
        <Header navigation={this.props.navigation} />
        <ScrollView>
          <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: '700' }}>C R E A T E P O S T</Text>
            <Text style={{ marginTop: 10 }}>Enter the Case Details</Text>
            <TextInput value={username} onChangeText={(username) => this.setState({ username })} placeholder="Username" style={{ marginTop: 10, padding: 10, borderColor: 'gray', borderWidth: 1 }} />
            <TextInput value={phonenumber} onChangeText={(phonenumber) => this.setState({ phonenumber })} placeholder="Phone Number" style={{ marginTop: 10, padding: 10, borderColor: 'gray', borderWidth: 1 }} />
            <TextInput value={bgroup} onChangeText={(bgroup) => this.setState({ bgroup })} placeholder="Blood Group" style={{ marginTop: 10, padding: 10, borderColor: 'gray', borderWidth: 1 }} />
            <TextInput value={quality} onChangeText={(quality) => this.setState({ quality })} placeholder="Quality" style={{ marginTop: 10, padding: 10, borderColor: 'gray', borderWidth: 1 }} />
            <TextInput value={price} onChangeText={(price) => this.setState({ price })} placeholder="Price" style={{ marginTop: 10, padding: 10, borderColor: 'gray', borderWidth: 1 }} />
            <TextInput value={description} multiline={true} onChangeText={(description) => this.setState({ description })} placeholder="Description" style={{ marginTop: 10, padding: 10, borderColor: 'gray', borderWidth: 1, height: 80 }} />
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={this.choosePhoto} style={{ marginTop: 20, borderWidth: 1, padding: 10, width: '50%', borderRadius: 3 }}>
                <Text style={{ textAlign: 'center' }}>Choose Photo</Text>
              </TouchableOpacity>
              {this.state.image ?
                <Image source={{  uri:image}} style={{ width: '40%', height: '80%', marginTop: 20, padding: 10, marginLeft: 20, borderRadius: 4 }} />
                : null
              }
              
            </View>
            <TouchableOpacity onPress={()=>this.removePhoto()} style={{ marginTop: 20, padding: 10 }}>
              <Text>Remove photo</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.createPost()} style={{ marginTop: 10, borderRadius: 30, padding: 10, width: '100%', alignSelf: 'center', backgroundColor: '#33CAFF' }}>
              <Text style={{ textAlign: 'center' }}>POST</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}


export default CreatePost;