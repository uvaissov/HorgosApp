import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'
import { composeWithDevTools } from 'redux-devtools-extension'
import ReduxThunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from '../reducers'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'favorite']
}

const logger = createLogger({
  collapsed: (getState, action, logEntry) => !logEntry.error
})

const persistedReducer = persistReducer(persistConfig, rootReducer)
const middleware = composeWithDevTools(applyMiddleware(ReduxThunk, logger))
export default () => {
  const store = createStore(persistedReducer, middleware)
  const persistor = persistStore(store)

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      // This fetch the new state of the above reducers.
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(persistReducer(persistConfig, nextRootReducer))
    })
  }

  return { store, persistor }
}
