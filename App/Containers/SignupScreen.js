import React, { Component } from 'react'
import { SafeAreaView, View, ScrollView, Keyboard, LayoutAnimation, Text } from 'react-native'
import { connect } from 'react-redux'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import stripe from 'tipsi-stripe'
import Input from '../Components/Input'

import UserAction from '../Redux/UserRedux'
// Styles
import { STRIPE_PUBLISHABLE_KEY, METCHANT_ID } from '../Services/Constant'

import styles from './Styles/SignupScreenStyle'
import { Colors, Metrics, Fonts } from '../Themes'

class SignupScreen extends Component {
  constructor(props) {
    super(props);
    const {navigation} = this.props
    const { state : {params}} = navigation
    this.state = {
      phone: params.phone,
      keyboardHeight: 0,
      email: '',
      zipCode: '',
      stripe_token: null
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

  onNextHandle = async () => {
    const { email, zipCode, stripe_token, phone } = this.state

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if( email === '' || reg.test(email) === false ) return Toast.show('Invalid email')
    if( zipCode === '' ) return Toast.show('Zip Code is empty.')
    if( stripe_token === null ) return Toast.show('Please add a Card.')
    var params = {
      phone,
      email,
      zip_code: zipCode,
      stripe_token
    }
    this.props.addUserInfo(params)
  }

  onAddingHandle = async () => {
    stripe.setOptions({
      publishableKey: STRIPE_PUBLISHABLE_KEY,
      androidPayMode: 'test', // Android only
    })

    const stripe_token = await stripe.paymentRequestWithCardForm();
    this.setState({ stripe_token })
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
            <Input
              onChangeText={(zipCode)=>this.setState({zipCode})}
              placeholder='Zip Code'
              value={this.state.zipCode} />
            <View style={{marginTop: 10}}>
              {/* <AddCard
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
                scanCardAfterScanButtonText="Scan Card Again" /> */}
            </View>
            {
              this.state.stripe_token ?
              <View style={styles.cardContainer}>
                <Icon name="check-circle" style={styles.icon} />
                <Text style={[styles.policyText, { fontWeight: '800' }]}>Card is Added</Text>
              </View>              
              :
              <Button
                title='Add Card'
                titleStyle={styles.buttonTitleStyle}
                buttonStyle={styles.buttonStyle}
                containerStyle={[ styles.buttonContainerStyle ]}
                onPress={this.onAddingHandle}
              />
            }
            
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
    addUserInfo: (params) => dispatch(UserAction.addUserInfo(params)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen)
