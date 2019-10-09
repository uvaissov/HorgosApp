import { combineReducers } from 'redux'
import mainReducer from '../pages/main/reducers'

const reducers = combineReducers({
  main: mainReducer
})

export default reducers
