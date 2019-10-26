import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import CustomStatusBar from '../../components/CustomStatusBar'
import { FooterUI, SliderApp } from '../../components/ui/view'
import { Header, ScrollCardWithTitle, AdBlockWithTitle, ScrollBannerWithTitle, ScrollRoundWithTitle } from './view'
import { WHITE, normalize } from '../../constants/global'

const styles = StyleSheet.create({
  view: { backgroundColor: WHITE, flex: 1 },
  body: { flex: 1 },
  scrollView: { flex: 1 },
  text: { fontWeight: '600', fontSize: normalize(13) }
})

class Main extends Component {
  render() {
    const { navigation } = this.props
    return (
      <View style={styles.view}>
        <CustomStatusBar backgroundColor={WHITE} barStyle="dark-content" />
        <View style={styles.body}>
          <ScrollView style={styles.scrollView}>
            <Header style={{ margin: 15 }} placeHolder="Введите название" navigation={navigation} />
            <SliderApp data={['1']} />
            <ScrollCardWithTitle title="Рекомендуем" masked element={<Text style={styles.text}>смотреть все</Text>} navigation={navigation} onPress={() => navigation.push('BoutiqueList')} />
            <AdBlockWithTitle title="Специально для вас" />
            <ScrollBannerWithTitle title="Скидки по категориям" />
            <ScrollRoundWithTitle title="Лучшие товары" />
            <ScrollCardWithTitle title="Выбор покупателей" masked element={<Text style={styles.text}>смотреть все</Text>} navigation={navigation} onPress={() => navigation.push('BoutiqueList')} />
            <ScrollCardWithTitle title="Популярные бутики" masked element={<Text style={styles.text}>смотреть все</Text>} navigation={navigation} onPress={() => navigation.push('BoutiqueList')} />
          </ScrollView>
        </View>
        <FooterUI selected="main" navigation={navigation} />
      </View>
    )
  }
}

export default Main
