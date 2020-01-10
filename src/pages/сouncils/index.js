/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react'
import { StyleSheet, View, InteractionManager } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import nextId from 'react-id-generator'
import { FooterUI, HeaderUI } from '../../components/ui/view'
import { WHITE, BORDER_COLOR } from '../../constants/global'
import CustomStatusBar from '../../components/CustomStatusBar'
import Loader from '../../components/Loader'
import { ConcilItem } from './element/ConcilItem'


const styles = StyleSheet.create({
  view: { backgroundColor: WHITE, flex: 1 },
  body: { flex: 1 },
  sortView: { paddingHorizontal: 15, borderBottomWidth: 1, borderBottomColor: BORDER_COLOR, paddingBottom: 15 },
  flatListStyle: { paddingHorizontal: 15 }
})

class CouncilsList extends Component {
  state = {
    didFinishInitialAnimation: false
  }

  componentDidMount = () => {
    InteractionManager.runAfterInteractions(() => {
      setTimeout(() => this.setState({ didFinishInitialAnimation: true }), 150)
    })
  }

  init = () => {
    const { navigation } = this.props
    const { didFinishInitialAnimation } = this.state
    if (didFinishInitialAnimation === false) {
      return <Loader />
    }
    return (
      <FlatList
        style={styles.flatListStyle}
        keyExtractor={() => nextId()}
        data={Array(20).fill().map(() => ({ title: 'Как установить WeChat?', date: '12 августа 2019', description: 'Для того чтобы использовать популярный китайский мессенджер, необходимо установить его на свое Для того чтобы использовать популярный китайский мессенджер, необходимо установить его на свое', img: require('../../../resources/image/image.png') }))}
        renderItem={(item) => <ConcilItem item={item.item} onPress={() => navigation.push('CouncilItemView', { item: item.item })} />}
      />
    )
  }


  render() {
    const { navigation } = this.props
    return (
      <View style={[styles.view]}>
        <CustomStatusBar backgroundColor={WHITE} barStyle="dark-content" />
        <HeaderUI text="Советы" leftIcon="menu" leftOnPress={() => navigation.openDrawer()} />
        <View style={styles.sortView} />
        <View style={styles.body}>
          {this.init()}
        </View>
        <FooterUI navigation={navigation} selected="idea" />
      </View>
    )
  }
}

export default CouncilsList
