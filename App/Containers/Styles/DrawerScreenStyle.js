import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '../../Themes/'
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryDark
  },
  itemContainer: {
    marginHorizontal: Metrics.section.medium,
    borderBottomWidth: 1,
    borderBottomColor: Colors.white
  },
  item: {
    borderRadius: Metrics.mainRadius,
    paddingHorizontal: Metrics.section.small,
    paddingVertical: Metrics.section.medium,
    marginVertical: 2,
  },
  textTitle: {
    color: Colors.lightWhite,
    fontWeight: '600',
    fontSize: Fonts.size.popular
  }
})
