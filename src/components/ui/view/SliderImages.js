import React, { useState, useRef } from 'react'
import { View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native'
import FastImage from 'react-native-fast-image'
import nextId from 'react-id-generator'
import Swiper from 'react-native-swiper'
import ImageView from 'react-native-image-view'
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
  const images = data.map((el) => ({ source: el }))
  const [isImageViewVisible, setImageViewVisible] = useState(false)
  const [selected, setSelected] = useState(0)
  const swiper = useRef(null)
  //const imageView = useRef(null)
  return (
    <View>
      <Swiper index={selected} ref={swiper} paginationStyle={{ marginHorizontal: 15 }} key={nextId()} height={height} activeDotColor={WHITE} dotStyle={{ borderColor: 'rgba(255,255,255,0.8)', borderWidth: 1 }}>
        {
          data.map((item, index) => (
            <TouchableWithoutFeedback
              key={nextId()}
              onPress={() => {
                setImageViewVisible(true)
                setSelected(index)
              }}
            >
              <View style={[styles.child, { width }]}>
                <FastImage
                  style={{ flex: 1, flexDirection: 'row' }}
                  source={item}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </View>
            </TouchableWithoutFeedback>
          ))
        }
      </Swiper>
      <ImageView
        images={images}
        imageIndex={selected}
        isVisible={isImageViewVisible}
        renderFooter={(el) => (<View><Text>{el.title}</Text></View>)}
        onClose={() => setImageViewVisible(false)}
      />
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
