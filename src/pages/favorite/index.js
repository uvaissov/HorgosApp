/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react'
import { StyleSheet, View, InteractionManager } from 'react-native'
import { connect } from 'react-redux'
import { FlatList } from 'react-native-gesture-handler'
import nextId from 'react-id-generator'
import { FooterUI, HeaderUI } from '../../components/ui/view'
import { WHITE, BORDER_COLOR } from '../../constants/global'
import CustomStatusBar from '../../components/CustomStatusBar'
import Loader from '../../components/Loader'
import { FavoriteGrid } from './view'
import { getFavorite } from './actions'

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
    //const { isLoading } = this.props
    this.props.getFavorite()
    InteractionManager.runAfterInteractions(() => {
      setTimeout(() => this.setState({ didFinishInitialAnimation: true }), 150)
    })
  }

  init = () => {
    const { didFinishInitialAnimation } = this.state
    const { navigation } = this.props
    const { trading_houses, isLoading } = this.props
    if (didFinishInitialAnimation === false || isLoading === true) {
      return <Loader />
    }
    return (
      <FlatList
        data={trading_houses}
        keyExtractor={() => nextId()}
        renderItem={(item) => (<FavoriteGrid title={item.item.trading_house_name} item={item.item} navigation={navigation} />)}
      />
    )
  }


  render() {
    const { navigation } = this.props
    return (
      <View style={[styles.view]}>
        <CustomStatusBar backgroundColor={WHITE} barStyle="dark-content" />
        <HeaderUI text="Избранные товары" leftIcon="menu" leftOnPress={() => navigation.openDrawer()} withSearch={false} />
        <View style={styles.sortView} />
        <View style={styles.body}>
          {this.init()}
        </View>
        <FooterUI navigation={navigation} selected="favorite" />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  trading_houses: state.favorites.trading_houses || [],
  isLoading: state.favorites.isLoading
})
export default connect(mapStateToProps, { getFavorite })(Favorite)
