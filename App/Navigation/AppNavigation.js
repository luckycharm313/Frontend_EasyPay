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
import SignupScreen from '../Containers/SignupScreen'
import { Colors, Metrics, Images } from "../Themes/";


const PrimaryNav = createStackNavigator(
  {
    LaunchScreen: { screen: LaunchScreen },
    SigninScreen: { screen: SigninScreen },
    SignupScreen: { screen: SignupScreen },
  },
  {
    headerMode: "none",
    initialRouteName: "SignupScreen",
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
