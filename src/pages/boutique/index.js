/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, SafeAreaView, Text, InteractionManager } from 'react-native'
import { ScrollCardWithTitle } from '../main/view'
import { HeaderUI, FooterUI, SliderApp } from '../../components/ui/view'
import { DetailInfo, FavoriteCmp, Description, ProductPrices } from './view'
import { WHITE, normalize } from '../../constants/global'
import Loader from '../../components/Loader'

const styles = StyleSheet.create({
  view: { backgroundColor: WHITE, flex: 1 },
  body: { flex: 1 },
  scrollView: { flex: 1 },
  text: { fontWeight: '600', fontSize: normalize(13) }
})

class Boutique extends Component {
  state = { didFinishInitialAnimation: false }

  componentDidMount = () => {
    InteractionManager.runAfterInteractions(() => {
      setTimeout(() => this.setState({ didFinishInitialAnimation: true }), 100)
    })
  }

  init = () => {
    const { didFinishInitialAnimation } = this.state
    const { navigation } = this.props
    if (didFinishInitialAnimation === false) {
      return <Loader />
    }
    return (
      <ScrollView style={styles.scrollView}>
        <SliderApp data={['1']} />
        <FavoriteCmp />
        <DetailInfo data={[{ key: '1', value: '1' }, { key: '1', value: '1' }, { key: '1', value: '1' }, { key: '1', value: '1' }]} />
        <Description />
        <ProductPrices data={[{ name: 'Наименование', value: '12000 - 14000 тг.' }, { name: 'Наименование', value: '9000 - 24200 тг.' }, { name: 'Наименование', value: '720000 - 510000 тг.' }]} />
        <ScrollCardWithTitle title="Похожие бутики" masked element={<Text style={styles.text}>смотреть все</Text>} navigation={navigation} />
        <ScrollCardWithTitle title="Рекомендуем" masked element={<Text style={styles.text}>смотреть все</Text>} navigation={navigation} />
      </ScrollView>
    )
  }

  render() {
    const { navigation } = this.props
    return (
      <SafeAreaView style={styles.view}>
        <View style={styles.body}>
          <HeaderUI style={{ margin: 15 }} placeHolder="Введите название" navigation={navigation} />
          {this.init()}
        </View>
        <FooterUI navigation={navigation} />
      </SafeAreaView>
    )
  }
}

export default Boutique
