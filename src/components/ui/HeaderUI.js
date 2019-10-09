import React from 'react'
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { BG_COLOR_HEADER } from '../../constants/global'

const styles = StyleSheet.create({
  view: {
    backgroundColor: BG_COLOR_HEADER,
    height: 50,
    flexDirection: 'row'
  }
})

const HeaderUI = (props) => {
  const { placeHolder } = props
  return (
    <View style={[styles.view, props.style]}>
      <TouchableOpacity><Icon name="ios-menu" size={23} /></TouchableOpacity>
      <TextInput placeholder={placeHolder} />
      <TouchableOpacity><Icon name="ios-menu" size={23} /></TouchableOpacity>
      <TouchableOpacity><Icon name="ios-menu" size={23} /></TouchableOpacity>
    </View>
  )
}


export { HeaderUI }
