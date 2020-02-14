import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import nextId from 'react-id-generator'
import { BlockTitleAndButton } from '../../../components/ui/kit/BlockTitleAndButton'
import { RoundBig } from '../../../components/ui/view/index'

const styles = StyleSheet.create({
  scrollView: { }
})

const ScrollRoundWithTitle = (props) => {
  const { onPress, masked, title, data, selected, setSelected } = props
  if (!data || data.length < 1) return null
  return (
    <BlockTitleAndButton onPress={onPress} title={title} masked={masked}>
      <FlatList
        style={styles.scrollView}
        data={data}
        renderItem={(item) => (<RoundBig item={item.item} onPress={() => setSelected(item.item.id)} selected={!selected.includes(item.item.id)} />)}
        horizontal
        keyExtractor={() => nextId()}
        showsHorizontalScrollIndicator={false}
      />
    </BlockTitleAndButton>
  )
}


export { ScrollRoundWithTitle }
