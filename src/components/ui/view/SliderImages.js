import React, { useState } from 'react'
import { View, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, Modal, ScrollView } from 'react-native'
import FastImage from 'react-native-fast-image'
import nextId from 'react-id-generator'
import Swiper from 'react-native-swiper'
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView'
import Feather from 'react-native-vector-icons/Feather'
import _ from 'lodash'
import { GRAY_SECOND, h, w, WHITE } from '../../../constants/global'

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
  //const images = data.map((el) => ({ source: el }))
  const [isImageViewVisible, setImageViewVisible] = useState(false)
  const [selected, setSelected] = useState(0)
  const [scrollEnabled] = useState(true)
  //const imageView = useRef(null)
  return (
    <View>
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
      <Modal visible={isImageViewVisible} onRequestClose={() => setImageViewVisible(false)}>
        <View style={styles.modalBody} onStartShouldSetResponder={() => true}>
          <View style={{ zIndex: 1500, position: 'absolute', right: 15, top: 15, padding: 10, borderRadius: 50, backgroundColor: GRAY_SECOND, borderWidth: 1, borderColor: GRAY_SECOND }}>
            <TouchableOpacity onPress={() => setImageViewVisible(false)} hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
              <Feather name="x" size={20} color={WHITE} />
            </TouchableOpacity>
          </View>
          <ScrollView scrollEnabled={scrollEnabled} horizontal pagingEnabled style={[styles.body]}>
            {
                data.map((item) => (
                  <View key={nextId()} style={[{ width: w, height: h }]}>
                    <ReactNativeZoomableView
                      // onZoomBefore={() => {
                      //   setScrollEnabled(false)
                      // }}
                      // onZoomEnd={() => {
                      //   setScrollEnabled(true)
                      // }}
                      maxZoom={3}
                      minZoom={0.5}
                      zoomStep={0.5}
                      initialZoom={1}
                      bindToBorders
                      zoomEnabled
                      captureEvent
                    >
                      <FastImage source={item} style={styles.body} resizeMode={FastImage.resizeMode.contain} />
                    </ReactNativeZoomableView>
                  </View>
                ))
            }
          </ScrollView>
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
