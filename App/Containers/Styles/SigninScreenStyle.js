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
  labelText: {
    fontSize: 21,
    color: Colors.white,
    fontFamily: Fonts.type.bold,
    marginVertical: 20,
  },
  bottomText: {
    fontSize: 14,
    color: Colors.lightWhite,
    fontFamily: Fonts.type.bold,
    marginTop: 20
  }
})
