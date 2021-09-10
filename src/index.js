//Navigations here
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
//Screens
import {Splash,Signup,Login,Dashboard,CreatePost,AdminView,CaseDetail,Role} from './containers';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import TabbarComp from './TabbarComp';
const SplashStack = createStackNavigator(
  {
    Splash: {screen: Splash},
  },

  {
    initialRouteName: 'Splash',
    headerMode: 'none',
  },
);

const LoginStack = createStackNavigator(
  {
    Login: {screen: Login},
    Signup: {screen: Signup},
    Dashboard: {screen: Dashboard},
    CreatePost: {screen: CreatePost},
    AdminView: {screen: AdminView},
    CaseDetail: {screen: CaseDetail},
    Role: {screen: Role},
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
  },
);

const TabNavigator = createBottomTabNavigator(
  {
    Dashboard: {screen: Dashboard},
    CreatePost: {screen: CreatePost},
    AdminView: {screen: AdminView},
    CaseDetail: {screen: CaseDetail},
  },

  {
    initalRouteParams: 'Dashboard',
    tabBarComponent:(props)=><TabbarComp  {...props}/>,
    headerMode: 'none',
  },
);
const RootStack = createAppContainer(
  createSwitchNavigator(
    {
      Splash: SplashStack,
      Login:LoginStack,
      TabNavigator
     // Auth: authStack,
      // Index: indexStack,
      //App: MainStack,
    },
    {
      initialRouteName: 'Splash',
    },
  ),
);

export default RootStack;
