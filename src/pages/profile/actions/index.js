import * as manager from '../../../service/manager'

import {
  ACTION_GET_PROFILE_FINISH,
  ACTION_GET_PROFILE_START
} from './types'

export const getUser = () => async (dispatch, getState) => {
  const { network: { isConnected }, auth: { token } } = getState()
  dispatch({ type: ACTION_GET_PROFILE_START })
  const data = await manager.getUser(isConnected, token)
  dispatch({
    type: ACTION_GET_PROFILE_FINISH,
    payload: data
  })
}
