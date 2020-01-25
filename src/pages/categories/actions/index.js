import * as manager from '../../../service/manager'

import {
  ACTION_GET_CATEGORY_FINISH,
  ACTION_GET_CATEGORY_START
} from './types'

export const getCategories = () => async (dispatch, getState) => {
  const { network: { isConnected }, category: { list, populare } } = getState()
  dispatch({ type: ACTION_GET_CATEGORY_START })
  const response = await manager.getCategories(isConnected, { list, populare })
  dispatch({
    type: ACTION_GET_CATEGORY_FINISH,
    ...response
  })
}
