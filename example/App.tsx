import React from 'react';
import {SafeAreaView, StatusBar, TextInput} from 'react-native';
import KeyboardShift from '@fullstackcraft/react-native-keyboard-shift';

const App = () => {
  return (
    <KeyboardShift>
      <SafeAreaView>
        <StatusBar barStyle={'light-content'} />
        <TextInput placeholder="I'm a TextInput - tap me!" />
      </SafeAreaView>
    </KeyboardShift>
  );
};

export default App;
