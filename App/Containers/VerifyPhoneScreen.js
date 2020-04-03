import React, { Component } from 'react'
import { SafeAreaView, View, TouchableOpacity, Text } from 'react-native'
import { connect } from 'react-redux'
import CodeInput from 'react-native-confirmation-code-input'

import UserAction from '../Redux/UserRedux'
// Styles
import styles from './Styles/VerifyPhoneScreenStyle'
import { Colors } from '../Themes'

class VerifyPhoneScreen extends Component {
  constructor(props) {
    super(props);
    const {navigation} = this.props
    const { state : {params}} = navigation
    this.state = {
      code: params.code,
      phone: params.phone,
    }
  }

  _onFulfill = (isValid) => {
    if (isValid) {
      var params = { phone: this.state.phone }
      this.props.verifiedPhone(params)
    } else {      
      this.refs.codeInputRef.clear();
    }
  }

  render () {
    
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.mainPaddingContainer}>
          <Text style={[styles.labelText, { marginTop: 50 }]}>What is your verification code?</Text>
          <Text style={styles.descriptionText}>Check your SMS message. We've sent you the PIN at {this.state.phone}</Text>
          <CodeInput
            ref="codeInputRef"
            codeLength={4}
            size={40}
            inputPosition='left'
            activeColor={Colors.white}
            inactiveColor={Colors.primaryLight}
            containerStyle={styles.codeContainer}
            codeInputStyle={styles.codeInput}
            compareWithCode={this.state.code}
            keyboardType='phone-pad'
            onFulfill={(isValid) => this._onFulfill(isValid)}
          />          
          <TouchableOpacity  onPress={() => this.props.navigation.goBack()}>
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
    verifiedPhone: (params) => dispatch(UserAction.verifiedPhone(params)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyPhoneScreen)
