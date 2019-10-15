import React from 'react'
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import FastImage from 'react-native-fast-image'
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

this._renderSwiper = (data) => (
  <View>
    <Swiper paginationStyle={{ marginHorizontal: 15 }} key={data.length} height={height} activeDotColor={WHITE} dotStyle={{ borderColor: 'rgba(255,255,255,0.8)', borderWidth: 1 }}>
      {
        data.map((item) => (
          <TouchableWithoutFeedback key={item.id} onPress={() => {}}>
            <View key={item.id} style={[styles.child, { width }]}>
              <FastImage
                style={{ flex: 1 }}
                source={require('../../../../resources/image/slider_img.png')}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
          </TouchableWithoutFeedback>
        ))
      }
    </Swiper>
  </View>
)

const SliderApp = ({
  data
}) => {
  if (_.isEmpty(data)) {
    return null
  }

  return this._renderSwiper(['1', '2'])
}

export { SliderApp }
