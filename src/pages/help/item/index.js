/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react'
import { StyleSheet, View, InteractionManager, ScrollView, Text } from 'react-native'
import { FooterUI, HeaderUI } from '../../../components/ui/view'
import { WHITE, BORDER_COLOR, GRAY_SECOND, BLACK, normalize } from '../../../constants/global'
import CustomStatusBar from '../../../components/CustomStatusBar'
import Loader from '../../../components/Loader'


const styles = StyleSheet.create({
  view: { backgroundColor: WHITE, flex: 1 },
  body: { flex: 1 },
  sortView: { paddingHorizontal: 15, borderBottomWidth: 1, borderBottomColor: BORDER_COLOR, paddingBottom: 15, marginBottom: 10 },
  imgView: { alignItems: 'center', marginBottom: 15 },
  textTitle: { fontSize: normalize(15), fontWeight: 'bold', color: BLACK, marginBottom: 7 },
  textDate: { fontSize: normalize(11), color: GRAY_SECOND, marginBottom: 10 },
  textDesc: { fontSize: normalize(12), color: BLACK, marginBottom: 15 },
  scrollView: { paddingHorizontal: 15, paddingBottom: 15 }
})

class HelpItemView extends Component {
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
    const item = navigation.getParam('item')
    const { didFinishInitialAnimation } = this.state
    if (didFinishInitialAnimation === false) {
      return <Loader />
    }
    return (
      <ScrollView style={styles.scrollView}>
        <Text style={styles.textTitle}>{item.title}</Text>
        <Text style={styles.textDate}>{item.date}</Text>
        <Text style={styles.textDesc}>{item.content}</Text>
      </ScrollView>
    )
  }


  render() {
    const { navigation } = this.props
    const item = navigation.getParam('item')

    return (
      <View style={[styles.view]}>
        <CustomStatusBar backgroundColor={WHITE} barStyle="dark-content" />
        <HeaderUI text={item.title} leftIcon="arrow-left" leftOnPress={() => navigation.goBack()} withSearch={false} />
        <View style={styles.sortView} />
        <View style={styles.body}>
          {this.init()}
        </View>
        <FooterUI navigation={navigation} />
      </View>
    )
  }
}

export default HelpItemView
