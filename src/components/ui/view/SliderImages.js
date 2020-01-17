import React from 'react'
import { View, StyleSheet } from 'react-native'
import FastImage from 'react-native-fast-image'
import nextId from 'react-id-generator'
import Swiper from 'react-native-swiper'
import _ from 'lodash'
import { w, WHITE } from '../../../constants/global'

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

const _renderSwiper = (data) => {
  if (!data || data.length < 1) return null
  return (
    <View>
      <Swiper paginationStyle={{ marginHorizontal: 15 }} key={data.length} height={height} activeDotColor={WHITE} dotStyle={{ borderColor: 'rgba(255,255,255,0.8)', borderWidth: 1 }}>
        {
          data.map((item) => (
            <View key={nextId()} style={[styles.child, { width }]}>
              <FastImage
                style={{ flex: 1, flexDirection: 'row' }}
                source={item}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
          ))
        }
      </Swiper>
    </View>
  )
}

const SliderImages = ({
  data
}) => {
  if (_.isEmpty(data)) {
    return null
  }

  return _renderSwiper(data)
}

export { SliderImages }
