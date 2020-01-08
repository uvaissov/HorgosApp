import React from 'react'
import { StyleSheet, View, Text, FlatList } from 'react-native'
import nextId from 'react-id-generator'
import FastImage from 'react-native-fast-image'
import { BlockTitleAndButton } from '../../../components/ui/kit/BlockTitleAndButton'
import { w, GREEN } from '../../../constants/global'

const styles = StyleSheet.create({
  view: { marginHorizontal: 15, borderRadius: 5, overflow: 'hidden', flex: 1 },
  image: { height: (0.53 * (w - 30)), width: w - 30 },
  adButtomView: { borderRadius: 6, borderWidth: 1, borderColor: GREEN, paddingVertical: 5, paddingHorizontal: 10 },
  adText: { color: GREEN }
})

const AdBlockWithTitle = (props) => {
  const { onPress, masked, title, data } = props
  if (!data || data.length < 1) return null
  return (
    <BlockTitleAndButton onPress={onPress} element={<View style={styles.adButtomView}><Text style={styles.adText}>Реклама</Text></View>} title={title} masked={masked}>
      <FlatList
        style={styles.scrollView}
        data={data}
        pagingEnabled
        renderItem={(el) => (<View style={styles.view}><FastImage source={el.item.img} style={styles.image} resizeMode={FastImage.resizeMode.cover} /></View>)}
        horizontal
        keyExtractor={() => nextId()}
        showsHorizontalScrollIndicator={false}
      />
    </BlockTitleAndButton>
  )
}


export { AdBlockWithTitle }
