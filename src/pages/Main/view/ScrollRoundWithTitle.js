import React from 'react'
import { StyleSheet, ScrollView, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { BlockTitleAndButton } from '../../../components/ui/kit/BlockTitleAndButton'
//import { BLACK, normalize } from '../../../constants/global'
import { RoundWithDiscont } from '../../../components/ui/view/index'

const styles = StyleSheet.create({
  scrollView: { }
})

const ScrollRoundWithTitle = (props) => {
  const { onPress, masked, title } = props
  return (
    <BlockTitleAndButton onPress={onPress} element={<Icon name="arrow-right" size={20} />} title={title} masked={masked}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} styles={styles.scrollView}>
        <FlatList
          data={['1', '2', '1', '2', '2', '1', '2']}
          renderItem={(item) => (<RoundWithDiscont height={207} width={168} item={item.item} index={item.index} />)}
          horizontal
        />
      </ScrollView>
    </BlockTitleAndButton>
  )
}


export { ScrollRoundWithTitle }
