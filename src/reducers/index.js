import { combineReducers } from 'redux'
import mainReducer from '../pages/main/reducers'
import categoryReducer from '../pages/categories/reducers'
import reviewsReducer from '../pages/comments/reducers'
import postsReducer from '../pages/сouncils/reducers'
import helpReducer from '../pages/help/reducers'
import authReducer from '../pages/auth/reducers'

const reducers = combineReducers({
  main: mainReducer,
  category: categoryReducer,
  reviews: reviewsReducer,
  posts: postsReducer,
  help: helpReducer,
  auth: authReducer
})

export default reducers
