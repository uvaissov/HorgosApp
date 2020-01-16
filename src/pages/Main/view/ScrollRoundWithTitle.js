import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import nextId from 'react-id-generator'
import { BlockTitleAndButton } from '../../../components/ui/kit/BlockTitleAndButton'
//import { BLACK, normalize } from '../../../constants/global'
import { RoundWithDiscont } from '../../../components/ui/view/index'

const styles = StyleSheet.create({
  scrollView: { }
})

const ScrollRoundWithTitle = (props) => {
  const { onPress, masked, title, data, navigation } = props
  if (!data || data.length < 1) return null

  const onItemPress = (item) => {
    const { boutique } = item
    if (boutique && boutique.id) {
      navigation.push('Boutique', { boutique })
    }
  }
  return (
    <BlockTitleAndButton onPress={onPress} element={<Icon name="arrow-right" size={20} />} title={title} masked={masked}>
      <FlatList
        style={styles.scrollView}
        data={data}
        renderItem={(item) => (<RoundWithDiscont height={207} width={168} item={item.item} index={item.index} onPress={onItemPress} />)}
        horizontal
        keyExtractor={() => nextId()}
        showsHorizontalScrollIndicator={false}
      />
    </BlockTitleAndButton>
  )
}


export { ScrollRoundWithTitle }
