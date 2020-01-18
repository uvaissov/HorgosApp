import React from 'react'
import { StyleSheet, View, FlatList, Platform } from 'react-native'
import nextId from 'react-id-generator'
import { YouTubeStandaloneAndroid, YouTubeStandaloneIOS } from 'react-native-youtube'
import FastImage from 'react-native-fast-image'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { BlockTitleAndButton } from '../../../components/ui/kit/BlockTitleAndButton'
import { w } from '../../../constants/global'


const styles = StyleSheet.create({
  container: { margin: 15 },
  view: { width: w - 30, flex: 1, borderRadius: 9, overflow: 'hidden' },
  image: { height: (0.53 * (w - 30)), width: w - 30, justifyContent: 'center', alignItems: 'center' },
  playImage: { height: (0.53 * (w - 30)) / 3, width: w - 30 / 3, opacity: 0.8 }
})

const ScrollVideoWithTitle = (props) => {
  const { title, data } = props
  if (!data || data.length < 1) return null

  const openPlayer = (videoId) => {
    if (Platform.OS === 'ios') {
      YouTubeStandaloneIOS.playVideo(videoId)
        .then(message => console.log(message))
        .catch(errorMessage => console.error(errorMessage))
    } else {
      YouTubeStandaloneAndroid.playVideo({
        apiKey: 'AIzaSyCjLofUnRphhjlhKQ0BCzuU86F7VLCTj00',
        videoId,
        autoplay: true
      })
        .then(() => console.log('Player closed'))
        .catch(e => console.error(e))
    }
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
              <TouchableOpacity onPress={() => openPlayer(el.item.code)}>
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
