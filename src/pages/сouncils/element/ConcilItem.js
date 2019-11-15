import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import FastImage from 'react-native-fast-image'
import { w, normalize, BLACK, GRAY_SECOND } from '../../../constants/global'


const styles = StyleSheet.create({
  view: { flexWrap: 'wrap', paddingVertical: 30, borderBottomColor: '#E9ECF0', borderBottomWidth: 1 },
  imgView: { alignItems: 'center' },
  textTitle: { fontSize: normalize(15), fontWeight: 'bold', color: BLACK, marginBottom: 7 },
  textDate: { fontSize: normalize(11), color: GRAY_SECOND, marginBottom: 10 },
  textDesc: { fontSize: normalize(12), color: BLACK, marginBottom: 15 }
})


const ConcilItem = ({ item, onPress }) => {
  const imageW = w - 30
  const imageH = imageW * 0.45
  return (
    <TouchableOpacity style={styles.view} onPress={onPress}>
      <View>
        <Text style={styles.textTitle}>{item.title}</Text>
        <Text style={styles.textDate}>{item.date}</Text>
        <Text style={styles.textDesc} numberOfLines={2} ellipsizeMode="tail">{item.description}</Text>
        <View style={styles.imgView}>
          <FastImage style={{ height: imageH, width: imageW, borderRadius: 6 }} resizeMode={FastImage.resizeMode.cover} source={item.img} />
        </View>
      </View>
    </TouchableOpacity>
  )
}


export { ConcilItem }
