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
import { strings } from '../../service/Locale'

const styles = StyleSheet.create({
  view: { backgroundColor: WHITE, flex: 1 },
  body: { flex: 1 },
  sortView: { paddingHorizontal: 15, borderBottomWidth: 1, borderBottomColor: BORDER_COLOR, paddingBottom: 15, marginBottom: 10 }
})

class BoutiqueList extends Component {
  state = {
    didFinishInitialAnimation: false,
    isLoading: true,
    selected: []
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

  setSelected = (id) => {
    const { selected } = this.state
    const idx = selected.indexOf(id)
    if (idx !== -1) {
      selected.splice(idx, 1)
      this.setState({ selected: [...selected] })
    } else {
      this.setState({ selected: [...selected, id] })
    }
  }

  init = () => {
    const { navigation } = this.props
    const { didFinishInitialAnimation, isLoading, hits, list, trading_houses, selected } = this.state
    if (didFinishInitialAnimation === false || isLoading === true) {
      return <Loader />
    }
    const trading_house = trading_houses[0] || {}
    if (_.isEmpty(trading_house)) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
          <Text style={{ textAlign: 'center', color: RED, fontWeight: 'bold' }}>{strings('list.empty')}</Text>
        </View>)
    }
    return (
      <ScrollView>
        <ScrollRoundWithTitle key="ScrollRoundWithTitle-0" selected={selected} setSelected={this.setSelected} title={strings('list.houses')} data={trading_houses} />
        <ScrollCardWithTitle key="ScrollCardWithTitle-1" data={hits.filter(el => !selected.includes(el.trading_house_id)).map(el => ({ ...el, boutique: el }))} hit navigation={navigation} onPress={() => navigation.push('BoutiqueList')} />
        <BootiqueGrid key="BootiqueGrid-2" data={list.filter(el => !selected.includes(el.trading_house_id))} navigation={navigation} />
      </ScrollView>
    )
  }


  render() {
    const { navigation } = this.props
    const local = navigation.getParam('filter') === undefined
    const text = navigation.getParam('text')
    return (
      <View style={[styles.view]}>
        <CustomStatusBar backgroundColor={WHITE} barStyle="dark-content" />
        <HeaderUI text={text} leftIcon={local ? 'menu' : 'arrow-left'} leftOnPress={() => (local ? navigation.openDrawer() : navigation.goBack())} placeHolder={strings('list.title')} fetchData={this.fetchData} />
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