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
//one time payment
import OneScanScreen from '../Containers/OneScanScreen'
import OneTipScreen from '../Containers/OneTipScreen'
import OneResultScreen from '../Containers/OneResultScreen'
import SupportScreen from '../Containers/SupportScreen'
import PaymentOptionScreen from '../Containers/PaymentOptionScreen'
import CardReplaceScreen from '../Containers/CardReplaceScreen'

import { Metrics } from "../Themes/";

const Drawer = createDrawerNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: {
        title: "Home"
      }
    },
    TipScreen: { screen: TipScreen },
    ResultScreen: { screen: ResultScreen },
    ScanScreen: { screen: ScanScreen },
    PaymentOptionScreen: { screen: PaymentOptionScreen },
    CardReplaceScreen: { screen: CardReplaceScreen },
    SupportScreen: { 
      screen: SupportScreen,
      navigationOptions: {
        title: "Support"
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
    
    //one time payment
    OneScanScreen: { screen: OneScanScreen },
    OneTipScreen: { screen: OneTipScreen },
    OneResultScreen: { screen: OneResultScreen },

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
