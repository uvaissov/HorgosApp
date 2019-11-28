import * as manager from '../../../service/manager'
import * as transform from '../../../service/transform'

import {
  ACTION_GET_RECOMENDED_SUCCESED
} from '../types'

// export const setDateFrom = (date) => dispatch => {
//   dispatch({
//     type: CHANGE_DATE_FROM,
//     payload: date
//   })
//   return null
// }


export const getRecomended = () => async dispatch => {
  try {
    const { data } = await manager.getRecomended(true)
    const payload = data.map((el) => transform.toBoutique(el))
    dispatch({
      type: ACTION_GET_RECOMENDED_SUCCESED,
      payload
    })
  } catch (error) {
    dispatch({
      type: ACTION_GET_RECOMENDED_SUCCESED,
      payload: [],
      message: error
    })
  }
}
