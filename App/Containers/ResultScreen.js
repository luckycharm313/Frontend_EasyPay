import React, { Component } from "react";
import { SafeAreaView, Text, View, Image } from "react-native";
import { connect } from "react-redux";
import { Button } from "react-native-elements";
import * as Animatable from "react-native-animatable";
import StarRating from 'react-native-star-rating'

import RainAnimation from "../Components/RainAnimation";
// Styles
import { Images, Metrics } from "../Themes/";
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
      iType: 0,
      starCount: 3
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
                <View style={styles.rateContainer}>
                  <Text style={styles.textResultSuccess}>
                    Rate Your Experience 
                  </Text>
                  <StarRating
                    disabled={false}
                    maxStars={5}
                    rating={this.state.starCount}
                    fullStarColor='#FFDF00'
                    emptyStarColor='#FFDF00'
                    emptyStar={'ios-star-outline'}
                    fullStar={'ios-star'}
                    halfStar={'ios-star-half'}
                    iconSet={'Ionicons'}
                    starSize = {40}
                    selectedStar={(starCount) => this.setState({starCount})}
                    containerStyle={{ justifyContent: 'space-evenly' }}
                    buttonStyle={{ marginTop: Metrics.mainVertical }}
                  />
                </View>
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
              <Text style={styles.textResultSuccess}>
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
            containerStyle={[styles.buttonContainerStyle, {marginBottom: 40}]}
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
