import React, { useState } from "react";
import {
  Platform,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Text
} from "react-native";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import FeatherIcons from "react-native-vector-icons/Feather";
import {
  createStackNavigator,
  createMaterialTopTabNavigator,
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
import HistoryScreen from '../Containers/HistoryScreen'
import { Colors, Metrics, Images } from "../Themes/";


const PrimaryNav = createStackNavigator(
  {
    LaunchScreen: { screen: LaunchScreen },
    SigninScreen: { screen: SigninScreen },
    VerifyPhoneScreen: { screen: VerifyPhoneScreen },
    SignupScreen: { screen: SignupScreen },
    ScanScreen: { screen: ScanScreen },
    TipScreen: { screen: TipScreen },
    ResultScreen: { screen: ResultScreen },
    HistoryScreen: { screen: HistoryScreen },
  },
  {
    headerMode: "none",
    initialRouteName: "HistoryScreen",
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
