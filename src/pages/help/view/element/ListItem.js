import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'
import { WHITE, normalize, w, BORDER_COLOR, RED, GRAY } from '../../../../constants/global'

const imageWH = w * 0.1

const styles = StyleSheet.create({
  view: { marginBottom: 15, backgroundColor: WHITE, flexDirection: 'row', justifyContent: 'flex-start' },
  shadow: { shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.8, shadowRadius: 5, elevation: 4, shadowColor: '#C4C4C4' },
  imageView: { alignItems: 'center' },
  image: { flex: 1, height: imageWH, width: imageWH, borderRadius: 200, zIndex: 1, borderWidth: 1, borderColor: BORDER_COLOR },
  infoView: { flex: 1, paddingLeft: 10, justifyContent: 'center' },
  title: { fontSize: normalize(12), color: GRAY }
})

const ListItem = ({ style, item = {}, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <>
      <View style={[styles.view, style]}>
        <View style={[styles.imageView]}>
          <Entypo name="dot-single" size={23} color={RED} />
        </View>
        <View style={styles.infoView}>
          <Text ellipsizeMode="clip" style={styles.title}>{item.title}</Text>
        </View>
      </View>
    </>
  </TouchableOpacity>
)


export { ListItem }
