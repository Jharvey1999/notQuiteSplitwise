/**
 * Below are the colours that are used in the app. The colours are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#4CAF50'; // medium green
const tintColorDark = '#033803ff'; // dark green

export const Colors = {
  light: {
    text: '#222', // dark text for contrast
    background: '#fff', // white
    tint: tintColorLight, // medium green
    icon: '#8BC34A', // light green
    tabIconDefault: '#8BC34A', // light green
    tabIconSelected: tintColorLight, // medium green
  },
  dark: {
    text: '#fff', // white text for contrast
    background: '#000', // black
    tint: tintColorDark, // dark green
    icon: '#388E3C', // medium green
    tabIconDefault: '#388E3C', // medium green
    tabIconSelected: tintColorDark, // dark green
  },
};