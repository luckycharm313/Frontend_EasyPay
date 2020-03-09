import React, { Component } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { Button } from 'react-native-elements'

// Styles
import { Colors, Metrics, Fonts } from "../Themes";
import styles from "./Styles/ScanScreenStyle";

class ScanScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPay: false,
      isScan: false
    }
  }

  onScanHandle = () => {
      this.setState({isScan: true, isPay: false})
  }
  onPayHandle = () => {

  }

  render() {  
    const {isPay, isScan} = this.state
    return (
      <SafeAreaView style={styles.container}>
        { isScan ? (
          <View>

          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer} >
            <View style={[styles.mainPaddingContainer, styles.screenContainer ]}>
              {
                isPay ? 
                  <Button
                    title='TAP TO PAY'
                    titleStyle={styles.buttonTitleStyle}
                    buttonStyle={styles.buttonStyle}
                    containerStyle={[styles.buttonContainerStyle, {marginHorizontal: 20, marginTop: 40}]}
                    onPress={this.onPayHandle}
                  />
                :
                <Button
                  title='SCAN BARCODE TO PAY'
                  titleStyle={styles.buttonTitleStyle}
                  buttonStyle={[styles.buttonStyle, { backgroundColor: Colors.primaryDark, height: Metrics.screenWidth - 80, borderRadius: 20 }]}
                  containerStyle={[styles.buttonContainerStyle, { marginHorizontal: 20}]}
                  onPress={this.onScanHandle}
                />
              }
            </View>
          </ScrollView>
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(ScanScreen);
