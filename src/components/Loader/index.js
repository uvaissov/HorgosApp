import React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { MAIN_COLOR } from '../../constants/global'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80
  }
})


const Loader = ({ animating, color = MAIN_COLOR }) => (
  <View style={styles.container}>
    <ActivityIndicator style={styles.activityIndicator} size="large" color={color} animating={animating} />
  </View>
)

export default Loader
