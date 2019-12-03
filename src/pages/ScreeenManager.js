/* eslint-disable import/no-dynamic-require */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { ScrollView, StyleSheet, Platform, ImageBackground, View, Text } from 'react-native'
import { createAppContainer, SafeAreaView } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FastImage from 'react-native-fast-image'
import Main from './main'
import Boutique from './boutique'
import BoutiqueList from './boutiqueList'
import CouncilsList from './сouncils'
import CouncilItemView from './сouncils/item'
import Products from './products'
import MapShow from './map'
import Comments from './comments'
import Help from './help'
import Favorite from './favorite'
import Categories from './categories'
import { w, WHITE, normalize, statusBarHeight } from '../constants/global'

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
    margin: 20
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
          <View style={styles.mainView}>
            <View>
              <FastImage
                style={styles.avatar}
                resizeMode={FastImage.resizeMode.contain}
                source={require('../../resources/image/profile.png')}
              />
            </View>
            <View style={styles.textView}>
              <Text style={styles.loginText}>Константин Ивлев</Text>
              <Text style={styles.numberText}>+77753559997</Text>
            </View>
          </View>
          <View>
            <MaterialCommunityIcons style={styles.btnStyle} name="dots-vertical" size={normalize(23)} color={WHITE} />
          </View>
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

const HelpStack = createStackNavigator(
  {
    Help
  },
  {
    initialRouteName: 'Help',
    headerMode: 'none',
    mode: Platform.OS === 'ios' ? 'modal' : 'card'
    //transitionConfig: TransitionConfiguration
  }
)

const FavotiteStack = createStackNavigator(
  {
    Favorite
  },
  {
    initialRouteName: 'Favorite',
    headerMode: 'none',
    mode: Platform.OS === 'ios' ? 'modal' : 'card'
    //transitionConfig: TransitionConfiguration
  }
)

const CategoriesStack = createStackNavigator(
  {
    Categories
  },
  {
    initialRouteName: 'Categories',
    headerMode: 'none',
    mode: Platform.OS === 'ios' ? 'modal' : 'card'
    //transitionConfig: TransitionConfiguration
  }
)


const Screens = createDrawerNavigator(
  {
    Categories: {
      screen: CategoriesStack,
      navigationOptions: {
        drawerLabel: 'Категории товаров',
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
      }
    },
    Main: {
      screen: MainStack,
      navigationOptions: {
        drawerLabel: 'Каталог бутиков',
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
      }
    },
    Map: {
      screen: MapShow,
      navigationOptions: {
        drawerLabel: 'Карта хоргос',
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
      }
    },
    Comments: {
      screen: Comments,
      navigationOptions: {
        drawerLabel: 'Отзывы о Хоргос',
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
      }
    },
    Councils: {
      screen: CouncilsStack,
      navigationOptions: {
        drawerLabel: 'Советы',
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
      }
    },
    Help: {
      screen: HelpStack,
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
      cityName: this.props,
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
