import React, { Component } from "react";
import { SafeAreaView, View, TouchableOpacity, Text } from "react-native";
import { connect } from "react-redux";
import { Button } from "react-native-elements";
import Input from "../Components/Input";
import Header from "../Components/Header";
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
    this.props.navigation.navigate("VerifyPhoneScreen");
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SigninScreen);
