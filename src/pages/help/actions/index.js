import * as manager from '../../../service/manager'

import {
  ACTION_GET_HELP_FINISH,
  ACTION_GET_HELP_START
} from './types'

export const getHelp = () => async dispatch => {
  dispatch({ type: ACTION_GET_HELP_START })
  const response = await manager.getHelp(true)
  dispatch({
    type: ACTION_GET_HELP_FINISH,
    ...response
  })
}
