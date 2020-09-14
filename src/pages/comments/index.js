/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, InteractionManager } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { FooterUI, HeaderUI, Response } from '../../components/ui/view'
import { WHITE, BORDER_COLOR } from '../../constants/global'
import CustomStatusBar from '../../components/CustomStatusBar'
import Loader from '../../components/Loader'
import { getReviewsAbout } from './actions'
import { strings } from '../../service/Locale'


const styles = StyleSheet.create({
  view: { backgroundColor: WHITE, flex: 1 },
  body: { flex: 1 },
  sortView: { paddingHorizontal: 15, borderBottomWidth: 1, borderBottomColor: BORDER_COLOR, paddingBottom: 15 },
  flatListStyle: { paddingHorizontal: 15 }
})

class Comments extends Component {
  state = {
    didFinishInitialAnimation: false
  }

  componentDidMount = () => {
    const { list } = this.props
    if (list == null || list.length < 1) {
      this.props.getReviewsAbout()
    }
    InteractionManager.runAfterInteractions(() => {
      setTimeout(() => this.setState({ didFinishInitialAnimation: true }), 150)
    })
  }

  init = () => {
    const { didFinishInitialAnimation } = this.state
    const { list, isLoading } = this.props
    if (didFinishInitialAnimation === false || isLoading === true) {
      return <Loader />
    }
    return (
      <FlatList
        style={styles.flatListStyle}
        initialNumToRender={10}
        data={list}
        keyExtractor={(item) => `${item.id}-${item.name}`}
        renderItem={({ item }) => <Response index={item.index} name={item.name} rating={item.rating} text={item.text} date={item.date} />}
      />
    )
  }


  render() {
    const { navigation } = this.props
    return (
      <View style={[styles.view]}>
        <CustomStatusBar backgroundColor={WHITE} barStyle="dark-content" />
        <HeaderUI text={strings('comments.title')} leftIcon="menu" leftOnPress={() => navigation.openDrawer()} withSearch={false} />
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
  list: state.reviews.list,
  isLoading: state.reviews.isLoading
})
export default connect(mapStateToProps, { getReviewsAbout })(Comments)
