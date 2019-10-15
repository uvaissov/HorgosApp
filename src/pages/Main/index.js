import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, Text, SafeAreaView } from 'react-native'

import { HeaderUI, FooterUI, SliderApp } from '../../components/ui/view'
import { ScrollCardWithTitle, AdBlockWithTitle, ScrollBannerWithTitle, ScrollRoundWithTitle } from './view'
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
      <SafeAreaView style={styles.view}>
        <View style={styles.body}>
          <ScrollView style={styles.scrollView}>
            <HeaderUI style={{ margin: 15 }} placeHolder="Введите название" navigation={navigation} />
            <SliderApp data={['1']} />
            <AdBlockWithTitle title="Специально для вас" />
            <ScrollBannerWithTitle title="Скидки по категориям" />
            <ScrollRoundWithTitle title="Лучшие товары" />
            <ScrollCardWithTitle title="Рекомендуем" masked element={<Text style={styles.text}>смотреть все</Text>} navigation={navigation} />
            <ScrollCardWithTitle title="Выбор покупателей" masked element={<Text style={styles.text}>смотреть все</Text>} navigation={navigation} />
            <ScrollCardWithTitle title="Популярные бутики" masked element={<Text style={styles.text}>смотреть все</Text>} navigation={navigation} />
          </ScrollView>
        </View>
        <FooterUI selected="main" navigation={navigation} />
      </SafeAreaView>
    )
  }
}

export default Main
