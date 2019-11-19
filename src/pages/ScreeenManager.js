/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { ScrollView, StyleSheet, Platform, ImageBackground, View, Text } from 'react-native'
import { createAppContainer, SafeAreaView } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer'
//import { ifIphoneX } from 'react-native-iphone-x-helper'
import FastImage from 'react-native-fast-image'
import Main from './main'
import Boutique from './boutique'
import BoutiqueList from './boutiqueList'
import CouncilsList from './сouncils'
import CouncilItemView from './сouncils/item'
import Products from './products'
import MapShow from './map'
import Comments from './comments'
import { w, WHITE, normalize, statusBarHeight } from '../constants/global'

const styles = StyleSheet.create({
  headerView: {
    paddingTop: statusBarHeight
  },
  image: {
    backgroundColor: WHITE,
    height: 50,
    width: 50
  }
})

const CustomDrawerContentComponent = props => (
  <ScrollView>
    <SafeAreaView
      style={styles.container}
      forceInset={{ top: 'always', horizontal: 'never' }}
    >
      <ImageBackground source={require('../../resources/image/header_background.png')} style={{ width: '100%', height: 200 }}>
        <View style={styles.headerView}>
          <Text>1123</Text>
          <Text>1123</Text>
          <Text>1123</Text>
        </View>
      </ImageBackground>
      <DrawerNavigatorItems {...props} />
    </SafeAreaView>
  </ScrollView>
)

const MainStack = createStackNavigator(
  {
    Main,
    Boutique,
    BoutiqueList,
    Products
  },
  {
    initialRouteName: 'Main',
    headerMode: 'none',
    mode: Platform.OS === 'ios' ? 'modal' : 'card'
    //transitionConfig: TransitionConfiguration
  }
)

const CouncilsStack = createStackNavigator(
  {
    CouncilsList,
    CouncilItemView
  },
  {
    initialRouteName: 'CouncilsList',
    headerMode: 'none',
    mode: Platform.OS === 'ios' ? 'modal' : 'card'
    //transitionConfig: TransitionConfiguration
  }
)

const Screens = createDrawerNavigator(
  {
    Main: {
      screen: MainStack,
      navigationOptions: {
        drawerLabel: 'Каталог бутиков',
        drawerIcon: () => (
          <FastImage
            style={styles.image}
            resizeMode={FastImage.resizeMode.contain}
          />
        )
      }
    },
    Councils: {
      screen: CouncilsStack,
      navigationOptions: {
        drawerLabel: 'Советы',
        drawerIcon: () => (
          <FastImage
            style={styles.image}
            resizeMode={FastImage.resizeMode.contain}
          />
        )
      }
    },
    Map: {
      screen: MapShow,
      navigationOptions: {
        drawerLabel: 'Карта хоргос',
        drawerIcon: () => (
          <FastImage
            style={styles.image}
            resizeMode={FastImage.resizeMode.contain}
          />
        )
      }
    },
    Comments: {
      screen: Comments,
      navigationOptions: {
        drawerLabel: 'Отзывы о Хоргос',
        drawerIcon: () => (
          <FastImage
            style={styles.image}
            resizeMode={FastImage.resizeMode.contain}
          />
        )
      }
    }
  },
  {
    initialRouteName: 'Main',
    drawerWidth: w * 0.8,
    contentOptions: {
      activeTintColor: '#FF6E36',
      inactiveTintColor: 'rgba(0, 0, 0, 0.54)',
      activeBackgroundColor: '#FFFFFF',
      cityName: this.props,
      itemsContainerStyle: {
        backgroundColor: '#FFFFFF'
      },
      labelStyle: { fontSize: normalize(13), color: 'rgba(23, 7, 1, 0.87)', fontWeight: 'normal' }
    },
    contentComponent: CustomDrawerContentComponent

  }
)

export default createAppContainer(Screens)
