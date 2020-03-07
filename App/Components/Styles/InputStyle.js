import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'
export default StyleSheet.create({
  inputContainer: {
    marginVertical: Metrics.mainVertical,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.darkWhite,
    borderRadius: Metrics.mainRadius,
    paddingHorizontal: Metrics.mainHorizontal,
    paddingVertical: Metrics.mainVertical,
  },
	input: {
    flex: 1,
    fontSize: Fonts.size.middle,
		textAlign: 'left',
    color: Colors.primary,
  }
})
