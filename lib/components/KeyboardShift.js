import React, { useEffect, useState } from 'react';
import { Platform, Animated, Dimensions, Keyboard, KeyboardAvoidingView, StyleSheet, TextInput } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { useKeyboard } from '@react-native-community/hooks';
export default function KeyboardShift(props) {
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
            const fieldHeight = height;
            const fieldTop = pageY;
            const gap = windowHeight - keyboardHeight - (fieldTop + fieldHeight);
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
    const { children } = props;
    // Android: we need an animated view since the keyboard style can vary widely
    // And React Native's KeyboardAvoidingView isn't always reliable
    if (Platform.OS === 'android') {
        return <Animated.View style={[styles.container, { transform: [{ translateY: shift }] }]}>{children}</Animated.View>;
    }
    // iOS: React Native's KeyboardAvoidingView with header offset and
    // behavior 'padding' works fine on all ios devices (and keyboard types)
    const headerHeight = useHeaderHeight();
    return (<KeyboardAvoidingView keyboardVerticalOffset={headerHeight} style={styles.container} behavior={'padding'}>
      {children}
    </KeyboardAvoidingView>);
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
