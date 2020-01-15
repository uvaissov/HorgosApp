import React, { useState } from 'react'
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import { MaskGradient } from '../../../components/ui/kit/MaskGradient'
import { BG_COLOR_HEADER, normalize } from '../../../constants/global'
import { BY_SEARCH_TEXT } from '../../../constants/static'

const styles = StyleSheet.create({
  view: {
    backgroundColor: BG_COLOR_HEADER,
    height: 50,
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
  share: {
    flex: 1
  }
})

const Header = (props) => {
  const { placeHolder, navigation } = props
  const [text, setText] = useState(null)

  const pressToSearch = () => {
    navigation.push('BoutiqueList', { filter: BY_SEARCH_TEXT, text })
  }

  return (
    <View style={[styles.view, props.style]}>
      <TouchableOpacity style={styles.menu} onPress={() => navigation.openDrawer()}><MaskGradient element={<Feather name="menu" size={23} />} /></TouchableOpacity>
      <TextInput returnKeyType="search" onSubmitEditing={() => pressToSearch()} style={{ flex: 1, fontSize: normalize(14) }} placeholder={placeHolder} value={text} onChangeText={(el) => setText(el)} />
      <View style={styles.rightView}>
        <TouchableOpacity style={styles.search} onPress={() => pressToSearch()}><MaskGradient element={<Feather name="search" size={20} />} /></TouchableOpacity>
        <TouchableOpacity style={styles.share}><MaskGradient element={<Feather name="share-2" size={20} />} /></TouchableOpacity>
      </View>
    </View>
  )
}


export { Header }
