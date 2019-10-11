import React from 'react'
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native'
import FastImage from 'react-native-fast-image'
import { WHITE, normalize } from '../../../../constants/global'

//import { BG_COLOR_HEADER, normalize } from '../../../../constants/global'


const styles = StyleSheet.create({
  view: { margin: 5, borderRadius: 6, backgroundColor: WHITE, borderWidth: 1, borderColor: '#E2E8F0' },
  shadow: { shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 1.22, elevation: 4 },
  image: { flex: 1, height: undefined, width: undefined, borderTopLeftRadius: 6, borderTopRightRadius: 6 },
  infoView: { flex: 1, paddingHorizontal: 10, paddingTop: 10 },
  title: { fontSize: normalize(12), fontWeight: 'bold' },
  desc: { fontSize: normalize(12) }
})

const CardBig = ({ height, width, style, index }) => {
  console.log('test')
  return (
    <TouchableHighlight>
      <View style={[styles.view, styles.shadow, style, { height, width, marginLeft: index === 0 ? 15 : 5 }]}>
        <FastImage source={require('../../../../../resources/image/image.png')} style={styles.image} resizeMode={FastImage.resizeMode.cover} />
        <View style={styles.infoView}>
          <Text style={styles.title}>Бутик #1090</Text>
          <Text style={styles.desc}>Сумки и рюкзаки</Text>
          <Text style={styles.desc}>ТЦ Чжун Кэ</Text>
        </View>
      </View>
    </TouchableHighlight>
  )
}


export { CardBig }
