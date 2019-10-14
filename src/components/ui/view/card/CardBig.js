import React from 'react'
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native'
import FastImage from 'react-native-fast-image'
import { WHITE, normalize, GRAY, GRAY_SECOND } from '../../../../constants/global'

const styles = StyleSheet.create({
  view: { margin: 5, borderRadius: 6, backgroundColor: WHITE, borderWidth: 1, borderColor: '#E2E8F0' },
  shadow: { shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 1.22, elevation: 4 },
  image: { flex: 1, height: undefined, width: undefined, borderTopLeftRadius: 6, borderTopRightRadius: 6 },
  infoView: { flex: 1, paddingHorizontal: 10, paddingVertical: 10 },
  title: { fontSize: normalize(12), fontWeight: 'bold', marginBottom: 10, color: GRAY },
  desc: { fontSize: normalize(12), color: GRAY_SECOND, marginBottom: 10 }
})

const CardBig = ({ width, style, index }) => {
  const imageH = width * 0.5
  return (
    <TouchableHighlight>
      <View style={[styles.view, styles.shadow, style, { width, marginLeft: index === 0 ? 15 : 5 }]}>
        <View>
          <FastImage source={require('../../../../../resources/image/image.png')} style={[styles.image, { width, height: imageH }]} resizeMode={FastImage.resizeMode.cover} />
        </View>
        <View style={styles.infoView}>
          <Text style={styles.title}>Бутик #1090</Text>
          <Text style={styles.desc}>Сумки и рюкзаки</Text>
          <Text style={styles.desc} ellipsizeMode="tail" numberOfLines={3}>
            ТЦ Чжун Кэ
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  )
}

export { CardBig }
