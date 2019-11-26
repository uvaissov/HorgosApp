import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { normalize, WHITE } from '../../../constants/global'

const styles = StyleSheet.create({
  view: { marginHorizontal: 15 },
  linearGradient: { borderRadius: 12 },
  title: { fontSize: normalize(12), color: WHITE, marginHorizontal: 15, marginVertical: 3, textAlign: 'center', fontWeight: 'bold' }
})

const CounterGradient = ({ title }) => (
  <View style={[styles.view]}>
    <LinearGradient useAngle angle={91} locations={[0, 0.5, 1]} colors={['#9D47D1', '#9071EA', '#7B71EA']} style={styles.linearGradient}>
      <Text style={styles.title}>{title}</Text>
    </LinearGradient>
  </View>
)


export { CounterGradient }
