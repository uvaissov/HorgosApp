/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { StyleSheet, View, Text, InteractionManager, Animated } from 'react-native'
import { ScrollCardWithTitle } from '../main/view'
import { FooterUI, SliderImages } from '../../components/ui/view'
import { DetailInfo, FavoriteCmp, Description, ProductPrices, HeaderScroll, ProductList, MapShow, ResponseList } from './view'
import { WHITE, normalize, HEADER_MAX_HEIGHT, HEADER_SCROLL_DISTANCE, HEADER_MIN_HEIGHT, TRASPARENT } from '../../constants/global'
import CustomStatusBar from '../../components/CustomStatusBar'
import Loader from '../../components/Loader'
import * as manager from '../../service/manager'
import { BY_BOUTIQUE_IDS } from '../../constants/static'
import { getFavorite } from '../favorite/actions'

const styles = StyleSheet.create({
  view: { backgroundColor: WHITE, flex: 1 },
  body: { flex: 1 },
  scrollView: { flex: 1 },
  text: { fontWeight: '600', fontSize: normalize(13) },
  scrollViewContent: { marginTop: HEADER_MAX_HEIGHT, paddingVertical: 10 }
})

class Boutique extends Component {
  state = { boutique: null, isLoading: true, didFinishInitialAnimation: false, scrollY: new Animated.Value(0), refs: {}, highEl: null, highlightHeader: { price: new Animated.Value(0), product: new Animated.Value(0), map: new Animated.Value(0), response: new Animated.Value(0) } }

  componentDidMount = async () => {
    InteractionManager.runAfterInteractions(() => {
      setTimeout(() => this.setState({ didFinishInitialAnimation: true }), 150)
    })
    const { navigation, isConnected } = this.props
    const boutique = navigation.getParam('boutique')
    const boutique_id = navigation.getParam('boutique_id')
    if (boutique && boutique.id) {
      let [data] = await this.fetchDataList([boutique.id])
      if (!data && !isConnected) {
        data = boutique
        await this.addBoutiqueIfNotExistOffline(data)
      }
      if (data && data.id) {
        this.setState({ boutique: data, isLoading: false })
        this.getRelations(data)
      }
    } else if (boutique_id) {
      const [data] = await this.fetchDataList([boutique_id])
      if (data && data.id) {
        this.setState({ boutique: data, isLoading: false })
        this.getRelations(data)
      }
    }
  }

  addBoutiqueIfNotExistOffline = async (boutique) => {
    await manager.getBoutiqueByIdOffline(boutique.id).then((row) => {
      if (!row) {
        manager.addBoutiqueOffline(boutique)
      }
    })
  }

  updateBoutique = async (boutique) => {
    this.setState({ isLoading: true })
    try {
      const [data] = await this.fetchDataList([boutique.id])
      if (data && data.id) {
        this.setState({ boutique: data })
        this.getRelations(data)
        await manager.getBoutiqueByIdOffline(data.id).then((row) => {
          if (row) {
            manager.updateBoutiqueOffline(data.id, data)
          } else {
            manager.addBoutiqueOffline(data)
          }
        })
      }
    } catch (err) {
      console.log(err)
    } finally {
      this.setState({ isLoading: false })
    }
  }


  getRelations = async (boutique) => {
    const { relaters, recommenders } = boutique
    const relatersRes = await this.fetchDataList(relaters)
    const recommendersRes = await this.fetchDataList(recommenders)
    this.setState({ relaters: relatersRes, recommenders: recommendersRes })
  }

  fetchDataList = async (ids) => {
    if (!_.isArray(ids) || ids.length < 1) return []
    const { isConnected } = this.props
    const { payload: data } = await manager.getBoutiqueList(isConnected, { filter: BY_BOUTIQUE_IDS, ids })
    return (data && data.list) || []
  }

  pressToText = (target) => {
    const { refs } = this.state
    if (refs[target] && this.scrollView) {
      const { y } = refs[target]
      this.scrollView.getNode().scrollTo({ y, animation: true })
    }
  }

  onLayourRef = async (ref, target) => {
    const { refs } = this.state
    refs[target] = ref
  }

  setHighlight = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y
    const { refs, highlightHeader, highEl } = this.state
    const map = Object.entries(refs).map(([key, value]) => ({ key, value }))
    const row = _.find(map, (item) => item.value.y <= offsetY && offsetY <= (item.value.y + item.value.height))
    if (row) {
      if (highEl !== row.key) {
        Animated.timing(highlightHeader[row.key], {
          toValue: 1,
          duration: 200,
          useNativeDriver: true
        }).start()
        if (highlightHeader[highEl]) {
          Animated.timing(highlightHeader[highEl], {
            toValue: 0,
            duration: 200,
            useNativeDriver: true
          }).start()
        }
        this.state.highEl = row.key
      }
    } else if (highEl) {
      Animated.timing(highlightHeader[highEl], {
        toValue: 0,
        duration: 200,
        useNativeDriver: true
      }).start()
      this.state.highEl = null
    }
  }

  getInfo = () => {
    const { boutique } = this.state
    const array = []
    if (boutique.trading_house_name) {
      array.push({ key: 'Торговый дом', value: boutique.trading_house_name })
    }
    if (boutique.categoriesName) {
      array.push({ key: 'Категория', value: boutique.categoriesName })
    }
    if (boutique.floor) {
      array.push({ key: 'Этаж', value: boutique.floor })
    }
    if (boutique.boutique_number) {
      array.push({ key: 'Бутик #', value: boutique.boutique_number })
    }
    if (boutique.seller_name) {
      array.push({ key: 'Имя продавца', value: boutique.seller_name })
    }
    if (boutique.wner_name) {
      array.push({ key: 'Имя владельца', value: boutique.wner_name })
    }
    if (boutique.languages) {
      array.push({ key: 'Знание языков', value: boutique.languages })
    }
    if (boutique.phone) {
      array.push({ key: 'Телефон', value: boutique.phone })
    }
    if (boutique.whatsapp) {
      array.push({ key: 'WhatsApp', value: boutique.whatsapp })
    }
    if (boutique.weechat) {
      array.push({ key: 'WeChat', value: boutique.weechat })
    }
    return array
  }

  init = (headerHeight) => {
    const { didFinishInitialAnimation, isLoading, boutique = {}, relaters, recommenders } = this.state
    const { navigation, token } = this.props
    if (didFinishInitialAnimation === false || isLoading === true) {
      return <Loader />
    }
    //console.log('boutique', boutique)
    return (
      <Animated.ScrollView
        ref={(ref) => this.scrollView = ref}
        style={[styles.scrollView]}
        scrollEventThrottle={8}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
          {
            useNativeDriver: true,
            listener: event => {
              this.setHighlight(event)
            }
          }
        )}
      >
        <Animated.View style={[styles.scrollViewContent, { transform: [{ translateY: headerHeight }] }]}>
          <SliderImages data={boutique.images} />
          <FavoriteCmp boutique={boutique} token={token} getFavorite={this.props.getFavorite} />
          <DetailInfo data={this.getInfo()} />
          <Description text={boutique.description} />
          <ProductPrices onLayourRef={this.onLayourRef} data={boutique.products} />
          <ProductList onLayourRef={this.onLayourRef} onPress={() => navigation.push('Products', { items: boutique.all_products, title: boutique.name })} data={boutique.all_products} />
          <MapShow onLayourRef={this.onLayourRef} data={boutique.map} />
          <ResponseList onLayourRef={this.onLayourRef} data={boutique.reviews} boutique={boutique} afterAdd={() => this.updateBoutique(boutique)} />
          <ScrollCardWithTitle title="Похожие бутики" masked element={<Text style={styles.text}>смотреть все</Text>} navigation={navigation} data={relaters} onPress={() => navigation.push('BoutiqueList', { filter: BY_BOUTIQUE_IDS, ids: relaters.map(el => el.id) })} />
          <ScrollCardWithTitle title="Рекомендуем" masked element={<Text style={styles.text}>смотреть все</Text>} navigation={navigation} data={recommenders} onPress={() => navigation.push('BoutiqueList', { filter: BY_BOUTIQUE_IDS, ids: recommenders.map(el => el.id) })} />
        </Animated.View>
      </Animated.ScrollView>
    )
  }

  render() {
    const { navigation } = this.props
    const { highlightHeader, boutique } = this.state
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
    return (
      <View style={[styles.view]}>
        <CustomStatusBar backgroundColor={TRASPARENT} barStyle="light-content" absolute={{ position: 'absolute', top: 0 }} />
        <Animated.View style={[styles.body]}>
          {this.init(headerHeight)}
          <HeaderScroll boutique={boutique} headerHeight={headerHeight} navigation={navigation} inputOpacity={inputOpacity} pressToText={this.pressToText} highlightHeader={highlightHeader} />
        </Animated.View>
        <FooterUI navigation={navigation} />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  isConnected: state.network.isConnected,
  token: state.auth.token
})

export default connect(mapStateToProps, { getFavorite })(Boutique)
