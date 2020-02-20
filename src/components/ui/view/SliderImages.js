import React, { useState } from 'react'
import { View, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, Modal } from 'react-native'
import FastImage from 'react-native-fast-image'
import nextId from 'react-id-generator'
import Swiper from 'react-native-swiper'
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView'
import Feather from 'react-native-vector-icons/Feather'
import _ from 'lodash'
import { GRAY_SECOND, statusBarHeight, w, WHITE } from '../../../constants/global'

const width = w - 30
const height = width * 0.5

const styles = StyleSheet.create({
  child: {
    height,
    justifyContent: 'center',
    marginHorizontal: 15,
    borderRadius: 5,
    overflow: 'hidden'
  },
  body: { flex: 1 },
  modalBody: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }
})

const _renderSwiper = (data) => {
  if (!data || data.length < 1) return null
  const [isImageViewVisible, setImageViewVisible] = useState(false)
  const [selected, setSelected] = useState(0)
  return (
    <View style={{ zIndex: 0 }}>
      <Swiper index={selected} paginationStyle={{ marginHorizontal: 15 }} key={nextId()} height={height} activeDotColor={WHITE} dotStyle={{ borderColor: 'rgba(255,255,255,0.8)', borderWidth: 1 }}>
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
      <Modal transparent visible={isImageViewVisible} onRequestClose={() => setImageViewVisible(false)}>
        <View style={styles.modalBody} onStartShouldSetResponder={() => true}>
          <View style={{ zIndex: 1500, position: 'absolute', right: 15, top: statusBarHeight + 15, padding: 10, borderRadius: 50, backgroundColor: GRAY_SECOND, borderWidth: 1, borderColor: GRAY_SECOND }}>
            <TouchableOpacity onPress={() => setImageViewVisible(false)} hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
              <Feather name="x" size={20} color={WHITE} />
            </TouchableOpacity>
          </View>
          <ReactNativeZoomableView
            maxZoom={3}
            minZoom={0.5}
            zoomStep={0.5}
            initialZoom={0.9}
            bindToBorders
            zoomEnabled
            captureEvent
          >
            <FastImage source={data[selected]} style={styles.body} resizeMode={FastImage.resizeMode.contain} />
          </ReactNativeZoomableView>
        </View>
      </Modal>
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
