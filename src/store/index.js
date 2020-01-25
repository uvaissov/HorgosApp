import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createNetworkMiddleware, offlineActionCreators, checkInternetConnection } from 'react-native-offline'
import ReduxThunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from '../reducers'

const networkMiddleware = createNetworkMiddleware()

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['network']
}

const logger = createLogger({
  collapsed: (getState, action, logEntry) => !logEntry.error
})

const persistedReducer = persistReducer(persistConfig, rootReducer)
const middleware = composeWithDevTools(applyMiddleware(ReduxThunk, logger, networkMiddleware))
export default (callback) => {
  const store = createStore(persistedReducer, middleware)
  const { connectionChange } = offlineActionCreators
  const persistor = persistStore(store, null, () => {
    // After rehydration completes, we detect initial connection
    checkInternetConnection().then(isConnected => {
      store.dispatch(connectionChange(isConnected))
      callback() // Notify our root component we are good to go, so that we can render our app
    })
  })

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      // This fetch the new state of the above reducers.
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(persistReducer(persistConfig, nextRootReducer))
    })
  }

  return { store, persistor }
}
