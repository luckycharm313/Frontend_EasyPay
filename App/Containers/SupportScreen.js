import React, { Component } from 'react'
import { SafeAreaView, Text, View, Image } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Button } from 'react-native-elements'
import Header from '../Components/Header'
// Styles
import { Images } from '../Themes'
import styles from './Styles/SupportScreenStyle'

class SupportScreen extends Component {
  onHandle = () => {
    this.props.navigation.navigate('HomeScreen')
  }

  render () {
    return (
      <SafeAreaView style={styles.container}>
        <Header leftButton="setting" navigation={this.props.navigation}/>
        <View style={[styles.mainPaddingContainer, styles.verticalCenterContainer]}>
          <View style={styles.emailView}>
            <Image source={Images.email_box} style={styles.emailBox}/>
          </View>
          <Text style={[ styles.textSupport, { textAlign: 'center'}]}>For questions and inquiries, </Text>
          <Text style={[ styles.textSupport, { marginTop: 0 } ]}>Please contact : <Text style={{ textDecorationLine: 'underline', fontWeight: '800' }}>Support@easypayplatform.io</Text>. We will get back as soon as possible</Text>
          <Button
            title='BACK TO HOME'
            titleStyle={styles.buttonTitleStyle}
            buttonStyle={styles.buttonStyle}
            containerStyle={[styles.buttonContainerStyle, { marginTop: 50}]}
            onPress={this.onHandle}
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

export default connect(mapStateToProps, mapDispatchToProps)(SupportScreen)
