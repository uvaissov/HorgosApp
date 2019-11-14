import React, { useState } from 'react'
import { StyleSheet, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import nextId from 'react-id-generator'
import { BlockTitleAndButton } from '../../../components/ui/kit/BlockTitleAndButton'
import { RoundBig } from '../../../components/ui/view/index'

const styles = StyleSheet.create({
  scrollView: { }
})

const ScrollRoundWithTitle = (props) => {
  const [selected, setSelected] = useState(0)
  const { onPress, masked, title } = props
  return (
    <BlockTitleAndButton onPress={onPress} element={<Icon name="arrow-right" size={20} />} title={title} masked={masked}>
      <FlatList
        style={styles.scrollView}
        data={['1', '2', '1', '2', '2', '1', '2']}
        renderItem={(item) => (<RoundBig item={item.item} onPress={() => setSelected(item.index)} selected={selected === item.index} />)}
        horizontal
        keyExtractor={() => nextId()}
        showsHorizontalScrollIndicator={false}
      />
    </BlockTitleAndButton>
  )
}


export { ScrollRoundWithTitle }