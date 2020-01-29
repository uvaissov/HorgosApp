import React, { useState } from 'react'
import { View, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import { MaskGradient } from '../kit/MaskGradient'
import { WHITE, normalize, BLACK, isEmptyString, alertApp } from '../../../constants/global'

const styles = StyleSheet.create({
  view: {
    backgroundColor: WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRadius: 5,
    paddingTop: 15
  },
  menu: {
    paddingRight: 15,
    height: 40,
    width: 40
  },
  rightView: {
    flexDirection: 'row', width: 60, height: 40, justifyContent: 'space-around'
  },
  search: {
    flex: 1
  },
  text: { flex: 1, fontSize: normalize(13), color: BLACK, padding: 0 }
})

const HeaderUI = ({ text: fromExport, placeHolder, leftIcon, leftOnPress, style, withSearch = true, fetchData }) => {
  //const [isSearch, setSearch] = useState(false)
  const [text, setText] = useState(fromExport)
  const clickToIcon = () => {
    if (isEmptyString(text)) {
      return alertApp('Внимание', 'Необходимо указать фразу для поиска')
    }
    fetchData(text)
  }

  const renderText = () => {
    if (true) {
      return (<TextInput value={text} onChangeText={(el) => setText(el)} style={styles.text} placeholder={placeHolder} placeholderTextColor={BLACK} returnKeyType="search" onSubmitEditing={() => clickToIcon()} />)
    }
    return (
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text}>{text || 'Каталог бутиков'}</Text>
    )
  }

  return (
    <View style={[styles.view, style]}>
      <TouchableOpacity hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }} style={styles.menu} onPress={() => leftOnPress()}><MaskGradient element={<Feather name={leftIcon} size={23} />} /></TouchableOpacity>
      {renderText()}
      {
        withSearch &&
        <View style={styles.rightView}>
          <TouchableOpacity onPress={() => clickToIcon()} style={styles.search}><MaskGradient element={<Feather name="search" size={20} />} /></TouchableOpacity>
        </View>
      }
    </View>
  )
}


export { HeaderUI }
