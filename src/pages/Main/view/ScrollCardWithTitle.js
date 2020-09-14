import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { BlockTitleAndButton } from '../../../components/ui/kit/BlockTitleAndButton'
import { CardBig } from '../../../components/ui/view/index'

const styles = StyleSheet.create({
  scrollView: { flex: 1 }
})

const ScrollCardWithTitle = (props) => {
  const { onPress, masked, title, element, navigation, hit, data = [] } = props
  if (!data || data.length < 1) return null

  const onItemPress = (boutique) => {
    //(boutique)
    if (boutique && boutique.id) {
      navigation.push('Boutique', { boutique })
    }
  }
  return (
    <BlockTitleAndButton onPress={onPress} element={element} title={title} masked={masked}>
      <FlatList
        style={styles.scrollView}
        data={data}
        renderItem={(item) => (<CardBig hit={hit} height={207} width={168} item={item.item} index={item.index} onPress={onItemPress} />)}
        horizontal
        keyExtractor={(item) => `ScrollCardWithTitle-${item.id}`}
        showsHorizontalScrollIndicator={false}
      />
    </BlockTitleAndButton>
  )
}


export { ScrollCardWithTitle }
