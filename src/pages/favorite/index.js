/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react'
import { StyleSheet, View, InteractionManager, Text, RefreshControl } from 'react-native'
import { connect } from 'react-redux'
import { FlatList } from 'react-native-gesture-handler'
import nextId from 'react-id-generator'
import { NavigationEvents } from 'react-navigation'
import { FooterUI, HeaderUI } from '../../components/ui/view'
import { WHITE, BORDER_COLOR, MAIN_COLOR, GRAY_SECOND, normalize, translate } from '../../constants/global'
import CustomStatusBar from '../../components/CustomStatusBar'
import Loader from '../../components/Loader'
import { FavoriteGrid } from './view'
import { getFavorite } from './actions'
import { strings, locale } from '../../service/Locale'

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
    if (didFinishInitialAnimation === false) {
      return <Loader />
    }
    //console.log(trading_houses)
    return (
      <View>
        <FlatList
          refreshControl={
            <RefreshControl
              colors={[MAIN_COLOR]}
              refreshing={isLoading}
              onRefresh={this.loadData}
            />
        }
          ListEmptyComponent={() => (
            <View style={{ justifyContent: 'center', alignItems: 'center', padding: 15, marginVertical: 50 }}>
              <View style={{ marginTop: 50 }}>
                <Text style={{ color: GRAY_SECOND, textAlign: 'center', fontSize: normalize(15) }}>Список избранного пуст</Text>
                <Text style={{ color: BORDER_COLOR, textAlign: 'center' }}>Потяните вниз для обновления</Text>
              </View>
            </View>
          )}
          data={trading_houses}
          keyExtractor={() => nextId()}
          renderItem={(item) => (<FavoriteGrid title={translate(item.item, `${locale()}.name`, item.item.trading_house_name)} item={item.item} navigation={navigation} />)}
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
