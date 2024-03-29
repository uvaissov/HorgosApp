import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import _ from 'lodash'
import Icon from 'react-native-vector-icons/Feather'
import { BlockTitleAndButton } from '../../../components/ui/kit/BlockTitleAndButton'

import { normalize, GRAY, BORDER_COLOR } from '../../../constants/global'


const styles = StyleSheet.create({
  view: { marginHorizontal: 15 },
  row: { flexDirection: 'row', justifyContent: 'space-evenly' },
  text: { fontSize: normalize(13), color: GRAY },
  element: { flex: 1, paddingVertical: 15, borderTopWidth: 1, borderTopColor: BORDER_COLOR }
})


const ProductList = ({ data, onPress, onLayourRef }) => {
  if (!data) return null

  return (
    <BlockTitleAndButton onLayourRef={onLayourRef} name="product" onPress={() => onPress()} element={<Icon name="arrow-right" size={20} />} title="Ассортимент товаров А-Я">
      <View style={styles.view}>
        {
          data.slice(0, 5).map((item, index) => {
            const { name } = item
            return (
              <View key={_.uniqueId()} style={[styles.row]}>
                <View style={[styles.element, { borderTopWidth: index === 0 ? 0 : 1 }]}><Text style={styles.text}>{name}</Text></View>
              </View>
            )
          })
        }
      </View>
    </BlockTitleAndButton>
  )
}


export { ProductList }
