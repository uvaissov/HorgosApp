import React, { useState } from 'react'
import { View, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import { MaskGradient } from '../kit/MaskGradient'
import { WHITE, normalize, BLACK } from '../../../constants/global'

const styles = StyleSheet.create({
  view: {
    backgroundColor: WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRadius: 5
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
  text: { flex: 1, fontSize: normalize(13), color: BLACK }
})

const HeaderUI = ({ text, placeHolder, leftIcon, leftOnPress, style }) => {
  const [isSearch, setSearch] = useState(false)
  const renderText = () => {
    if (isSearch) {
      return (<TextInput autoFocus style={styles.text} placeholder={placeHolder} />)
    }
    return (
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text}>{text}</Text>
    )
  }

  const clickToIcon = () => {
    setSearch(!isSearch)
  }

  return (
    <View style={[styles.view, style]}>
      <TouchableOpacity style={styles.menu} onPress={() => leftOnPress()}><MaskGradient element={<Feather name={leftIcon} size={23} />} /></TouchableOpacity>
      {renderText()}
      <View style={styles.rightView}>
        <TouchableOpacity onPress={() => clickToIcon()} style={styles.search}><MaskGradient element={<Feather name="search" size={20} />} /></TouchableOpacity>
      </View>
    </View>
  )
}


export { HeaderUI }
