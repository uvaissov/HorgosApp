import React, { useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image'
//import PhotoView from 'react-native-photo-view'
//import Image from 'react-native-remote-svg'
import ImageView from 'react-native-image-view'
import { FooterUI, HeaderUI } from '../../components/ui/view'
import { WHITE, BORDER_COLOR } from '../../constants/global'
import CustomStatusBar from '../../components/CustomStatusBar'

const styles = StyleSheet.create({
  view: { backgroundColor: WHITE, flex: 1 },
  body: { flex: 1, overflow: 'hidden' },
  sortView: { paddingHorizontal: 15, borderBottomWidth: 1, borderBottomColor: BORDER_COLOR, paddingBottom: 15 }
})

const images = [
  {
    source: {
      uri: 'https://cdn.pixabay.com/photo/2017/08/17/10/47/paris-2650808_960_720.jpg'
    },
    title: 'Paris',
    width: 802,
    height: 720
  }
]

const MapShow = ({ navigation }) => {
  const [isVisible, setVisible] = useState(false)
  return (
    <View style={[styles.view]}>
      <CustomStatusBar backgroundColor={WHITE} barStyle="light-content" />
      <HeaderUI text="Карта Хоргос" leftIcon="menu" leftOnPress={() => navigation.openDrawer()} withSearch={false} />
      <View style={styles.sortView} />
      <View style={styles.body}>
        {/* <PhotoView
          source={require('../../../resources/image/map.png')}
          minimumZoomScale={1}
          maximumZoomScale={3}
          androidScaleType="center"
          onLoad={() => console.log('Image loaded!')}
          style={{ height: '100%', flex: 1 }}
        />
        <Image
          source={require('../../../resources/image/svg/vertical_map.svg')}
          style={{ width: w, flex: 1 }}
        /> */}
        <TouchableOpacity style={{ flex: 1 }} onPress={() => setVisible(true)}>
          <FastImage source={images[0].source} style={styles.body} resizeMode={FastImage.resizeMode.center} />
        </TouchableOpacity>
        <ImageView
          images={images}
          imageIndex={0}
          isVisible={isVisible}
          renderFooter={() => (<View><Text>My footer</Text></View>)}
          onClose={() => setVisible(false)}
        />
      </View>
      <FooterUI navigation={navigation} />
    </View>
  )
}


export default MapShow
