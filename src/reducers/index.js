import { combineReducers } from 'redux'
import mainReducer from '../pages/main/reducers'
import categoryReducer from '../pages/categories/reducers'

const reducers = combineReducers({
  main: mainReducer,
  category: categoryReducer
})

export default reducers
