import * as manager from '../../../service/manager'

import {
  ACTION_GET_CATEGORY_FINISH,
  ACTION_GET_CATEGORY_START
} from './types'

export const getCategories = () => async dispatch => {
  dispatch({ type: ACTION_GET_CATEGORY_START })
  const response = await manager.getCategories(true)
  dispatch({
    type: ACTION_GET_CATEGORY_FINISH,
    ...response
  })
}
