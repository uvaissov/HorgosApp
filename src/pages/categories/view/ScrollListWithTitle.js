import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import nextId from 'react-id-generator'
import { BlockTitleAndButton } from '../../../components/ui/kit/BlockTitleAndButton'
//import { BLACK, normalize } from '../../../constants/global'
import { ListItem } from './element/ListItem'

const styles = StyleSheet.create({
  scrollView: { marginHorizontal: 15 }
})

const ScrollListWithTitle = (props) => {
  const { onPress, masked, title } = props
  return (
    <BlockTitleAndButton onPress={onPress} title={title} masked={masked}>
      <FlatList
        style={styles.scrollView}
        data={['1', '2', '1', '2', '2', '1', '2']}
        renderItem={(item) => (<ListItem item={item.item} />)}
        keyExtractor={() => nextId()}
      />
    </BlockTitleAndButton>
  )
}


export { ScrollListWithTitle }
