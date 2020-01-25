import * as manager from '../../../service/manager'

import {
  ACTION_GET_POSTS_FINISH,
  ACTION_GET_POSTS_START
} from './types'

export const getPosts = () => async (dispatch, getState) => {
  const { network: { isConnected }, posts: { list } } = getState()
  dispatch({ type: ACTION_GET_POSTS_START })
  const response = await manager.getPosts(isConnected, list)
  dispatch({
    type: ACTION_GET_POSTS_FINISH,
    ...response
  })
}
