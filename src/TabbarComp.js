import React, {Component} from 'react';
import {View,Text, Image,Dimensions, TouchableOpacity, StyleSheet, TouchableHighlight, Touchable, TouchableNativeFeedback, TouchableWithoutFeedback} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height'
const {width} = Dimensions.get('screen')
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from './components/Icons'

export default class TabbarComp extends React.Component {
  render() {
    const {navigation,navigation:{state},descriptors} = this.props;
    // return<></>
    return (
      <View style={{backgroundColor:'#A3D343',flexDirection:'row',alignItems:'flex-end'}}>
           {state.routes.map((route, index) => {
        // const {options} = descriptors[route.key];
        const label = route.routeName;

        const isFocused = state.index === index;
        const onPress = () => {
          if (!isFocused) {
            console.log(route.routeName)
            navigation.navigate(route.routeName);
          }
        };
        let icon = {family:"MaterialIcons",name:"book"};
        if(route.key === "Dashboard") icon = {family:"MaterialIcons",name:"layers"};
        else if(route.key === "About") icon = {family:"Ionicons",name:"shapes"};
        else if(route.key === "Profile") icon = {family:"Entypo",name:"user"};
        
        if(index ===1)
        return <View accessibilityState={isFocused ? {selected: true} : {}}
        accessibilityRole="button"
        activeOpacity={0.7}
        
        style={[styles.tabs,{height:'100%',elevation:2,shadowColor:'white',shadowColor: "#fff",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity:0.5,
        shadowRadius: 1.20,}]}>
          <TouchableOpacity onPress={onPress} style={{backgroundColor:'white',height:70,width:70,borderRadius:70/2,justifyContent:'center',alignItems:'center',borderWidth:5,borderColor:"#A3D343",position:'absolute',bottom:15}}>
           <Icon family={icon.family} name={icon.name} color={'#A3D343'} style={{marginBottom:5}} size={32}/>
          </TouchableOpacity>
          
        </View>
        return (
          <TouchableOpacity
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityRole="button"
            activeOpacity={0.7}
            onPress={onPress}
            style={styles.tabs}>
          <Icon family={icon.family} name={icon.name} color={isFocused ? "white":"#f5f5f5"} style={{marginBottom:5}} size={24}/>      
            <Text
              style={{
                color: 'white',
                fontSize: 12,fontWeight:'700'
              }}
              numberOfLines={1}
              >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabs: {
    flex: 1,
    paddingVertical: 5,
    alignItems: 'center',
  },
});