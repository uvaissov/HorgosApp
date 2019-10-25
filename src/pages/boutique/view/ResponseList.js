import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { BlockTitleAndButton } from '../../../components/ui/kit/BlockTitleAndButton'
import { Response } from '../../../components/ui/view'
import { normalize, GRAY, BORDER_COLOR } from '../../../constants/global'

const styles = StyleSheet.create({
  view: { marginHorizontal: 15 },
  row: { flexDirection: 'row', justifyContent: 'space-evenly' },
  keytext: { fontSize: normalize(12), color: GRAY },
  element: { flex: 1, paddingVertical: 15, borderTopWidth: 1, borderTopColor: BORDER_COLOR },
  btnView: { borderRadius: 5, backgroundColor: BORDER_COLOR, margin: 15, alignItems: 'center', borderColor: '#E2E8F0' },
  btnText: { marginVertical: 15, fontSize: normalize(12), color: GRAY }
})


const ResponseList = ({ data, onLayourRef }) => {
  if (!data) return null

  return (
    <BlockTitleAndButton onLayourRef={onLayourRef} name="response" onPress={() => {}} element={<Icon name="arrow-right" size={20} />} title="Оценки и отзывы">
      <View style={styles.view}>
        {
          data.map((item) => (
            <Response item={item} />
          ))
        }
      </View>
      <TouchableOpacity>
        <View style={styles.btnView}>
          <Text style={styles.btnText}>Добавить отзыв</Text>
        </View>
      </TouchableOpacity>
    </BlockTitleAndButton>
  )
}


export { ResponseList }