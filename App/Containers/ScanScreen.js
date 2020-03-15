import React, { Component } from 'react';
import {
  SafeAreaView,
  View,
  Platform,
  Alert,
  Text,
  FlatList
} from 'react-native';
import { connect } from 'react-redux';
import Dash from 'react-native-dash'
import { Button } from 'react-native-elements'
import QRCodeScanner from 'react-native-qrcode-scanner'
import {check, openSettings, PERMISSIONS, RESULTS} from 'react-native-permissions'
import Header from '../Components/Header'
// Styles
import { Colors, Metrics } from '../Themes';
import styles from './Styles/ScanScreenStyle';

class ScanScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPay: true,
      isScan: false
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
    this.props.navigation.navigate('TipScreen')
  }

  onCancelHandle = () => {
    this.setState({ isScan: false })
  }

  renderItem = (e) => {
    return (
      <View style={styles.orderItem}>
        <Text style={styles.orderLeft}>1 horse beer</Text>
        <Text style={styles.orderRight}>9.00</Text>
      </View>
    )
  }

  renderFooter = () => {
    return (
      <View style={{marginBottom: 30}}>
        <View style={[styles.orderItem, { marginTop: 30 }]}>
          <Text style={styles.totalLeft}>Subtotal</Text>
          <Text style={styles.totalRight}>14.00</Text>
        </View>
        <View style={styles.orderItem}>
          <Text style={styles.totalLeft}>Tax</Text>
          <Text style={styles.totalRight}>2.00</Text>
        </View>
        <View style={styles.orderItem}>
          <Text style={[styles.totalLeft, { fontWeight: '800' }]}>Total</Text>
          <Text style={[styles.totalRight, { fontWeight: '800' }]}>16.00</Text>
        </View>
      </View>
    )
  }

  renderHeader = () => {
    return (
      <View style={styles.paperHeaderContainer}>
        <Text style={styles.textResName}>Tom's Cafe</Text>
        <Text style={styles.textAddressName}>(702)220-0000</Text>
        <Text style={styles.textAddressName}>111, your address</Text>
        <Text style={styles.textAddressName}>Denver, CO 80204</Text>
        <Dash style={{ width: '100%', height:1, marginVertical: 15 }}/>
        <View style={[styles.orderItem, { marginVertical: 10 }]}>
          <Text style={[styles.totalLeft, { fontWeight: '800'} ]}>Receipt No</Text>
          <Text style={[styles.totalRight, { width: null, fontWeight: '800' }]}>0001</Text>
        </View>
      </View>
    )
  }

  render() {  
    const {isPay, isScan} = this.state
    return (
      <SafeAreaView style={styles.container}>
        <Header leftButton="setting" navigation={this.props.navigation}/>
        { isScan ? (
          <View style={{flex: 1}}>
            <QRCodeScanner
              cameraStyle={{height: '100%'}}
              onRead={() => console.log('')}
              bottomContent={
                <View style={styles.btnWrapper}>
                  <Button title='Cancel' buttonStyle={styles.btnCancel} titleStyle={styles.buttonTitleStyle} onPress={this.onCancelHandle} />
                </View>
              }
            />
          </View>
        ) : (          
          <View style={[styles.mainPaddingContainer, styles.screenContainer ]}>
            {
              isPay ? 
                <View style={styles.payContainer}>
                   <FlatList
                    style={styles.paperContainer}
                    showsVerticalScrollIndicator={false}
                    data={[1,2,3,1,1,1,52,2,2,2,2]}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={this.renderItem}
                    ListHeaderComponent={this.renderHeader}
                    ListFooterComponent={this.renderFooter}
                  />                 
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
                title='SCAN CODE TO PAY'
                titleStyle={styles.buttonTitleStyle}
                buttonStyle={[styles.buttonStyle, { backgroundColor: Colors.primaryDark, height: Metrics.screenWidth - 80, borderRadius: 20 }]}
                containerStyle={[styles.buttonContainerStyle, { marginHorizontal: 20}]}
                onPress={this.onScanHandle}
              />
            }
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ScanScreen);
