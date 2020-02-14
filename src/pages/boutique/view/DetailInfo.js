import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import _ from 'lodash'
import FastImage from 'react-native-fast-image'
import { WHITE, GRAY_LIGHT, normalize, GRAY_SECOND, BLACK } from '../../../constants/global'


const styles = StyleSheet.create({
  view: { margin: 15 },
  row: { flexDirection: 'row', justifyContent: 'space-evenly' },
  keyText: { fontSize: normalize(12), color: GRAY_SECOND },
  valueText: { fontSize: normalize(12), color: BLACK },
  element: { flex: 1, paddingLeft: 15, paddingVertical: 10 },
  elementImage: { justifyContent: 'center', marginRight: 10 }
})


const DetailInfo = ({ data }) => {
  if (!data) return null

  return (
    <View style={styles.view}>
      {
        data.map((item, index) => {
          const { key, value } = item
          return (
            <View key={_.uniqueId()} style={[styles.row, { backgroundColor: index % 2 === 0 ? WHITE : GRAY_LIGHT }]}>
              <View style={styles.element}><Text style={styles.keyText}>{key}:</Text></View>
              <View style={[styles.element, { flexDirection: 'row' }]}>
                {
                  key === 'WeChat' && (
                  <View style={styles.elementImage}>
                    <FastImage style={{ height: 20, width: 20 }} source={require('../../../../resources/icons/element/qr.png')} resizeMode={FastImage.resizeMode.contain} />
                  </View>
                  )
                }
                <Text style={styles.valueText}>{value}</Text>
              </View>
            </View>
          )
        })
      }
    </View>
  )
}


export { DetailInfo }
