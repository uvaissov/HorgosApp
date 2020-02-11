/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react'
import { StyleSheet, View, InteractionManager } from 'react-native'
import { connect } from 'react-redux'
import _ from 'lodash'
import { ScrollView } from 'react-native-gesture-handler'
import { getCategories } from './actions'
import { FooterUI, HeaderUI } from '../../components/ui/view'
import { WHITE, BORDER_COLOR } from '../../constants/global'
import CustomStatusBar from '../../components/CustomStatusBar'
import Loader from '../../components/Loader'
import { ScrollRoundWithTitle, ScrollListWithTitle } from './view'


const styles = StyleSheet.create({
  view: { backgroundColor: WHITE, flex: 1 },
  body: { flex: 1 },
  sortView: { paddingHorizontal: 15, borderBottomWidth: 1, borderBottomColor: BORDER_COLOR, paddingBottom: 15 },
  flatListStyle: { paddingHorizontal: 15 }
})

class Categories extends Component {
  state = {
    didFinishInitialAnimation: false, filter: null
  }

  componentDidMount = () => {
    //this.props.getCategories()
    InteractionManager.runAfterInteractions(() => {
      this.setState({ didFinishInitialAnimation: true })
    })
  }

  init = () => {
    const { didFinishInitialAnimation, filter } = this.state
    const { list, populare, navigation, isLoading } = this.props
    if (didFinishInitialAnimation === false || isLoading === true) {
      return <Loader />
    }
    return (
      <ScrollView>
        <ScrollRoundWithTitle title="Популярные категории" data={_.filter(populare, (item) => (filter ? item.name.toUpperCase().indexOf(filter.toUpperCase()) !== -1 : true))} navigation={navigation} />
        <ScrollListWithTitle title="Все категории" data={_.filter(list, (item) => (filter ? item.name.toUpperCase().indexOf(filter.toUpperCase()) !== -1 : true))} navigation={navigation} />
      </ScrollView>
    )
  }


  render() {
    const { filter } = this.state
    const { navigation } = this.props
    return (
      <View style={[styles.view]}>
        <CustomStatusBar backgroundColor={WHITE} barStyle="dark-content" />
        <HeaderUI filter={filter} onChangeFilter={(text) => this.setState({ filter: text })} text="Категория товаров" placeHolder="Введите название категории товаров" leftIcon="menu" leftOnPress={() => navigation.openDrawer()} />
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
  populare: state.category.populare,
  list: state.category.list,
  isLoading: state.category.isLoading
})
export default connect(mapStateToProps, { getCategories })(Categories)
