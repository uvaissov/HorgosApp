/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/state-in-constructor */
import React from 'react'
import { PixelRatio } from 'react-native'
import YouTube from 'react-native-youtube'
import { withNavigationFocus } from 'react-navigation'
//import { w } from '../../../constants/global'


class YTPlayer extends React.Component {
  state = {
    //height: ((Dimensions.get('window').width / 16) * 9) + 1
    key: `youtube${Math.random()}`
  }

  changeFullScreen = () => {
    //setTimeout(() => this.setState({ width: w - 100, height: 209, margin: 0 }), 500)
  }

  render() {
    const { key } = this.state
    const { id, containerWidth } = this.props
    console.log('containerWidth', containerWidth, id)
    return (
      <YouTube
        key={key}
        controls={1}
        apiKey="AIzaSyCjLofUnRphhjlhKQ0BCzuU86F7VLCTj00"
        videoId={id}
        resumePlayAndroid={false}
        style={{
          alignSelf: 'stretch',
          height: PixelRatio.roundToNearestPixel(containerWidth / (16 / 9)) - 1,
          backgroundColor: 'black',
          zIndex: 1000
        }}
        onError={e => console.log('youtube error->', e)}
        onReady={this.changeFullScreen}
        fullscreen={false}
        onChangeState={this.changeFullScreen}
        onChangeFullscreen={this.changeFullScreen}
      />
    )
  }
}
const Player = ({ id, containerWidth, isFocused }) => {
  if (isFocused) return <YTPlayer id={id} containerWidth={containerWidth} />
  return null
}
export default withNavigationFocus(Player)