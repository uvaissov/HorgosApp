import {
  ACTION_GET_MAPS_FINISH,
  ACTION_GET_MAPS_START
} from '../actions/types'

const initialState = {
  list: [],
  isLoading: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION_GET_MAPS_FINISH: {
      return {
        ...state,
        list: action.payload.images,
        isLoading: false
      }
    }
    case ACTION_GET_MAPS_START: {
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
