import React, { useState } from 'react'
import { View, StyleSheet, Text, Modal, TouchableOpacity } from 'react-native'
import _ from 'lodash'
import FastImage from 'react-native-fast-image'
import Feather from 'react-native-vector-icons/Feather'
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView'
import { WHITE, GRAY_LIGHT, normalize, GRAY_SECOND, BLACK, statusBarHeight, translateArray, translate } from '../../../constants/global'
import { strings, locale } from '../../../service/Locale'

const styles = StyleSheet.create({
  view: { margin: 15 },
  row: { flexDirection: 'row', justifyContent: 'space-evenly' },
  keyText: { fontSize: normalize(12), color: GRAY_SECOND },
  valueText: { fontSize: normalize(12), color: BLACK },
  element: { flex: 1, paddingLeft: 15, paddingVertical: 10 },
  elementImage: { justifyContent: 'center', marginRight: 10 },
  body: { flex: 1 },
  modalBody: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }
})

const DetailInfo = ({ boutique }) => {
  //console.log(`locale:${locale()} ${boutique.id}`)
  const [isImageViewVisible, setImageViewVisible] = useState(false)
  const getInfo = () => {
    const array = []
    if (boutique.trading_house_name) {
      array.push({ key: strings('boutique.house'), value: translateArray(boutique.trading_houses, `${locale()}.name`, boutique.trading_house_name) })
    }
    if (boutique.categoriesName) {
      array.push({ key: strings('boutique.category'), value: translateArray(boutique.categories, `${locale()}.name`, boutique.categoriesName) })
    }
    if (boutique.floor) {
      array.push({ key: strings('boutique.floor'), value: translate(boutique, `${locale()}.floor`, boutique.floor) })
    }
    if (boutique.boutique_number) {
      array.push({ key: `${strings('boutique.boutique')} #`, value: translate(boutique, `${locale()}.boutique_number`, boutique.boutique_number) })
    }
    if (boutique.seller_name) {
      array.push({ key: strings('boutique.seller_name'), value: translate(boutique, `${locale()}.seller_name`, boutique.seller_name) })
    }
    if (boutique.owner_name) {
      array.push({ key: strings('boutique.owner_name'), value: translate(boutique, `${locale()}.owner_name`, boutique.owner_name) })
    }
    if (boutique.languages) {
      array.push({ key: strings('boutique.languages'), value: translate(boutique, `${locale()}.languages`, boutique.languages) })
    }
    if (boutique.phone) {
      array.push({ key: strings('boutique.phone'), value: boutique.phone })
    }
    if (boutique.whatsapp) {
      array.push({ key: strings('boutique.whatsapp'), value: boutique.whatsapp })
    }
    if (boutique.weechat && boutique.qr_code) {
      array.push({ key: strings('boutique.weechat'), value: boutique.weechat, image: boutique.qr_code })
    } else if (boutique.weechat) {
      array.push({ key: strings('boutique.weechat'), value: boutique.weechat })
    } else if (boutique.qr_code) {
      array.push({ key: strings('boutique.weechat'), image: boutique.qr_code })
    }
    return array
  }

  return (
    <View style={styles.view}>
      {
        getInfo().map((item, index) => {
          const { key, value, image } = item
          return (
            <View key={_.uniqueId()} style={[styles.row, { backgroundColor: index % 2 === 0 ? WHITE : GRAY_LIGHT }]}>
              <View style={styles.element}><Text style={styles.keyText}>{key}:</Text></View>
              <View style={[styles.element, { flexDirection: 'row' }]}>
                {
                  key === 'WeChat' && image && (
                    <>
                      <TouchableOpacity onPress={() => setImageViewVisible(true)} hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
                        <View style={styles.elementImage}>
                          <FastImage style={{ height: 20, width: 20 }} source={require('../../../../resources/icons/element/qr.png')} resizeMode={FastImage.resizeMode.contain} />
                        </View>
                      </TouchableOpacity>
                      <Modal transparent animationType="fade" visible={isImageViewVisible} onRequestClose={() => setImageViewVisible(false)}>
                        <View style={styles.modalBody} onStartShouldSetResponder={() => true}>
                          <View style={{ zIndex: 1500, position: 'absolute', right: 15, top: statusBarHeight + 15, padding: 10, borderRadius: 50, backgroundColor: GRAY_SECOND, borderWidth: 1, borderColor: GRAY_SECOND }}>
                            <TouchableOpacity onPress={() => setImageViewVisible(false)} hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
                              <Feather name="x" size={20} color={WHITE} />
                            </TouchableOpacity>
                          </View>
                          <ReactNativeZoomableView
                            maxZoom={3}
                            minZoom={0.5}
                            zoomStep={0.5}
                            initialZoom={0.9}
                            bindToBorders
                            zoomEnabled
                            captureEvent
                          >
                            <FastImage source={image} style={styles.body} resizeMode={FastImage.resizeMode.contain} />
                          </ReactNativeZoomableView>
                        </View>
                      </Modal>
                    </>
                  )
                }
                <Text style={styles.valueText}>{value}</Text>
              </View>
            </View>
          )
        })
      }
    </View>
  )
}


export { DetailInfo }
