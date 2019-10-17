import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import _ from 'lodash'
import Icon from 'react-native-vector-icons/Feather'
import { BlockTitleAndButton } from '../../../components/ui/kit/BlockTitleAndButton'

import { normalize, GRAY, BORDER_COLOR } from '../../../constants/global'


const styles = StyleSheet.create({
  view: { marginHorizontal: 15 },
  row: { flexDirection: 'row', justifyContent: 'space-evenly' },
  keytext: { fontSize: normalize(12), color: GRAY },
  element: { flex: 1, paddingVertical: 15, borderTopWidth: 1, borderTopColor: BORDER_COLOR }
})


const ProductList = ({ data }) => {
  if (!data) return null

  return (
    <BlockTitleAndButton onPress={() => {}} element={<Icon name="arrow-right" size={20} />} title="Ассортимент товаров А-Я">
      <View style={styles.view}>
        {
          data.map((item, index) => {
            const { value } = item
            return (
              <View key={_.uniqueId()} style={[styles.row]}>
                <View style={[styles.element, { borderTopWidth: index === 0 ? 0 : 1 }]}><Text style={styles.text}>{value}</Text></View>
              </View>
            )
          })
        }
      </View>
    </BlockTitleAndButton>
  )
}


export { ProductList }
