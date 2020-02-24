/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react'
import { StyleSheet, View, InteractionManager, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import { connect } from 'react-redux'
import _ from 'lodash'
import { FooterUI, HeaderUI } from '../../components/ui/view'
import { WHITE, BORDER_COLOR } from '../../constants/global'
import CustomStatusBar from '../../components/CustomStatusBar'
import Loader from '../../components/Loader'
import { ScrollListWithTitle, RequestView } from './view'
import { getHelp } from './actions'


const styles = StyleSheet.create({
  view: { backgroundColor: WHITE, flex: 1 },
  body: { flex: 1 },
  sortView: { paddingHorizontal: 15, borderBottomWidth: 1, borderBottomColor: BORDER_COLOR, paddingBottom: 15 },
  flatListStyle: { paddingHorizontal: 15 }
})

class Help extends Component {
  state = {
    didFinishInitialAnimation: false,
    filter: null

  }

  componentDidMount = () => {
    this.props.getHelp()
    InteractionManager.runAfterInteractions(() => {
      setTimeout(() => this.setState({ didFinishInitialAnimation: true }), 150)
    })
  }

  init = () => {
    const { didFinishInitialAnimation, filter } = this.state
    const { list, isLoading, navigation } = this.props
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
        return false
      }
      return true
    })
    const behavior = Platform.OS === 'ios' ? 'position' : ''
    return (
      <ScrollView>
        <KeyboardAvoidingView behavior={behavior} enabled style={{ flex: 1 }}>
          <ScrollListWithTitle data={data} title="Частые вопросы" navigation={navigation} />
          <RequestView title="Остались вопросы?" />
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }

  onChangeFilter = (text) => {
    this.setState({ filter: text })
  }

  render() {
    const { filter } = this.state
    const { navigation } = this.props
    return (
      <View style={[styles.view]}>
        <CustomStatusBar backgroundColor={WHITE} barStyle="dark-content" />
        <HeaderUI filter={filter} placeHolder="Помощь" leftIcon="menu" leftOnPress={() => navigation.openDrawer()} onChangeFilter={this.onChangeFilter} />
        <View style={styles.sortView} />
        <View style={styles.body}>
          {this.init()}
        </View>
        <FooterUI navigation={navigation} selected="call" />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  list: state.help.list,
  isLoading: state.help.isLoading
})
export default connect(mapStateToProps, { getHelp })(Help)