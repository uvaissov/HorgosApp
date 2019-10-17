import React from 'react'
import { View, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { BlockTitleAndButton } from '../../../components/ui/kit/BlockTitleAndButton'
import { Response } from '../../../components/ui/view'
import { normalize, GRAY, BORDER_COLOR } from '../../../constants/global'


const styles = StyleSheet.create({
  view: { marginHorizontal: 15 },
  row: { flexDirection: 'row', justifyContent: 'space-evenly' },
  keytext: { fontSize: normalize(12), color: GRAY },
  element: { flex: 1, paddingVertical: 15, borderTopWidth: 1, borderTopColor: BORDER_COLOR }
})


const ResponseList = ({ data }) => {
  if (!data) return null

  return (
    <BlockTitleAndButton onPress={() => {}} element={<Icon name="arrow-right" size={20} />} title="Оценки и отзывы">
      <View style={styles.view}>
        {
          data.map((item) => (
            <Response item={item} />
          ))
        }
      </View>
    </BlockTitleAndButton>
  )
}


export { ResponseList }
