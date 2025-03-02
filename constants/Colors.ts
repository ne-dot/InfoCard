/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#ECEDF1',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    primary: '#ECEDF1',  // 主题色，用于导航栏等主要UI元素
    card: '#ECEDF1',
    error: '#FF3B30',
    success: '#34C759',
    notification: '#007AFF',
  },
  dark: {
    text: '#ECEDEE',
    background: '#131823',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    primary: '#131823',  // 主题色，用于导航栏等主要UI元素
    card: '#131823',
    error: '#FF453A',
    success: '#30D158',
    notification: '#0A84FF',
  },
};
