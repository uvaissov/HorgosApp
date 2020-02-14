import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image'
import { WHITE, normalize, w } from '../../../../constants/global'

const imageWH = w * 0.22
const innerImageWH = imageWH / 1.9

const styles = StyleSheet.create({
  view: { margin: 5, backgroundColor: WHITE, width: imageWH },
  shadow: { shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.8, shadowRadius: 5, elevation: 4, shadowColor: '#C4C4C4' },
  imageView: { height: imageWH, width: imageWH, borderRadius: 200, backgroundColor: WHITE, alignItems: 'center', justifyContent: 'center' },
  image: { height: innerImageWH, width: innerImageWH, margin: 5 },
  infoView: { flex: 1, paddingTop: 10 },
  title: { fontSize: normalize(13), textAlign: 'center' }
})

const Round = ({ style, index, item = {}, onPress }) => {
  const { name, img } = item
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.view, style, { marginLeft: index === 0 ? 15 : 15 }]}>
        <View style={[styles.imageView, styles.shadow]}>
          <FastImage source={img} style={styles.image} width={innerImageWH} height={innerImageWH} resizeMode={FastImage.resizeMode.center} />
        </View>
        <View style={styles.infoView}>
          <Text ellipsizeMode="clip" style={styles.title}>{name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}


export { Round }
