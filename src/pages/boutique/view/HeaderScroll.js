import React, { useState } from 'react'
import { View, StyleSheet, Text, Animated, TouchableOpacity, TextInput } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Share from 'react-native-share'
import Feather from 'react-native-vector-icons/Feather'
import { MaskGradient } from '../../../components/ui/kit/MaskGradient'
import { BY_SEARCH_TEXT } from '../../../constants/static'
import { HEADER_MAX_HEIGHT, normalize, BG_COLOR_HEADER, RED, hostName, isEmptyString, alertApp } from '../../../constants/global'

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
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 15

  },
  title: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 14,
    textAlign: 'center'
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
  },
  element: {
    flex: 1, justifyContent: 'center', alignContent: 'center'
  },
  borderBottom: { height: 2, backgroundColor: RED }
})


const HeaderScroll = ({ headerHeight, navigation, inputOpacity, pressToText, highlightHeader, boutique }) => {
  const [text, setText] = useState(null)

  const pressToSearch = () => {
    if (isEmptyString(text)) {
      return alertApp('Внимание', 'Необходимо указать фразу для поиска')
    }
    navigation.push('BoutiqueList', { filter: BY_SEARCH_TEXT, text })
  }
  const share = () => {
    Share.open({
      title: 'Dai5.kz',
      message: 'Советую Dai5.kz',
      url: `${hostName}/boutique/${boutique.id}`
    })
      .then((res) => { console.log(res) })
      .catch((err) => { err && console.log(err) })
  }
  return (
    <Animated.View style={[styles.header, { transform: [{ translateY: headerHeight }] }]}>
      <LinearGradient useAngle angle={91} locations={[0, 0.5, 1]} colors={['#9D47D1', '#9071EA', '#7B71EA']} style={styles.linearGradient}>
        <Animated.View style={[styles.searchView, { opacity: inputOpacity }]}>
          <TouchableOpacity style={styles.menu} onPress={() => navigation.goBack()} hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}><MaskGradient element={<Feather name="arrow-left" size={23} />} /></TouchableOpacity>
          <TextInput style={{ flex: 1, fontSize: normalize(14) }} placeholder="Введите название бутика" value={text} onChangeText={(el) => setText(el)} returnKeyType="search" onSubmitEditing={() => pressToSearch()} />
          <View style={styles.rightView}>
            <TouchableOpacity style={styles.search} onPress={() => pressToSearch()}><MaskGradient element={<Feather name="search" size={20} />} /></TouchableOpacity>
            <TouchableOpacity style={styles.share} onPress={() => share()}><MaskGradient element={<Feather name="share-2" size={20} />} /></TouchableOpacity>
          </View>
        </Animated.View>
        <View style={styles.bar}>
          <TouchableOpacity onPress={() => pressToText('price')} style={styles.element}>
            <View style={[styles.element]}><Text style={styles.title}>Цена</Text></View>
            <Animated.View style={[styles.borderBottom, { opacity: highlightHeader.price }]} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => pressToText('product')} style={styles.element}>
            <View style={styles.element}><Text style={styles.title}>Товар</Text></View>
            <Animated.View style={[styles.borderBottom, { opacity: highlightHeader.product }]} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => pressToText('map')} style={styles.element}>
            <View style={styles.element}><Text style={styles.title}>Карта</Text></View>
            <Animated.View style={[styles.borderBottom, { opacity: highlightHeader.map }]} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => pressToText('response')} style={styles.element}>
            <View style={styles.element}><Text style={styles.title}>Отзывы</Text></View>
            <Animated.View style={[styles.borderBottom, { opacity: highlightHeader.response }]} />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </Animated.View>
  )
}


export { HeaderScroll }
