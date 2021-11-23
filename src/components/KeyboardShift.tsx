import React, { useEffect, useState } from 'react';
import { Animated, Dimensions, Keyboard, KeyboardAvoidingView, KeyboardEvent, Platform, TextInput, ViewProps } from 'react-native';

interface Props extends ViewProps {
  headerOffset?: number;
  children: any;
}

export default function KeyboardShift(props: Props) {
  const { children, headerOffset, style, ...others } = props;
  const [shift] = useState(new Animated.Value(0));

  useEffect(() => {
    const sub = Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow);
    return () => sub.remove();
  }, []);

  useEffect(() => {
    const sub = Keyboard.addListener('keyboardDidHide', handleKeyboardDidHide);
    return () => sub.remove();
  }, []);

  const handleKeyboardDidShow = (e: KeyboardEvent) => {
    const { height: windowHeight } = Dimensions.get('window');
    const keyboardHeight = e.endCoordinates.height;

    const currentlyFocusedInputRef = TextInput.State.currentlyFocusedInput();
    currentlyFocusedInputRef.measure((_x, _y, _width, height, _pageX, pageY) => {
      const gap = windowHeight - keyboardHeight - (pageY + height);
      if (gap >= 0) {
        return;
      }

      Animated.timing(shift, {
        toValue: gap,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleKeyboardDidHide = () => {
    Animated.timing(shift, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  // Android: we need an animated view since the keyboard style can vary widely
  // And React Native's KeyboardAvoidingView isn't always reliable
  if (Platform.OS === 'android') {
    return (
      <Animated.View style={[{ transform: [{ translateY: shift }] }, style]} {...others}>
        {children}
      </Animated.View>
    );
  }

  // iOS: React Native's KeyboardAvoidingView with header offset and
  // behavior 'padding' works fine on all ios devices (and keyboard types)
  const headerHeight = headerOffset || 0;

  return (
    <KeyboardAvoidingView keyboardVerticalOffset={headerHeight} style={style} behavior={'padding'} {...others}>
      {children}
    </KeyboardAvoidingView>
  );
}
