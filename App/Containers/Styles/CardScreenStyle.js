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
  field: {
    color: '#449aeb',
    borderColor: Colors.white,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: Colors.white,
    overflow: 'hidden',
  }
})
