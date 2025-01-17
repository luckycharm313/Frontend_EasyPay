import React, { Component } from "react";
import { SafeAreaView, View, TouchableOpacity, Text } from "react-native";
import { connect } from "react-redux";
import { Button } from "react-native-elements";
import Toast from 'react-native-simple-toast'
import Input from "../Components/Input";
import Header from "../Components/Header";
import UserAction from '../Redux/UserRedux';
// Styles
import styles from "./Styles/SigninScreenStyle";
class SigninScreen extends Component {
  constructor(props) {
    super(props);
    const {navigation} = this.props
    const { state : {params}} = navigation
    this.state = {
      iType: params.iType,
      phone: ""
    };
  }

  onVerifyHandle = () => {
    const { phone } = this.state
    if( phone === '' ) return Toast.show('Phone is empty.');
    var params = { 
      phone,
      iType: this.state.iType
    }
    this.props.sendPhoneRequest(params)
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Header
          leftButton="back"
          nextScreen="LaunchScreen"
          navigation={this.props.navigation}
        />
        <View style={styles.mainPaddingContainer}>
          <Text style={styles.labelText}>What's your phone number?</Text>
          <Text style={styles.smallText}>Please include your country code.</Text>
          <Input
            onChangeText={phone => this.setState({ phone })}
            placeholder="Phone number"
            keyboardType="phone-pad"
            value={this.state.phone}
          />
          <Button
            title="Send confirmation code"
            titleStyle={styles.buttonTitleStyle}
            buttonStyle={styles.buttonStyle}
            containerStyle={[styles.buttonContainerStyle]}
            onPress={this.onVerifyHandle}
          />
          <Text style={styles.bottomText}>By tapping "Send confirmation code" above, we will send you an SMS to confirm your phone number.</Text>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    sendPhoneRequest: (params) => dispatch(UserAction.sendPhoneRequest(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SigninScreen);
