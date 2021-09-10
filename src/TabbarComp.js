import React, {Component} from 'react';
import {View,Text, Image,Dimensions, TouchableOpacity, StyleSheet, TouchableHighlight} from 'react-native';
const {width} = Dimensions.get('screen')


export default class TabbarComp extends React.Component {
  render() {
    const {navigation,descriptors} = this.props;
    return (
      <View style={{backgroundColor:'#04668d',flexDirection:'row',alignItems:'flex-end'}}>
          <Text>HELLOOOO</Text>   
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