import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'

import { HeaderUI, FooterUI, ScrollWithTitle } from '../../components/ui/view'
import { WHITE, normalize } from '../../constants/global'

const styles = StyleSheet.create({
  view: { backgroundColor: WHITE, flex: 1 },
  body: { flex: 1 },
  scrollView: { flex: 1 },
  text: { fontWeight: 'bold', fontSize: normalize(13) }
})

class Main extends Component {
  render() {
    const { isLoading, navigation } = this.props
    if (isLoading === true) {
      return null
    }
    return (
      <View style={styles.view}>
        <HeaderUI style={{ margin: 15 }} placeHolder="Введите название" navigation={navigation} />
        <View style={styles.body}>
          <ScrollView style={styles.scrollView}>
            <ScrollWithTitle title="Рекомендуем" element={<Text style={styles.text}>смотреть все</Text>} />
            <ScrollWithTitle title="Выбор покупателей" element={<Text style={styles.text}>смотреть все</Text>} />
            <ScrollWithTitle title="Популярные бутики" element={<Text style={styles.text}>смотреть все</Text>} />
          </ScrollView>
        </View>
        <FooterUI selected="main" />
      </View>
    )
  }
}

const mapStateToProps = state => {
  console.log('main')
  return {
    isLoading: state.main.isLoading
  }
}

export default connect(mapStateToProps, { })(Main)
