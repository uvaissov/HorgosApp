import {
  ACTION_GET_CATEGORY_FINISH,
  ACTION_GET_CATEGORY_START
} from '../actions/types'

const initialState = {
  list: [],
  populare: [],
  isLoading: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION_GET_CATEGORY_FINISH: {
      return {
        ...state,
        ...action.payload,
        isLoading: false
      }
    }
    case ACTION_GET_CATEGORY_START: {
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
