import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions } from 'react-native';
import Svg, { Image, Circle, ClipPath } from 'react-native-svg';
import Animated from 'react-native-reanimated';
import { State, TapGestureHandler } from 'react-native-gesture-handler';

import runTiming from '../services/runTimingServices';

const {
  Value,
  event,
  block,
  cond,
  eq,
  set,
  Clock,
  interpolate,
  Extrapolate,
  concat,
} = Animated;
const { width, height } = Dimensions.get('window');

class LoginScreen extends Component {
  buttonOpacity = new Value(1);
  onStateChange = event([
    {
      nativeEvent: ({ state }) =>
        block([
          cond(
            eq(state, State.END),
            set(this.buttonOpacity, runTiming(new Clock(), 1, 0)),
          ),
        ]),
    },
  ]);

  onCloseState = event([
    {
      nativeEvent: ({ state }) =>
        block([
          cond(
            eq(state, State.END),
            set(this.buttonOpacity, runTiming(new Clock(), 0, 1)),
          ),
        ]),
    },
  ]);

  buttonY = interpolate(this.buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [100, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  backgroundY = interpolate(this.buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [-height / 3 - 50, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  textInputZIndex = interpolate(this.buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [1, -1],
    extrapolate: Extrapolate.CLAMP,
  });

  textInputY = interpolate(this.buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [0, 100],
    extrapolate: Extrapolate.CLAMP,
  });

  textInputOpacity = interpolate(this.buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  rotateCross = interpolate(this.buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [180, 360],
    extrapolate: Extrapolate.CLAMP,
  });

  render() {
    return (
      <View style={styles.container}>
        <Animated.View
          style={{
            ...styles.imageContainer,
            transform: [{ translateY: this.backgroundY }],
          }}
        >
          <Svg height={height + 50} width={width}>
            <ClipPath id="clip">
              <Circle r={height + 50} cx={width / 2} />
            </ClipPath>
            <Image
              href={require('../assets/background.jpg')}
              height={height + 50}
              width={width}
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#clip)"
            />
          </Svg>
        </Animated.View>
        <View style={styles.buttonContainer}>
          <TapGestureHandler onHandlerStateChange={this.onStateChange}>
            <Animated.View
              style={{
                ...styles.button,
                opacity: this.buttonOpacity,
                transform: [{ translateY: this.buttonY }],
              }}
            >
              <Text style={styles.buttonText}>SIGN IN</Text>
            </Animated.View>
          </TapGestureHandler>
          <Animated.View
            style={{
              ...styles.button,
              backgroundColor: '#2E71DC',
              opacity: this.buttonOpacity,
              transform: [{ translateY: this.buttonY }],
            }}
          >
            <Text style={{ ...styles.buttonText, color: '#fff' }}>
              SIGN IN WITH FACEBOOK
            </Text>
          </Animated.View>
          <Animated.View
            style={{
              ...styles.authorizationContainer,
              zIndex: this.textInputZIndex,
              opacity: this.textInputOpacity,
              transform: [{ translateY: this.textInputY }],
            }}
          >
            <TapGestureHandler onHandlerStateChange={this.onCloseState}>
              <Animated.View style={styles.closeButton}>
                <Animated.Text
                  style={{
                    ...styles.closeButtonText,
                    transform: [{ rotate: concat(this.rotateCross, 'deg') }],
                  }}
                >
                  X
                </Animated.Text>
              </Animated.View>
            </TapGestureHandler>
            <TextInput
              placeholder="EMAIL"
              style={styles.textInput}
              placeholderTextColor="black"
            />
            <TextInput
              placeholder="PASSWORD"
              style={styles.textInput}
              placeholderTextColor="black"
            />
            <Animated.View style={styles.button}>
              <Text style={styles.buttonText}>SIGN IN</Text>
            </Animated.View>
          </Animated.View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
  },
  imageContainer: {
    ...(StyleSheet.absoluteFill as {}),
  },
  buttonContainer: {
    height: Dimensions.get('window').height / 3,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#fff',
    height: 70,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.2,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  authorizationContainer: {
    ...(StyleSheet.absoluteFill as {}),
    height: height / 3,
    top: 'auto',
    justifyContent: 'center',
  },
  closeButton: {
    height: 40,
    width: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -20,
    left: width / 2 - 20,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.2,
  },
  closeButtonText: {
    fontSize: 15,
  },
  textInput: {
    height: 50,
    borderRadius: 50,
    borderWidth: 0.5,
    marginHorizontal: 20,
    paddingLeft: 10,
    marginVertical: 5,
    borderColor: 'rgba(0, 0, 0, 0.2)',
  },
});

export default LoginScreen;
