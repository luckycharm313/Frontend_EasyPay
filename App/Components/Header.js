import React, { Component } from "react";
import { connect } from 'react-redux'
import { View, TouchableOpacity, Image } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from "./Styles/HeaderStyle";
import { Images } from "../Themes";

class Header extends Component {
  render() {
    return (
      <View style={styles.container}>
        {this.props.leftButton === "back" ? (
          <TouchableOpacity
            style={styles.iconLeft}
            onPress={() => this.props.navigation.goBack()}
          >
            <Icon name="keyboard-arrow-left" style={styles.iconBack} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.iconLeft}
            onPress={
              () => this.props.navigation.openDrawer()
            }
          >
            <Icon name="settings" style={styles.iconSetting} />
          </TouchableOpacity>
        )}
        { !this.props.photo ? (
          <TouchableOpacity style={styles.iconRight}>
            <Icon name="account-circle" style={styles.icon} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.iconRight}>
            <Image source={Images.header} style={styles.logo} />
          </TouchableOpacity>
        )}
      </View>
    );
  }
}
const mapStateToProps = ({user}) => {
  return {
    photo: user.profile.photo
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)