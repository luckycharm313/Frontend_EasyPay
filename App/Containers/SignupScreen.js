import React, { Component } from 'react'
import { SafeAreaView, View, ScrollView, Keyboard, LayoutAnimation, Text, Platform } from 'react-native'
import { connect } from 'react-redux'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import Toast from 'react-native-simple-toast'
import { CreditCardInput } from "react-native-credit-card-input";
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
    if( !valid ) return Toast.show('All card fields are required.')
    if( email === '' || reg.test(email) === false ) return Toast.show('Invalid email')
    if( zipCode === '' ) return Toast.show('Zip Code is empty.')
    var params = {
      phone,
      email,
      zip_code: zipCode,
      card
    }
    console.log(params)
    this.props.addUserInfo(params)
  }

  _onChange = ( { values, valid } ) => {
    var temp = values.expiry.toString().split("/")
    var card = {
      number: values.number,
      expMonth: temp[0],
      expYear: temp[1],
      cvc: values.cvc
    }
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
              <CreditCardInput
                autoFocus
                requiresCVC
                labelStyle={{ color: Colors.white }}
                inputStyle={{
                  borderBottomWidth: 0,
                  backgroundColor: Colors.white,
                  borderRadius: Metrics.mainRadius,
                  paddingHorizontal: Metrics.mainVertical,
                  fontSize: Fonts.size.regular,
                  marginTop: 3
                }}
                inputContainerStyle={{
                  marginLeft: 0,
                  marginRight: 15
                }}
                validColor={Colors.black}
                invalidColor={Colors.error}
                placeholderColor={Colors.textHintColor}
                onChange={this._onChange} />
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
