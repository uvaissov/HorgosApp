import React from 'react'
import { View, StyleSheet } from 'react-native'
import PhotoView from 'react-native-photo-view'
import { FooterUI, HeaderUI } from '../../components/ui/view'
import { WHITE, BORDER_COLOR } from '../../constants/global'
import CustomStatusBar from '../../components/CustomStatusBar'

const styles = StyleSheet.create({
  view: { backgroundColor: WHITE, flex: 1 },
  body: { flex: 1, overflow: 'hidden' },
  sortView: { paddingHorizontal: 15, borderBottomWidth: 1, borderBottomColor: BORDER_COLOR, paddingBottom: 15 }
})

const MapShow = ({ navigation }) => {
  console.log('show')
  return (
    <View style={[styles.view]}>
      <CustomStatusBar backgroundColor={WHITE} barStyle="light-content" />
      <HeaderUI text="Карта Хоргос" leftIcon="menu" leftOnPress={() => navigation.openDrawer()} withSearch={false} />
      <View style={styles.sortView} />
      <View style={styles.body}>
        <PhotoView
          source={require('../../../resources/image/map.png')}
          minimumZoomScale={1}
          maximumZoomScale={3}
          androidScaleType="center"
          onLoad={() => console.log('Image loaded!')}
          style={{ height: '100%', flex: 1 }}
        />
      </View>
      <FooterUI navigation={navigation} />
    </View>
  )
}


export default MapShow
