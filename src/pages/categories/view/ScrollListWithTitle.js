import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import nextId from 'react-id-generator'
import { BlockTitleAndButton } from '../../../components/ui/kit/BlockTitleAndButton'
import { ListItem } from './element/ListItem'
import { BY_CATEGORY } from '../../../constants/static'

const styles = StyleSheet.create({
  scrollView: { marginHorizontal: 15 }
})

const ScrollListWithTitle = (props) => {
  const { onPress, masked, title, data, navigation } = props
  if (!data || data.length === 0) return null
  return (
    <BlockTitleAndButton onPress={onPress} title={title} masked={masked}>
      <FlatList
        style={styles.scrollView}
        data={data}
        renderItem={(item) => (<ListItem item={item.item} onPress={() => navigation.push('BoutiqueList', { cat_id: item.item.id, filter: BY_CATEGORY })} />)}
        keyExtractor={() => nextId()}
      />
    </BlockTitleAndButton>
  )
}


export { ScrollListWithTitle }
