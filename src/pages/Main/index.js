import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import NetInfo from '@react-native-community/netinfo'
import CustomStatusBar from '../../components/CustomStatusBar'
import {
  getRecommended,
  getSpecialForYou,
  getCategoryStocks,
  getCustomerChoices,
  getPopularBoutiques,
  getStockToday,
  getBestProducts,
  getFreebies,
  getVideoAboutHorgos,
  getSliders
} from './actions'
import { FooterUI, SliderApp } from '../../components/ui/view'
import { Header, ScrollCardWithTitle, AdBlockWithTitle, ScrollBannerWithTitle, ScrollRoundWithTitle, ScrollVideoWithTitle } from './view'
import { WHITE, normalize } from '../../constants/global'
import { BY_BOUTIQUE_IDS } from '../../constants/static'

const styles = StyleSheet.create({
  view: { backgroundColor: WHITE, flex: 1 },
  body: { flex: 1 },
  scrollView: { flex: 1 },
  text: { fontWeight: '600', fontSize: normalize(13) }
})

class Main extends Component {
  async componentDidMount() {
    this.unsubscribe = NetInfo.addEventListener(state => {
      console.log('Connection type', state.type)
      console.log('isConnected:', state.isConnected)
    })
    this.fetch()
  }

  fetch = async () => {
    console.log('fetch')
    this.props.getRecommended()
    this.props.getSpecialForYou()
    this.props.getCategoryStocks()
    this.props.getCustomerChoices()
    this.props.getPopularBoutiques()
    this.props.getStockToday()
    this.props.getBestProducts()
    this.props.getFreebies()
    this.props.getVideoAboutHorgos()
    this.props.getSliders()
  }

  async componentWillUnmount() {
    if (_.isFunction(this.unsubscribe)) {
      this.unsubscribe()
      console.log('unsubscribe function')
    }
  }

  render() {
    const { navigation, recomended, specialsForYou, categoryStocks, customerChoices, popularBoutiques, stockToday, bestProducts, freebies, videos, sliders } = this.props
    return (
      <View style={styles.view}>
        <CustomStatusBar backgroundColor={WHITE} barStyle="dark-content" />
        <View style={styles.body}>
          <ScrollView style={styles.scrollView}>
            <Header style={{ margin: 15 }} placeHolder="Введите название бутика" navigation={navigation} />
            <SliderApp data={sliders} navigation={navigation} />
            <ScrollCardWithTitle title="Рекомендуем" data={recomended} masked element={<Text style={styles.text}>смотреть все</Text>} navigation={navigation} onPress={() => navigation.push('BoutiqueList', { filter: BY_BOUTIQUE_IDS, ids: recomended.map(el => el.id) })} />
            <AdBlockWithTitle data={specialsForYou} title="Специально для вас" />
            <ScrollBannerWithTitle data={categoryStocks} title="Скидки по категориям" navigation={navigation} />
            <ScrollRoundWithTitle data={bestProducts} title="Лучшие товары" navigation={navigation} onPress={() => navigation.push('BoutiqueList', { filter: BY_BOUTIQUE_IDS, ids: bestProducts.map(el => el.id) })} />
            <ScrollCardWithTitle data={customerChoices} title="Выбор покупателей" masked element={<Text style={styles.text}>смотреть все</Text>} navigation={navigation} onPress={() => navigation.push('BoutiqueList', { filter: BY_BOUTIQUE_IDS, ids: customerChoices.map(el => el.id) })} />
            <ScrollCardWithTitle data={popularBoutiques} title="Популярные бутики" masked element={<Text style={styles.text}>смотреть все</Text>} navigation={navigation} onPress={() => navigation.push('BoutiqueList', { filter: BY_BOUTIQUE_IDS, ids: popularBoutiques.map(el => el.id) })} />
            <ScrollCardWithTitle data={stockToday} title="Скидки сегодня" masked element={<Text style={styles.text}>смотреть все</Text>} navigation={navigation} onPress={() => navigation.push('BoutiqueList', { filter: BY_BOUTIQUE_IDS, ids: stockToday.map(el => el.id) })} />
            <ScrollVideoWithTitle data={videos} title="Видео" />
            <ScrollCardWithTitle data={freebies} title="Халява" masked element={<Text style={styles.text}>смотреть все</Text>} navigation={navigation} onPress={() => navigation.push('BoutiqueList', { filter: BY_BOUTIQUE_IDS, ids: freebies.map(el => el.id) })} />
          </ScrollView>
        </View>
        <FooterUI selected="main" navigation={navigation} />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  recomended: state.main.recomended,
  specialsForYou: state.main.specialsForYou,
  categoryStocks: state.main.categoryStocks,
  customerChoices: state.main.customerChoices,
  popularBoutiques: state.main.popularBoutiques,
  stockToday: state.main.stockToday,
  bestProducts: state.main.bestProducts,
  freebies: state.main.freebies,
  videos: state.main.videos,
  sliders: state.main.sliders
})
export default connect(
  mapStateToProps,
  {
    getRecommended,
    getSpecialForYou,
    getCategoryStocks,
    getCustomerChoices,
    getPopularBoutiques,
    getStockToday,
    getBestProducts,
    getFreebies,
    getVideoAboutHorgos,
    getSliders
  }
)(Main)