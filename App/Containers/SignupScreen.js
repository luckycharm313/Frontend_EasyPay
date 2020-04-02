import React, { Component } from 'react'
import { SafeAreaView, View, ScrollView, Keyboard, LayoutAnimation, Text, Platform } from 'react-native'
import { connect } from 'react-redux'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import Toast from 'react-native-simple-toast'
import { PaymentCardTextField } from 'tipsi-stripe'
import Input from '../Components/Input'

import UserAction from '../Redux/UserRedux'
// Styles
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
      valid: false,
      card: {
        number: '',
        expMonth: 0,
        expYear: 0,
        cvc: '',
      },
    }
  }

  componentWillMount() {
    this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.handleKeyboardDidShow);
    this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.handleKeyboardDidHide);   
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

  testID(id) {
    return Platform.OS === 'android' ?
      { accessible: true, accessibilityLabel: id } :
      { testID: id }
  }

  handleKeyboardDidHide = () => {
    this.setState({keyboardHeight: 0})
  }

  onNextHandle = async () => {
    const { email, zipCode, card, phone, valid } = this.state

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if( email === '' || reg.test(email) === false ) return Toast.show('Invalid email')
    if( zipCode === '' ) return Toast.show('Zip Code is empty.')
    if( !valid ) return Toast.show('Please add a Card.')
    var params = {
      phone,
      email,
      zip_code: zipCode,
      card
    }
    console.log(params)
    this.props.addUserInfo(params)
  }

  handleFieldParamsChange = (valid, card) => {
    this.setState({
      valid,
      card,
    })
  }

  render () {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
          <View style={[styles.mainPaddingContainer, styles.screenContainer]}>
            <View style={{ marginBottom: Metrics.mainVertical }}>
              <PaymentCardTextField
                accessible={false}
                style={styles.field}
                onParamsChange={this.handleFieldParamsChange}
                numberPlaceholder="XXXX XXXX XXXX XXXX"
                expirationPlaceholder="MM/YY"
                cvcPlaceholder="CVC"
                keyboardType="phone-pad"
                {...this.testID('cardTextField')}
              />
            </View>            
            <Input
              onChangeText={(email)=>this.setState({email})}
              placeholder='Email'
              value={this.state.email} />
            <Input
              onChangeText={(zipCode)=>this.setState({zipCode})}
              placeholder='Zip Code'
              keyboardType="phone-pad"
              value={this.state.zipCode} />
            <Text style={styles.policyText}>Adding your Card allows you to quickly make payments. You'll also enjoy Exclusive Discounts and perks! We are bringing back privacy to payment.</Text>
            <Button
              title='NEXT'
              titleStyle={styles.buttonTitleStyle}
              buttonStyle={styles.buttonStyle}
              containerStyle={[styles.buttonContainerStyle, { marginTop: 50}]}
              onPress={this.onNextHandle}
            />
          </View>
          <View style={{height: this.state.keyboardHeight}}/>  
        </ScrollView>
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
