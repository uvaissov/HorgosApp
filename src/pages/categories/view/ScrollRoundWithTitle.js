import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import nextId from 'react-id-generator'
import { BlockTitleAndButton } from '../../../components/ui/kit/BlockTitleAndButton'
//import { BLACK, normalize } from '../../../constants/global'
import { Round } from './element/Round'

const styles = StyleSheet.create({
  scrollView: { }
})

const ScrollRoundWithTitle = (props) => {
  const { onPress, masked, title } = props
  return (
    <BlockTitleAndButton onPress={onPress} title={title} masked={masked}>
      <FlatList
        style={styles.scrollView}
        data={['1', '2', '1', '2', '2', '1', '2']}
        renderItem={(item) => (<Round height={207} width={168} item={item.item} index={item.index} />)}
        horizontal
        keyExtractor={() => nextId()}
        showsHorizontalScrollIndicator={false}
      />
    </BlockTitleAndButton>
  )
}


export { ScrollRoundWithTitle }
