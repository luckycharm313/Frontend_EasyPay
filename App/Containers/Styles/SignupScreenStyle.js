import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  screenContainer: {
    flex: 1,
    paddingVertical: Metrics.mainVertical,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  bottomContainer: {
    flex: 1,
    marginHorizontal: Metrics.mainHorizontal,
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  bottomText: {
    fontSize: 15,
    color: Colors.white,
    marginVertical: Metrics.mainVertical
  },
})
