import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image'
import { WHITE, normalize, w, ORANGE, RED, GREEN } from '../../../../constants/global'

const imageWH = w * 0.24

const styles = StyleSheet.create({
  view: { margin: 5, backgroundColor: WHITE, width: imageWH },
  shadow: { shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.8, shadowRadius: 5, elevation: 4, shadowColor: '#C4C4C4' },
  imageView: { height: imageWH, width: imageWH, borderRadius: 200, backgroundColor: '#C4C4C4' },
  image: { flex: 1, height: undefined, width: undefined, borderRadius: 200, zIndex: 1 },
  infoView: { flex: 1, paddingTop: 10 },
  title: { fontSize: normalize(11), textAlign: 'center' },
  discountView: { position: 'absolute', top: 10, right: 0, zIndex: 20, backgroundColor: WHITE, paddingHorizontal: 4, paddingVertical: 2, borderRadius: 100 },
  discountText: { fontSize: normalize(10), textAlign: 'center', color: WHITE, fontWeight: '600' }
})

const RoundWithDiscont = ({ style, index, item = {}, onPress }) => {
  const { discount, name, img } = item
  let color = GREEN
  if (discount >= 50) {
    color = RED
  } else if (discount >= 25) {
    color = ORANGE
  }
  return (
    <TouchableOpacity onPress={() => onPress(item)}>
      <>
        {
          discount &&
          <View style={[styles.discountView, { backgroundColor: color }]}><Text style={styles.discountText}>{`-${discount}%`}</Text></View>
        }
        <View style={[styles.view, style, { marginLeft: index === 0 ? 15 : 5 }]}>
          <View style={[styles.imageView, styles.shadow]}>
            <FastImage source={img} style={styles.image} resizeMode={FastImage.resizeMode.cover} />
          </View>
          <View style={styles.infoView}>
            <Text ellipsizeMode="clip" style={styles.title}>{name}</Text>
          </View>
        </View>
      </>
    </TouchableOpacity>
  )
}


export { RoundWithDiscont }
