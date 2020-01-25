import {
  ACTION_GET_FAVORITE_FINISH,
  ACTION_GET_FAVORITE_START
} from '../actions/types'

const initialState = {
  list: [],
  remove: [],
  add: [],
  isLoading: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION_GET_FAVORITE_FINISH: {
      return {
        ...state,
        list: action.payload,
        isLoading: false
      }
    }
    case ACTION_GET_FAVORITE_START: {
      return {
        ...state,
        isLoading: true
      }
    }
    default: {
      return state
    }
  }
}
