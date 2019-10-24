/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react'
import { StyleSheet, View, Text, InteractionManager, Animated } from 'react-native'
import { ScrollCardWithTitle } from '../main/view'
import { FooterUI, SliderApp } from '../../components/ui/view'
import { DetailInfo, FavoriteCmp, Description, ProductPrices, HeaderScroll, ProductList, MapShow, ResponseList } from './view'
import { WHITE, normalize, HEADER_MAX_HEIGHT, HEADER_SCROLL_DISTANCE, HEADER_MIN_HEIGHT, TRASPARENT } from '../../constants/global'
import CustomStatusBar from '../../components/CustomStatusBar'
import Loader from '../../components/Loader'

const styles = StyleSheet.create({
  view: { backgroundColor: WHITE, flex: 1 },
  body: { flex: 1 },
  scrollView: { flex: 1 },
  text: { fontWeight: '600', fontSize: normalize(13) },
  scrollViewContent: { marginTop: HEADER_MAX_HEIGHT, paddingVertical: 10 }
})

class Boutique extends Component {
  state = { didFinishInitialAnimation: false, scrollY: new Animated.Value(0), refs: {} }

  componentDidMount = () => {
    InteractionManager.runAfterInteractions(() => {
      setTimeout(() => this.setState({ didFinishInitialAnimation: true }), 150)
    })
  }

  pressToText = (target) => {
    const { refs } = this.state
    if (refs[target] && this.scrollView) {
      const ref = refs[target]
      //const { nativeEvent: { layout: { y } } } = view
      //this.scrollView.getNode().scrollTo({ y, animation: true })
      console.log(ref.current)
    }
  }

  onLayourRef = async (ref, target) => {
    console.log(ref, target)
    const { refs } = this.state
    if (!refs[target]) {
      console.log('added')
      refs[target] = ref
      this.setState(refs)
    } else {
      console.log('non')
    }
  }

  init = (headerHeight) => {
    const { didFinishInitialAnimation } = this.state
    const { navigation } = this.props
    if (didFinishInitialAnimation === false) {
      return <Loader />
    }
    return (
      <Animated.ScrollView
        ref={(ref) => this.scrollView = ref}
        style={[styles.scrollView]}
        scrollEventThrottle={8}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
          {
            useNativeDriver: true
          }
        )}
      >
        <Animated.View style={[styles.scrollViewContent, { transform: [{ translateY: headerHeight }] }]}>
          <SliderApp data={['1']} />
          <FavoriteCmp />
          <DetailInfo data={[{ key: '1', value: '1' }, { key: '1', value: '1' }, { key: '1', value: '1' }, { key: '1', value: '1' }]} />
          <Description />
          <ProductPrices onLayourRef={this.onLayourRef} data={[{ name: 'Наименование', value: '12000 - 14000 тг.' }, { name: 'Наименование', value: '9000 - 24200 тг.' }, { name: 'Наименование', value: '720000 - 510000 тг.' }]} />
          <ProductList onLayourRef={this.onLayourRef} onPress={() => navigation.push('Products')} data={[{ value: 'Наименование' }, { value: 'Наименование' }, { value: 'Наименование' }]} />
          <MapShow onLayourRef={this.onLayourRef} data={require('../../../resources/image/image.png')} />
          <ResponseList onLayourRef={this.onLayourRef} data={['1', '2']} />
          <ScrollCardWithTitle title="Похожие бутики" masked element={<Text style={styles.text}>смотреть все</Text>} navigation={navigation} />
          <ScrollCardWithTitle title="Рекомендуем" masked element={<Text style={styles.text}>смотреть все</Text>} navigation={navigation} />
        </Animated.View>
      </Animated.ScrollView>
    )
  }

  render() {
    const { navigation } = this.props
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -HEADER_MIN_HEIGHT],
      extrapolate: 'clamp'
    })
    const inputOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 0.8, 0],
      extrapolate: 'clamp'
    })
    console.log(this.state.scrollY)
    return (
      <View style={[styles.view]}>
        <CustomStatusBar backgroundColor={TRASPARENT} barStyle="light-content" blank />
        <Animated.View style={[styles.body]}>
          {this.init(headerHeight)}
          <HeaderScroll headerHeight={headerHeight} navigation={navigation} inputOpacity={inputOpacity} pressToText={this.pressToText} />
        </Animated.View>
        <FooterUI navigation={navigation} />
      </View>
    )
  }
}

export default Boutique
