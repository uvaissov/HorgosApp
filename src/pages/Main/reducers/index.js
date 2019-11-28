import {
  ACTION_GET_RECOMENDED_SUCCESED
} from '../types'

const initialState = {
  recomended: [],
  token: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION_GET_RECOMENDED_SUCCESED: {
      return {
        ...state,
        recomended: action.payload
      }
    }
    default: {
      return state
    }
  }
}
