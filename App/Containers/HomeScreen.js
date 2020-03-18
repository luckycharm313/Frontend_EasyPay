import React, { Component } from 'react'
import { SafeAreaView, Text, View, FlatList } from "react-native";
import { connect } from 'react-redux'
import { Button } from 'react-native-elements'
import SplashScreen from 'react-native-splash-screen'

import Header from '../Components/Header'
// Styles
import styles from './Styles/HomeScreenStyle'

class HomeScreen extends Component {

  componentDidMount() {
    setTimeout(() => SplashScreen.hide(), 1000)
  }

  renderItem = (e) => {
    return (
      <View style={styles.transactionItem}>
        <Text style={styles.transactionLeft}>Feb 02 2020</Text>
        <Text style={styles.transactionRight}>Paid Angie’s burger</Text>
      </View>
    )
  }

  onTapHandle = () => {
    this.props.navigation.navigate('ScanScreen')
  }
  render () {
    return (
      <SafeAreaView style={styles.container}>
        <Header leftButton="setting" navigation={this.props.navigation}/>
        <View style={styles.mainPaddingContainer}>
          <View style={styles.listContainer}>
            <FlatList
              style={styles.transactionContainer}
              showsVerticalScrollIndicator={false}
              data={[1,2,3,1,1,1,52,2,2,2,2]}
              keyExtractor={(item, index) => index.toString()}
              renderItem={this.renderItem}
            />
          </View>
          <View style={styles.bottomContainer}>
            <Button
              title='Tap To Pay'
              titleStyle={styles.buttonTitleStyle}
              buttonStyle={styles.buttonStyle}
              containerStyle={styles.buttonContainerStyle}
              onPress={this.onTapHandle}
            />
          </View>          
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
