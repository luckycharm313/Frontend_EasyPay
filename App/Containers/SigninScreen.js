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
    this.state = {
      phone: ""
    };
  }

  onVerifyHandle = () => {
    let regNumber = /^\d+$/ ;
    const { phone } = this.state
    if( phone === '' || regNumber.test(phone) === false ) return Toast.show('Phone is not correct. Must be number');
    var params = { phone }
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
          <Input
            onChangeText={phone => this.setState({ phone })}
            placeholder="Phone number"
            keyboardType="number-pad"
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
