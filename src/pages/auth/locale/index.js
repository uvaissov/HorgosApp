import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import _ from 'lodash'
import Feather from 'react-native-vector-icons/Feather'
import ModalSelector from 'react-native-modal-selector'
import { WHITE, BORDER_COLOR, BLACK, GRAY_SECOND } from '../../../constants/global'
import { strings, getCurLanguage, setCurLanguage } from '../../../service/Locale'

const styles = StyleSheet.create({
  content: { marginRight: 20 },
  currencyView: { paddingVertical: 5, paddingHorizontal: 10, borderWidth: 1, borderRadius: 100, borderColor: BORDER_COLOR, flexDirection: 'row', alignItems: 'center' },
  currencyText: { marginRight: 5, color: WHITE }
})

const LocaleView = () => {
  const [locale, setLocale] = useState(null)
  const massive = [
    { key: 'kz', label: 'Қазақша' },
    { key: 'ru', label: 'Русский' },
    { key: 'en', label: 'English' }
  ]

  const start = async () => {
    const value = await getCurLanguage()
    return value
  }

  useEffect(() => {
    start().then(setLocale)
  })

  return (
    <View style={styles.content}>
      {
        locale &&
        (
        <ModalSelector
          data={massive}
          accessible
          animationType="fade"
          cancelText={strings('message.cancel')}
          onChange={(option) => { setCurLanguage(option.key) }}
          optionContainerStyle={{ backgroundColor: WHITE }}
          optionTextStyle={{ color: BLACK, fontWeight: 'bold' }}
        >
          <TouchableOpacity>
            <View style={styles.currencyView}>
              <Text style={styles.currencyText}>{_.find(massive, { 'key': locale }).label}</Text>
              <Feather name="chevron-down" color={GRAY_SECOND} size={15} />
            </View>
          </TouchableOpacity>
        </ModalSelector>
        )
      }
    </View>
  )
}

export default LocaleView