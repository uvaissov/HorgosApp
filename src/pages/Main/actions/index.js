import * as manager from '../../../service/manager'

import {
  ACTION_GET_RECOMENDED_SUCCESED
} from '../types'

export const getRecomended = () => async dispatch => {
  const response = await manager.getRecomended(true)
  dispatch({
    type: ACTION_GET_RECOMENDED_SUCCESED,
    ...response
  })
}
