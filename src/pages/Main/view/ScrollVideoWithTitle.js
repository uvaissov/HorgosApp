import React from 'react'
import { StyleSheet, View, FlatList, Linking } from 'react-native'
import nextId from 'react-id-generator'
import FastImage from 'react-native-fast-image'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { BlockTitleAndButton } from '../../../components/ui/kit/BlockTitleAndButton'
import { w } from '../../../constants/global'

const height = (0.53 * (w - 30))
const width = w - 30

const styles = StyleSheet.create({
  container: { margin: 15 },
  view: { width: w - 30, flex: 1, borderRadius: 9, overflow: 'hidden' },
  image: { height, width, justifyContent: 'center', alignItems: 'center' },
  playImage: { height: height / 3, width: width / 3, opacity: 0.8 }
})

const ScrollVideoWithTitle = (props) => {
  const { title, data } = props
  if (!data || data.length < 1) return null

  const openPlayer = (url) => {
    Linking.canOpenURL(url).then((supported) => {
      if (!supported) {
        return
      }

      return Linking.openURL(url)
    }).catch(() => {})
  }
  return (
    <BlockTitleAndButton title={title}>
      <FlatList
        style={styles.scrollView}
        data={data}
        pagingEnabled
        renderItem={(el) => (
          <View style={styles.container}>
            <View style={styles.view}>
              <TouchableOpacity onPress={() => openPlayer(el.item.iframe)}>
                <FastImage source={{ uri: `https://img.youtube.com/vi/${el.item.code}/hqdefault.jpg` }} style={styles.image} resizeMode={FastImage.resizeMode.cover}>
                  <FastImage source={require('../../../../resources/icons/element/play.png')} style={styles.playImage} resizeMode={FastImage.resizeMode.center} />
                </FastImage>
              </TouchableOpacity>
            </View>
          </View>
        )}
        horizontal
        keyExtractor={() => nextId()}
        showsHorizontalScrollIndicator={false}
      />
    </BlockTitleAndButton>
  )
}


export { ScrollVideoWithTitle }
