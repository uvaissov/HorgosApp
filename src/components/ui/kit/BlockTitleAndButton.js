import React, { useRef, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { MaskGradient } from './MaskGradient'
import { BLACK, normalize } from '../../../constants/global'

const styles = StyleSheet.create({
  view: { marginVertical: 15 },
  header: { flexDirection: 'row', paddingHorizontal: 15, marginBottom: 15 },
  titleView: { justifyContent: 'center', alignItems: 'center' },
  title: { color: BLACK, fontSize: normalize(16), fontWeight: 'bold' },
  button: { flex: 1, justifyContent: 'center', alignItems: 'flex-end' }
})

const BlockTitleAndButton = (props) => {
  const { onPress, masked, title, element, onLayourRef, name } = props
  const ref = useRef(null)

  const _onLayout = async () => {
    if (name && onLayourRef) {
      onLayourRef(ref, name)
    }
  }

  useEffect(() => {
    _onLayout()
  })

  const showButton = () => {
    if (masked) {
      return (<TouchableOpacity onPress={onPress} style={styles.button}><MaskGradient element={element} /></TouchableOpacity>)
    }
    return (<TouchableOpacity onPress={onPress} style={styles.button}>{element}</TouchableOpacity>)
  }
  return (
    <View ref={ref} style={[styles.view, props.style]}>
      <View style={styles.header}>
        <View style={styles.titleView}>
          <Text style={styles.title}>{title}</Text>
        </View>
        { showButton() }
      </View>
      {props.children}
    </View>
  )
}


export { BlockTitleAndButton }
