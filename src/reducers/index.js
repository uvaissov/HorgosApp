import { combineReducers } from 'redux'
import mainReducer from '../pages/main/reducers'
import categoryReducer from '../pages/categories/reducers'
import reviewsReducer from '../pages/comments/reducers'
import postsReducer from '../pages/сouncils/reducers'

const reducers = combineReducers({
  main: mainReducer,
  category: categoryReducer,
  reviews: reviewsReducer,
  posts: postsReducer
})

export default reducers
