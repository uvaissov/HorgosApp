import React, { useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import _ from 'lodash'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { WHITE, RED, GRAY_SECOND, ORANGE, normalize } from '../../../constants/global'


const styles = StyleSheet.create({
  view: { margin: 15, flexDirection: 'row', alignItems: 'center' },
  adButtomView: { borderRadius: 6, borderWidth: 1, borderColor: RED, paddingVertical: 5, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center' },
  adText: { marginHorizontal: 10, color: RED },
  raitingView: { marginLeft: 15 },
  raitingText: { color: GRAY_SECOND, fontSize: normalize(10) },
  startsView: { flexDirection: 'row', marginBottom: 5 },
  startStyle: { marginRight: 4 }
})


const FavoriteCmp = () => {
  const [selected, setSelected] = useState(false)
  const color = selected ? WHITE : RED
  const backgroundColor = !selected ? WHITE : RED
  return (
    <View style={styles.view}>
      <View>
        <TouchableOpacity onPress={() => setSelected(!selected)}>
          <View style={[styles.adButtomView, { backgroundColor }]}>
            <Feather name="heart" size={20} color={color} />
            <Text style={[styles.adText, { color }]}>В избранное</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.raitingView}>
        <View style={styles.startsView}>{
          Array(5).fill().map(() => <FontAwesome key={_.uniqueId()} style={styles.startStyle} name="star" color={ORANGE} size={10} />)
          }
        </View>
        <View><Text style={styles.raitingText}>5/5 (148 отзывов)</Text></View>
      </View>
    </View>
  )
}


export { FavoriteCmp }