/* eslint-disable react/no-this-in-sfc */
import React, { useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import ViewMoreText from 'react-native-view-more-text'
import LinearGradient from 'react-native-linear-gradient'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { MaskGradient } from '../kit/MaskGradient'
import { BLACK, WHITE, normalize } from '../../../constants/global'

const styles = StyleSheet.create({
  view: { },
  cardText: { fontSize: normalize(12), lineHeight: normalize(16) },
  linearGradient: { flex: 1 },
  titleView: { marginBottom: 15 },
  title: { color: BLACK, fontSize: normalize(16), fontWeight: 'bold' }
})

const Comment = ({ text }) => {
  const [isView, showView] = useState(false)

  this.renderViewMore = (onPress) => {
    showView(true)
    return (
      <TouchableOpacity onPress={onPress} style={{ height: 15, width: 75, marginTop: 10 }}><MaskGradient element={<Text>Подробнее</Text>} /></TouchableOpacity>
    )
  }

  this.renderViewLess = (onPress) => {
    showView(false)
    return (
      <TouchableOpacity onPress={onPress} style={{ height: 15, width: 75, marginTop: 10 }}><MaskGradient style={{ alignItems: 'flex-start' }} element={<Text>Скрыть</Text>} /></TouchableOpacity>
    )
  }

  return (
    <View style={styles.view}>
      <ViewMoreText
        numberOfLines={4}
        renderViewMore={this.renderViewMore}
        renderViewLess={this.renderViewLess}
        textStyle={styles.cardText}
      >
        <Text>
          {text }
        </Text>
      </ViewMoreText>
      {
        isView === true &&
        <View style={{ position: 'absolute', bottom: 25, height: 20, width: '100%' }}>
          <LinearGradient colors={[WHITE, 'rgba(255,255,255,0.3)']} style={styles.linearGradient} angle={360} locations={[0, 0.8]} useAngle start={{ x: 0, y: 0 }} end={{ x: 0, y: 0 }} />
        </View>
      }
    </View>
  )
}

export { Comment }
