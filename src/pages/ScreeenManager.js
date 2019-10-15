/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { ScrollView, StyleSheet, SafeAreaView, Platform } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer'
//import { ifIphoneX } from 'react-native-iphone-x-helper'
import FastImage from 'react-native-fast-image'
import Main from './main'
import Boutique from './boutique'
import { w, WHITE, normalize } from '../constants/global'

const styles = StyleSheet.create({
  image: {
    backgroundColor: WHITE
  }
})

const CustomDrawerContentComponent = props => (
  <ScrollView>
    <SafeAreaView
      style={styles.container}
      forceInset={{ top: 'always', horizontal: 'never' }}
    >
      <DrawerNavigatorItems {...props} />
    </SafeAreaView>
  </ScrollView>
)

const MainStack = createStackNavigator(
  {
    Main,
    Boutique
  },
  {
    initialRouteName: 'Main',
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
        drawerLabel: 'Главная',
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
