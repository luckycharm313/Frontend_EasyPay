import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { Dimensions, View, Text } from 'react-native'
import * as Animatable from 'react-native-animatable'

const IMAGE_DIMENSIONS = { width: 49, height: 26 };
const SCREEN_DIMENSIONS = Dimensions.get('window');
const WIGGLE_ROOM = 50;

import styles from './Styles/RainAnimationStyle'

const FlippingImage = ({
  back = false,
  delay,
  duration = 1000,
  source,
  style = {},
}) => (
  <Animatable.Image
    animation={{
      from: {
        rotateX: back ? '0deg' : '180deg',
        rotate: !back ? '180deg' : '0deg',
      },
      to: {
        rotateX: back ? '360deg' : '-180deg',
        rotate: !back ? '180deg' : '0deg',
      },
    }}
    duration={duration}
    delay={delay}
    easing="linear"
    iterationCount="infinite"
    useNativeDriver
    source={source}
    style={{
      ...style,
      backfaceVisibility: 'hidden',
    }}
  />
);

const Swinging = ({
  amplitude,
  rotation = 7,
  delay,
  duration = 700,
  children,
}) => (
  <Animatable.View
    animation={{
      0: {
        translateX: -amplitude,
        translateY: -amplitude * 0.8,
        rotate: `${rotation}deg`,
      },
      0.5: {
        translateX: 0,
        translateY: 0,
        rotate: '0deg',
      },
      1: {
        translateX: amplitude,
        translateY: -amplitude * 0.8,
        rotate: `${-rotation}deg`,
      },
    }}
    delay={delay}
    duration={duration}
    direction="alternate"
    easing="ease-in-out"
    iterationCount="infinite"
    useNativeDriver>
    {children}
  </Animatable.View>
);

const Falling = ({ duration, delay, style, children }) => (
  <Animatable.View
    animation={{
      from: { translateY: -IMAGE_DIMENSIONS.height - WIGGLE_ROOM },
      to: { translateY: SCREEN_DIMENSIONS.height + WIGGLE_ROOM },
    }}
    duration={duration}
    delay={delay}
    easing={t => Math.pow(t, 1.7)}
    iterationCount="infinite"
    useNativeDriver
    style={style}>
    {children}
  </Animatable.View>
);

export default class RainAnimation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 15,
      duration: 3000
    };
  }

  randomize = max => Math.random() * max;
  
  range = count => {
    const array = [];
    for (let i = 0; i < count; i++) {
      array.push(i);
    }
    return array;
  };

  render () {
    const { count, duration } = this.state
    return (
      <View>
        {this.range(count)
          .map(i => this.randomize(1000))
          .map((flipDelay, i) => (
            <Falling
              key={i}
              duration={duration}
              delay={i * (duration / count)}
              style={{
                position: 'absolute',
                paddingHorizontal: WIGGLE_ROOM,
                left:
                  this.randomize(SCREEN_DIMENSIONS.width - IMAGE_DIMENSIONS.width) -
                  WIGGLE_ROOM,
              }}>
              <Swinging
                amplitude={IMAGE_DIMENSIONS.width / 5}
                delay={this.randomize(duration)}>
                <FlippingImage source={this.props.imgA} delay={flipDelay} />
                <FlippingImage
                  source={this.props.imgB}
                  delay={flipDelay}
                  back
                  style={{ position: 'absolute' }}
                />
              </Swinging>
            </Falling>
          ))}
      </View>
    )
  }
}
