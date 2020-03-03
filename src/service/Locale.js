//import RNRestart from 'react-native-restart';
import AsyncStorage from '@react-native-community/async-storage'

import I18n from 'i18n-js'
import en from './localization/en'
import ru from './localization/ru'
import kk from './localization/kk'


// Should the app fallback to English if user locale doesn't exists
I18n.fallbacks = true
I18n.defaultLocale = 'ru'
// const currentLocale = I18n.currentLocale();

// Define the supported translations
I18n.translations = {
  ru,
  en,
  kk
}

// const warningLanguageChange = () => {
//   Alert.alert(
//     I18n.t('profile.alertTitle'),
//     I18n.t('profile.alertSubtitle'),
//     [{ text: 'OK', onPress: () => {} }],
//     { cancelable: false }
//   );
// };

export const setCurLanguage = async language => {
  await AsyncStorage.setItem('currentLanguage', language)
  //warningLanguageChange();
  //RNRestart.Restart();
}

const getCurLanguage = async () => {
  try {
    const value = await AsyncStorage.getItem('currentLanguage')
    const result = (value !== null) ? value : 'ru'
    return Promise.resolve(result)
  } catch (error) {
    throw new Error('Error on getting current language', error)
  }
}

export const init = async () => {
  const value = await getCurLanguage()
  console.log(`init locale: ${value}`)
  I18n.locale = value
}

// The method we'll use instead of a regular string
export function strings(name, params = {}) {
  return I18n.t(name, params)
}

export default I18n
