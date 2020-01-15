/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react'
import { StyleSheet, View, InteractionManager, ScrollView, Text, TouchableOpacity } from 'react-native'
import _ from 'lodash'
import { HeaderUI, FooterUI } from '../../components/ui/view'
import { WHITE, GRAY, normalize, BORDER_COLOR } from '../../constants/global'
import CustomStatusBar from '../../components/CustomStatusBar'
import Loader from '../../components/Loader'

const styles = StyleSheet.create({
  view: { backgroundColor: WHITE, flex: 1 },
  body: { flex: 1, marginHorizontal: 15 },
  sortView: { paddingHorizontal: 15, borderBottomWidth: 1, borderBottomColor: BORDER_COLOR, paddingBottom: 15, marginVertical: 10 },
  sortText: { fontSize: normalize(12), fontWeight: '500' },
  row: { flexDirection: 'row', justifyContent: 'space-evenly' },
  text: { fontSize: normalize(13), color: GRAY },
  element: { flex: 1, paddingVertical: 15, borderTopWidth: 1, borderTopColor: BORDER_COLOR }
})

class Products extends Component {
  state = { didFinishInitialAnimation: false, sortByName: false }

  componentDidMount = () => {
    InteractionManager.runAfterInteractions(() => {
      setTimeout(() => this.setState({ didFinishInitialAnimation: true }), 0)
    })
  }

  init = () => {
    const { didFinishInitialAnimation, sortByName } = this.state
    if (didFinishInitialAnimation === false) {
      return <Loader />
    }
    const { navigation } = this.props
    const items = sortByName === true ? _.sortBy(navigation.getParam('items'), ['name'], ['asc']) : navigation.getParam('items')
    return (
      <ScrollView>
        {
          items.map((item, index) => {
            const { name } = item
            return (
              <View key={_.uniqueId()} style={[styles.row]}>
                <View style={[styles.element, { borderTopWidth: index === 0 ? 0 : 1 }]}><Text style={styles.text}>{name}</Text></View>
              </View>
            )
          })
        }
      </ScrollView>
    )
  }

  render() {
    const { navigation } = this.props
    const title = navigation.getParam('title')
    return (
      <View style={[styles.view]}>
        <CustomStatusBar backgroundColor={WHITE} barStyle="dark-content" />
        <HeaderUI text={`Товары магазина "${title}"`} leftIcon="arrow-left" leftOnPress={() => navigation.goBack()} withSearch={false} />
        <TouchableOpacity onPress={() => this.setState({ sortByName: true })}>
          <View style={styles.sortView}>
            <Text style={styles.sortText}>Сортировка товаров по алфавиту</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.body}>
          {this.init()}
        </View>
        <FooterUI navigation={navigation} />
      </View>
    )
  }
}

export default Products
