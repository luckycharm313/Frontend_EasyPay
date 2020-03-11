import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Fonts, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  labelText: {
    fontSize: 21,
    color: Colors.white,
    fontFamily: Fonts.type.bold,
    marginVertical: Metrics.mainHorizontal,
    textAlign: 'center',
    letterSpacing: 1.5
  },
  desText: {
    fontSize: Fonts.size.regular,
    color: Colors.white,
    marginTop: Metrics.mainVertical * 2,
    marginBottom: Metrics.mainVertical,
  },
  tipContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Metrics.mainVertical * 2,
  },
  tipItemContainer: {
    alignItems: 'center',
    width: '20%',
  },
  iconStyle: {
    width: 45,
    height: 45,
  }
})
