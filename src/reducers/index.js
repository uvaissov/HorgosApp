import { combineReducers } from 'redux'
import mainReducer from '../pages/Main/reducers'

const reducers = combineReducers({
  main: mainReducer
})

export default reducers
