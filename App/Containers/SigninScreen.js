import React, { Component } from 'react'
import { SafeAreaView, View, ScrollView, Keyboard, LayoutAnimation, TouchableOpacity, Text } from 'react-native'
import { connect } from 'react-redux'
import { Button } from 'react-native-elements'
import Input from '../Components/Input'
import Header from '../Components/Header'
// Styles
import styles from './Styles/SigninScreenStyle'

class SigninScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyboardHeight: 0,
      email: '',
      password: '',
    }
  }

  componentWillMount() {
    this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.handleKeyboardDidShow);
    this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.handleKeyboardDidHide);
    // this.props.isLogin();
  }

  componentWillUnmount() {
    this.keyboardDidShowSub.remove();
    this.keyboardDidHideSub.remove();
  }
  
  handleKeyboardDidShow = (event) => {
    LayoutAnimation.easeInEaseOut()
    const keyboardHeight = event.endCoordinates.height
    this.setState({keyboardHeight})
  }

  handleKeyboardDidHide = () => {
    this.setState({keyboardHeight: 0})
  }

  loginHandle = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    // if( this.state.email === '' || reg.test(this.state.email) === false ) return CustomToast('Email is not correct.')

    // if(this.state.email.trim() === '' || this.state.password.trim() === '')
    //   return CustomToast('Invalid Input data.')
    // else
      // this.props.userLogin(this.state.email.trim(), this.state.password.trim())
  }

  render () {
    return (
      <SafeAreaView style={styles.container}>
        <Header leftButton='back' nextScreen='LaunchScreen' navigation={this.props.navigation}/>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
          <View style={[styles.mainPaddingContainer, styles.screenContainer]}>
            <Input
              onChangeText={(email)=>this.setState({email})}
              placeholder='Email'
              value={this.state.email} />
            <Input
              onChangeText={(password)=>this.setState({password})}
              secureTextEntry
              placeholder='Password'
              value={this.state.password} />
            <Button
              title='SIGN IN'
              titleStyle={styles.buttonTitleStyle}
              buttonStyle={styles.buttonStyle}
              containerStyle={[styles.buttonContainerStyle, { marginTop: 50}]}
              onPress={this.onSigninHandle}
            />            
          </View>
          <View style={styles.bottomContainer}>
            <TouchableOpacity  onPress={() => this.props.navigation.navigate('SignupScreen')}>
              <Text style={styles.bottomText}>Don't have an account? Sign Up</Text>
            </TouchableOpacity>
            </View>
        </ScrollView>
        <View style={{height: this.state.keyboardHeight}}/>      
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

export default connect(mapStateToProps, mapDispatchToProps)(SigninScreen)
