import React from 'react';
import {TextInput, SafeAreaView, StyleSheet} from 'react-native';
import KeyboardShift from '@fullstackcraft/react-native-keyboard-shift';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardShift style={styles.container}>
        <TextInput placeholder="I'm a TextInput - tap me!" />
      </KeyboardShift>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
