import React, { Component } from 'react'
import { SafeAreaView, View, TouchableOpacity, Text } from 'react-native'
import { connect } from 'react-redux'
import CodeInput from 'react-native-confirmation-code-input'
// Styles
import styles from './Styles/VerifyPhoneScreenStyle'
import { Colors } from '../Themes'

class VerifyPhoneScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    }
  }

  _onFulfill = (isValid) => {
    if (isValid) {
      this.props.navigation.navigate('SignupScreen')
    } else {
      
      this.refs.codeInputRef.clear();
    }
  }

  render () {
    
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.mainPaddingContainer}>
          <Text style={[styles.labelText, { marginTop: 50 }]}>What is your verification code?</Text>
          <Text style={styles.descriptionText}>Check your SMS message. We've sent you the PIN at 190273</Text>
          <CodeInput
            ref="codeInputRef"
            codeLength={4}
            size={40}
            inputPosition='left'
            activeColor={Colors.white}
            inactiveColor={Colors.primaryLight}
            containerStyle={styles.codeContainer}
            codeInputStyle={styles.codeInput}
            compareWithCode='1234'
            onFulfill={(isValid) => this._onFulfill(isValid)}
          />          
          <TouchableOpacity  onPress={() => this.props.navigation.navigate('SigninScreen')}>
            <Text style={styles.resendText}>Didn't receive SMS? <Text style={{color: '#FA4F10'}}>Resend Code</Text></Text>
          </TouchableOpacity> 
        </View>
      </SafeAreaView>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyPhoneScreen)
