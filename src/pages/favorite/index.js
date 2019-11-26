/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react'
import { StyleSheet, View, InteractionManager } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { FooterUI, HeaderUI } from '../../components/ui/view'
import { WHITE, BORDER_COLOR } from '../../constants/global'
import CustomStatusBar from '../../components/CustomStatusBar'
import Loader from '../../components/Loader'
import { FavoriteGrid } from './view'

const styles = StyleSheet.create({
  view: { backgroundColor: WHITE, flex: 1 },
  body: { flex: 1 },
  sortView: { paddingHorizontal: 15, borderBottomWidth: 1, borderBottomColor: BORDER_COLOR, paddingBottom: 15 },
  flatListStyle: { paddingHorizontal: 15 }
})

class Favorite extends Component {
  state = {
    didFinishInitialAnimation: false
  }

  componentDidMount = () => {
    InteractionManager.runAfterInteractions(() => {
      setTimeout(() => this.setState({ didFinishInitialAnimation: true }), 150)
    })
  }

  init = () => {
    const { didFinishInitialAnimation } = this.state
    const { navigation } = this.props
    if (didFinishInitialAnimation === false) {
      return <Loader />
    }
    return (
      <FlatList
        data={[9, 15, 45, 24, 8]}
        renderItem={(item) => (<FavoriteGrid title="ТЦ Чжун Кэ-1" item={item.item} navigation={navigation} />)}
      />
    )
  }


  render() {
    const { navigation } = this.props
    return (
      <View style={[styles.view]}>
        <CustomStatusBar backgroundColor={WHITE} barStyle="dark-content" />
        <HeaderUI text="Избранные товары" leftIcon="menu" leftOnPress={() => navigation.openDrawer()} />
        <View style={styles.sortView} />
        <View style={styles.body}>
          {this.init()}
        </View>
        <FooterUI navigation={navigation} selected="favorite" />
      </View>
    )
  }
}

export default Favorite
