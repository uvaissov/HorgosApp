import React from 'react'
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import { MaskGradient } from '../kit/MaskGradient'
import { BG_COLOR_HEADER, normalize } from '../../../constants/global'

const styles = StyleSheet.create({
  view: {
    backgroundColor: BG_COLOR_HEADER,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
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

const HeaderUI = (props) => {
  const { placeHolder, navigation } = props
  return (
    <View style={[styles.view, props.style]}>
      <TouchableOpacity style={styles.menu} onPress={() => navigation.openDrawer()}><MaskGradient element={<Feather name="menu" size={23} />} /></TouchableOpacity>
      <TextInput style={{ flex: 1, fontSize: normalize(14) }} placeholder={placeHolder} />
      <View style={styles.rightView}>
        <TouchableOpacity style={styles.search}><MaskGradient element={<Feather name="search" size={23} />} /></TouchableOpacity>
        <TouchableOpacity style={styles.share}><MaskGradient element={<Feather name="share-2" size={23} />} /></TouchableOpacity>
      </View>
    </View>
  )
}


export { HeaderUI }
