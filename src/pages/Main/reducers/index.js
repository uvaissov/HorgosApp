import {
  ACTION_GET_CATEGORIOS_SUCCESED,
  ACTION_GET_CATEGORIOS_STARTED,
  ACTION_GET_CATEGORIOS_FAILED
} from '../types'

const initialState = {
  isLoading: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION_GET_CATEGORIOS_SUCCESED: {
      return {
        ...state,
        categories: action.payload,
        isLoading: false
      }
    }
    case ACTION_GET_CATEGORIOS_STARTED: {
      return {
        ...state,
        isLoading: true
      }
    }
    case ACTION_GET_CATEGORIOS_FAILED: {
      return {
        ...state,
        isLoading: false
      }
    }
    default: {
      return state
    }
  }
}
