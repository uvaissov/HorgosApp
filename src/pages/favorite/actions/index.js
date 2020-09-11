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
  let { payload } = await manager.getFavorite(isConnected, token, list)
  if (isConnected && token) {
    await Promise.all(addArray.map(el => {
      const index = _.findIndex(payload, (l) => l.id === el.id)
      if (index === -1) {
        manager.addFav(isConnected, token, el.id)
        payload = [...payload, el]
      }
      return true
    }))
    await Promise.all(remArray.map(el => {
      const index = _.findIndex(payload, (l) => l.id === el.id)
      if (index && index > -1) {
        manager.delFav(isConnected, token, el.id)
        payload = [...payload.splise(index, 1)]
      }
      return true
    }))
    addArray = []
    remArray = []
  }

  const trading_houses = []
  const ids = _.orderBy(payload.concat(addArray), ['id'], ['asc']).map(el => {
    const { trading_house_id, trading_house_name } = el
    const [house = {}] = el.trading_houses
    const obj = { trading_house_id, trading_house_name, items: [], translation: house.translation }
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
