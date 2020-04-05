import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts } from '../../Themes/'

const SCREEN_WIDTH = Metrics.screenWidth;
const overlayColor = "rgba(0,0,0,0.5)"; // this gives us a black color with a 50% transparency

const rectDimensions = Metrics.screenWidth * 0.65; // this is equivalent to 255 from a 393 device width
const rectBorderWidth = Metrics.screenWidth * 0.005; // this is equivalent to 2 from a 393 device width

const scanBarWidth = Metrics.screenWidth * 0.46; // this is equivalent to 180 from a 393 device width
const scanBarHeight = Metrics.screenWidth * 0.0025; //this is equivalent to 1 from a 393 device width
const scanBarColor = "#22ff00";

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  screenContainer: {
    flex: 1,
    paddingVertical: Metrics.mainVertical,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  btnWrapper: {
    position: 'absolute',
    bottom: 30,
  },
  btnCancel: {
    backgroundColor: Colors.primaryLight,    
    paddingHorizontal: 40,
    borderColor: Colors.white,
    borderWidth: 1,
  },
  btnCancelTitleStyle: {
    fontSize: 16,
    color: Colors.white,
    fontFamily: Fonts.type.bold,
  },
  payContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  paperContainer: {
    // flex: 1,
    marginTop: 40,
    backgroundColor: Colors.white,
    borderRadius: Metrics.mainRadius * 3,
    padding: Metrics.mainHorizontal
  },
  paperHeaderContainer: {
    alignItems: 'center'
  },
  textResName: {
    fontSize: 20,
    color: Colors.black,
    fontWeight: '700',
    marginBottom: 5,
    marginTop: 10
  },
  textAddressName: {
    fontSize: 13,
    color: Colors.black,
    letterSpacing: 0.5,
    marginVertical: 2
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 3,    
  },
  orderLeft: {
    fontSize: 16,
    color: Colors.black,
    flex: 1,
    marginRight: 5
  },
  orderRight: {
    fontSize: 16,
    color: Colors.black,
  },
  totalLeft: {
    fontSize: 17,
    color: Colors.black,
    flex: 1,
    marginRight: 20,
    textAlign: 'right'
  },
  totalRight: {
    textAlign: 'right',
    width: '30%',
    fontSize: 17,
    color: Colors.black,
  },
  splitText: {
    marginTop: Metrics.section.large,
    marginBottom: Metrics.section.small,
    fontSize: Fonts.size.medium,
    color: Colors.black,
    fontWeight: '800',
    textAlign: 'center'
  },
  splitCostText: {
    textAlign: 'center',
    fontSize: Fonts.size.medium,
    color: Colors.error,
    fontWeight: '700'
  },

  rectangleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },

  rectangle: {
    height: rectDimensions,
    width: rectDimensions,
    padding: Metrics.mainVertical,
    borderWidth: rectBorderWidth,
    borderColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },

  icon_qr: {
    height: '100%',
    width: '100%',
    backgroundColor: Colors.transparent
  },
  topOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    justifyContent: "center",
    alignItems: "center"
  },

  bottomOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    paddingBottom: SCREEN_WIDTH * 0.25
  },

  leftAndRightOverlay: {
    height: SCREEN_WIDTH * 0.65,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor
  },

  scanBar: {
    width: scanBarWidth,
    height: scanBarHeight,
    backgroundColor: scanBarColor
  }
})
