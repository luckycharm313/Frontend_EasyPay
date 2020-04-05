import React, { Component } from 'react'
import { SafeAreaView, View, ScrollView, Keyboard, LayoutAnimation, Platform } from 'react-native'
import { connect } from 'react-redux'
import { Button } from 'react-native-elements'
import { CreditCardInput } from "react-native-credit-card-input";
import Toast from 'react-native-simple-toast'

import Input from '../Components/Input'
import Header from '../Components/Header'
import UserAction from '../Redux/UserRedux'
// Styles
import { Colors, Metrics, Fonts } from '../Themes'
import styles from './Styles/CardScreenStyle'

class CardScreen extends Component {
  constructor(props) {
    super(props);
    const {navigation} = this.props
    const { state : {params}} = navigation
    this.state = {
      iType: params.type,
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

  handleKeyboardDidHide = () => {
    this.setState({keyboardHeight: 0})
  }

  testID(id) {
    return Platform.OS === 'android' ?
      { accessible: true, accessibilityLabel: id } :
      { testID: id }
  }

  onNextHandle = () => {
    const { email, zipCode, card, valid, iType } = this.state

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if(iType === 'card') {
      if( !valid ) return Toast.show('All card fields are required.')
      if( email === '' || reg.test(email) === false ) return Toast.show('Invalid email')
      if( zipCode === '' ) return Toast.show('Zip Code is empty.')
      var params = {
        email,
        zip_code: zipCode,
        card
      }
      this.props.addOneUser(params)
    } else {
      if( email === '' || reg.test(email) === false ) return Toast.show('Invalid email')
      if( zipCode === '' ) return Toast.show('Zip Code is empty.')
      var params = {
        email,
        zip_code: zipCode,
        card: null
      }
      this.props.addOneUser(params)
    }
    
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
        <Header leftButton="back" navigation={this.props.navigation}/>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
          <View style={[styles.mainPaddingContainer, styles.screenContainer]}>
            {
              this.state.iType === 'card' &&
                <View style={{ marginBottom: Metrics.mainVertical }}>
                  <CreditCardInput
                    autoFocus
                    requiresCVC
                    labelStyle={{ color: Colors.white }}
                    inputStyle={{
                      borderBottomWidth: 0,
                      backgroundColor: Colors.white,
                      borderRadius: Metrics.mainRadius,
                      paddingHorizontal: 8,
                      fontSize: Fonts.size.medium,
                      marginTop: 3,
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
            }            
            <Input
              onChangeText={(email)=>this.setState({email})}
              placeholder='Email'
              value={this.state.email} />
            <Input
              onChangeText={(zipCode)=>this.setState({zipCode})}
              placeholder='Zip Code'
              keyboardType="phone-pad"
              value={this.state.zipCode} />            
            <Button
              title='Use for one-time payment'
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
    addOneUser: (params) => dispatch(UserAction.addOneUser(params)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardScreen)
