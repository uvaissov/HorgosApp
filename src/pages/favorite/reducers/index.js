import {
  ACTION_GET_FAVORITE_FINISH,
  ACTION_GET_FAVORITE_START
} from '../actions/types'
import { ACTION_LOGOUT_SUCCESS } from '../../auth/types'

const initialState = {
  list: [],
  remove: [],
  add: [],
  trading_houses: [],
  ids: [],
  isLoading: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION_GET_FAVORITE_FINISH: {
      return {
        ...state,
        list: action.payload.list,
        add: action.payload.add,
        remove: action.payload.remove,
        trading_houses: action.payload.trading_houses,
        ids: action.payload.ids,
        isLoading: false
      }
    }
    case ACTION_GET_FAVORITE_START: {
      return {
        ...state,
        isLoading: true
      }
    }
    case ACTION_LOGOUT_SUCCESS: {
      return {
        ...state,
        list: [],
        remove: [],
        add: [],
        trading_houses: [],
        ids: []
      }
    }
    default: {
      return state
    }
  }
}
