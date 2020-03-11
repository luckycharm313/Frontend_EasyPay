import React, { Component } from 'react'
import { SafeAreaView, Text, View, Image } from 'react-native'
import { connect } from 'react-redux'
import { Button } from 'react-native-elements'

import Header from "../Components/Header";
// Styles
import { Images } from '../Themes/'
import styles from './Styles/TipScreenStyle'

class TipScreen extends Component {
  
  onSkipHandle = () => {
    this.props.navigation.navigate('ResultScreen')
  }

  onTipHandle = () => {

  }

  onSelectTipHandle = (e) => {

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
                  buttonStyle={[styles.buttonStyle, {aspectRatio: 1,}]}
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
                  buttonStyle={[styles.buttonStyle, {aspectRatio: 1,}]}
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
                  buttonStyle={[styles.buttonStyle, {aspectRatio: 1,}]}
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
                  buttonStyle={[styles.buttonStyle, {aspectRatio: 1,}]}
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

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TipScreen)
