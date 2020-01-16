import {
  ACTION_GET_POSTS_FINISH,
  ACTION_GET_POSTS_START
} from '../actions/types'

const initialState = {
  list: [],
  isLoading: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION_GET_POSTS_FINISH: {
      return {
        ...state,
        list: action.payload,
        isLoading: false
      }
    }
    case ACTION_GET_POSTS_START: {
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
