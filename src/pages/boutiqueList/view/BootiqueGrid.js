import React from 'react'
import { StyleSheet, FlatList, View } from 'react-native'
import { CardSmall } from '../../../components/ui/view'
import { w } from '../../../constants/global'

const styles = StyleSheet.create({
  view: { marginTop: 15, paddingHorizontal: 10 },
  box: { width: 50, height: 50 },
  flexView: { }
})

const BootiqueGrid = ({ navigation }) => {
  const onItemPress = (item) => {
    navigation.push('Boutique', { item })
  }
  const elWidth = (w - 50) / 3
  return (
    <View style={styles.view}>
      <FlatList
        style={styles.flexView}
        numColumns={3}
        data={['', '', '', '']}
        renderItem={(item) => (<CardSmall width={elWidth} item={item.item} index={item.index} onPress={onItemPress} />)}
      />
    </View>
  )
}


export { BootiqueGrid }
