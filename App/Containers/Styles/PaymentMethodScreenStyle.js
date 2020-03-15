import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  paymentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Metrics.section.medium,
    paddingHorizontal: Metrics.mainHorizontal,
    marginBottom: Metrics.section.small,
    backgroundColor: Colors.lightWhite,
    borderRadius: Metrics.mainRadius,
  },
  icon: {
    width: '10%',
    fontSize: Fonts.size.h6
  },
  paymentText: {
    marginLeft: Metrics.section.small,
    fontSize: Fonts.size.middle,
    fontWeight: '600',
    color: Colors.black
  },
})
