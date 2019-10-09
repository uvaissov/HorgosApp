import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'


class Main extends Component {
  render() {
    const { isLoading } = this.props
    if (isLoading === true) {
      return null
    }
    return (
      <View>
        <Text>Main</Text>
      </View>
    )
  }
}

const mapStateToProps = state => {
  console.log('main')
  return {
    isLoading: state.main.isLoading
  }
}

export default connect(mapStateToProps, { })(Main)
