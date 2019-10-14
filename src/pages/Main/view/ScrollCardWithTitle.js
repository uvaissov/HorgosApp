import React from 'react'
import { StyleSheet, ScrollView, FlatList } from 'react-native'
import { BlockTitleAndButton } from '../../../components/ui/kit/BlockTitleAndButton'
//import { BLACK, normalize } from '../../../constants/global'
import { CardBig } from '../../../components/ui/view/index'

const styles = StyleSheet.create({
  scrollView: { }
})

const ScrollCardWithTitle = (props) => {
  const { onPress, masked, title, element } = props
  return (
    <BlockTitleAndButton onPress={onPress} element={element} title={title} masked={masked}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} styles={styles.scrollView}>
        <FlatList
          data={['1', '2', '1', '2']}
          renderItem={(item) => (<CardBig height={207} width={168} item={item.item} index={item.index} />)}
          horizontal
        />
      </ScrollView>
    </BlockTitleAndButton>
  )
}


export { ScrollCardWithTitle }
