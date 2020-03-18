import {
  createStackNavigator,
  createDrawerNavigator
} from "react-navigation";

import styles from "./Styles/NavigationStyles";
import LaunchScreen from '../Containers/LaunchScreen'
import SigninScreen from '../Containers/SigninScreen'
import VerifyPhoneScreen from '../Containers/VerifyPhoneScreen'
import SignupScreen from '../Containers/SignupScreen'
import ScanScreen from '../Containers/ScanScreen'
import TipScreen from '../Containers/TipScreen'
import ResultScreen from '../Containers/ResultScreen'
import HomeScreen from '../Containers/HomeScreen'
import DrawerScreen from '../Containers/DrawerScreen'
import PaymentMethodScreen from '../Containers/PaymentMethodScreen'
import CardScreen from '../Containers/CardScreen'

import { Metrics } from "../Themes/";

const Drawer = createDrawerNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: {
        title: "Home"
      }
    },
    ScanScreen: { 
      screen: ScanScreen,
      navigationOptions: {
        title: "Scan"
      }
    },
    TipScreen: { 
      screen: TipScreen,
      navigationOptions: {
        title: "Tip"
      }
    },
    ResultScreen: {
      screen: ResultScreen,
      navigationOptions: {
        title: "Result"
      }
    },    
  },
  {
    contentComponent: DrawerScreen,
    drawerWidth: Metrics.screenWidth * 0.7,
    drawerPosition: "left"
  }
)

const PrimaryNav = createStackNavigator(
  {
    LaunchScreen: { screen: LaunchScreen },
    SigninScreen: { screen: SigninScreen },
    VerifyPhoneScreen: { screen: VerifyPhoneScreen },
    SignupScreen: { screen: SignupScreen },
    PaymentMethodScreen: { screen: PaymentMethodScreen },
    CardScreen: { screen: CardScreen },
    Drawer: {
      screen: Drawer,
      navigationOptions: {
        header: null
      }
    }  
  },
  {
    headerMode: "none",
    initialRouteName: "LaunchScreen",
    navigationOptions: {
      headerStyle: styles.header,
      lazy: false
    },
    defaultNavigationOptions: {
      gesturesEnabled: false
    }
  }
);

export default PrimaryNav;
