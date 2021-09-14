import React from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar, AsyncStorage, TouchableOpacity, Image } from 'react-native';
//Navigations here
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';


//Screens
import {
  Splash, Signup, Login, Dashboard, CreatePost, AdminView, CaseDetail, Role, About, Profile
  , EditProfile, Browser
} from './containers';
import { createBottomTabNavigator } from 'react-navigation-tabs';
//icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import TabbarComp from './TabbarComp';
import DrawerComp from './DrawerComp';
const SplashStack = createStackNavigator(
  {
    Splash: { screen: Splash },
  },

  {
    initialRouteName: 'Splash',
    headerMode: 'none',
  },
);
const AboutStack = createStackNavigator(
  {
    About: {
      screen: About,
      navigationOptions: {
        headerShown: false
      }
    },
    Browser: {
      screen: Browser,
      navigationOptions: ({ navigation }) => ({
        title: navigation.state.params.title,
        headerTintColor: '#A3D343',
        headerShown: true,
      })
    }
  },
  {
    initialRouteName: 'About',


  },
);
const ProfileStack = createStackNavigator(
  {
    Profile: { screen: Profile },
    EditProfile: { screen: EditProfile },
  },

  {
    initialRouteName: 'Profile',
    headerMode: 'none',
  },
);
const LoginStack = createStackNavigator(
  {
    Login: { screen: Login },
    Signup: { screen: Signup },
    Role: { screen: Role },
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
  },
);
const DashboardStack = createStackNavigator(
  {
    Dashboard: { screen: Dashboard },
    CreatePost: { screen: CreatePost },
    CaseDetail: { screen: CaseDetail },
  },
  {
    initialRouteName: 'Dashboard',
    headerMode: 'none',
  },
);
const AdminStack = createStackNavigator(
  {
    AdminView: { screen: AdminView },
  },
  {
    initialRouteName: 'Admin',
    headerMode: 'none',
  },
);
const TabNavigator = createBottomTabNavigator(
  {
    Dashboard: {
      screen: DashboardStack,
      navigationOptions: {
        tabBarLabel: 'Dashboard',
        tabBarIcon: ({ color, size }) => <MaterialIcons name="dashboard" color="white" size={27} />
      }
    },
    About: {
      screen: AboutStack,
      navigationOptions: {
        tabBarLabel: 'About',
        tabBarIcon: ({ color, size }) => <Entypo name="dashboard" color="white" size={27} />
      }
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color, size }) => <Entypo name="dashboard" color="white" size={27} />
      }
    },
  },
  {
    initalRouteParams: 'Dashboard',
    tabBarComponent: (props) => <TabbarComp  {...props} />,
    tabBarOptions: {
      activeBackgroundColor: '#A3D343',
      inactiveBackgroundColor: '#04668d',
      labelStyle: { color: 'white', fontSize: 10 }
    },
    headerMode: 'none',
  },
);
const DrawerNavigator = createDrawerNavigator(
  {
  Tab : TabNavigator,

},
{
  contentComponent:(props)=><DrawerComp  {...props}/>,
  initialRouteName:"Tab",
  drawerBackgroundColor: '#A3D343',
}
);
const RootStack = createAppContainer(
  createSwitchNavigator(
    {
      Splash: SplashStack,
       DrawerNavigator,
      Login: LoginStack,
    },
    {
      initialRouteName: 'Splash',
    },
  ),
);

export default RootStack;
