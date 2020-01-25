import * as manager from '../../../service/manager'

import {
  ACTION_GET_RECOMENDED_SUCCESED,
  ACTION_GET_SPECIAL_FOR_YOU_SUCCESED,
  ACTION_GET_CATEGORY_STOKS_SUCCESED,
  ACTION_GET_CUSTEMER_CHOICES_SUCCESED,
  ACTION_GET_STOCK_TODAY_SUCCESED,
  ACTION_GET_POPULAR_BOUTIQUES_SUCCESED,
  ACTION_GET_BEST_PRODUCTS_SUCCESED,
  ACTION_GET_FREEBIES_SUCCESED,
  ACTION_GET_VIDEOS_SUCCESED,
  ACTION_GET_SLIDERS_SUCCESED
} from '../types'

export const getRecommended = () => async (dispatch, getState) => {
  const { network: { isConnected }, main: { recomended } } = getState()
  const response = await manager.getRecommended(isConnected, recomended)
  dispatch({
    type: ACTION_GET_RECOMENDED_SUCCESED,
    ...response
  })
}

export const getSpecialForYou = () => async (dispatch, getState) => {
  const { network: { isConnected }, main: { specialsForYou } } = getState()
  const response = await manager.getSpecialForYou(isConnected, specialsForYou)
  dispatch({
    type: ACTION_GET_SPECIAL_FOR_YOU_SUCCESED,
    ...response
  })
}

export const getCategoryStocks = () => async (dispatch, getState) => {
  const { network: { isConnected }, main: { categoryStocks } } = getState()
  const response = await manager.getCategoryStocks(isConnected, categoryStocks)
  dispatch({
    type: ACTION_GET_CATEGORY_STOKS_SUCCESED,
    ...response
  })
}

export const getCustomerChoices = () => async (dispatch, getState) => {
  const { network: { isConnected }, main: { customerChoices } } = getState()
  const response = await manager.getCustomerChoices(isConnected, customerChoices)
  dispatch({
    type: ACTION_GET_CUSTEMER_CHOICES_SUCCESED,
    ...response
  })
}

export const getStockToday = () => async (dispatch, getState) => {
  const { network: { isConnected }, main: { stockToday } } = getState()
  const response = await manager.getStockToday(isConnected, stockToday)
  dispatch({
    type: ACTION_GET_STOCK_TODAY_SUCCESED,
    ...response
  })
}

export const getPopularBoutiques = () => async (dispatch, getState) => {
  const { network: { isConnected }, main: { popularBoutiques } } = getState()
  const response = await manager.getPopularBoutiques(isConnected, popularBoutiques)
  dispatch({
    type: ACTION_GET_POPULAR_BOUTIQUES_SUCCESED,
    ...response
  })
}

export const getBestProducts = () => async (dispatch, getState) => {
  const { network: { isConnected }, main: { bestProducts } } = getState()
  const response = await manager.getBestProducts(isConnected, bestProducts)
  dispatch({
    type: ACTION_GET_BEST_PRODUCTS_SUCCESED,
    ...response
  })
}

export const getFreebies = () => async (dispatch, getState) => {
  const { network: { isConnected }, main: { freebies } } = getState()
  const response = await manager.getFreebies(isConnected, freebies)
  dispatch({
    type: ACTION_GET_FREEBIES_SUCCESED,
    ...response
  })
}

export const getVideoAboutHorgos = () => async (dispatch, getState) => {
  const { network: { isConnected }, main: { videos } } = getState()
  const response = await manager.getVideoAboutHorgos(isConnected, videos)
  dispatch({
    type: ACTION_GET_VIDEOS_SUCCESED,
    ...response
  })
}

export const getSliders = () => async (dispatch, getState) => {
  const { network: { isConnected }, main: { sliders } } = getState()
  const response = await manager.getSliders(isConnected, sliders)
  dispatch({
    type: ACTION_GET_SLIDERS_SUCCESED,
    ...response
  })
}