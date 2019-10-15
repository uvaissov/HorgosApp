/* eslint-disable react/no-this-in-sfc */
import React, { useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import ViewMoreText from 'react-native-view-more-text'
//import { TouchableOpacity } from 'react-native-gesture-handler'
//import { WHITE, RED, GRAY_SECOND, ORANGE, normalize, w } from '../../../constants/global'


const styles = StyleSheet.create({
  view: { margin: 15, flexDirection: 'row', alignItems: 'center' },
  cardText: { fontSize: 12 }
})

const text = 'Сеть меховых салонов «IMPERIA furs» специализиру- ется на розничной и оптовой торговле меховыми изделиями в международном центре приграничного сотрудничества!'

const Description = () => {
  const [isView, showView] = useState(false)

  this.renderViewMore = (onPress) => {
    showView(true)
    return (
      <Text onPress={onPress}>View more</Text>
    )
  }

  this.renderViewLess = (onPress) => {
    showView(false)
    return (
      <Text onPress={onPress}>View less</Text>
    )
  }

  return (
    <View style={styles.view}>
      <ViewMoreText
        numberOfLines={3}
        renderViewMore={this.renderViewMore}
        renderViewLess={this.renderViewLess}
        //textStyle={{ textAlign: 'center' }}
      >
        <Text>
          {text }
        </Text>
      </ViewMoreText>
      {
        isView === true &&
        <View style={{ position: 'absolute', bottom: 15, height: 30, backgroundColor: 'rgba(0,0,0,0.5)' }} />
      }
    </View>
  )
}

export { Description }
