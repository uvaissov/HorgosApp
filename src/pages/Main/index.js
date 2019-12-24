import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import CustomStatusBar from '../../components/CustomStatusBar'
import {
  getRecomended,
  getSpecialForYou,
  getCategoryStoks,
  getCustomerChoices,
  getPopularBoutiques,
  getStockToday
} from './actions'
import { FooterUI, SliderApp } from '../../components/ui/view'
import { Header, ScrollCardWithTitle, AdBlockWithTitle, ScrollBannerWithTitle, ScrollRoundWithTitle } from './view'
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
    this.props.getRecomended()
    this.props.getSpecialForYou()
    this.props.getCategoryStoks()
    this.props.getCustomerChoices()
    this.props.getPopularBoutiques()
    this.props.getStockToday()
  }

  render() {
    const { navigation, recomended, specialsForYou, categoryStocks, customerChoices, popularBoutiques, stockToday } = this.props
    return (
      <View style={styles.view}>
        <CustomStatusBar backgroundColor={WHITE} barStyle="dark-content" />
        <View style={styles.body}>
          <ScrollView style={styles.scrollView}>
            <Header style={{ margin: 15 }} placeHolder="Введите название" navigation={navigation} />
            <SliderApp data={['1']} />
            <ScrollCardWithTitle title="Рекомендуем" data={recomended} masked element={<Text style={styles.text}>смотреть все</Text>} navigation={navigation} onPress={() => navigation.push('BoutiqueList', { filter: BY_BOUTIQUE_IDS, ids: recomended.map(el => el.id) })} />
            <AdBlockWithTitle data={specialsForYou} title="Специально для вас" />
            <ScrollBannerWithTitle data={categoryStocks} title="Скидки по категориям" navigation={navigation} />
            <ScrollRoundWithTitle title="Лучшие товары" />
            <ScrollCardWithTitle data={customerChoices} title="Выбор покупателей" masked element={<Text style={styles.text}>смотреть все</Text>} navigation={navigation} onPress={() => navigation.push('BoutiqueList')} />
            <ScrollCardWithTitle data={popularBoutiques} title="Популярные бутики" masked element={<Text style={styles.text}>смотреть все</Text>} navigation={navigation} onPress={() => navigation.push('BoutiqueList')} />
            <ScrollCardWithTitle data={stockToday} title="Скидки сегодня" masked element={<Text style={styles.text}>смотреть все</Text>} navigation={navigation} onPress={() => navigation.push('BoutiqueList')} />
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
  stockToday: state.main.stockToday
})
export default connect(
  mapStateToProps,
  {
    getRecomended,
    getSpecialForYou,
    getCategoryStoks,
    getCustomerChoices,
    getPopularBoutiques,
    getStockToday
  }
)(Main)