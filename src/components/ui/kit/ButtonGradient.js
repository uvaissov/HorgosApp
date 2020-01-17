import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { normalize, WHITE } from '../../../constants/global'

const styles = StyleSheet.create({
  view: { marginVertical: 15 },
  linearGradient: { borderRadius: 6 },
  title: { fontSize: normalize(14), color: WHITE, marginVertical: 15, textAlign: 'center', fontWeight: 'bold' }
})

const ButtonGradient = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={[styles.view]}>
      <LinearGradient useAngle angle={91} locations={[0, 0.5, 1]} colors={['#9D47D1', '#9071EA', '#7B71EA']} style={styles.linearGradient}>
        <Text style={styles.title}>{title}</Text>
      </LinearGradient>
    </View>
  </TouchableOpacity>
)


export { ButtonGradient }
