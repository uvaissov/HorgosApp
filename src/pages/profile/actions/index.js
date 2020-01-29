import * as manager from '../../../service/manager'

import {
  ACTION_GET_PROFILE_FINISH,
  ACTION_GET_PROFILE_START
} from './types'

export const getMaps = () => async (dispatch, getState) => {
  const { network: { isConnected }, maps: { list } } = getState()
  dispatch({ type: ACTION_GET_PROFILE_START })
  const response = await manager.getMaps(isConnected, list)
  dispatch({
    type: ACTION_GET_PROFILE_FINISH,
    ...response
  })
}
