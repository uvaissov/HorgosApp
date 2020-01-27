/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { StyleSheet, View, InteractionManager, ScrollView, Text } from 'react-native'
import { FooterUI, HeaderUI } from '../../components/ui/view'
import { WHITE, BORDER_COLOR, RED } from '../../constants/global'
import CustomStatusBar from '../../components/CustomStatusBar'
import Loader from '../../components/Loader'
import { ScrollRoundWithTitle, BootiqueGrid } from './view'
import { ScrollCardWithTitle } from '../main/view'
import * as manager from '../../service/manager'
import { BY_SEARCH_TEXT } from '../../constants/static'

const styles = StyleSheet.create({
  view: { backgroundColor: WHITE, flex: 1 },
  body: { flex: 1 },
  sortView: { paddingHorizontal: 15, borderBottomWidth: 1, borderBottomColor: BORDER_COLOR, paddingBottom: 15, marginBottom: 10 }
})

class BoutiqueList extends Component {
  state = {
    didFinishInitialAnimation: false,
    isLoading: true,
    selected: 0
  }

  componentDidMount = async () => {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ didFinishInitialAnimation: true })
    })
    this.fetchData()
  }

  fetchData = async (searchText) => {
    this.setState({ isLoading: true })
    const { navigation, isConnected } = this.props
    //....all params here
    const cat_id = navigation.getParam('cat_id')
    const ids = navigation.getParam('ids')
    const filter = navigation.getParam('filter')
    const text = searchText || navigation.getParam('text') || ''
    const trading_house_id = navigation.getParam('trading_house_id')
    //....call service
    const { payload: data } = await manager.getBoutiqueList(isConnected, { cat_id, filter: (filter || BY_SEARCH_TEXT), ids, text, trading_house_id })
    //....set all data
    this.setState({ isLoading: false, ...data })
  }

  setSelected = (selected) => {
    this.setState({ selected })
  }

  init = () => {
    const { navigation } = this.props
    const { didFinishInitialAnimation, isLoading, hits, list, trading_houses, selected } = this.state
    if (didFinishInitialAnimation === false || isLoading === true) {
      return <Loader />
    }
    const trading_house = trading_houses[selected] || {}
    if (_.isEmpty(trading_house)) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
          <Text style={{ textAlign: 'center', color: RED, fontWeight: 'bold' }}>Поиск не дал результатов, попробуйте другие параметры для поиска</Text>
        </View>)
    }
    return (
      <ScrollView>
        <ScrollRoundWithTitle selected={selected} setSelected={this.setSelected} title="Торговые дома" data={trading_houses} />
        <ScrollCardWithTitle data={hits.filter(el => el.trading_house_id === trading_house.id).map(el => ({ ...el, boutique: el }))} hit navigation={navigation} onPress={() => navigation.push('BoutiqueList')} />
        <BootiqueGrid data={list.filter(el => el.trading_house_id === trading_house.id)} navigation={navigation} />
      </ScrollView>
    )
  }


  render() {
    const { navigation } = this.props
    const text = navigation.getParam('text')
    return (
      <View style={[styles.view]}>
        <CustomStatusBar backgroundColor={WHITE} barStyle="dark-content" />
        <HeaderUI text={text} leftIcon="arrow-left" leftOnPress={() => navigation.goBack()} placeHolder="Каталог бутиков" fetchData={this.fetchData} />
        <View style={styles.sortView} />
        <View style={styles.body}>
          {this.init()}
        </View>
        <FooterUI navigation={navigation} />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  isConnected: state.network.isConnected
})

export default connect(mapStateToProps, { })(BoutiqueList)