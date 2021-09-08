//Navigations here
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
//Screens
import {Splash,Signup,Login,Dashboard,CreatePost,AdminView} from './containers';

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
    Dashboard: {screen: Dashboard},
    CreatePost: {screen: CreatePost},
    AdminView: {screen: AdminView},
  },

  {
    initialRouteName: 'Login',
    headerMode: 'none',
  },
);
const SignupStack = createStackNavigator(
  {
    Signup: {screen: Signup},
  },

  {
    initialRouteName: 'Signup',
    headerMode: 'none',
  },
);
// const authStack = createStackNavigator(
//   {
//     Login: {screen: Login},
//     Verify: {screen: Verify},
//   },

//   {
//     initialRouteName: 'Verify',
//     headerMode: 'none',
//   },
// );

// const AppNavigator = createStackNavigator(
//   {
//     // TabView: {screen: TabView},
//     // Leaderboard: {screen: Leaderboard},
//   },

//   {
//     initialRouteName: 'MainStack',
//     headerMode: 'none',
//   },
// );

const RootStack = createAppContainer(
  createSwitchNavigator(
    {
      Splash: SplashStack,
      Login:LoginStack,
      Signup:SignupStack,
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
