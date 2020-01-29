import {
  ACTION_GET_PROFILE_START,
  ACTION_GET_PROFILE_FINISH
} from '../actions/types'

const initialState = {
  name: 'test',
  email: 'test@test.kf',
  avatar: require('../../../../resources/image/no_avatar.jpg'),
  isLoading: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION_GET_PROFILE_FINISH: {
      return {
        ...state,
        isLoading: false,
        ...action.payload
      }
    }
    case ACTION_GET_PROFILE_START: {
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
