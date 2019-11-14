/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react'
//import _ from 'lodash'
import { StyleSheet, View, InteractionManager, ScrollView, Text } from 'react-native'
import { FooterUI, HeaderUI } from '../../components/ui/view'
import { WHITE, BORDER_COLOR } from '../../constants/global'
import CustomStatusBar from '../../components/CustomStatusBar'
import Loader from '../../components/Loader'

const styles = StyleSheet.create({
  view: { backgroundColor: WHITE, flex: 1 },
  body: { flex: 1 },
  sortView: { paddingHorizontal: 15, borderBottomWidth: 1, borderBottomColor: BORDER_COLOR, paddingBottom: 15, marginBottom: 10 }
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
    //const { navigation } = this.props
    const { didFinishInitialAnimation } = this.state
    if (didFinishInitialAnimation === false) {
      return <Loader />
    }
    return (
      <ScrollView>
        <Text>1</Text>
      </ScrollView>
    )
  }


  render() {
    const { navigation } = this.props
    const { didFinishInitialAnimation } = this.state

    if (didFinishInitialAnimation === false) {
      return <Loader />
    }

    return (
      <View style={[styles.view]}>
        <CustomStatusBar backgroundColor={WHITE} barStyle="light-content" />
        <HeaderUI text={'Товары магазина "Меховой салон Imperia Furs"'} leftIcon="menu" leftOnPress={() => navigation.openDrawer()} />
        <View style={styles.sortView} />
        <View style={styles.body}>
          {this.init()}
        </View>
        <FooterUI navigation={navigation} />
      </View>
    )
  }
}

export default CouncilsList
