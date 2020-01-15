import React, { useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import FastImage from 'react-native-fast-image'
//import PhotoView from 'react-native-photo-view'
import ImageView from 'react-native-image-view'
import { BlockTitleAndButton } from '../../../components/ui/kit/BlockTitleAndButton'
import { w } from '../../../constants/global'

const bannerW = w - 30
const bannerH = bannerW * 0.5

const styles = StyleSheet.create({
  view: { borderRadius: 5, overflow: 'hidden', marginHorizontal: 15 },
  image: { height: bannerH, width: bannerW }
})

// const images = [
//   {
//     source: require('../../../../resources/image/map.png'),
//     title: 'Paris',
//     width: 1024,
//     height: 720
//   }
// ]

const MapShow = ({ data, onLayourRef }) => {
  if (!data || data.length < 1) return null

  const images = data.map((el) => ({ source: el }))
  const [isImageViewVisible, setImageViewVisible] = useState(false)
  return (
    <BlockTitleAndButton onLayourRef={onLayourRef} name="map" title="Карта торгового центра">
      <TouchableOpacity onPress={() => setImageViewVisible(true)}>
        <View style={styles.view}>
          <FastImage source={data[0]} style={styles.image} resizeMode={FastImage.resizeMode.cover} />
        </View>
      </TouchableOpacity>
      <ImageView
        images={images}
        imageIndex={0}
        isVisible={isImageViewVisible}
        renderFooter={(el) => (<View><Text>{el.title}</Text></View>)}
        onClose={() => setImageViewVisible(false)}
      />
    </BlockTitleAndButton>
  )
}


export { MapShow }
