import React, { useState } from 'react'
import { View, StyleSheet, Text, Modal } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import nextId from 'react-id-generator'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { BlockTitleAndButton } from '../../../components/ui/kit/BlockTitleAndButton'
import { Response } from '../../../components/ui/view'
import { AddResponse } from '.'
import { normalize, GRAY, BORDER_COLOR } from '../../../constants/global'

const styles = StyleSheet.create({
  view: { marginHorizontal: 15 },
  row: { flexDirection: 'row', justifyContent: 'space-evenly' },
  keytext: { fontSize: normalize(12), color: GRAY },
  element: { flex: 1, paddingVertical: 15, borderTopWidth: 1, borderTopColor: BORDER_COLOR },
  btnView: { borderRadius: 5, backgroundColor: BORDER_COLOR, margin: 15, alignItems: 'center', borderColor: '#E2E8F0' },
  btnText: { marginVertical: 15, fontSize: normalize(12), color: GRAY }
})


const ResponseList = ({ data, onLayourRef, boutique, afterAdd }) => {
  const [visible, setVisible] = useState(false)
  return (
    <BlockTitleAndButton onLayourRef={onLayourRef} name="response" onPress={() => {}} element={<Icon name="arrow-right" size={20} />} title="Оценки и отзывы">
      <View style={styles.view}>
        {
          data.map((item, index) => (
            <Response key={nextId()} index={index} name={item.name} rating={item.rating} text={item.text} date={item.date} />
          ))
        }
      </View>
      <TouchableOpacity onPress={() => setVisible(true)}>
        <View style={styles.btnView}>
          <Text style={styles.btnText}>Добавить отзыв</Text>
        </View>
      </TouchableOpacity>
      <Modal visible={visible} onRequestClose={() => setVisible(false)} transparent>
        <AddResponse id={boutique.id} close={() => setVisible(false)} afterAdd={afterAdd} />
      </Modal>
    </BlockTitleAndButton>
  )
}


export { ResponseList }
