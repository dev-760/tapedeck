import { Platform } from 'react-native';
import Constants from 'expo-constants';

export const IS_IOS = Platform.OS === 'ios';
export const IS_ANDROID = Platform.OS === 'android';

export const IS_EXPO_GO = Constants.appOwnership === 'expo';
