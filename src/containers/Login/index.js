import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator, AsyncStorage } from 'react-native';
import Header from '../../components/HeaderCustom';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk';

GoogleSignin.configure({
  scopes: ["profile", "email"],
  webClientId: '1053813154540-bmve36ql2rppcn43dgp88iue98n9kalr.apps.googleusercontent.com',
});


class Login extends React.Component {
  state = {
    email: '',
    password: '',
    loader: false,
    docid: '',
    role: '',
    newid: ''
  }
  componentDidMount = () => {
    AsyncStorage.getItem('user_info').then((data) => {
      if (data || data != null) {
        const data1 = JSON.parse(data);
        if (data1.identity == "User") {
          this.props.navigation.navigate("Dashboard")
        }
        else {
          this.props.navigation.navigate("AdminView")
        }
      }
      else {
        this.props.navigation.navigate("Login")
      }
    });
  }
  login = () => {
    const { email, password } = this.state;
    if (!email) return alert('Please enter your Email')
    else if (!password) return alert('Please enter your Password')
    this.setState({ loader: true })
  
    auth().signInWithEmailAndPassword(email, password)
      .then(({ user: { uid } }) => {
        firestore().collection("users").doc(uid).get()
          .then((doc) => {
            const data = doc.data()
            if (data) {
              console.log(doc.data(), 'login data')
              this.setState({ loader: false })
              const data = JSON.stringify(doc.data())
              console.log(data, "stringify data")
              AsyncStorage.setItem('user_info', data)
              console.log(doc.data().identity)
              if (doc.data().identity === "User") {
                this.props.navigation.navigate("Dashboard")
              }
              else this.props.navigation.navigate("AdminView")
            }
            else alert("You're not signed up as a User!")
          })
          .catch((err) => {
            this.setState({ loader: false })
            alert(err.message)
          })
      })
      .catch((err) => {
        alert(err.message)
        this.setState({ loader: false })
      })
  }
  loginGoogle = async () => {
    // Get the users ID token
    const { idToken, accessToken } = await GoogleSignin.signIn();
    console.log(idToken, 'this is idtoken')
    // console.log(accessToken,'this is accesstoken')
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken, accessToken);


    // Sign-in the user with the credential         

    auth().signInWithCredential(googleCredential)
      .then(async (data) => {
        //logging user  
        const { displayName, email, uid } = data.user._user;
        console.log(uid, 'this is uid')
        await firestore().collection("users").doc(uid).get()
          .then(async (doc) => {
            if (doc.exists) {
              console.log(doc.data())
              if (doc.data().role == "") {
                console.log(doc.data().role, 'this is role')
                const { email, displayName, uid, role } = doc.data();
                const data = {
                  email,
                  displayName,
                  uid,
                  role
                }
                // console.log(data,'hellooooo')
                this.props.navigation.navigate("Role", { data });
              }
              else if (doc.data().role == "Admin") {
                this.props.navigation.navigate("AdminView");
              }
              else {
                this.props.navigation.navigate("Dashboard");
              }
            }
            else {
               await  firestore().collection("users").doc(uid).set({
                displayName,
                email,
                uid,
                role:''
              }, { merge: true })
                .then(async(doc) => {
                  await firestore().collection("users").doc(uid).get()
                  .then(async (doc) => {
                    const data=doc.data();
                      this.props.navigation.navigate("Role",{data})

                  })
                })

            }
              // await  firestore().collection("users").doc(uid).set({
              //   displayName,
              //   email,
              //   uid,
              //   role:this.state.role == "" ? "" : this.state.role
              // }, { merge: true })
              //   .then((doc) => {
              //     firestore().collection("users").doc(uid).get()
              //       .then((doc) => {
              //         if (doc.exists) {
              //             console.log(doc.data())
              //             if(doc.data().role == ""){
              //               console.log(doc.data().role,'this is role')
              //               const { email, displayName, uid, role } = doc.data();
              //               const data = {
              //                 email,
              //                 displayName,
              //                 uid,
              //                 role
              //               }
              //               // console.log(data,'hellooooo')
              //               this.props.navigation.navigate("Role", { data });
              //             }
              //             else if(doc.data().role == "Admin"){
              //               this.props.navigation.navigate("AdminView");
              //             }
              //             else{
              //               this.props.navigation.navigate("Dashboard");
              //             }
              //         }
              //         else{
              //           console.log("No such document1!");
              //         }
              //       })
              //       .catch((err) => {
              //         console.log(err.message)
              //       })
              //   })
              //   .catch((err) => {
              //     console.log(err.message)
              //   })
            
           
            // console.log("working 1")
            // this.setState({role:doc.data().role})
            // console.log("working 2")
            // console.log(doc.data().role,'here is role')
            // console.log(this.state.role,'state role')
          })
          .catch((err) => {
            console.log(err.message)
          })


      })
      .catch((err) => { console.log(err.message) });
  }
  onFacebookButtonPress=async()=> {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions(['email']);  
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }
    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }
    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  }
  render() {
    const { email, password, loader } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: "white", justifyContent: 'flex-start' }}>
        {loader ? <View style={{ position: "absolute", zIndex: 99, justifyContent: 'center', top: 0, bottom: 0, right: 0, left: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <ActivityIndicator size="large" color="black" />
        </View> : null
        }
       <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 28, fontWeight: '700',textAlign:'center',marginTop:100,color:'#A3D343' }}>L O G I N</Text>
          <TextInput value={email} onChangeText={(email) => this.setState({ email })} placeholder="Enter your Email" style={{ marginTop: 40, padding: 10, borderColor: 'gray', borderWidth: 1,borderRadius:10 }} />
          <TextInput value={password} onChangeText={(password) => this.setState({ password })} placeholder="Enter your Password" style={{ marginTop: 10, padding: 10, borderColor: 'gray', borderWidth: 1 ,borderRadius:10}} />
          <TouchableOpacity onPress={this.login} style={{ marginTop: 20, borderRadius: 30, padding: 10, width: '100%', alignSelf: 'center', backgroundColor: '#A3D343' }}>
            <Text style={{ textAlign: 'center',color:"white" }}>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Signup')} style={{ marginTop: 10, borderRadius: 30, padding: 10, width: '100%', alignSelf: 'center', backgroundColor: '#A3D343' }}>
            <Text style={{ textAlign: 'center' ,color:"white"}}>SIGNUP</Text>
          </TouchableOpacity>
          <View style={{flexDirection: 'row',marginTop:20}}>
            <View style={{backgroundColor: 'gray', height: 1, flex: 1, alignSelf: 'center'}} />
            <Text style={{ alignSelf:'center', paddingHorizontal:5, fontSize: 13 }}>OR</Text>
            <View style={{backgroundColor: 'gray', height: 1, flex: 1, alignSelf: 'center'}} />
        </View>
          <TouchableOpacity onPress={this.loginGoogle} style={{ marginTop: 10, borderRadius: 30, padding: 10, width: '100%', alignSelf: 'center',borderWidth:1,borderColor:'#A3D343', backgroundColor: 'white' }}>
            <Text style={{ textAlign: 'center',color:"#A3D343" ,fontWeight:'600'}}>Login with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onFacebookButtonPress} style={{ marginTop: 10, borderRadius: 30, padding: 10, width: '100%', alignSelf: 'center',borderWidth:1,borderColor:'#A3D343', backgroundColor: 'white' }}>
            <Text style={{ textAlign: 'center',color:"#A3D343",fontWeight:'600' }}>Login with Facebook</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}


export default Login;