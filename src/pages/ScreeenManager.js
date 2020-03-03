/* eslint-disable import/no-dynamic-require */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react'
import { ScrollView, StyleSheet, Platform, ImageBackground, View, Text, Modal, TouchableOpacity } from 'react-native'
import { createAppContainer, SafeAreaView } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer'
import FastImage from 'react-native-fast-image'
import { useSelector, useDispatch } from 'react-redux'
import Feather from 'react-native-vector-icons/Feather'
import Main from './main'
import Boutique from './boutique'
import BoutiqueList from './boutiqueList'
import ResponseLists from './responseList'
import CouncilsList from './сouncils'
import CouncilItemView from './сouncils/item'
import HelpItemView from './help/item'
import Products from './products'
import MapShow from './map'
import Comments from './comments'
import Help from './help'
import Favorite from './favorite'
import Categories from './categories'
import Profile from './profile'
import { w, WHITE, normalize, statusBarHeight, isEmptyString, BLACK, BORDER_COLOR, alertApp, confirmApp } from '../constants/global'
import { ACTION_LOGOUT_SUCCESS } from './auth/types'

import LoginView from './auth/login'
import RegistrationView from './auth/registration'
import ForgotView from './auth/forgot'

import { strings } from '../service/Locale'

const styles = StyleSheet.create({
  headerView: {
    paddingTop: statusBarHeight,
    flexDirection: 'row'
  },
  btnStyle: {
    margin: 20
  },
  avatar: {
    height: 60,
    width: 60,
    margin: 20,
    borderRadius: 30
  },
  loginText: {
    color: WHITE,
    fontSize: normalize(16)
  },
  numberText: {
    color: WHITE,
    fontSize: normalize(13)
  },
  image: {
    height: 25,
    width: 25
  },
  mainView: {
    flex: 1
  },
  textView: {
    marginHorizontal: 20
  },
  footerBtnView: { flexDirection: 'row', paddingVertical: 5, backgroundColor: WHITE, alignItems: 'center', borderTopColor: BORDER_COLOR, borderTopWidth: 1 },
  footerBtnText: { color: BLACK, fontSize: normalize(13), marginLeft: 10 }
})

const CustomDrawerContentComponent = props => {
  const [loginVisible, setLoginVisible] = useState(false)
  const [loginParam, setLoginParam] = useState(undefined)
  const [registrationVisible, setRegistationVisible] = useState(false)
  const [forgetVisible, setForgetVisible] = useState(false)
  const token = useSelector(state => state.auth.token)
  const name = useSelector(state => state.profile.name)
  const email = useSelector(state => state.profile.email)
  const avatar = useSelector(state => state.profile.avatar)
  const isConnected = useSelector(state => state.network.isConnected)
  const dispatch = useDispatch()
  return (
    <SafeAreaView
      style={styles.mainView}
      forceInset={{ top: 'always', horizontal: 'never' }}
    >
      <ImageBackground source={require('../../resources/image/header_background.png')} style={{ width: '100%', height: 200 }}>
        <View style={styles.headerView}>
          <View style={styles.mainView}>
            <View>
              {
                  !isEmptyString(token) &&
                  <FastImage
                    style={styles.avatar}
                    resizeMode={FastImage.resizeMode.cover}
                    source={avatar}
                  />
              }
            </View>
            <View style={styles.textView}>
              {
                !isEmptyString(token) &&
                <TouchableOpacity onPress={() => props.navigation.navigate('Profile')}>
                  <Text style={styles.loginText} ellipsizeMode="tail">{name}</Text>
                  <Text style={styles.numberText} ellipsizeMode="tail">{email}</Text>
                </TouchableOpacity>
              }
            </View>
          </View>
          <View>
            {
              !isEmptyString(token) &&
              <TouchableOpacity onPress={() => {
                if (isConnected === false) {
                  return alertApp(strings('message.warning'), strings('menu.msg.needInternetForExit'))
                }
                confirmApp(strings('message.warning'), strings('menu.msg.exitFromAcc')).then(() => {
                  dispatch({ type: ACTION_LOGOUT_SUCCESS })
                  props.navigation.navigate('Main')
                })
              }}
              >
                <Feather name="log-out" style={styles.btnStyle} size={normalize(23)} color={WHITE} />
              </TouchableOpacity>
            }
            {
              isEmptyString(token) &&
              <TouchableOpacity onPress={() => setLoginVisible(true)}>
                <Feather name="log-in" style={styles.btnStyle} size={normalize(23)} color={WHITE} />
              </TouchableOpacity>
            }
          </View>
        </View>
      </ImageBackground>
      <Modal visible={loginVisible} onRequestClose={() => setLoginVisible(false)} transparent animationType="fade">
        <LoginView navigation={props.navigation} param={loginParam} close={() => setLoginVisible(false)} regShow={() => setRegistationVisible(true)} forgetShow={() => setForgetVisible(true)} />
      </Modal>
      <Modal visible={registrationVisible} onRequestClose={() => setRegistationVisible(false)} transparent animationType="fade">
        <RegistrationView
          close={() => setRegistationVisible(false)}
          loginShow={(result) => {
            setLoginParam(result)
            setLoginVisible(true)
          }}
        />
      </Modal>
      <Modal visible={forgetVisible} onRequestClose={() => setForgetVisible(false)} transparent animationType="fade">
        <ForgotView close={() => setForgetVisible(false)} loginShow={() => setLoginVisible(true)} />
      </Modal>
      <ScrollView>
        <DrawerNavigatorItems {...props} />
      </ScrollView>
      <View style={{ flex: 1 }} />
      <View style={{ justifyContent: 'flex-end' }}>
        { token && (
        <TouchableOpacity onPress={() => props.navigation.navigate('Profile')}>
          <View style={styles.footerBtnView}>
            <Feather name="user" style={[styles.btnStyle]} size={21} color={BLACK} />
            <Text style={styles.footerBtnText}>{strings('menu.profile')}</Text>
          </View>
        </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => props.navigation.navigate('Help')}>
          <View style={styles.footerBtnView}>
            <Feather name="phone-call" style={[styles.btnStyle]} size={21} color={BLACK} />
            <Text style={styles.footerBtnText}>{strings('menu.help')}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const MainStack = createStackNavigator(
  {
    Main,
    Boutique,
    ResponseLists,
    BoutiqueList,
    Products
  },
  {
    initialRouteName: 'Main',
    headerMode: 'none',
    mode: Platform.OS === 'ios' ? 'modal' : 'card'
  }
)

const BoutiqueListStack = createStackNavigator(
  {
    Boutique,
    ResponseLists,
    BoutiqueList,
    Products
  },
  {
    initialRouteName: 'BoutiqueList',
    headerMode: 'none',
    mode: Platform.OS === 'ios' ? 'modal' : 'card'
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
  }
)

const HelpStack = createStackNavigator(
  {
    Help,
    HelpItemView
  },
  {
    initialRouteName: 'Help',
    headerMode: 'none',
    mode: Platform.OS === 'ios' ? 'modal' : 'card'
  }
)

const FavotiteStack = createStackNavigator(
  {
    Favorite,
    Boutique,
    ResponseLists,
    BoutiqueList,
    Products
  },
  {
    initialRouteName: 'Favorite',
    headerMode: 'none',
    mode: Platform.OS === 'ios' ? 'modal' : 'card'
  }
)

const CategoriesStack = createStackNavigator(
  {
    Categories,
    Boutique,
    ResponseLists,
    BoutiqueList,
    Products
  },
  {
    initialRouteName: 'Categories',
    headerMode: 'none',
    mode: Platform.OS === 'ios' ? 'modal' : 'card'
  }
)

const CategoriesNavOpts = () => ({
  drawerLabel: strings('menu.categories'),
  drawerIcon: ({ focused }) => {
    let literal = require('../../resources/icons/menu/standart/menu.png')
    if (focused) {
      literal = require('../../resources/icons/menu/selected/menu.png')
    }
    return (
      <FastImage
        style={styles.image}
        source={literal}
        resizeMode={FastImage.resizeMode.contain}
      />
    )
  }
})

const BoutiqueListMenuNavOpts = () => ({
  drawerLabel: strings('menu.catalog'),
  drawerIcon: ({ focused }) => {
    let literal = require('../../resources/icons/menu/standart/store.png')
    if (focused) {
      literal = require('../../resources/icons/menu/selected/store.png')
    }
    return (
      <FastImage
        style={styles.image}
        source={literal}
        resizeMode={FastImage.resizeMode.contain}
      />
    )
  }
})

const MapNavOpts = () => ({
  drawerLabel: strings('menu.map'),
  drawerIcon: ({ focused }) => {
    let literal = require('../../resources/icons/menu/standart/address.png')
    if (focused) {
      literal = require('../../resources/icons/menu/selected/address.png')
    }
    return (
      <FastImage
        style={styles.image}
        source={literal}
        resizeMode={FastImage.resizeMode.contain}
      />
    )
  }
})

const CommentsNavOpts = () => ({
  drawerLabel: strings('menu.response'),
  drawerIcon: ({ focused }) => {
    let literal = require('../../resources/icons/menu/standart/favorites.png')
    if (focused) {
      literal = require('../../resources/icons/menu/selected/favorites.png')
    }
    return (
      <FastImage
        style={styles.image}
        source={literal}
        resizeMode={FastImage.resizeMode.contain}
      />
    )
  }
})

const CouncilsNavOpts = () => ({
  drawerLabel: strings('menu.consults'),
  drawerIcon: ({ focused }) => {
    let literal = require('../../resources/icons/menu/standart/elemental-tip.png')
    if (focused) {
      literal = require('../../resources/icons/menu/selected/elemental-tip.png')
    }
    return (
      <FastImage
        style={styles.image}
        source={literal}
        resizeMode={FastImage.resizeMode.contain}
      />
    )
  }
})

const Screens = createDrawerNavigator(
  {
    Categories: {
      screen: CategoriesStack,
      navigationOptions: CategoriesNavOpts
    },
    BoutiqueListMenu: {
      screen: BoutiqueListStack,
      navigationOptions: BoutiqueListMenuNavOpts
    },
    Main: {
      screen: MainStack,
      navigationOptions: { drawerLabel: () => null }
    },
    Map: {
      screen: MapShow,
      navigationOptions: MapNavOpts
    },
    Comments: {
      screen: Comments,
      navigationOptions: CommentsNavOpts
    },
    Councils: {
      screen: CouncilsStack,
      navigationOptions: CouncilsNavOpts
    },
    Help: {
      screen: HelpStack,
      navigationOptions: {
        drawerLabel: () => null
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        drawerLabel: () => null
      }
    },
    Favorite: {
      screen: FavotiteStack,
      navigationOptions: {
        drawerLabel: () => null
      }
    }
  },
  {
    initialRouteName: 'Main',
    drawerWidth: w * 0.8,
    contentOptions: {
      activeTintColor: '#9071EA',
      inactiveTintColor: '#272833',
      activeBackgroundColor: 'rgba(157, 71, 209, 0.08)',
      itemsContainerStyle: {
        backgroundColor: '#FFFFFF'
      },
      iconContainerStyle: {
        opacity: 1
      },
      labelStyle: { fontSize: normalize(13), fontWeight: 'normal' }
    },
    contentComponent: CustomDrawerContentComponent

  }
)

export default createAppContainer(Screens)
