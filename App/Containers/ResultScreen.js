import React, { Component } from "react";
import { SafeAreaView, Text, View, Image } from "react-native";
import { connect } from "react-redux";
import { Button } from "react-native-elements";
import * as Animatable from "react-native-animatable";

import RainAnimation from "../Components/RainAnimation";
// Styles
import { Images } from "../Themes/";
import styles from "./Styles/ResultScreenStyle";
const fadeIn = {
  from: {
    opacity: 0
  },
  to: {
    opacity: 1
  }
};
class ResultScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iType: 2
    };
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.mainPaddingContainer}>
          {this.state.iType === 0 ? ( // tip and payment
            <View style={{ flex: 1 }}>
              <RainAnimation
                imgA={Images.img_light_green}
                imgB={Images.img_light_pink}
              />
              <View style={styles.resultContainer}>
                <Text style={styles.textSuccess}>5% tip of $1 was Added.</Text>
                <Text style={styles.textSuccess}>
                  Your card would be charged $2.01
                </Text>
                <Animatable.Text
                  style={styles.textResultSuccess}
                  animation={fadeIn}
                >
                  THANK YOU, your payment and tip was successful
                </Animatable.Text>
              </View>
            </View>
          ) : this.state.iType === 1 ? ( // just payment
            <View style={{ flex: 1 }}>
              <RainAnimation
                imgA={Images.img_dark_gray}
                imgB={Images.img_yellow}
              />
              <View style={styles.resultContainer}>
                <Text style={styles.textSuccess}>
                  Your card would be charged $2.01
                </Text>
                <Animatable.Text
                  style={styles.textResultSuccess}
                  animation={fadeIn}
                >
                  THANK YOU, your payment was Successful
                </Animatable.Text>
              </View>
            </View>
          ) : (
            // fail
            <View style={styles.resultContainer}>
              <Text style={styles.textSuccess}>
                WE ARE SORRY YOUR card or Payment failed, please add a new card
                to the Easy pay app or contact your bank. You can choose to pay
                cash if nothing works
              </Text>
            </View>
          )}
          <Button
            title="GO TO HOME"
            titleStyle={styles.buttonTitleStyle}
            buttonStyle={[styles.buttonStyle]}
            containerStyle={[styles.buttonContainerStyle, {}]}
            onPress={this.onGoHomeHandle}
          />
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

export default connect(mapStateToProps, mapDispatchToProps)(ResultScreen);
