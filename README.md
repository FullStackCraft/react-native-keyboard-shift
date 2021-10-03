# react-native-keyboard-shift

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/FullStackCraft/react-native-keyboard-shift/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/react-native-keyboard-shift.svg?style=flat)](https://www.npmjs.com/package/@fullstackcraft/react-native-keyboard-shift) ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

# Example

_Snack coming soon_

Until then:

1. Clone this repo:

```bash
git clone https://github.com/FullStackCraft/react-native-keyboard-shift
```

2. Move into the example folder:

```
cd react-native-keyboard-shift/example
```

3. Install dependencies:

```
npm install
```

4. Start Metro

```
npm start
```

5. Start Android or iOS

```bash
npm run android
# -or- iOS
npm run ios
```

Enjoy the juicy keyboard shifty-ness!

# Usage In Your Project

Install and save this package as a dependency:

```bash
npm install --save @fullstackcraft/react-native-keyboard-shift
```

Import and use the KeyboardShift component:

```tsx
import '@fullstackcraft/react-native-keyboard-shift'
// other imports

export default function YourCoolKeyboardScreen () {

    // Other logic, variables, etc.

    return (
        <KeyboardShift>
            {/* Screen components */}
        </KeyboardShift>
    )
}
```

# ANOTHER Keyboard Shifting Component?!

See the original [blog post](https://chrisfrewin.medium.com/a-keyboard-avoiding-view-for-react-native-in-2021-196701ff0608) that led to the creation of this library for more information.

