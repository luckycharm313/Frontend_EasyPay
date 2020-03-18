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
  policyText: {
    fontSize: 15,
    color: Colors.white,
    marginVertical: Metrics.mainVertical
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',    
  },
  icon: {
    fontSize: Fonts.size.h6,
    color: Colors.white,
    marginRight: Metrics.section.small    
  }
})
