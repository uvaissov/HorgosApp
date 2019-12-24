import * as manager from '../../../service/manager'

import {
  ACTION_GET_RECOMENDED_SUCCESED,
  ACTION_GET_SPECIAL_FOR_YOU_SUCCESED,
  ACTION_GET_CATEGORY_STOKS_SUCCESED,
  ACTION_GET_CUSTEMER_CHOICES_SUCCESED,
  ACTION_GET_STOCK_TODAY_SUCCESED,
  ACTION_GET_POPULAR_BOUTIQUES_SUCCESED
} from '../types'

export const getRecomended = () => async dispatch => {
  const response = await manager.getRecomended(true)
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

export const getCategoryStoks = () => async dispatch => {
  const response = await manager.getCategoryStoks(true)
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