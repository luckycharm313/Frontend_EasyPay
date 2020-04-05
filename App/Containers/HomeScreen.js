import React, { Component } from 'react'
import { SafeAreaView, Text, View, FlatList } from "react-native";
import { connect } from 'react-redux'
import { Button } from 'react-native-elements'
import moment from 'moment'
import SplashScreen from 'react-native-splash-screen'

import Header from '../Components/Header'
import ReceiptAction from '../Redux/ReceiptRedux'
// Styles
import styles from './Styles/HomeScreenStyle'

class HomeScreen extends Component {

  componentDidMount() {
    setTimeout(() => SplashScreen.hide(), 3000);
    var params = {
      limit: 20
    }
    this.props.loadHistory(params);
  }

  renderItem = ({ item }) => {
    var _date = moment.unix(item.paid_date).format('MMM DD YYYY')
    return (
      <View style={styles.transactionItem}>
        <Text style={styles.transactionLeft}>{_date}</Text>
        <Text style={styles.transactionRight}>Paid {item.biz_name}</Text>
      </View>
    )
  }

  onTapHandle = () => {
    this.props.navigation.navigate('ScanScreen')
  }

  onSeletePaymentHandle = () => {
    this.props.navigation.navigate('PaymentOptionScreen')
  }
  
  render () {
    return (
      <SafeAreaView style={styles.container}>
        <Header leftButton="setting" navigation={this.props.navigation}/>
        <View style={styles.mainPaddingContainer}>
          <View style={styles.listContainer}>
            {
              this.props.receiptList.length > 0 ? 
                <FlatList
                  style={styles.transactionContainer}
                  showsVerticalScrollIndicator={false}
                  data={this.props.receiptList}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={this.renderItem}
                />
              :
              <Text style={styles.txtNoActivity}>You have no activities yet, start making payments and your recent activities will begin to pop up</Text>
            }
            
          </View>
          <View style={styles.bottomContainer}>
            <Button
              title='TAP TO PAY'
              titleStyle={styles.buttonTitleStyle}
              buttonStyle={styles.buttonStyle}
              containerStyle={styles.buttonContainerStyle}
              onPress={this.onTapHandle}
            />
            <Button
              title='PAYMENT OPTIONS'
              titleStyle={styles.buttonTitleStyle}
              buttonStyle={styles.buttonStyle}
              containerStyle={styles.buttonContainerStyle}
              onPress={this.onSeletePaymentHandle}
            />
          </View>          
        </View>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = ({ receipt }) => {
  return {
    receiptList: receipt.receiptList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadHistory: (params) => dispatch(ReceiptAction.loadHistory(params)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
