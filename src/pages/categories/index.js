/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react'
import { StyleSheet, View, InteractionManager } from 'react-native'
import { connect } from 'react-redux'
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
    didFinishInitialAnimation: false
  }

  componentDidMount = () => {
    this.props.getCategories()
    InteractionManager.runAfterInteractions(() => {
      this.setState({ didFinishInitialAnimation: true })
    })
  }

  init = () => {
    const { didFinishInitialAnimation } = this.state
    const { list, populare, navigation, isLoading } = this.props
    if (didFinishInitialAnimation === false || isLoading === true) {
      return <Loader />
    }
    return (
      <ScrollView>
        <ScrollRoundWithTitle title="Популярные категории" data={populare} navigation={navigation} />
        <ScrollListWithTitle title="Все категории" data={list} navigation={navigation} />
      </ScrollView>
    )
  }


  render() {
    const { navigation } = this.props
    return (
      <View style={[styles.view]}>
        <CustomStatusBar backgroundColor={WHITE} barStyle="dark-content" />
        <HeaderUI text="Категории товаров" leftIcon="menu" leftOnPress={() => navigation.openDrawer()} withSearch={false} />
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
