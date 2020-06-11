import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image'
import { WHITE, normalize, w, BORDER_COLOR, translate } from '../../../../constants/global'
import { locale } from '../../../../service/Locale'

const imageWH = w * 0.115

const styles = StyleSheet.create({
  view: { marginBottom: 10, backgroundColor: WHITE, flexDirection: 'row', justifyContent: 'flex-start' },
  shadow: { shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.8, shadowRadius: 5, elevation: 4, shadowColor: '#C4C4C4' },
  imageView: { height: imageWH, width: imageWH, borderRadius: 200, backgroundColor: WHITE, alignItems: 'center', borderWidth: 1, borderColor: BORDER_COLOR },
  image: { height: imageWH - 15, width: imageWH - 15, margin: 5 },
  infoView: { flex: 1, paddingLeft: 10, justifyContent: 'center' },
  title: { fontSize: normalize(13) }
})

const ListItem = ({ style, item = {}, onPress }) => {
  const { name, img } = item
  //console.log(item)
  return (
    <TouchableOpacity onPress={onPress}>
      <>
        <View style={[styles.view, style]}>
          <View style={[styles.imageView]}>
            <FastImage source={img} style={styles.image} resizeMode={FastImage.resizeMode.contain} />
          </View>
          <View style={styles.infoView}>
            <Text ellipsizeMode="clip" style={styles.title}>{translate(item, `${locale()}.name`, name)}</Text>
          </View>
        </View>
      </>
    </TouchableOpacity>
  )
}


export { ListItem }
