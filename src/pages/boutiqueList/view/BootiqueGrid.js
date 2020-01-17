import React from 'react'
import { StyleSheet, FlatList, View } from 'react-native'
import nextId from 'react-id-generator'
import { CardSmall } from '../../../components/ui/view'
import { w } from '../../../constants/global'

const styles = StyleSheet.create({
  view: { marginTop: 15, paddingHorizontal: 10 },
  box: { width: 50, height: 50 },
  flexView: { }
})

const BootiqueGrid = ({ navigation, data }) => {
  const onItemPress = (item) => {
    navigation.push('Boutique', { boutique: item })
  }
  const elWidth = (w - 50) / 3
  return (
    <View style={styles.view}>
      <FlatList
        key={nextId()}
        style={styles.flexView}
        numColumns={3}
        data={data}
        keyExtractor={() => nextId()}
        renderItem={(item) => (<CardSmall width={elWidth} item={item.item} index={item.index} onPress={onItemPress} />)}
      />
    </View>
  )
}


export { BootiqueGrid }
