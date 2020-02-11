import React, { Component } from 'react'
import { connect } from 'react-redux'
//import _ from 'lodash'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
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
import { getFavorite } from '../favorite/actions'
import { getCategories } from '../categories/actions'
import { getMaps } from '../map/actions'
import { FooterUI, SliderApp } from '../../components/ui/view'
import { Header, ScrollCardWithTitle, AdBlockWithTitle, ScrollBannerWithTitle, ScrollRoundWithTitle, ScrollVideoWithTitle } from './view'
import { WHITE, normalize } from '../../constants/global'
import { BY_BOUTIQUE_IDS } from '../../constants/static'
import * as manager from '../../service/manager'

const styles = StyleSheet.create({
  view: { backgroundColor: WHITE, flex: 1 },
  body: { flex: 1 },
  scrollView: { flex: 1 },
  text: { fontWeight: '600', fontSize: normalize(13) }
})

class Main extends Component {
  async componentDidMount() {
    await this.fetch()
  }

  fetch = async () => {
    manager.loadFromServer(this.props.isConnected)
    await this.props.getSliders()
    await this.props.getRecommended()
    this.props.getCategories()
    this.props.getMaps()
    this.props.getFavorite()
    this.props.getSpecialForYou()
    this.props.getCategoryStocks()
    this.props.getCustomerChoices()
    this.props.getPopularBoutiques()
    this.props.getStockToday()
    this.props.getBestProducts()
    await this.props.getFreebies()
    await this.props.getVideoAboutHorgos()
    SplashScreen.hide()
  }

  componentDidUpdate(prevProps) {
    const { isConnected: prevIsConnected } = prevProps
    const { isConnected } = this.props
    if (prevIsConnected === false && isConnected === true) {
      //if connection restore need load again data
      this.fetch()
    }
  }

  render() {
    const { navigation, recomended, specialsForYou, categoryStocks, customerChoices, popularBoutiques, stockToday, bestProducts, freebies, videos, sliders } = this.props
    return (
      <View style={styles.view}>
        <CustomStatusBar backgroundColor={WHITE} barStyle="dark-content" />
        <View style={styles.body}>
          <ScrollView style={styles.scrollView}>
            <Header key="1" style={{ margin: 15 }} placeHolder="Введите название бутика" navigation={navigation} />
            <SliderApp key="2" data={sliders} navigation={navigation} />
            <ScrollCardWithTitle key="3" title="Рекомендуем" data={recomended} masked element={<Text style={styles.text}>смотреть все</Text>} navigation={navigation} onPress={() => navigation.push('BoutiqueList', { filter: BY_BOUTIQUE_IDS, ids: recomended.map(el => el.id) })} />
            <AdBlockWithTitle key="4" data={specialsForYou} title="Специально для вас" navigation={navigation} />
            <ScrollBannerWithTitle key="5" data={categoryStocks} title="Скидки по категориям" navigation={navigation} />
            <ScrollRoundWithTitle key="6" data={bestProducts} title="Лучшие товары" navigation={navigation} onPress={() => navigation.push('BoutiqueList', { filter: BY_BOUTIQUE_IDS, ids: bestProducts.map(el => el.id) })} />
            <ScrollCardWithTitle key="7" data={customerChoices} title="Выбор покупателей" masked element={<Text style={styles.text}>смотреть все</Text>} navigation={navigation} onPress={() => navigation.push('BoutiqueList', { filter: BY_BOUTIQUE_IDS, ids: customerChoices.map(el => el.id) })} />
            <ScrollCardWithTitle key="8" data={popularBoutiques} title="Популярные бутики" masked element={<Text style={styles.text}>смотреть все</Text>} navigation={navigation} onPress={() => navigation.push('BoutiqueList', { filter: BY_BOUTIQUE_IDS, ids: popularBoutiques.map(el => el.id) })} />
            <ScrollCardWithTitle key="9" data={stockToday} title="Скидки сегодня!" masked element={<Text style={styles.text}>смотреть все</Text>} navigation={navigation} onPress={() => navigation.push('BoutiqueList', { filter: BY_BOUTIQUE_IDS, ids: stockToday.map(el => el.id) })} />
            <ScrollVideoWithTitle key="10" data={videos} title="Видео о Хоргосе" />
            <ScrollCardWithTitle key="11" data={freebies} title="Халява!" masked element={<Text style={styles.text}>смотреть все</Text>} navigation={navigation} onPress={() => navigation.push('BoutiqueList', { filter: BY_BOUTIQUE_IDS, ids: freebies.map(el => el.id) })} />
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
  sliders: state.main.sliders,
  isConnected: state.network.isConnected
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
    getSliders,
    getFavorite,
    getCategories,
    getMaps
  }
)(Main)