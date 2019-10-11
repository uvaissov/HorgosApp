import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, Text } from 'react-native'

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
    const { navigation } = this.props
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

export default Main
