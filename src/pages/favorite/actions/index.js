import * as manager from '../../../service/manager'

import {
  ACTION_GET_FAVORITE_FINISH,
  ACTION_GET_FAVORITE_START
} from './types'

export const getFavorite = () => async (dispatch, getState) => {
  const { network: { isConnected }, favorites: { list }, auth: { token } } = getState()
  dispatch({ type: ACTION_GET_FAVORITE_START })
  const { payload } = await manager.getFavorite(isConnected, token, list)
  const trading_houses = []
  payload.map(el => {
    const { trading_house_id, trading_house_name } = el
    const obj = { trading_house_id, trading_house_name, items: [] }
    let element = trading_houses.find((dir) => dir.trading_house_id === trading_house_id)
    if (trading_house_id && !element) {
      trading_houses.push(obj)
      element = obj
    }
    if (element) {
      element.items = [...element.items, el]
    }
    return null
  })
  dispatch({
    type: ACTION_GET_FAVORITE_FINISH,
    payload: trading_houses
  })
}
