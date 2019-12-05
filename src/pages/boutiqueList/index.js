/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react'
//import _ from 'lodash'
import { StyleSheet, View, InteractionManager, ScrollView } from 'react-native'
import { FooterUI, HeaderUI } from '../../components/ui/view'
import { WHITE, BORDER_COLOR } from '../../constants/global'
import CustomStatusBar from '../../components/CustomStatusBar'
import Loader from '../../components/Loader'
import { ScrollRoundWithTitle, BootiqueGrid } from './view'
import { ScrollCardWithTitle } from '../main/view'
import * as manager from '../../service/manager'

const styles = StyleSheet.create({
  view: { backgroundColor: WHITE, flex: 1 },
  body: { flex: 1 },
  sortView: { paddingHorizontal: 15, borderBottomWidth: 1, borderBottomColor: BORDER_COLOR, paddingBottom: 15, marginBottom: 10 }
})

class BoutiqueList extends Component {
  state = {
    didFinishInitialAnimation: false,
    isLoading: true
  }

  componentDidMount = async () => {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ didFinishInitialAnimation: true })
    })
    this.fetchData()
  }

  fetchData = async () => {
    const { navigation } = this.props
    //....all params here
    const cat_id = navigation.getParam('cat_id')
    const filter = navigation.getParam('filter')
    //....call service
    const data = manager.getBoutiqueList(true, { cat_id, filter })
    //....set all data
    console.log('data', data)
    this.setState({ isLoading: false, ...data })
  }

  init = () => {
    const { navigation } = this.props
    const { didFinishInitialAnimation, isLoading } = this.state
    if (didFinishInitialAnimation === false || isLoading === true) {
      return <Loader />
    }
    return (
      <ScrollView>
        <ScrollRoundWithTitle title="Торговые дома" />
        <ScrollCardWithTitle hit navigation={navigation} onPress={() => navigation.push('BoutiqueList')} />
        <BootiqueGrid navigation={navigation} />
      </ScrollView>
    )
  }


  render() {
    const { navigation } = this.props
    return (
      <View style={[styles.view]}>
        <CustomStatusBar backgroundColor={WHITE} barStyle="dark-content" />
        <HeaderUI text={'Товары магазина "Меховой салон Imperia Furs"'} leftIcon="arrow-left" leftOnPress={() => navigation.goBack()} />
        <View style={styles.sortView} />
        <View style={styles.body}>
          {this.init()}
        </View>
        <FooterUI navigation={navigation} />
      </View>
    )
  }
}

export default BoutiqueList
