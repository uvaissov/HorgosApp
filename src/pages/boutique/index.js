/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react'
import { StyleSheet, ScrollView, SafeAreaView, Text, InteractionManager, Animated } from 'react-native'
import { ScrollCardWithTitle } from '../main/view'
import { FooterUI, SliderApp } from '../../components/ui/view'
import { DetailInfo, FavoriteCmp, Description, ProductPrices, HeaderScroll } from './view'
import { WHITE, normalize, HEADER_MAX_HEIGHT, HEADER_SCROLL_DISTANCE, HEADER_MIN_HEIGHT } from '../../constants/global'
import Loader from '../../components/Loader'

const styles = StyleSheet.create({
  view: { backgroundColor: WHITE, flex: 1 },
  body: { flex: 1 },
  scrollView: { flex: 1 },
  text: { fontWeight: '600', fontSize: normalize(13) },
  scrollViewContent: { marginTop: HEADER_MAX_HEIGHT, paddingVertical: 10 }
})

class Boutique extends Component {
  state = { didFinishInitialAnimation: false, scrollY: new Animated.Value(0) }

  componentDidMount = () => {
    InteractionManager.runAfterInteractions(() => {
      setTimeout(() => this.setState({ didFinishInitialAnimation: true }), 0)
    })
  }

  init = (headerHeight) => {
    const { didFinishInitialAnimation } = this.state
    const { navigation } = this.props
    if (didFinishInitialAnimation === false) {
      return <Loader />
    }
    return (
      <ScrollView
        style={[styles.scrollView]}
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }])}
      >
        <Animated.View style={[styles.scrollViewContent, { marginTop: headerHeight }]}>
          <SliderApp data={['1']} />
          <FavoriteCmp />
          <DetailInfo data={[{ key: '1', value: '1' }, { key: '1', value: '1' }, { key: '1', value: '1' }, { key: '1', value: '1' }]} />
          <Description />
          <ProductPrices data={[{ name: 'Наименование', value: '12000 - 14000 тг.' }, { name: 'Наименование', value: '9000 - 24200 тг.' }, { name: 'Наименование', value: '720000 - 510000 тг.' }]} />
          <ScrollCardWithTitle title="Похожие бутики" masked element={<Text style={styles.text}>смотреть все</Text>} navigation={navigation} />
          <ScrollCardWithTitle title="Рекомендуем" masked element={<Text style={styles.text}>смотреть все</Text>} navigation={navigation} />
        </Animated.View>
      </ScrollView>
    )
  }

  render() {
    const { navigation } = this.props
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp'
    })
    const inputOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 0.8, 0],
      extrapolate: 'clamp'
    })
    return (
      <SafeAreaView style={[styles.view]}>
        <Animated.View style={[styles.body]}>
          {this.init(headerHeight)}
          <HeaderScroll headerHeight={headerHeight} navigation={navigation} inputOpacity={inputOpacity} />
        </Animated.View>
        <FooterUI navigation={navigation} />
      </SafeAreaView>
    )
  }
}

export default Boutique
