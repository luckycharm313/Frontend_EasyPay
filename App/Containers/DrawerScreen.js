import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, SafeAreaView, TouchableOpacity, AsyncStorage } from 'react-native'
import {NavigationActions, DrawerActions} from 'react-navigation'

// Styles
import { Colors } from '../Themes'
import styles from './Styles/DrawerScreenStyle'

class DrawerScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: '',
    };
  }

  navigateToScreen = (route, name) => () => {
    this.setState({isActive: name})
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
    this.props.navigation.dispatch(DrawerActions.closeDrawer())
  }

  onLogOutHandle = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('LaunchScreen');
  }

  render () {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.itemContainer} onPress={this.navigateToScreen('HomeScreen', 'Home')}>
          <View style={[styles.item, this.state.isActive == 'Home' && { backgroundColor: Colors.primaryLight}]}>
            <Text style={ styles.textTitle }>Home</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={ styles.itemContainer } onPress={() => console.log('')}>
          <View style={[ styles.item ]}>
            <Text style={ styles.textTitle }>Profile</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={ styles.itemContainer } onPress={() => console.log('')}>
          <View style={[ styles.item ]}>
            <Text style={ styles.textTitle }>Support</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={ styles.itemContainer } onPress={() => console.log('')}>
          <View style={[ styles.item ]}>
            <Text style={ styles.textTitle }>History</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={ styles.itemContainer } onPress={this.onLogOutHandle}>
          <View style={[ styles.item ]}>
            <Text style={ styles.textTitle }>Log Out</Text>
          </View>
        </TouchableOpacity>
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

export default connect(mapStateToProps, mapDispatchToProps)(DrawerScreen)
