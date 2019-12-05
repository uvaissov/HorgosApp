import { Dimensions, Platform, PixelRatio, StatusBar } from 'react-native'
import { isIphoneX } from 'react-native-iphone-x-helper'

export const hostName = 'http://horgos.ibeacon.kz'
export const STORE_KEY_NAME = '@MyLocalStore:reduxStoreName'

export const WHITE = '#fff'
export const BLACK = '#000'
export const ORANGE = '#FFB800'
export const GREEN = '#28D86E'
export const RED = '#FF3A52'
export const GRAY = '#56506C'
export const GRAY_SECOND = '#9193AC'
export const GRAY_LIGHT = '#F6F6F6'
export const MAIN_COLOR = '#9071EA'


export const BORDER_COLOR = '#E2E8F0'

export const FONT = 'CenturyGothic'

export const statusBarHeight = Platform.OS === 'ios' ? (isIphoneX() ? 30 : 20) : StatusBar.currentHeight

export const HEADER_MAX_HEIGHT = 130 + statusBarHeight
export const HEADER_MIN_HEIGHT = 60
export const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT


export const BG_COLOR = '#FFF'
export const BG_COLOR_HEADER = '#F4F0FB'
export const TRASPARENT = 'transparent'

export const win = Dimensions.get('window')
export const w = win.width
export const h = win.height
export const responsive = {
  mobile5: w > 315 && w < 341,
  mobile8: w > 342 && w < 375,
  mobile8plus: w > 375 && w < 415,
  tablet: w < 990 && w > 415
}

const scale = w / 320

export function genImageUri(path) {
  return `${hostName}/storage/${path}`
}

export function normalize(size) {
  const newSize = size * scale
  let result
  if (Platform.OS === 'ios') {
    result = Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    result = Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  }
  return result
}
