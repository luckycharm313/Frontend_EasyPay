import { StyleSheet } from 'react-native'
import { ApplicationStyles, Fonts, Metrics, Colors } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  labelText: {
    fontSize: 21,
    color: Colors.white,
    fontFamily: Fonts.type.bold,
    marginBottom: 20,
    marginTop: 50,
  },
  transactionContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
  transactionItem: {
    backgroundColor: Colors.white,
    paddingHorizontal: Metrics.mainHorizontal,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: Metrics.mainRadius
  },
  transactionLeft: {
    fontSize: Fonts.size.middle,
    color: Colors.ember,
    fontWeight: '600'
  },
  transactionRight: {
    flex: 1,
    marginLeft: Metrics.mainHorizontal,
    fontSize: Fonts.size.medium,
    color: Colors.black,
    fontWeight: '500'
  },
})
