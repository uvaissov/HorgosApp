/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { StyleSheet, View, StatusBar } from 'react-native'
import { statusBarHeight } from '../constants/global'


const STATUSBAR_HEIGHT = statusBarHeight

const styles = StyleSheet.create({
  statusBar: {
    //height: STATUSBAR_HEIGHT
  }
})

const CustomStatusBar = ({ absolute, backgroundColor, blank, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor, height: blank ? 0 : STATUSBAR_HEIGHT }, absolute]}>
    <StatusBar animated showHideTransition="slide" translucent backgroundColor={backgroundColor} {...props} />
  </View>
)


export default CustomStatusBar
