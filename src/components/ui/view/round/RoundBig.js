import React from 'react'
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native'
import FastImage from 'react-native-fast-image'
import { WHITE, normalize, w, translate } from '../../../../constants/global'
import { locale } from '../../../../service/Locale'

const imageWH = w * 0.27

const styles = StyleSheet.create({
  view: { marginHorizontal: 15, backgroundColor: WHITE, width: imageWH, marginTop: 5 },
  shadow: { shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.8, shadowRadius: 5, elevation: 4, shadowColor: '#C4C4C4' },
  imageView: { height: imageWH, width: imageWH, borderRadius: 200, backgroundColor: '#9071EA', borderColor: '#9071EA' },
  image: { flex: 1, height: undefined, width: undefined, borderRadius: 200, zIndex: 1 },
  infoView: { flex: 1, paddingTop: 10 },
  title: { fontSize: normalize(11), textAlign: 'center' },
  discontView: { position: 'absolute', top: 10, right: 0, zIndex: 20, backgroundColor: WHITE, paddingHorizontal: 4, paddingVertical: 2, borderRadius: 100 },
  discontText: { fontSize: normalize(10), textAlign: 'center', color: WHITE, fontWeight: '600' }
})

const RoundBig = ({ style, item = {}, selected, onPress }) => {
  const { name, img } = item
  return (
    <TouchableHighlight onPress={onPress}>
      <>
        <View style={[styles.view, style]}>
          <View style={[styles.imageView, styles.shadow, { borderWidth: selected ? 5 : 0 }]}>
            <FastImage source={img} style={styles.image} resizeMode={FastImage.resizeMode.cover} />
          </View>
          <View style={styles.infoView}>
            <Text ellipsizeMode="clip" style={styles.title}>{translate(item, `${locale()}.name`, name)}</Text>
          </View>
        </View>
      </>
    </TouchableHighlight>
  )
}


export { RoundBig }
