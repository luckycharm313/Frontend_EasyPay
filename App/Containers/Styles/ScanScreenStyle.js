import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  screenContainer: {
    flex: 1,
    paddingVertical: Metrics.mainVertical,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  btnWrapper: {
    position: 'absolute',
    bottom: 30,
  },
  btnCancel: {
    backgroundColor: Colors.primaryLight,    
    paddingHorizontal: 40,
    borderColor: Colors.white,
    borderWidth: 1,
  },
  btnCancelTitleStyle: {
    fontSize: 16,
    color: Colors.white,
    fontFamily: Fonts.type.bold,
  },
  payContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  paperContainer: {
    // flex: 1,
    marginTop: 40,
    backgroundColor: Colors.white,
    borderRadius: Metrics.mainRadius * 3,
    padding: Metrics.mainHorizontal
  },
  paperHeaderContainer: {
    alignItems: 'center'
  },
  textResName: {
    fontSize: 20,
    color: Colors.black,
    fontWeight: '700',
    marginBottom: 5,
    marginTop: 10
  },
  textAddressName: {
    fontSize: 13,
    color: Colors.black,
    letterSpacing: 0.5,
    marginVertical: 2
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 3,    
  },
  orderLeft: {
    fontSize: 16,
    color: Colors.black,
    flex: 1,
    marginRight: 5
  },
  orderRight: {
    fontSize: 16,
    color: Colors.black,
  },
  totalLeft: {
    fontSize: 17,
    color: Colors.black,
    flex: 1,
    marginRight: 20,
    textAlign: 'right'
  },
  totalRight: {
    textAlign: 'right',
    width: '30%',
    fontSize: 17,
    color: Colors.black,
  }
})
