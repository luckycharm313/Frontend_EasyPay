import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  labelText: {
    fontSize: 21,
    color: Colors.white,
    fontFamily: Fonts.type.bold,
    marginVertical: 20,
  },
  descriptionText: {
    fontSize: 14,
    color: Colors.white,
    fontFamily: Fonts.type.bold,
  },
  resendText: {
    fontSize: 14,
    color: Colors.white,
    fontFamily: Fonts.type.bold,
  },
  codeContainer: {
    flex: null,
    justifyContent: 'space-evenly',
    marginBottom: 30,
    marginTop: 50
  },
  codeInput: {
    fontSize: 16,
    color: Colors.white,
    fontFamily: Fonts.type.bold,
  }
})
