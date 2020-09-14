import React, { useState } from 'react'
import { View, StyleSheet, Text, Modal } from 'react-native'
import { useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/Feather'
import _ from 'lodash'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { BlockTitleAndButton } from '../../../components/ui/kit/BlockTitleAndButton'
import { Response } from '../../../components/ui/view'
import { AddResponse } from '.'
import { normalize, GRAY, BORDER_COLOR } from '../../../constants/global'
import { strings } from '../../../service/Locale'

const styles = StyleSheet.create({
  view: { marginHorizontal: 15 },
  row: { flexDirection: 'row', justifyContent: 'space-evenly' },
  keytext: { fontSize: normalize(12), color: GRAY },
  element: { flex: 1, paddingVertical: 15, borderTopWidth: 1, borderTopColor: BORDER_COLOR },
  btnView: { borderRadius: 5, backgroundColor: BORDER_COLOR, margin: 15, alignItems: 'center', borderColor: '#E2E8F0' },
  btnText: { marginVertical: 15, fontSize: normalize(12), color: GRAY }
})


const ResponseList = ({ data, onLayourRef, boutique, afterAdd, onPress }) => {
  const [visible, setVisible] = useState(false)
  const token = useSelector(state => state.auth.token)
  if (!token && (!data || data.length < 1)) {
    return null
  }
  return (
    <BlockTitleAndButton onLayourRef={onLayourRef} name="response" onPress={onPress} element={<Icon name="arrow-right" size={20} />} title={strings('boutique.starAndResponse')}>
      <View style={styles.view}>
        {
          _.orderBy(data, ['date'], ['desc']).slice(0, 3).map((item, index) => (
            <Response key={`${item.name}-${item.id}`} index={index} name={item.name} rating={item.rating} text={item.text} date={item.date} />
          ))
        }
      </View>
      {
        token &&
        <TouchableOpacity onPress={() => setVisible(true)}>
          <View style={styles.btnView}>
            <Text style={styles.btnText}>{strings('boutique.addResponse')}</Text>
          </View>
        </TouchableOpacity>
      }
      <Modal visible={visible} onRequestClose={() => setVisible(false)} transparent>
        <AddResponse id={boutique.id} close={() => setVisible(false)} afterAdd={afterAdd} />
      </Modal>
    </BlockTitleAndButton>
  )
}


export { ResponseList }
