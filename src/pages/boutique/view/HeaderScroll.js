import React from 'react'
import { View, StyleSheet, Text, Animated, TouchableOpacity, TextInput } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Feather from 'react-native-vector-icons/Feather'
import { MaskGradient } from '../../../components/ui/kit/MaskGradient'

import { HEADER_MAX_HEIGHT, normalize, BG_COLOR_HEADER } from '../../../constants/global'

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#03A9F4',
    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT
  },
  bar: {
    marginTop: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  title: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 14
  },
  linearGradient: { flex: 1, justifyContent: 'flex-end', backgroundColor: '#2D94DF' },
  searchView: {
    backgroundColor: BG_COLOR_HEADER,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginHorizontal: 15,
    borderRadius: 5,
    opacity: 1
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


const HeaderScroll = ({ headerHeight, navigation, inputOpacity }) => (
  <Animated.View style={[styles.header, { transform: [{ translateY: headerHeight }] }]}>
    <LinearGradient useAngle angle={91} locations={[0, 0.5, 1]} colors={['#9D47D1', '#9071EA', '#7B71EA']} style={styles.linearGradient}>
      <Animated.View style={[styles.searchView, { opacity: inputOpacity }]}>
        <TouchableOpacity style={styles.menu} onPress={() => navigation.goBack()}><MaskGradient element={<Feather name="arrow-left" size={23} />} /></TouchableOpacity>
        <TextInput style={{ flex: 1, fontSize: normalize(14) }} placeholder="Input text here" />
        <View style={styles.rightView}>
          <TouchableOpacity style={styles.search}><MaskGradient element={<Feather name="search" size={20} />} /></TouchableOpacity>
          <TouchableOpacity style={styles.share}><MaskGradient element={<Feather name="share-2" size={20} />} /></TouchableOpacity>
        </View>
      </Animated.View>
      <View style={styles.bar}>
        <View><Text style={styles.title}>Цена</Text></View>
        <View><Text style={styles.title}>Товар</Text></View>
        <View><Text style={styles.title}>Карта</Text></View>
        <View><Text style={styles.title}>Отзывы</Text></View>
      </View>
    </LinearGradient>
  </Animated.View>
)


export { HeaderScroll }
