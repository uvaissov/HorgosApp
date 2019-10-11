import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text, ScrollView, FlatList } from 'react-native'
import { MaskGradient } from '../kit/MaskGradient'
import { BLACK, normalize } from '../../../constants/global'
import { CardBig } from './index'

const styles = StyleSheet.create({
  view: { },
  header: { flexDirection: 'row', paddingHorizontal: 15, marginVertical: 15 },
  title: { color: BLACK, flex: 1, fontSize: normalize(16), fontWeight: 'bold' },
  button: { height: '100%', width: 150 }
})

const ScrollWithTitle = (props) => {
  const { onPress, element, title } = props
  return (
    <View style={[styles.view, props.style]}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={onPress} style={styles.button}><MaskGradient element={element} /></TouchableOpacity>
      </View>
      <ScrollView horizontal>
        <FlatList
          data={['1', '2', '1', '2']}
          renderItem={(item) => (<CardBig height={207} width={168} item={item.item} index={item.index} />)}
          horizontal
        />
      </ScrollView>
    </View>
  )
}


export { ScrollWithTitle }
