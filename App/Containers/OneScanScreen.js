import React, { Component } from 'react'
import {
  SafeAreaView,
  View,
  Platform,
  Alert,
  Text,
  FlatList,
  Image
} from 'react-native';
import { connect } from 'react-redux'
import Dash from 'react-native-dash'
import { Button } from 'react-native-elements'
import QRCodeScanner from 'react-native-qrcode-scanner'
import {check, openSettings, PERMISSIONS, RESULTS} from 'react-native-permissions'
import Toast from 'react-native-simple-toast';
import { Svg, Defs, Rect, Mask } from 'react-native-svg';
import Header from '../Components/Header';
import ReceiptAction from '../Redux/ReceiptRedux';
import { currencyFormat } from '../Services/Constant'
// Styles
import { Colors, Metrics, Fonts, Images } from '../Themes';

import styles from './Styles/ScanScreenStyle'

class OneScanScreen extends Component {
  constructor(props) {
    super(props);
    const {navigation} = this.props
    const { state : {params}} = navigation
    this.state = {
      user_id: params.user_id,
      isPay: false,
      isScan: true
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.isLoad !== this.props.isLoad && nextProps.isLoad === true){
      this.setState({ isPay: true, isScan: false })
    }
  }

  componentDidMount () {
    check(
      Platform.select({
        android: PERMISSIONS.ANDROID.CAMERA,
        ios: PERMISSIONS.IOS.CAMERA,
      })
    ).then(result => {
      if(result !== RESULTS.GRANTED) {
        if ( result === RESULTS.DENIED ) {
          request(
            Platform.select({
              android: PERMISSIONS.ANDROID.CAMERA,
              ios: PERMISSIONS.IOS.CAMERA,
            }),
          )
        } else {
          if(Platform.OS == 'android'){
            Alert.alert(
              'Can we access your camera?',
              'We need to set camera permission so you can scan a QRcode. Please Open setting.',
              [
                {
                  text: 'OK',
                  onPress: () => openSettings().catch(() => console.warn('cannot open settings'))
                },
              ],
            )
          }
          else {
            openSettings().catch(() => console.warn('cannot open settings'))
          }          
        }
      }
    })
    .catch(error => {
      
    });
  }

  onScanHandle = () => {
    this.setState({isScan: true, isPay: false})
  }
  onPayHandle = () => {
    this.setState({isScan: false, isPay: false})
    let receipt = this.props.receiptInfo.receipt;
    let sub_receipts = this.props.receiptInfo.sub_receipts;
    if(receipt.status === 1 || (Object.keys(sub_receipts).length > 0 && sub_receipts.status === 1))
      return Toast.show('This receipt was already paid.');

    this.props.navigation.navigate('OneTipScreen', { receiptInfo: this.props.receiptInfo, user_id: this.state.user_id })
  }

  onCancelHandle = () => {
    this.setState({ isScan: false })
  }

  isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

  onSuccess = ( e ) => {
    if( e.data && this.isJson(e.data) && JSON.parse(e.data).hasOwnProperty('receipt_id')) {
      let data = JSON.parse(e.data)
      console.log({data})
      var params = {
        receipt_id: data.receipt_id, //4
        sub_receipt_id: data.sub_receipt_id //0
      }
  
      this.props.getReceipt(params)
    } else {
      return Toast.show('This is not an easy pay generated QR code! Try again');
    }    
  }

  renderItem = ({ item }) => {
    if( Object.keys(this.props.receiptInfo.sub_receipts).length > 0 ) return null;
    return (
      <View style={styles.orderItem}>
        <Text style={styles.orderLeft}>{item.quantity}&nbsp;{item.name}</Text>
        <Text style={styles.orderRight}>{currencyFormat(parseFloat(item.price) * parseInt(item.quantity))}</Text>
      </View>
    )
  }

  renderFooter = () => {
    let data = this.props.receiptInfo.receipt
    let sub_receipts = this.props.receiptInfo.sub_receipts

    return (
      <View style={{marginBottom: 30}}>
        <View style={[styles.orderItem, { marginTop: 30 }]}>
          <Text style={styles.totalLeft}>Subtotal</Text>
          <Text style={styles.totalRight}>{currencyFormat(data.sub_total)}</Text>
        </View>
        <View style={styles.orderItem}>
          <Text style={styles.totalLeft}>Tax</Text>
          <Text style={styles.totalRight}>{ data.tax }</Text>
        </View>
        <View style={styles.orderItem}>
          <Text style={[styles.totalLeft, { fontWeight: '800' }]}>Total</Text>
          <Text style={[styles.totalRight, { fontWeight: '800' }]}>{currencyFormat(data.total)}</Text>
        </View>
        {
          Object.keys(this.props.receiptInfo.sub_receipts).length > 0 &&
            <View>
              <Dash style={{ width: '100%', height:1, marginVertical: Metrics.mainVertical }}/>
              <Text style={styles.splitText}>PAYMENT ONE</Text>
              <Text style={styles.splitCostText}>{currencyFormat(sub_receipts.cost)}</Text>
            </View>
        }
      </View>
    )
  }

  renderHeader = () => {
    let data = this.props.receiptInfo.employee;
    let receipt = this.props.receiptInfo.receipt;
    let sub_receipts = this.props.receiptInfo.sub_receipts;

    return (
      <View style={styles.paperHeaderContainer}>
        <Text style={styles.textResName}>{data.biz_name}</Text>
        <Text style={styles.textAddressName}>{data.biz_phone}</Text>
        <Text style={styles.textAddressName}>{data.biz_address}</Text>
        <Dash style={{ width: '100%', height:1, marginVertical: 15 }}/>
        {
          (receipt.status === 1 || (Object.keys(sub_receipts).length > 0 && sub_receipts.status === 1)) &&
            <Text style={[styles.splitText, { color: Colors.error }]}>PAID</Text>
        }
        {
          Object.keys(this.props.receiptInfo.sub_receipts).length > 0 &&
            <Text style={styles.splitText}>SPLIT CHECK</Text>
        }
        <View style={[styles.orderItem, { marginVertical: 10 }]}>
          <Text style={[styles.totalLeft, { fontWeight: '800'} ]}>Receipt No</Text>
          <Text style={[styles.totalRight, { width: null, fontWeight: '800' }]}>
            {receipt.id}
            { Object.keys(this.props.receiptInfo.sub_receipts).length > 0 && '-'+sub_receipts.id}
          </Text>
        </View>
      </View>
    )
  }

  render () {
    const { isPay, isScan } = this.state
    return (
      <View style={{ flex: 1 }}>
        { isScan ? (
          <View style={{flex: 1}}>
            <QRCodeScanner
              cameraStyle={{height: '100%'}}
              showMarker={true}
              reactivate={true}
              customMarker={
                <View style={styles.rectangleContainer}>
                  <View style={styles.topOverlay}>
                  </View>
                  <View style={{ flexDirection: "row", width: "100%" }}>
                    <View style={styles.leftAndRightOverlay} />      
                    <View style={styles.rectangle}>
                      <Svg height="100%" width="100%" style={{ borderRadius: 18, borderColor: Colors.white, borderWidth: 2}}>
                          <Defs>
                              <Mask id="mask" x="0" y="0" height="100%" width="100%">
                                  <Rect height="100%" width="100%" fill="#fff"/>
                                  <Rect height="100%" width="100%" rx="20" fill="#000"/>
                              </Mask>
                          </Defs>
                          <Rect height="100%" width="100%" fill="rgba(0, 0, 0, 0.5)" mask="url(#mask)"/>
                      </Svg>
                    </View>
                    <View style={styles.leftAndRightOverlay} />
                  </View>
                  <View style={styles.bottomOverlay} >
                    <Text style={{ fontSize: Fonts.size.middle, color: Colors.white, marginTop: Metrics.mainHorizontal, textAlign: 'center' }}>
                      Move camera to scan QR code
                    </Text>
                  </View>
                </View>
              }
              onRead={this.onSuccess}
              bottomContent={
                <View style={styles.btnWrapper}>
                  <Button title='Cancel' buttonStyle={styles.btnCancel} titleStyle={styles.buttonTitleStyle} onPress={this.onCancelHandle} />
                </View>
              }
            />
          </View>
        ) : (
          <SafeAreaView style={styles.container}>
            <Header leftButton="back" navigation={this.props.navigation}/> 
            <View style={[styles.mainPaddingContainer, styles.screenContainer ]}>
              {
                isPay ? 
                  <View style={styles.payContainer}>
                    {
                      Object.keys(this.props.receiptInfo).length > 0 &&
                        <FlatList
                          style={styles.paperContainer}
                          showsVerticalScrollIndicator={false}
                          data={this.props.receiptInfo.orders}
                          keyExtractor={(item, index) => index.toString()}
                          renderItem={this.renderItem}
                          ListHeaderComponent={this.renderHeader}
                          ListFooterComponent={this.renderFooter}
                        />
                    }                   
                    <Button
                      title='TAP TO PAY'
                      titleStyle={styles.buttonTitleStyle}
                      buttonStyle={styles.buttonStyle}
                      containerStyle={[styles.buttonContainerStyle, {marginTop: 40}]}
                      onPress={this.onPayHandle}
                    />
                  </View>
                :
                <Button
                  title='SCAN QR CODE TO PAY'
                  titleStyle={styles.buttonTitleStyle}
                  buttonStyle={[styles.buttonStyle, { backgroundColor: Colors.primaryDark, height: Metrics.screenWidth - 80, borderRadius: 20 }]}
                  containerStyle={[styles.buttonContainerStyle, { marginHorizontal: 20}]}
                  onPress={this.onScanHandle}
                />
              }
            </View>
          </SafeAreaView>
        )}
      </View>      
    );
  }
}

const mapStateToProps = ({ receipt }) => {
  return {
    isLoad: receipt.isLoad,
    receiptInfo: receipt.receiptInfo
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getReceipt: (params) => dispatch(ReceiptAction.getReceipt(params)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OneScanScreen)
