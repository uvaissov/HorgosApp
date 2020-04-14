/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react'
import { StyleSheet, View, InteractionManager, Text, RefreshControl } from 'react-native'
import { connect } from 'react-redux'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import nextId from 'react-id-generator'
import { NavigationEvents } from 'react-navigation'
import { FooterUI, HeaderUI } from '../../components/ui/view'
import { WHITE, BORDER_COLOR, MAIN_COLOR, GRAY_LIGHT } from '../../constants/global'
import CustomStatusBar from '../../components/CustomStatusBar'
import Loader from '../../components/Loader'
import { FavoriteGrid } from './view'
import { getFavorite } from './actions'
import { strings } from '../../service/Locale'

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
    this.loadData()
    InteractionManager.runAfterInteractions(() => {
      setTimeout(() => this.setState({ didFinishInitialAnimation: true }), 150)
    })
  }

  loadData = () => {
    this.props.getFavorite()
  }

  init = () => {
    const { didFinishInitialAnimation } = this.state
    const { navigation } = this.props
    const { trading_houses, isLoading } = this.props
    if (didFinishInitialAnimation === false || isLoading === true) {
      return <Loader />
    }
    return (
      <View>
        {
          trading_houses.length === 0 && (
            <View style={{ justifyContent: 'center', alignItems: 'center', padding: 15, marginTop: 50 }}>
              <TouchableOpacity onPress={this.loadData}>
                <View style={{ backgroundColor: GRAY_LIGHT, borderColor: BORDER_COLOR, borderRadius: 60, paddingHorizontal: 20, paddingVertical: 12 }}>
                  <Text style={{ color: MAIN_COLOR }}>Обновить</Text>
                </View>
              </TouchableOpacity>
              <View style={{ marginTop: 50 }}>
                <Text style={{ color: BORDER_COLOR }}>Список избранного пуст</Text>
              </View>
            </View>
          )
        }
        <FlatList
          refreshControl={
            <RefreshControl
              colors={[MAIN_COLOR]}
              refreshing={isLoading}
              onRefresh={this.loadData}
            />
        }
          data={trading_houses}
          keyExtractor={() => nextId()}
          renderItem={(item) => (<FavoriteGrid title={item.item.trading_house_name} item={item.item} navigation={navigation} />)}
        />
      </View>
    )
  }


  render() {
    const { navigation } = this.props
    return (
      <View style={[styles.view]}>
        <CustomStatusBar backgroundColor={WHITE} barStyle="dark-content" />
        <HeaderUI text={strings('favorite.title')} leftIcon="menu" leftOnPress={() => navigation.openDrawer()} withSearch={false} />
        <View style={styles.sortView} />
        <View style={styles.body}>
          {this.init()}
        </View>
        <FooterUI navigation={navigation} selected="favorite" repeatAction={this.loadData} />
        <NavigationEvents
          onDidFocus={() => this.loadData()}
        />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  trading_houses: state.favorites.trading_houses || [],
  isLoading: state.favorites.isLoading
})
export default connect(mapStateToProps, { getFavorite })(Favorite)
