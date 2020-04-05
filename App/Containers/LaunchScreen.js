import React, { Component } from 'react'
import { SafeAreaView, View, Image } from 'react-native'
import { connect } from 'react-redux'
import { Button } from 'react-native-elements'
import SplashScreen from 'react-native-splash-screen'
import StartupAction from '../Redux/StartupRedux'
// Styles
import styles from './Styles/LaunchScreenStyle'
import { Images } from '../Themes/'
class LaunchScreen extends Component {

  componentWillMount() {
    this.props.isLogin();
    setTimeout(() => SplashScreen.hide(), 3000)
  }

  onOneTimePaymentHandle = () => {
    this.props.navigation.navigate('PaymentMethodScreen')
  }

  onSigninHandle = () => {
    this.props.navigation.navigate('SigninScreen', { iType: 1 } )
  }

  onSignupHandle = () => {
    this.props.navigation.navigate('SigninScreen', { iType: 0 } )
  }

  render () {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.mainPaddingContainer}>
          <View style={styles.logoContainer}>
            <Image
              source={Images.logo}
              style={{ width: 200, height: 200 }}
            />
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
            <Button
              title='SIGN UP'
              titleStyle={styles.buttonTitleStyle}
              buttonStyle={styles.buttonStyle}
              containerStyle={[styles.buttonContainerStyle]}
              onPress={this.onSignupHandle}
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
    isLogin: () => dispatch(StartupAction.isLogin())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen)
