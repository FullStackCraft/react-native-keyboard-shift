import React from 'react';
import {TextInput, SafeAreaView} from 'react-native';
import KeyboardShift from '@fullstackcraft/react-native-keyboard-shift';

const App = () => {
  return (
    <SafeAreaView>
      <KeyboardShift>
        <TextInput placeholder="I'm a TextInput - tap me!" />
      </KeyboardShift>
    </SafeAreaView>
  );
};

export default App;
