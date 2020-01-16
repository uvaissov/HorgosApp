import React from 'react'
import { View, StyleSheet, TouchableWithoutFeedback, Text } from 'react-native'
import FastImage from 'react-native-fast-image'
import nextId from 'react-id-generator'
import Swiper from 'react-native-swiper'
import _ from 'lodash'
import { w, WHITE, normalize } from '../../../constants/global'
import { BY_TRADING_HOUSE, BY_CATEGORY } from '../../../constants/static'


const width = w - 30
const height = width * 0.5

const styles = StyleSheet.create({
  child: {
    height,
    justifyContent: 'center',
    marginHorizontal: 15,
    borderRadius: 5,
    overflow: 'hidden'
  }
})

const _renderSwiper = (data, navigation) => {
  if (!data || data.length < 1) return null

  const pressToBanner = (el) => {
    const { trading_house_id, category_id, boutique_id } = el
    if (_.isInteger(boutique_id)) {
      navigation.push('Boutique', { boutique_id })
    } else if (_.isInteger(trading_house_id)) {
      navigation.push('BoutiqueList', { filter: BY_TRADING_HOUSE, trading_house_id })
    } else if (_.isInteger(category_id)) {
      navigation.push('BoutiqueList', { filter: BY_CATEGORY, cat_id: category_id })
    }
  }
  return (
    <View>
      <Swiper paginationStyle={{ marginHorizontal: 15 }} key={data.length} height={height} activeDotColor={WHITE} dotStyle={{ borderColor: 'rgba(255,255,255,0.8)', borderWidth: 1 }}>
        {
          data.map((item) => (
            <TouchableWithoutFeedback key={nextId()} onPress={() => pressToBanner(item)}>
              <View style={[styles.child, { width }]}>
                <FastImage
                  style={{ flex: 1, flexDirection: 'row' }}
                  source={item.img}
                  resizeMode={FastImage.resizeMode.cover}
                >
                  <View style={{ flex: 1, padding: 15 }}>
                    <Text numberOfLines={4} style={{ color: item.color, fontSize: normalize(15), fontWeight: '700' }}>{item.title}</Text>
                    <Text numberOfLines={5} style={{ color: item.color, fontSize: normalize(11) }}>{item.description}</Text>
                  </View>
                  <View style={{ flex: 1 }} />
                </FastImage>
              </View>
            </TouchableWithoutFeedback>
          ))
        }
      </Swiper>
    </View>
  )
}

const SliderApp = ({
  data,
  navigation
}) => {
  if (_.isEmpty(data)) {
    return null
  }

  return _renderSwiper(data, navigation)
}

export { SliderApp }
