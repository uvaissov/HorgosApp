import React, { useState } from 'react'
import { View, StyleSheet, Modal } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import FastImage from 'react-native-fast-image'
import PhotoView from 'react-native-photo-view'
import { BlockTitleAndButton } from '../../../components/ui/kit/BlockTitleAndButton'
import { w, BLACK } from '../../../constants/global'

const bannerW = w - 30
const bannerH = bannerW * 0.5

const styles = StyleSheet.create({
  view: { borderRadius: 5, overflow: 'hidden', marginHorizontal: 15 },
  image: { height: bannerH, width: bannerW }
})

const MapShow = ({ data, onLayourRef }) => {
  if (!data) return null
  const [isImageViewVisible, setImageViewVisible] = useState(false)
  // const images = [
  //   {
  //     source: require('../../../../resources/image/map.png'),
  //     title: 'Карта торгового центра'
  //     //width: w,
  //     //height: w * 0.5
  //   }
  // ]
  return (
    <BlockTitleAndButton onLayourRef={onLayourRef} name="map" title="Карта торгового центра">
      <TouchableOpacity onPress={() => setImageViewVisible(true)}>
        <View style={styles.view}>
          <FastImage source={require('../../../../resources/image/map.png')} style={styles.image} resizeMode={FastImage.resizeMode.cover} />
        </View>
      </TouchableOpacity>
      <Modal visible={isImageViewVisible} onRequestClose={() => setImageViewVisible(false)}>
        <View style={{ flex: 1, backgroundColor: BLACK }}>
          <PhotoView
            source={require('../../../../resources/image/map.png')}
            minimumZoomScale={1}
            maximumZoomScale={3}
            androidScaleType="center"
            onLoad={() => console.log('Image loaded!')}
            style={{ height: '100%', flex: 1 }}
          />
        </View>
      </Modal>
    </BlockTitleAndButton>
  )
}


export { MapShow }
