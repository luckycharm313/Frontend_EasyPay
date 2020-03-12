import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  resultContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  textSuccess: {
    fontSize: Fonts.size.input,
    color: Colors.white,
    marginVertical: Metrics.mainVertical * 0.5
  },
  textResultSuccess: {
    fontSize: Fonts.size.h6,
    color: Colors.white,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 50,
    marginBottom: Metrics.mainVertical
  },
})
