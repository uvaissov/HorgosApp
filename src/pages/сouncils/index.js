/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react'
import { StyleSheet, View, InteractionManager } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import nextId from 'react-id-generator'
import { connect } from 'react-redux'
import _ from 'lodash'
import { FooterUI, HeaderUI } from '../../components/ui/view'
import { WHITE, BORDER_COLOR } from '../../constants/global'
import CustomStatusBar from '../../components/CustomStatusBar'
import Loader from '../../components/Loader'
import { ConcilItem } from './element/ConcilItem'
import { getPosts } from './actions'


const styles = StyleSheet.create({
  view: { backgroundColor: WHITE, flex: 1 },
  body: { flex: 1 },
  sortView: { paddingHorizontal: 15, borderBottomWidth: 1, borderBottomColor: BORDER_COLOR, paddingBottom: 15 },
  flatListStyle: { paddingHorizontal: 15 }
})

class CouncilsList extends Component {
  state = {
    didFinishInitialAnimation: false, filter: null
  }

  componentDidMount = () => {
    this.props.getPosts()
    InteractionManager.runAfterInteractions(() => {
      setTimeout(() => this.setState({ didFinishInitialAnimation: true }), 150)
    })
  }

  init = () => {
    const { navigation } = this.props
    const { didFinishInitialAnimation, filter } = this.state
    const { list, isLoading } = this.props
    if (didFinishInitialAnimation === false || isLoading === true) {
      return <Loader />
    }
    const data = _.filter(list, (item) => {
      if (filter) {
        if (item.title) {
          if (item.title.toUpperCase().indexOf(filter.toUpperCase()) !== -1) {
            return true
          }
        }
        if (item.content) {
          if (item.content.toUpperCase().indexOf(filter.toUpperCase()) !== -1) {
            return true
          }
        }
        if (item.description) {
          if (item.description.toUpperCase().indexOf(filter.toUpperCase()) !== -1) {
            return true
          }
        }
        return false
      }
      return true
    })
    return (
      <FlatList
        style={styles.flatListStyle}
        keyExtractor={() => nextId()}
        data={data}
        renderItem={(item) => <ConcilItem item={item.item} onPress={() => navigation.push('CouncilItemView', { item: item.item })} />}
      />
    )
  }

  onChangeFilter = (text) => {
    this.setState({ filter: text })
  }


  render() {
    const { navigation } = this.props
    const { filter } = this.state
    return (
      <View style={[styles.view]}>
        <CustomStatusBar backgroundColor={WHITE} barStyle="dark-content" />
        <HeaderUI filter={filter} placeHolder="Советы" leftIcon="menu" leftOnPress={() => navigation.openDrawer()} onChangeFilter={this.onChangeFilter} />
        <View style={styles.sortView} />
        <View style={styles.body}>
          {this.init()}
        </View>
        <FooterUI navigation={navigation} selected="idea" />
      </View>
    )
  }
}


const mapStateToProps = state => ({
  list: state.posts.list,
  isLoading: state.posts.isLoading
})
export default connect(mapStateToProps, { getPosts })(CouncilsList)