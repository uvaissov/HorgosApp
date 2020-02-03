/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react'
import { View, StyleSheet, InteractionManager, TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image'
import { connect } from 'react-redux'
import ImageView from 'react-native-image-view'
import { FooterUI, HeaderUI } from '../../components/ui/view'
import { WHITE, BORDER_COLOR } from '../../constants/global'
import CustomStatusBar from '../../components/CustomStatusBar'
import { getMaps } from './actions'
import Loader from '../../components/Loader'

const styles = StyleSheet.create({
  view: { backgroundColor: WHITE, flex: 1 },
  body: { flex: 1, overflow: 'hidden' },
  sortView: { paddingHorizontal: 15, borderBottomWidth: 1, borderBottomColor: BORDER_COLOR, paddingBottom: 15 }
})

// const images = [
//   {
//     source: {
//       uri: 'https://cdn.pixabay.com/photo/2017/08/17/10/47/paris-2650808_960_720.jpg'
//     },
//     title: 'Paris',
//     width: 802,
//     height: 720
//   }
// ]

class MapShow extends Component {
  state = {
    didFinishInitialAnimation: false,
    isVisible: false
  }

  componentDidMount = () => {
    this.props.getMaps()
    InteractionManager.runAfterInteractions(() => {
      setTimeout(() => this.setState({ didFinishInitialAnimation: true }), 150)
    })
  }

  init = () => {
    const { didFinishInitialAnimation, isVisible } = this.state
    const { list = [], isLoading } = this.props
    const [firstImage] = list
    if (didFinishInitialAnimation === false || isLoading === true) {
      return <Loader />
    }
    return (
      <>
        <TouchableOpacity style={{ flex: 1 }} onPress={() => this.setState({ isVisible: true })}>
          <FastImage source={firstImage} style={styles.body} resizeMode={FastImage.resizeMode.contain} />
        </TouchableOpacity>
        <ImageView
          images={list.map((el) => ({ source: el }))}
          imageIndex={0}
          isVisible={isVisible}
          onClose={() => this.setState({ isVisible: false })}
        />
      </>
    )
  }

  render() {
    const { navigation } = this.props
    return (
      <View style={[styles.view]}>
        <CustomStatusBar backgroundColor={WHITE} barStyle="dark-content" />
        <HeaderUI text="Карта Хоргоса" leftIcon="menu" leftOnPress={() => navigation.openDrawer()} withSearch={false} />
        <View style={styles.sortView} />
        <View style={styles.body}>
          {this.init()}
        </View>
        <FooterUI navigation={navigation} />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  list: state.maps.list,
  isLoading: state.maps.isLoading
})
export default connect(mapStateToProps, { getMaps })(MapShow)