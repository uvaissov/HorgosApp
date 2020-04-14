import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Feather'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { normalize, BLACK } from '../../../constants/global'
import { strings } from '../../../service/Locale'


const styles = StyleSheet.create({
  view: {
    height: 85,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingTop: 5
  },
  element: { flex: 1, minHeight: 25 },
  iconView: { flex: 1.5, justifyContent: 'center', alignItems: 'center' },
  textView: { flex: 1, justifyContent: 'flex-start', alignItems: 'center' },
  image: { height: 22, width: 22 },
  text: { color: '#8B8DA0', fontSize: normalize(11) }
})

const FooterUI = (props) => {
  const unSelectColor = '#8B8DA0'
  const { selected, navigation } = props
  const TouchView = TouchableOpacity
  return (
    <View style={[styles.view, props.style]}>
      <TouchView style={styles.element} onPress={() => navigation.navigate('Main')}>
        <View style={styles.iconView}>
          <Icon name="home" size={22} color={selected === 'main' ? BLACK : unSelectColor} />
        </View>
        <View style={styles.textView}>
          <Text style={[styles.text, { color: selected === 'main' ? BLACK : unSelectColor }]}>{strings('menu.main')}</Text>
        </View>
      </TouchView>
      <TouchView style={styles.element} onPress={() => navigation.navigate('Councils')}>
        <View style={styles.iconView}>
          {/* <Image source={require('../../../../resources/icons/footer/idea.png')} style={styles.image} resizeMode="stretch" /> */}
          <MaterialCommunityIcons name="lightbulb-on-outline" size={24} color={selected === 'idea' ? BLACK : unSelectColor} />
        </View>
        <View style={styles.textView}>
          <Text style={[styles.text, { color: selected === 'idea' ? BLACK : unSelectColor }]}>{strings('menu.consults')}</Text>
        </View>
      </TouchView>
      <TouchView style={styles.element} onPress={() => navigation.navigate('Help')}>
        <View style={styles.iconView}>
          <Icon name="phone-call" size={22} color={selected === 'call' ? BLACK : unSelectColor} />
        </View>
        <View style={styles.textView}>
          <Text style={[styles.text, { color: selected === 'call' ? BLACK : unSelectColor }]}>{strings('menu.help')}</Text>
        </View>
      </TouchView>
      <TouchView
        style={styles.element}
        onPress={() => {
          if (selected === 'favorite') {
            props.repeatAction()
          } else {
            navigation.navigate('Favorite')
          }
        }}
      >
        <View style={styles.iconView}>
          <Icon name="heart" size={22} color={selected === 'favorite' ? BLACK : unSelectColor} />
        </View>
        <View style={styles.textView}>
          <Text style={[styles.text, { color: selected === 'favorite' ? BLACK : unSelectColor }]}>{strings('menu.favorite')}</Text>
        </View>
      </TouchView>
    </View>
  )
}


export { FooterUI }
