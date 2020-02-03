import _ from 'lodash'
import * as manager from '../../../service/manager'

import {
  ACTION_GET_FAVORITE_FINISH,
  ACTION_GET_FAVORITE_START
} from './types'

export const getFavorite = () => async (dispatch, getState) => {
  const { network: { isConnected }, favorites: { list = [], add = [], remove = [] }, auth: { token } } = getState()
  if (!token) return
  dispatch({ type: ACTION_GET_FAVORITE_START })
  let addArray = add
  let remArray = remove
  if (isConnected && token) {
    await Promise.all(addArray.map(el => manager.addFav(isConnected, token, el.id)))
    await Promise.all(remArray.map(el => manager.delFav(isConnected, token, el.id)))
    addArray = []
    remArray = []
  }
  const { payload } = await manager.getFavorite(isConnected, token, list)
  const trading_houses = []
  const ids = _.orderBy(payload.concat(addArray), ['id'], ['asc']).map(el => {
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
    return el.id
  })
  dispatch({
    type: ACTION_GET_FAVORITE_FINISH,
    payload: { trading_houses, list: payload, add: addArray, remove: remArray, ids }
  })
}
