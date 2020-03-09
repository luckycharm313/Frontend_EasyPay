import React, { Component } from 'react'
import { SafeAreaView, View } from 'react-native'
import { connect } from 'react-redux'
import { Button } from 'react-native-elements'

// Styles
import styles from './Styles/LaunchScreenStyle'

class LaunchScreen extends Component {
  onOneTimePaymentHandle = () => {

  }

  onSigninHandle = () => {
    this.props.navigation.navigate('SigninScreen')
  }

  render () {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.mainPaddingContainer}>
          <View style={styles.logoContainer}>
            <View style={{borderWidth: 1, borderColor: 'white', width: 150, height: 150}}></View>
          </View>
          <View style={styles.btnGroupContainer}>
            <Button
              title='ONE TIME PAYMENT'
              titleStyle={styles.buttonTitleStyle}
              buttonStyle={styles.buttonStyle}
              containerStyle={styles.buttonContainerStyle}
              onPress={this.onOneTimePaymentHandle}
            />
            <Button
              title='SIGN IN'
              titleStyle={styles.buttonTitleStyle}
              buttonStyle={styles.buttonStyle}
              containerStyle={[styles.buttonContainerStyle]}
              onPress={this.onSigninHandle}
            />
          </View>          
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

export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen)
