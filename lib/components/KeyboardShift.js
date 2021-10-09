var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useEffect, useState } from 'react';
import { Animated, Dimensions, Keyboard, KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import { useKeyboard } from '@react-native-community/hooks';
export default function KeyboardShift(props) {
    const { children, headerOffset, style } = props, others = __rest(props, ["children", "headerOffset", "style"]);
    const [shift] = useState(new Animated.Value(0));
    const keyboard = useKeyboard();
    // On mount, add keyboard show and hide listeners
    // On unmount, remove them
    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow);
        Keyboard.addListener('keyboardDidHide', handleKeyboardDidHide);
        return () => {
            Keyboard.removeAllListeners('keyboardDidShow');
            Keyboard.removeAllListeners('keyboardDidHide');
        };
    }, []);
    const handleKeyboardDidShow = () => {
        const { height: windowHeight } = Dimensions.get('window');
        const keyboardHeight = keyboard.keyboardHeight;
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
        return (<Animated.View style={[{ transform: [{ translateY: shift }] }, style]} {...others}>
        {children}
      </Animated.View>);
    }
    // iOS: React Native's KeyboardAvoidingView with header offset and
    // behavior 'padding' works fine on all ios devices (and keyboard types)
    const headerHeight = headerOffset ? headerOffset : 0;
    return (<KeyboardAvoidingView keyboardVerticalOffset={headerHeight} style={style} behavior={'padding'} {...others}>
      {children}
    </KeyboardAvoidingView>);
}
