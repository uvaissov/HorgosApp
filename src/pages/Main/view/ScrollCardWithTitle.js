import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import nextId from 'react-id-generator'
import { BlockTitleAndButton } from '../../../components/ui/kit/BlockTitleAndButton'
//import { BLACK, normalize } from '../../../constants/global'
import { CardBig } from '../../../components/ui/view/index'

const styles = StyleSheet.create({
  scrollView: { }
})

const ScrollCardWithTitle = (props) => {
  const { onPress, masked, title, element, navigation, hit, data = [] } = props
  if (!data || data.length < 1) return null

  const onItemPress = (item) => {
    const { boutique } = item
    navigation.push('Boutique', { boutique: boutique || item })
  }
  return (
    <BlockTitleAndButton onPress={onPress} element={element} title={title} masked={masked}>
      <FlatList
        style={styles.scrollView}
        data={data}
        renderItem={(item) => (<CardBig hit={hit} height={207} width={168} item={item.item} index={item.index} onPress={onItemPress} />)}
        horizontal
        keyExtractor={() => nextId()}
        showsHorizontalScrollIndicator={false}
      />
    </BlockTitleAndButton>
  )
}


export { ScrollCardWithTitle }
