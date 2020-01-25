import * as manager from '../../../service/manager'

import {
  ACTION_GET_REVIEWS_FINISH,
  ACTION_GET_REVIEWS_START
} from './types'

export const getReviewsAbout = () => async (dispatch, getState) => {
  const { network: { isConnected }, reviews: { list } } = getState()
  dispatch({ type: ACTION_GET_REVIEWS_START })
  const response = await manager.getReviewsAbout(isConnected, list)
  dispatch({
    type: ACTION_GET_REVIEWS_FINISH,
    ...response
  })
}
