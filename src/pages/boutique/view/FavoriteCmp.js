import React, { useState } from 'react'
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { WHITE, RED, GRAY_SECOND, ORANGE, normalize, BLACK } from '../../../constants/global'
import * as manager from '../../../service/manager'


const styles = StyleSheet.create({
  view: { margin: 15, flexDirection: 'row', alignItems: 'center', marginTop: 0 },
  titleView: { margin: 15 },
  titleText: { color: BLACK, fontSize: normalize(16), fontWeight: '700' },
  adButtomView: { borderRadius: 6, borderWidth: 1, borderColor: RED, paddingVertical: 5, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center' },
  adText: { marginHorizontal: 10, color: RED },
  raitingView: { marginLeft: 15 },
  raitingText: { color: GRAY_SECOND, fontSize: normalize(10) },
  startsView: { flexDirection: 'row', marginBottom: 5 },
  startStyle: { marginRight: 4 }
})

const FavoriteCmp = ({ boutique, token, getFavorite }) => {
  const { rating, name = '' } = boutique
  const ids = useSelector(state => state.favorites.ids) || []
  const [selected, setSelected] = useState(ids.includes(boutique.id))
  const [loadFav, setLoadFav] = useState(false)
  const color = selected ? WHITE : RED
  const backgroundColor = !selected ? WHITE : RED
  const actionFav = async () => {
    if (loadFav === true) return
    setLoadFav(true)
    if (!selected) {
      const data = await manager.addFav(true, token, boutique.id)
      console.log('data', data)
    } else {
      const data = await manager.delFav(true, token, boutique.id)
      console.log('data', data)
    }
    getFavorite()
    setSelected(!selected)
    setLoadFav(false)
  }
  return (
    <View>
      <View style={styles.titleView}>
        <Text style={styles.titleText}>{name}</Text>
      </View>
      <View style={styles.view}>
        <View>
          <TouchableOpacity onPress={() => actionFav()}>
            <View style={[styles.adButtomView, { backgroundColor }]}>
              {
                loadFav ? (
                  <ActivityIndicator style={styles.activityIndicator} size="small" color={color} animating />
                ) : (
                  <>
                    <Feather name="heart" size={20} color={color} />
                  </>
                )
              }
              <Text style={[styles.adText, { color }]}>В избранное</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.raitingView}>
          <View style={styles.startsView}>
            {
              Array(5).fill().map((el, elIdx) => <FontAwesome key={_.uniqueId()} style={styles.startStyle} name="star" color={elIdx >= rating ? GRAY_SECOND : ORANGE} size={10} />)
            }
          </View>
          <View><Text style={styles.raitingText}>{rating || 0 }/5 ( {boutique.reviews.length} отзыва )</Text></View>
        </View>
      </View>
    </View>
  )
}


export { FavoriteCmp }
