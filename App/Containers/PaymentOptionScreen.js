import React, { Component } from 'react'
import { SafeAreaView, Text, View, TouchableOpacity, Keyboard, LayoutAnimation, TouchableWithoutFeedback } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import UserAction from '../Redux/UserRedux'
import Header from '../Components/Header'
import { getCardLastNumber } from '../Services/Constant'
// Styles
import { Colors } from '../Themes'
import styles from './Styles/PaymentOptionScreenStyle'

class PaymentOptionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyboardHeight: 0,
      isOpenModal: false,
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

  componentDidMount() {
    this.props.getUserInfo();
  }

  onSelectPaymentHandle = () => {
    this.setState({isOpenModal: true})
  }

  onReplaceHandle = () => {
    this.setState({isOpenModal: false})
    this.props.navigation.navigate('CardReplaceScreen')
  }

  onCancelHandle = () => {
    this.setState({isOpenModal: false})
  }

  render () {
    
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <SafeAreaView style={styles.container}>
          <Header leftButton="back"  nextScreen='HomeScreen' navigation={this.props.navigation}/>
          <View style={styles.mainPaddingContainer}>
            <TouchableOpacity
              style={styles.paymentContainer}
              onPress={this.onSelectPaymentHandle}
            >
              <Icon name="credit-card" style={styles.icon} />
              <Text style={styles.paymentText}>Current Card ending in {
                Object.keys(this.props.info).length > 0 && getCardLastNumber(this.props.info.card_number)
              }
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.modalContainer, this.state.isOpenModal ? {display: 'flex'} : '', {bottom: this.state.keyboardHeight}]}>
            <TouchableOpacity style={styles.modalItem} onPress={this.onReplaceHandle}>
              <Text style={styles.modalText}>Replace Card</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalItem} onPress={this.onCancelHandle}>
              <Text style={[ styles.modalText, { color: Colors.primary }]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    )
  }
}

const mapStateToProps = ({ user }) => {
  return {
    info: user.info,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserInfo: () => dispatch(UserAction.getUserInfo()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentOptionScreen)
