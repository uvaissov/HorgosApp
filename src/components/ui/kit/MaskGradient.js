import React from 'react'
import { View, StyleSheet } from 'react-native'
import MaskedViewIOS from '@react-native-community/masked-view'
import LinearGradient from 'react-native-linear-gradient'
//import { w } from '../../constants/global'

const styles = StyleSheet.create({
  view: { flex: 1, flexDirection: 'row', height: '100%' },
  linearGradient: { flex: 1, height: '100%' },
  viewIn: { backgroundColor: 'transparent', flex: 1, justifyContent: 'center', alignItems: 'flex-end' }
})

const MaskGradient = (props) => {
  const { element } = props
  return (
    <MaskedViewIOS maskElement={<View style={styles.viewIn}>{element}</View>} style={styles.view}>
      <LinearGradient colors={['#9071EA', '#9D47D1']} style={styles.linearGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} />
    </MaskedViewIOS>
  )
}


export { MaskGradient }
