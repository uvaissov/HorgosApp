import React from 'react'
import { StyleSheet, FlatList, View, Text, TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image'
import Icon from 'react-native-vector-icons/Feather'
import nextId from 'react-id-generator'
import { BlockTitleAndButton } from '../../../components/ui/kit/BlockTitleAndButton'
import { w, WHITE } from '../../../constants/global'
import { BY_CATEGORY } from '../../../constants/static'

const bannerW = w * 0.74
const bannerH = bannerW

const firstW = (bannerW / 2) + 15
const secondW = bannerW / 4

const styles = StyleSheet.create({
  scrollView: { },
  view: { margin: 5, borderRadius: 5, overflow: 'hidden', flex: 1 },
  image: { height: bannerH, width: bannerW },
  firstImage: { height: firstW, width: firstW, borderRadius: 5 },
  secondImage: { height: secondW, width: secondW, borderRadius: 5 },
  text: { fontSize: 18, color: WHITE, fontWeight: 'bold' }
})

const renderItem = (el) => {
  const { index, item: { background, name, images, category_id } } = el
  const [first, second, third] = images
  return (
    // eslint-disable-next-line react/no-this-in-sfc
    <TouchableOpacity onPress={() => this._onPress(category_id)}>
      <View style={[styles.view, { marginLeft: index === 0 ? 15 : 5 }]}>
        <FastImage source={background} style={styles.image} resizeMode={FastImage.resizeMode.cover}>
          <View style={{ flex: 1, padding: 20 }}>
            <View style={{ flex: 1 }}><Text style={styles.text}>{name}</Text></View>
            <View style={{ flex: 2, flexDirection: 'row' }}>
              <View>
                <FastImage source={first} style={styles.firstImage} resizeMode={FastImage.resizeMode.cover} />
              </View>
              <View>
                <View style={{ marginLeft: 15 }}>
                  <FastImage source={second} style={styles.secondImage} resizeMode={FastImage.resizeMode.cover} />
                </View>
                <View style={{ marginLeft: 15, marginTop: 15 }}>
                  <FastImage source={third} style={styles.secondImage} resizeMode={FastImage.resizeMode.cover} />
                </View>
              </View>
            </View>
          </View>
        </FastImage>
      </View>
    </TouchableOpacity>
  )
}

const ScrollBannerWithTitle = (props) => {
  const { onPress, masked, title, data, navigation } = props
  // eslint-disable-next-line react/no-this-in-sfc
  this._onPress = (category_id) => {
    navigation.push('BoutiqueList', { cat_id: category_id, filter: BY_CATEGORY })
  }
  return (
    <BlockTitleAndButton onPress={onPress} element={<Icon name="arrow-right" size={20} />} title={title} masked={masked}>
      <FlatList
        data={data}
        renderItem={renderItem}
        horizontal
        keyExtractor={() => nextId()}
        showsHorizontalScrollIndicator={false}
      />
    </BlockTitleAndButton>
  )
}


export { ScrollBannerWithTitle }
