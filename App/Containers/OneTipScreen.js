import React, { Component } from 'react'
import { SafeAreaView, Text, View, Image } from 'react-native'
import { connect } from 'react-redux'
import { Button } from 'react-native-elements'
import Toast from 'react-native-simple-toast'
import { requestOneTimePayment } from 'react-native-paypal'
import Header from "../Components/Header";
import ReceiptAction from '../Redux/ReceiptRedux'
import UserAction from '../Redux/UserRedux'
// Styles
import { Images, Colors } from '../Themes/'

import styles from './Styles/TipScreenStyle'

class OneTipScreen extends Component {

  constructor(props) {
    super(props);
    const {navigation} = this.props
    const { state : {params}} = navigation
    this.state = {
      receiptInfo: params.receiptInfo,
      user_id: params.user_id,
      tip: 0
    }
  }
  componentDidMount() {
    this.props.getOneUserInfo({
      user_id: this.state.user_id
    });
  }

  onSkipHandle = async () => {
    if(this.props.info.paypal) {
      // var token = this.props.info.paypal

      // let receipt = this.state.receiptInfo.receipt;
      // let sub_receipts = this.state.receiptInfo.sub_receipts;
      // var amount = 0;
      
      // if( Object.keys(sub_receipts).length > 0 ) {
      //   amount = parseFloat(sub_receipts.cost);
      // } else {
      //   amount = parseFloat(receipt.total);
      // }

      // const result = await requestOneTimePayment(
      //   token,
      //   {
      //     amount: amount,
      //     currency: 'USD',
      //     shippingAddressRequired: false,
      //     userAction: 'commit',
      //     intent: 'authorize', 
      //   }
      // );
      // console.log(result)
    } else {
      var params = {
        user_id: this.state.user_id,
        receiptInfo : this.state.receiptInfo,
        percent: 0,
        tip: 0
      }
      this.props.payOneReceipt(params)
    }    
  }

  onTipHandle = () => {
    if( this.state.tip === 0 ) return Toast.show('Select the tip');
    if(this.props.info.paypal) {

    } else {
      let _tip = parseInt(this.state.tip) * parseFloat(Object.keys(this.state.receiptInfo.sub_receipts).length > 0 ? this.state.receiptInfo.sub_receipts.cost : this.state.receiptInfo.receipt.total ) / 100;
      var params = {
        user_id: this.state.user_id,
        receiptInfo : this.state.receiptInfo,
        tip: _tip,
        percent: this.state.tip
      }
      this.props.payOneReceipt(params)
    }
  }

  onSelectTipHandle = (e) => {
    this.setState({ tip: parseInt(e)})
  }

  render () {
    return (
      <SafeAreaView style={styles.container}>
        <Header
          leftButton="back"
          navigation={this.props.navigation}
        />
        <View style={styles.mainPaddingContainer}>
          <Text style={styles.labelText}>TIP</Text>
          <View style={styles.verticalCenterContainer}>
            <View style={styles.tipContainer}>
              <View style={styles.tipItemContainer}>
                <Image
                  source={Images.icons_wink}
                  style={styles.iconStyle}
                />
                <Button
                  title='5%'
                  titleStyle={styles.buttonTitleStyle}
                  buttonStyle={[styles.buttonStyle, { aspectRatio: 1,}, this.state.tip == 5 && { backgroundColor:  Colors.primaryDark}]}
                  containerStyle={[styles.buttonContainerStyle, {width: '90%',}]}
                  onPress={() => this.onSelectTipHandle(5)}
                />
              </View>
              <View style={styles.tipItemContainer}>
                <Image
                  source={Images.icons_cool}
                  style={styles.iconStyle}
                />
                <Button
                  title='10%'
                  titleStyle={styles.buttonTitleStyle}
                  buttonStyle={[styles.buttonStyle, {aspectRatio: 1,}, this.state.tip == 10 && { backgroundColor:  Colors.primaryDark}]}
                  containerStyle={[styles.buttonContainerStyle, {width: '90%',}]}
                  onPress={() => this.onSelectTipHandle(10)}
                />
              </View>
              <View style={styles.tipItemContainer}>
                <Image
                  source={Images.icons_happy}
                  style={styles.iconStyle}
                />
                <Button
                  title='15%'
                  titleStyle={styles.buttonTitleStyle}
                  buttonStyle={[styles.buttonStyle, {aspectRatio: 1,}, this.state.tip == 15 && { backgroundColor:  Colors.primaryDark}]}
                  containerStyle={[styles.buttonContainerStyle, {width: '90%',}]}
                  onPress={() => this.onSelectTipHandle(15)}
                />
              </View>
              <View style={styles.tipItemContainer}>
                <Image
                  source={Images.icons_tongue_out}
                  style={styles.iconStyle}
                />
                <Button
                  title='20%'
                  titleStyle={styles.buttonTitleStyle}
                  buttonStyle={[styles.buttonStyle, {aspectRatio: 1,}, this.state.tip == 20 && { backgroundColor:  Colors.primaryDark}]}
                  containerStyle={[styles.buttonContainerStyle, {width: '90%',}]}
                  onPress={() => this.onSelectTipHandle(20)}
                />
              </View>
            </View>
            <Text style={styles.desText}>I acknowledge that my tip option will be added to my original charge.</Text>
            <Button
              title='TIP'
              titleStyle={styles.buttonTitleStyle}
              buttonStyle={styles.buttonStyle}
              containerStyle={[styles.buttonContainerStyle, { marginTop: 50}]}
              onPress={this.onTipHandle}
            />
            <Button
              title='SKIP'
              titleStyle={styles.buttonTitleStyle}
              buttonStyle={styles.buttonStyle}
              containerStyle={[styles.buttonContainerStyle, {}]}
              onPress={this.onSkipHandle}
            />
          </View>
        </View>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = ({user}) => {
  return {
    info: user.info,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getOneUserInfo: (params) => dispatch(UserAction.getOneUserInfo(params)),
    payOneReceipt: (params) => dispatch(ReceiptAction.payOneReceipt(params)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OneTipScreen)
