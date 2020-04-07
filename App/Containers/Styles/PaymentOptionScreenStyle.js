import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Fonts, Colors } from '../../Themes/'

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
    marginTop: Metrics.mainVertical
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
  modalContainer: {
    display: 'none',
    opacity: 0,
    backgroundColor: Colors.white,
    borderTopLeftRadius: Metrics.mainRadius * 6,
    borderTopRightRadius: Metrics.mainRadius * 6,
    paddingVertical: Metrics.section.doubleXl,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: Metrics.mainRadius,

    elevation: 5,
  },
  modalItem: {
    borderTopWidth: 1,
    borderTopColor: Colors.textHintColor,
    paddingVertical: Metrics.section.medium,
    alignItems: 'center',
  },
  modalText: {
    fontSize: Fonts.size.regular,
    fontWeight: '500',
    color: Colors.black
  },
})
