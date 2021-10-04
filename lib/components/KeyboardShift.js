"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_native_1 = require("react-native");
const elements_1 = require("@react-navigation/elements");
const hooks_1 = require("@react-native-community/hooks");
function KeyboardShift(props) {
    const [shift] = (0, react_1.useState)(new react_native_1.Animated.Value(0));
    const keyboard = (0, hooks_1.useKeyboard)();
    // On mount, add keyboard show and hide listeners
    // On unmount, remove them
    (0, react_1.useEffect)(() => {
        react_native_1.Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow);
        react_native_1.Keyboard.addListener('keyboardDidHide', handleKeyboardDidHide);
        return () => {
            react_native_1.Keyboard.removeAllListeners('keyboardDidShow');
            react_native_1.Keyboard.removeAllListeners('keyboardDidHide');
        };
    }, []);
    const handleKeyboardDidShow = () => {
        const { height: windowHeight } = react_native_1.Dimensions.get('window');
        const keyboardHeight = keyboard.keyboardHeight;
        const currentlyFocusedInputRef = react_native_1.TextInput.State.currentlyFocusedInput();
        currentlyFocusedInputRef.measure((_x, _y, _width, height, _pageX, pageY) => {
            const fieldHeight = height;
            const fieldTop = pageY;
            const gap = (windowHeight - keyboardHeight) - (fieldTop + fieldHeight);
            if (gap >= 0) {
                return;
            }
            react_native_1.Animated.timing(shift, {
                toValue: gap,
                duration: 1000,
                useNativeDriver: true,
            }).start();
        });
    };
    const handleKeyboardDidHide = () => {
        react_native_1.Animated.timing(shift, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    };
    const { children } = props;
    // Android: we need an animated view since the keyboard style can vary widely
    // And React Native's KeyboardAvoidingView isn't always reliable
    if (react_native_1.Platform.OS === 'android') {
        return (<react_native_1.Animated.View style={[styles.container, { transform: [{ translateY: shift }] }]}>
        {children}
      </react_native_1.Animated.View>);
    }
    // iOS: React Native's KeyboardAvoidingView with header offset and
    // behavior 'padding' works fine on all ios devices (and keyboard types)
    const headerHeight = (0, elements_1.useHeaderHeight)();
    return (<react_native_1.KeyboardAvoidingView keyboardVerticalOffset={headerHeight} style={styles.container} behavior={'padding'}>
      {children}
    </react_native_1.KeyboardAvoidingView>);
}
exports.default = KeyboardShift;
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1
    }
});
