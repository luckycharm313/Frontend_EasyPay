import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  emailView: {
    alignItems: 'center'
  },
  emailBox: {
    width: Metrics.screenWidth * 0.7,
    height: Metrics.screenWidth * 0.7,
  },
  textSupport: {
    marginTop: Metrics.section.doubleXl,
    fontSize: Fonts.size.middle,
    color: Colors.white,
    fontWeight: '600',
    textAlign: 'center'
  }
})
