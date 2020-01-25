import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ReduxNetworkProvider } from 'react-native-offline'
import configureStore from './store'
import AppContainer from './pages/ScreeenManager'


class App extends Component {
  constructor(props) {
    super(props)
    const { store, persistor } = configureStore(() => {
      this.setState({ isLoading: false })
    })

    this.state = {
      isLoading: true,
      store,
      persistor
    }
  }

  render() {
    if (this.state.isLoading === true) return null

    return (
      <Provider store={this.state.store}>
        <PersistGate loading={null} persistor={this.state.persistor}>
          <ReduxNetworkProvider>
            <AppContainer />
          </ReduxNetworkProvider>
        </PersistGate>
      </Provider>
    )
  }
}

export default App
