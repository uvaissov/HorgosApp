import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image'
import { WHITE, normalize, GRAY, GRAY_SECOND, translate, translateArray } from '../../../../constants/global'
import { locale } from '../../../../service/Locale'

const styles = StyleSheet.create({
  view: { borderRadius: 6, backgroundColor: WHITE, borderWidth: 0.1, borderColor: '#E2E8F0', flex: 1 },
  shadow: { shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 1.22, elevation: 2 },
  image: { flex: 1, height: undefined, width: undefined, borderTopLeftRadius: 6, borderTopRightRadius: 6, left: -0.2 },
  infoView: { flex: 1, paddingHorizontal: 10, paddingVertical: 10 },
  title: { fontSize: normalize(12), fontWeight: 'bold', marginBottom: 10, color: GRAY },
  desc: { fontSize: normalize(12), color: GRAY_SECOND, marginBottom: 10 },
  marginView: { margin: 5 }
})

const CardBig = ({ width, style, index, onPress, item, hit }) => {
  const { name, img, trading_house_name, categoriesName, boutique = {} } = item //main info
  const { name: nameB, trading_house_name: trading_house_nameB, categoriesName: categoriesNameB } = boutique //secondary info
  const nameField = translate(item, `${locale()}.name`, name) || translate(boutique, `${locale()}.name`, nameB)
  const categoriesNameField = categoriesName || translateArray(boutique.categories, `${locale()}.name`, categoriesNameB)
  const tradingHouseName = trading_house_name || translateArray(boutique.trading_houses, `${locale()}.name`, trading_house_nameB)
  const imageH = width * 0.5
  const hitW = width * 0.4
  const hitH = hitW * 0.5
  return (
    <View style={[styles.marginView, { marginLeft: index === 0 ? 15 : 5 }]}>
      <View style={[styles.view, styles.shadow, style, { width }]}>
        <TouchableOpacity onPress={() => onPress(boutique)} style={{ flex: 1 }}>
          {
            hit &&
            <View style={{ position: 'absolute', top: 10, left: -5, zIndex: 20 }}>
              <FastImage source={require('../../../../../resources/icons/element/hit.png')} style={[styles.image, { width: hitW, height: hitH }]} resizeMode={FastImage.resizeMode.cover} />
            </View>
          }
          <View>
            <FastImage source={img} style={[styles.image, { width, height: imageH }]} resizeMode={FastImage.resizeMode.cover} />
          </View>
          <View style={styles.infoView}>
            <Text style={styles.title}>{nameField}</Text>
            <Text style={styles.desc}>{categoriesNameField}</Text>
            <Text style={styles.desc} ellipsizeMode="tail" numberOfLines={3}>
              {tradingHouseName}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export { CardBig }
