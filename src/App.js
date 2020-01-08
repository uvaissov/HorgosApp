import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import configureStore from './store'
import AppContainer from './pages/ScreeenManager'

const { store, persistor } = configureStore()

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppContainer />
    </PersistGate>
  </Provider>
)

export default App
