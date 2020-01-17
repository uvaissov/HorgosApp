import {
  ACTION_LOGIN_SUCCESS,
  ACTION_LOGOUT_SUCCESS
} from '../types'

const initialState = {
  token: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION_LOGIN_SUCCESS: {
      return {
        ...state,
        token: action.payload
      }
    }
    case ACTION_LOGOUT_SUCCESS: {
      return {
        ...state,
        token: null
      }
    }
    default: {
      return state
    }
  }
}
