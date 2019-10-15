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
  const { onPress, masked, title, element, navigation } = props
  const onItemPress = (item) => {
    console.log('pressed to Boutique', item)
    navigation.push('Boutique', { item })
  }
  return (
    <BlockTitleAndButton onPress={onPress} element={element} title={title} masked={masked}>
      <FlatList
        style={styles.scrollView}
        data={['1', '2', '3', '4']}
        renderItem={(item) => (<CardBig height={207} width={168} item={item.item} index={item.index} onPress={onItemPress} />)}
        horizontal
        keyExtractor={() => nextId()}
        showsHorizontalScrollIndicator={false}
      />
    </BlockTitleAndButton>
  )
}


export { ScrollCardWithTitle }
