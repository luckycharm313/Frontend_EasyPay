import React, { Component } from 'react'
import { SafeAreaView, Text, View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import { Button } from 'react-native-elements'
import Toast from 'react-native-simple-toast'
// Styles
import { Colors, Metrics } from '../Themes/'
import styles from './Styles/PaymentMethodScreenStyle'

class PaymentMethodScreen extends Component {
  
  onSelectPaymentHandle = (e) => {
    if( e === 'card' ) {
      this.props.navigation.navigate('CardScreen', {type: 'card'})
    } else {
      return Toast.show('Coming soon!');
      // this.props.navigation.navigate('CardScreen', {type: 'paypal'})
    }
  }

  render () {
    return (
      <SafeAreaView style={styles.container}>
        <View style={[ styles.mainPaddingContainer, {justifyContent: 'center'}]}>
          <TouchableOpacity
            style={[styles.paymentContainer, { backgroundColor: Colors.paypal } ]}
            onPress={
              () => this.onSelectPaymentHandle('paypal')
            }
          >
            <Icon name="paypal" style={[ styles.icon, { color: Colors.white }]} />
            <Text style={[styles.paymentText, { color: Colors.white }]}>Paypal</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.paymentContainer}
            onPress={
              () => this.onSelectPaymentHandle('card')
            }
          >
            <Icon name="credit-card" style={styles.icon} />
            <Text style={styles.paymentText}>Credit or Debit Card</Text>
          </TouchableOpacity>
          <Button
            title='BACK'
            titleStyle={styles.buttonTitleStyle}
            buttonStyle={styles.buttonStyle}
            containerStyle={[styles.buttonContainerStyle, { marginTop: Metrics.section.doubleXl}]}
            onPress={() => this.props.navigation.goBack()}
          />
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

export default connect(mapStateToProps, mapDispatchToProps)(PaymentMethodScreen)
