import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Image, StatusBar, AsyncStorage } from 'react-native';
import { Colors, CustomTextInput, Loader } from '../../config';
import { textScale, moderateScaleVertical, moderateScale } from '../Responsive/index';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { WebView } from 'react-native-webview'
import HeaderCustom from '../../components/HeaderCustom';

class Browser extends React.Component {
    LoadingIndicatorView() {
        return <ActivityIndicator color='#009b88' size='large' style={styles.ActivityIndicatorStyle} />
      }
  render() {
    const { params } = this.props.navigation.state
    console.log(params)
    const {navigation,mode} = this.props;
    return (
            <WebView 
            source={{ uri: params.item }}
            renderLoading={this.LoadingIndicatorView}
            startInLoadingState={true}
            />
        
    )

  }
}


export default Browser;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  ActivityIndicatorStyle: {
    flex: 1,
    justifyContent: 'center'
  }
});
