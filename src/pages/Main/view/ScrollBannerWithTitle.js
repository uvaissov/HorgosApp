import React from 'react'
import { StyleSheet, ScrollView, FlatList, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import Icon from 'react-native-vector-icons/Feather'
import { BlockTitleAndButton } from '../../../components/ui/kit/BlockTitleAndButton'
//import { BLACK, normalize } from '../../../constants/global'
import { w } from '../../../constants/global'

const bannerW = w * 0.74
const bannerH = bannerW * 0.935

const styles = StyleSheet.create({
  scrollView: { },
  view: { margin: 5, borderRadius: 5, overflow: 'hidden', flex: 1 },
  image: { height: bannerH, width: bannerW }
})

const renderItem = (item) => {
  const { index } = item
  return (
    <View style={[styles.view, { marginLeft: index === 0 ? 15 : 5 }]}>
      <FastImage source={require('../../../../resources/image/banner.png')} style={styles.image} resizeMode={FastImage.resizeMode.cover} />
    </View>
  )
}

const ScrollBannerWithTitle = (props) => {
  const { onPress, masked, title } = props
  return (
    <BlockTitleAndButton onPress={onPress} element={<Icon name="arrow-right" size={20} />} title={title} masked={masked}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} styles={styles.scrollView}>
        <FlatList
          data={['1', '2', '1', '2']}
          renderItem={renderItem}
          horizontal
        />
      </ScrollView>
    </BlockTitleAndButton>
  )
}


export { ScrollBannerWithTitle }
