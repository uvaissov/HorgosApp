import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image'
import { WHITE, normalize, GRAY, GRAY_SECOND } from '../../../../constants/global'

const styles = StyleSheet.create({
  view: { borderRadius: 6, backgroundColor: WHITE },
  image: { flex: 1, height: undefined, width: undefined, borderRadius: 6 },
  infoView: { flex: 1, paddingVertical: 10 },
  title: { fontSize: normalize(12), fontWeight: 'bold', marginBottom: 5, color: GRAY },
  desc: { fontSize: normalize(11), color: GRAY_SECOND },
  marginView: { margin: 5, marginBottom: 15 }
})

const CardSmall = ({ width, style, onPress, item }) => {
  const imageH = width
  const { name, img, categoriesName } = item
  return (
    <View style={[styles.marginView]}>
      <TouchableOpacity onPress={() => onPress(item)}>
        <View style={[styles.view, style, { width }]}>
          <View>
            <FastImage source={img} style={[styles.image, { width, height: imageH }]} resizeMode={FastImage.resizeMode.cover} />
          </View>
          <View style={styles.infoView}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.desc} ellipsizeMode="tail" numberOfLines={3}>{categoriesName}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export { CardSmall }
