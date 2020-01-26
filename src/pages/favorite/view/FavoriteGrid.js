import React, { useState } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import nextId from 'react-id-generator'
import { BlockTitleAndButton } from '../../../components/ui/kit/BlockTitleAndButton'
import { CardSmall } from '../../../components/ui/view'
import { w, normalize, BORDER_COLOR, GRAY } from '../../../constants/global'

const styles = StyleSheet.create({
  view: { marginHorizontal: 10 },
  text: { fontSize: normalize(12), fontWeight: 'bold' },
  textView: { borderWidth: 1, borderRadius: 5, borderColor: BORDER_COLOR }
})
const elWidth = (w - 50) / 3
const FavoriteGrid = (props) => {
  const { item, navigation, title } = props
  const [expanded, setExpand] = useState(false)
  const onItemPress = (i) => {
    navigation.push('Boutique', { boutique: i })
  }
  const onPress = () => {
    setExpand(!expanded)
  }
  //const title = 'ТЦ Чжун Кэ-1'
  const count = item.items.length || 0
  const elements = item.items
  return (
    <BlockTitleAndButton onPress={onPress} title={title} count={count} element={count > 3 ? <Feather name={!expanded ? 'chevron-down' : 'chevron-up'} color={GRAY} size={23} /> : null}>
      <View style={styles.view}>
        <FlatList
          style={styles.flexView}
          numColumns={3}
          data={expanded ? elements : elements.slice(0, 3)}
          keyExtractor={() => nextId()}
          renderItem={(el) => (<CardSmall width={elWidth} item={el.item} index={el.index} onPress={onItemPress} />)}
        />
      </View>
    </BlockTitleAndButton>
  )
}


export { FavoriteGrid }
