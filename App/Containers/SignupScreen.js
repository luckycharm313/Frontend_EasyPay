import React, { Component } from 'react'
import { SafeAreaView, View, ScrollView, Keyboard, LayoutAnimation, TouchableOpacity, Text } from 'react-native'
import { connect } from 'react-redux'
import { Button } from 'react-native-elements'
import Input from '../Components/Input'
import { AddCard } from 'react-native-checkout'
// Styles
import styles from './Styles/SignupScreenStyle'
import { Colors, Metrics, Fonts } from '../Themes'

class SignupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyboardHeight: 0,
      email: '',
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

  onNextHandle = () => {
    this.props.navigation.navigate('ScanScreen')
  }

  render () {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
          <View style={[styles.mainPaddingContainer, styles.screenContainer]}>
            <Input
              onChangeText={(email)=>this.setState({email})}
              placeholder='Email'
              value={this.state.email} />
            <View style={{marginTop: 10}}>
              <AddCard
                addCardHandler={(cardNumber, cardExpiry, cardCvc) => {
                  console.log(`${cardNumber} ${cardExpiry} ${cardCvc}`)
                  return Promise.resolve(cardNumber) //return a promise when you're done
                }}
                styles={{
                  errorTextContainer: {
                    height: null,
                    paddingVertical: 10,
                  },
                  addButton: {
                    display: 'none',
                    marginTop: 0,
                    marginBottom: 0,
                    borderWidth: 1,
                    borderColor: Colors.white,
                    backgroundColor: Colors.primaryLight,
                    borderRadius: Metrics.mainRadius,
                  },
                  errorText: {
                    fontSize: 14,
                    fontFamily: Fonts.type.bold,
                    color: '#FA4F10',
                  },
                  addCardContainer: {
                    borderRadius: Metrics.mainRadius,
                    backgroundColor: Colors.transparent
                  }
                }}
                placeholderTextColor={Colors.textHintColor}
                activityIndicatorColor={Colors.primaryLight}
                addCardButtonText="Add Card"
                scanCardVisible={false}
                scanCardAfterScanButtonText="Scan Card Again" />
            </View>
            <Text style={styles.policyText}>Adding your Card allows you to quickly make payments. You'll also enjoy Exclusive Discounts and perks! We are bringing back privacy to payment.</Text>
            <Button
              title='NEXT'
              titleStyle={styles.buttonTitleStyle}
              buttonStyle={styles.buttonStyle}
              containerStyle={[styles.buttonContainerStyle, { marginTop: 50}]}
              onPress={this.onNextHandle}
            />
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
