/* eslint-disable react/no-this-in-sfc */
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { BLACK, normalize } from '../../../constants/global'
import { Comment } from '../../../components/ui/view'
import { BlockTitleAndButton } from '../../../components/ui/kit/BlockTitleAndButton'

const styles = StyleSheet.create({
  view: { marginHorizontal: 15 },
  cardText: { fontSize: normalize(12), lineHeight: normalize(16) },
  linearGradient: { flex: 1 },
  titleView: { marginBottom: 15 },
  title: { color: BLACK, fontSize: normalize(16), fontWeight: 'bold' }
})

const Description = () => (
  <BlockTitleAndButton title="Описание магазина">
    <View style={styles.view}>
      <Comment />
    </View>
  </BlockTitleAndButton>
)

export { Description }
