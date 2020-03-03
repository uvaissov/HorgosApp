import React from 'react'
import { View, StyleSheet } from 'react-native'
import { ImageZoomer } from '../../map/component/ImageZoomer'
import { BlockTitleAndButton } from '../../../components/ui/kit/BlockTitleAndButton'
import { w } from '../../../constants/global'
import { strings } from '../../../service/Locale'


const bannerW = w - 30
const bannerH = bannerW * 0.5

const styles = StyleSheet.create({
  view: { borderRadius: 5, overflow: 'hidden', marginHorizontal: 15, flex: 1 },
  image: { height: bannerH, width: w }
})

const MapShow = ({ data, onLayourRef }) => {
  if (!data || data.length < 1) return null
  return (
    <BlockTitleAndButton onLayourRef={onLayourRef} name="map" title={strings('boutique.mapTitle')}>
      <View style={styles.view}>
        <ImageZoomer images={data} style={styles.image} />
      </View>
    </BlockTitleAndButton>
  )
}


export { MapShow }
