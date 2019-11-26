import React from 'react'
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native'
import FastImage from 'react-native-fast-image'
import { WHITE, normalize, w, BORDER_COLOR } from '../../../../constants/global'

const imageWH = w * 0.1

const styles = StyleSheet.create({
  view: { marginBottom: 10, backgroundColor: WHITE, flexDirection: 'row', justifyContent: 'flex-start' },
  shadow: { shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.8, shadowRadius: 5, elevation: 4, shadowColor: '#C4C4C4' },
  imageView: { height: imageWH, width: imageWH, borderRadius: 200, backgroundColor: WHITE, alignItems: 'center' },
  image: { flex: 1, height: imageWH, width: imageWH, borderRadius: 200, zIndex: 1, borderWidth: 1, borderColor: BORDER_COLOR },
  infoView: { flex: 1, paddingLeft: 10, justifyContent: 'center' },
  title: { fontSize: normalize(11) }
})

const ListItem = ({ style, item = {} }) => {
  console.log(item)
  return (
    <TouchableHighlight>
      <>
        <View style={[styles.view, style]}>
          <View style={[styles.imageView]}>
            <FastImage source={require('../../../../../resources/image/batinki.png')} style={styles.image} resizeMode={FastImage.resizeMode.contain} />
          </View>
          <View style={styles.infoView}>
            <Text ellipsizeMode="clip" style={styles.title}>Спортивный инвентарь</Text>
          </View>
        </View>
      </>
    </TouchableHighlight>
  )
}


export { ListItem }