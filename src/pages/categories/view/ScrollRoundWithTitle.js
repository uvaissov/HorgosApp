import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import nextId from 'react-id-generator'
import { BlockTitleAndButton } from '../../../components/ui/kit/BlockTitleAndButton'
//import { BLACK, normalize } from '../../../constants/global'
import { Round } from './element/Round'
import { BY_CATEGORY } from '../../../constants/static'

const styles = StyleSheet.create({
  scrollView: { }
})

const ScrollRoundWithTitle = (props) => {
  const { onPress, masked, title, data, navigation } = props
  if (!data || data.length === 0) return null
  return (
    <BlockTitleAndButton onPress={onPress} title={title} masked={masked}>
      <FlatList
        style={styles.scrollView}
        data={data}
        renderItem={(item) => (<Round height={207} width={168} item={item.item} index={item.index} onPress={() => navigation.push('BoutiqueList', { id: item.item.id, filter: BY_CATEGORY })} />)}
        horizontal
        keyExtractor={() => nextId()}
        showsHorizontalScrollIndicator={false}
      />
    </BlockTitleAndButton>
  )
}


export { ScrollRoundWithTitle }
