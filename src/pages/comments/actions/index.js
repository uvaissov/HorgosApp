import * as manager from '../../../service/manager'

import {
  ACTION_GET_REVIEWS_FINISH,
  ACTION_GET_REVIEWS_START
} from './types'

export const getReviewsAbout = () => async dispatch => {
  dispatch({ type: ACTION_GET_REVIEWS_START })
  const response = await manager.getReviewsAbout(true)
  dispatch({
    type: ACTION_GET_REVIEWS_FINISH,
    ...response
  })
}
