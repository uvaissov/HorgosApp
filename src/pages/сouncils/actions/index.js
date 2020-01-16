import * as manager from '../../../service/manager'

import {
  ACTION_GET_POSTS_FINISH,
  ACTION_GET_POSTS_START
} from './types'

export const getPosts = () => async dispatch => {
  dispatch({ type: ACTION_GET_POSTS_START })
  const response = await manager.getPosts(true)
  dispatch({
    type: ACTION_GET_POSTS_FINISH,
    ...response
  })
}
