import React, { useState } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import nextId from 'react-id-generator'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { BlockTitleAndButton } from '../../../components/ui/kit/BlockTitleAndButton'
//import { BLACK, normalize } from '../../../constants/global'
import { ListItem } from './element/ListItem'
import { MaskGradient } from '../../../components/ui/kit/MaskGradient'
import { w, normalize } from '../../../constants/global'

const staticLimit = 5
const textWidth = w / 3
const styles = StyleSheet.create({
  scrollView: { marginHorizontal: 15 },
  text: { fontSize: normalize(12), fontWeight: 'bold' },
  textView: { marginHorizontal: 15 }
})

const ScrollListWithTitle = (props) => {
  const { onPress, title, data = [], navigation } = props
  const [limit, setLimit] = useState(staticLimit)
  const size = data.length
  return (
    <BlockTitleAndButton onPress={onPress} title={title}>
      <FlatList
        style={styles.scrollView}
        data={data.slice(0, limit)}
        renderItem={(item) => (<ListItem item={item.item} onPress={() => navigation.push('HelpItemView', { item: item.item })} />)}
        keyExtractor={() => nextId()}
      />
      {
        size > limit &&
        <View style={styles.textView}>
          <TouchableOpacity onPress={() => setLimit(size)}>
            <View style={{ width: textWidth, height: normalize(12) + 5 }}>
              <MaskGradient style={{ alignItems: 'flex-start' }} element={(<Text style={styles.text}>Все вопросы</Text>)} />
            </View>
          </TouchableOpacity>
        </View>
      }
      {
        limit > staticLimit &&
        <View style={styles.textView}>
          <TouchableOpacity onPress={() => setLimit(staticLimit)}>
            <View style={{ width: textWidth, height: normalize(12) }}>
              <MaskGradient style={{ alignItems: 'flex-start' }} element={(<Text style={styles.text}>Скрыть</Text>)} />
            </View>
          </TouchableOpacity>
        </View>
      }
    </BlockTitleAndButton>
  )
}


export { ScrollListWithTitle }
