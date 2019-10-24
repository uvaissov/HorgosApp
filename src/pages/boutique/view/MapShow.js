import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import FastImage from 'react-native-fast-image'
import PhotoView from '@merryjs/photo-viewer'
import { BlockTitleAndButton } from '../../../components/ui/kit/BlockTitleAndButton'
import { w } from '../../../constants/global'

const bannerW = w - 30
const bannerH = bannerW * 0.5

const styles = StyleSheet.create({
  view: { borderRadius: 5, overflow: 'hidden', marginHorizontal: 15 },
  image: { height: bannerH, width: bannerW }
})

const MapShow = ({ data, onLayourRef }) => {
  if (!data) return null
  const [isImageViewVisible, setImageViewVisible] = useState(false)
  const images = [
    {
      source: require('../../../../resources/image/map.png'),
      title: 'Карта торгового центра'
      //width: w,
      //height: w * 0.5
    }
  ]
  return (
    <BlockTitleAndButton onLayourRef={onLayourRef} name="map" title="Карта торгового центра">
      <TouchableOpacity onPress={() => setImageViewVisible(true)}>
        <View style={styles.view}>
          <FastImage source={require('../../../../resources/image/map.png')} style={styles.image} resizeMode={FastImage.resizeMode.cover} />
        </View>
      </TouchableOpacity>
      <PhotoView
        visible={isImageViewVisible}
        data={images}
        hideStatusBar
        hideShareButton
        initial={0}
        onDismiss={() => {
          // don't forgot set state back.
          setImageViewVisible(false)
        }}
      />
    </BlockTitleAndButton>
  )
}


export { MapShow }
