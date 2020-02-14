import React, { useState } from 'react'
import { View, StyleSheet, ScrollView, Modal, TouchableOpacity } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import FastImage from 'react-native-fast-image'
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView'
import nextId from 'react-id-generator'
import { GRAY_SECOND, w, WHITE } from '../../../constants/global'


const styles = StyleSheet.create({
  body: { flex: 1 },
  view: { marginHorizontal: 10 },
  container: { width: w, height: '100%' },
  modalBody: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }
})


const ImageZoomer = (props) => {
  const { images, style, contain } = props
  const [isVisible, setVisible] = useState(false)
  const [image, setImage] = useState(null)
  return (
    <View style={[{ flex: 1 }, style]}>
      <ScrollView horizontal pagingEnabled style={styles.body}>
        {
            images.map((el) =>
              <TouchableOpacity
                onPress={() => {
                  setImage(el)
                  setVisible(true)
                }}
                key={nextId()}
              >
                <View key={nextId()} style={styles.container}>
                  <FastImage source={el} style={[styles.body]} resizeMode={contain ? FastImage.resizeMode.contain : FastImage.resizeMode.cover} />
                </View>
              </TouchableOpacity>)
        }
      </ScrollView>
      <Modal visible={isVisible} onRequestClose={() => setVisible(false)}>
        <View style={styles.modalBody} onStartShouldSetResponder={() => true}>
          <View style={{ zIndex: 1500, position: 'absolute', right: 15, top: 15, padding: 10, borderRadius: 50, backgroundColor: GRAY_SECOND, borderWidth: 1, borderColor: GRAY_SECOND }}>
            <TouchableOpacity onPress={() => setVisible(false)} hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
              <Feather name="x" size={20} color={WHITE} />
            </TouchableOpacity>
          </View>
          <ReactNativeZoomableView
            maxZoom={3}
            minZoom={0.5}
            zoomStep={0.5}
            initialZoom={1}
            bindToBorders
            zoomEnabled
            captureEvent
          >
            <FastImage source={image} style={styles.body} resizeMode={FastImage.resizeMode.contain} />
          </ReactNativeZoomableView>
        </View>
      </Modal>
    </View>
  )
}


export { ImageZoomer }
