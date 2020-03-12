import React, { Component } from 'react'
import { SafeAreaView, Text, View, FlatList } from "react-native";
import { connect } from 'react-redux'

// Styles
import styles from './Styles/HistoryScreenStyle'

class HistoryScreen extends Component {
  renderItem = (e) => {
    return (
      <View style={styles.transactionItem}>
        <Text style={styles.transactionLeft}>Feb 02 2020</Text>
        <Text style={styles.transactionRight}>Paid Angie’s burger</Text>
      </View>
    )
  }

  render () {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.mainPaddingContainer}>
          <Text style={styles.labelText}>Recent Activity</Text>
          <FlatList
            style={styles.transactionContainer}
            showsVerticalScrollIndicator={false}
            data={[1,2,3,1,1,1,52,2,2,2,2]}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this.renderItem}
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

export default connect(mapStateToProps, mapDispatchToProps)(HistoryScreen)
