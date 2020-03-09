import React, { Component } from 'react'
import { SafeAreaView, View, ScrollView, Keyboard, LayoutAnimation, TouchableOpacity, Text } from 'react-native'
import { connect } from 'react-redux'
import { Button } from 'react-native-elements'
import Input from '../Components/Input'
import Header from '../Components/Header'

// Styles
import styles from './Styles/SignupScreenStyle'

class SignupScreen extends Component {
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
              title='SIGN UP'
              titleStyle={styles.buttonTitleStyle}
              buttonStyle={styles.buttonStyle}
              containerStyle={[styles.buttonContainerStyle, { marginTop: 50}]}
              onPress={this.onSignupHandle}
            />            
          </View>
          <View style={styles.bottomContainer}>
            <TouchableOpacity  onPress={() => this.props.navigation.navigate('SigninScreen')}>
              <Text style={styles.bottomText}>Already have an account? Sign In</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen)
