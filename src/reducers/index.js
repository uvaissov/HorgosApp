import { combineReducers } from 'redux'
import { reducer as network } from 'react-native-offline'
import mainReducer from '../pages/main/reducers'
import categoryReducer from '../pages/categories/reducers'
import reviewsReducer from '../pages/comments/reducers'
import postsReducer from '../pages/сouncils/reducers'
import helpReducer from '../pages/help/reducers'
import authReducer from '../pages/auth/reducers'
import favReducer from '../pages/favorite/reducers'
import mapsReducer from '../pages/map/reducers'
import profileReducer from '../pages/profile/reducers'

const reducers = combineReducers({
  main: mainReducer,
  category: categoryReducer,
  reviews: reviewsReducer,
  posts: postsReducer,
  help: helpReducer,
  auth: authReducer,
  favorites: favReducer,
  maps: mapsReducer,
  profile: profileReducer,
  network
})

export default reducers
