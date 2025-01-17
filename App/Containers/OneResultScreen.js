import React, { Component } from 'react'
import { SafeAreaView, Text, View } from "react-native";
import { connect } from "react-redux";
import { Button } from "react-native-elements";
import * as Animatable from "react-native-animatable";

import RainAnimation from "../Components/RainAnimation";
import { currencyFormat } from '../Services/Constant';
import UserAction from '../Redux/UserRedux'
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

class OneResultScreen extends Component {
  constructor(props) {
    super(props);
    const {navigation} = this.props
    const { state : {params}} = navigation
    let _type = 0;
    if( params.isError ) {
      _type = 2;
    } else {
      if( params.tipResult.percent > 0 ) {
        _type = 0
      } else {
        _type = 1
      }
    }
    this.state = {
      tipResult: params.tipResult,
      iType: _type,
      starCount: 3
    };
  }
  
  componentWillReceiveProps(nextProps) {
    if(nextProps.isLoad !== this.props.isLoad && nextProps.isLoad === false){
      this.setState({ starCount: nextProps.info.rate })
    }
  }

  onGoHomeHandle = () => {
    this.props.navigation.navigate('LaunchScreen')
  }

  render() {
    const { tipResult } = this.state;

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
                <Text style={styles.textSuccess}>{tipResult.percent}% tip of {currencyFormat(tipResult.original_cost)} was Added.</Text>
                <Text style={styles.textSuccess}>
                  Your card would be charged {currencyFormat(tipResult.total)}
                </Text>
                <Text style={styles.textResultSuccess}>
                  THANK YOU, your payment and tip was successful
                </Text>                
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
                  Your card would be charged {currencyFormat(tipResult.total)}
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

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OneResultScreen)
