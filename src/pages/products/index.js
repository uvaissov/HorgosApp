/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react'
import { StyleSheet, View, InteractionManager, ScrollView, Text, TouchableOpacity } from 'react-native'
import _ from 'lodash'
import { HeaderUI, FooterUI } from '../../components/ui/view'
import { WHITE, GRAY, normalize, BORDER_COLOR, translate } from '../../constants/global'
import CustomStatusBar from '../../components/CustomStatusBar'
import Loader from '../../components/Loader'
import { strings, locale } from '../../service/Locale'

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
    const itemsList = navigation.getParam('items')
    const data = itemsList.map(item => {
      const { name } = item
      return ({ ...item, name: _.trim(translate(item, `${locale()}.name`, name)) })
    })
    const items = sortByName === true ? _.sortBy(data, ['name'], ['asc']) : data
    return (
      <ScrollView>
        {
          items.map((item, index) => {
            const { name } = item
            return (
              <View key={_.uniqueId()} style={[styles.row]}>
                <View style={[styles.element, { borderTopWidth: index === 0 ? 0 : 1 }]}><Text style={styles.text}>{translate(item, `${locale()}.name`, name)}</Text></View>
              </View>
            )
          })
        }
      </ScrollView>
    )
  }

  render() {
    const { navigation } = this.props
    const { sortByName } = this.state
    const title = navigation.getParam('title')
    return (
      <View style={[styles.view]}>
        <CustomStatusBar backgroundColor={WHITE} barStyle="dark-content" />
        <HeaderUI text={`${strings('product.title')} "${title}"`} leftIcon="arrow-left" leftOnPress={() => navigation.goBack()} withSearch={false} />
        <TouchableOpacity onPress={() => this.setState({ sortByName: !sortByName })}>
          <View style={styles.sortView}>
            {
              sortByName ?
                (<Text style={styles.sortText}>{strings('product.sort.off')}</Text>) : (<Text style={styles.sortText}>{strings('product.sort.asc')}</Text>)
            }
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
