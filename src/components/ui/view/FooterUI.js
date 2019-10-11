import React from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { normalize, BLACK } from '../../../constants/global'

const styles = StyleSheet.create({
  view: {
    height: 65,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingTop: 5
  },
  element: { },
  iconView: { flex: 1.5, justifyContent: 'center', alignItems: 'center' },
  textView: { flex: 1, justifyContent: 'flex-start', alignItems: 'center' },
  image: { height: 22, width: 22 },
  text: { color: '#8B8DA0', fontSize: normalize(11) }
})

const FooterUI = (props) => {
  const unSelectColor = '#8B8DA0'
  const { selected } = props
  return (
    <View style={[styles.view, props.style]}>
      <View style={styles.element}>
        <View style={styles.iconView}>
          <Icon name="home" size={22} color={selected === 'main' ? BLACK : unSelectColor} />
        </View>
        <View style={styles.textView}>
          <Text style={[styles.text, { color: selected === 'main' ? BLACK : unSelectColor }]}>Главная</Text>
        </View>
      </View>
      <View style={styles.element}>
        <View style={styles.iconView}>
          <Image source={require('../../../../resources/icons/footer/idea.png')} style={styles.image} resizeMode="stretch" />
        </View>
        <View style={styles.textView}>
          <Text style={[styles.text, { color: selected === 'favorite' ? BLACK : unSelectColor }]}>Советы</Text>
        </View>
      </View>
      <View style={styles.element}>
        <View style={styles.iconView}>
          <Icon name="phone-call" size={22} color={selected === 'ca' ? BLACK : unSelectColor} />
        </View>
        <View style={styles.textView}>
          <Text style={[styles.text, { color: selected === 'favorite' ? BLACK : unSelectColor }]}>Помощь</Text>
        </View>
      </View>
      <View style={styles.element}>
        <View style={styles.iconView}>
          <Icon name="heart" size={22} color={selected === 'favorite' ? BLACK : unSelectColor} />
        </View>
        <View style={styles.textView}>
          <Text style={[styles.text, { color: selected === 'favorite' ? BLACK : unSelectColor }]}>Избранное</Text>
        </View>
      </View>
    </View>
  )
}


export { FooterUI }
