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
  ACTION_GET_VIDEOS_SUCCESED
} from '../types'

export const getRecommended = () => async dispatch => {
  const response = await manager.getRecommended(true)
  dispatch({
    type: ACTION_GET_RECOMENDED_SUCCESED,
    ...response
  })
}

export const getSpecialForYou = () => async dispatch => {
  const response = await manager.getSpecialForYou(true)
  dispatch({
    type: ACTION_GET_SPECIAL_FOR_YOU_SUCCESED,
    ...response
  })
}

export const getCategoryStocks = () => async dispatch => {
  const response = await manager.getCategoryStocks(true)
  dispatch({
    type: ACTION_GET_CATEGORY_STOKS_SUCCESED,
    ...response
  })
}

export const getCustomerChoices = () => async dispatch => {
  const response = await manager.getCustomerChoices(true)
  dispatch({
    type: ACTION_GET_CUSTEMER_CHOICES_SUCCESED,
    ...response
  })
}

export const getStockToday = () => async dispatch => {
  const response = await manager.getStockToday(true)
  dispatch({
    type: ACTION_GET_STOCK_TODAY_SUCCESED,
    ...response
  })
}

export const getPopularBoutiques = () => async dispatch => {
  const response = await manager.getPopularBoutiques(true)
  dispatch({
    type: ACTION_GET_POPULAR_BOUTIQUES_SUCCESED,
    ...response
  })
}

export const getBestProducts = () => async dispatch => {
  const response = await manager.getBestProducts(true)
  dispatch({
    type: ACTION_GET_BEST_PRODUCTS_SUCCESED,
    ...response
  })
}

export const getFreebies = () => async dispatch => {
  const response = await manager.getFreebies(true)
  dispatch({
    type: ACTION_GET_FREEBIES_SUCCESED,
    ...response
  })
}

export const getVideoAboutHorgos = () => async dispatch => {
  const response = await manager.getVideoAboutHorgos(true)
  dispatch({
    type: ACTION_GET_VIDEOS_SUCCESED,
    ...response
  })
}