import React, { useState } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import nextId from 'react-id-generator'
import YTPlayer from '../component/YTPlayer'

import { BlockTitleAndButton } from '../../../components/ui/kit/BlockTitleAndButton'
import { w } from '../../../constants/global'

const styles = StyleSheet.create({
  container: { margin: 15 },
  view: { width: w - 30, flex: 1 },
  image: { height: (0.53 * (w - 30)), width: w - 30 }
})

const ScrollVideoWithTitle = (props) => {
  const { title, data } = props
  if (!data || data.length < 1) return null
  const [iscontainerMounted, setIsContainerMounted] = useState(false)
  const [containerWidth, setContainerWidth] = useState(0)
  return (
    <BlockTitleAndButton title={title}>
      <FlatList
        style={styles.scrollView}
        data={data}
        pagingEnabled
        renderItem={(el) => (
          <View style={styles.container}>
            <View
              style={styles.view}
              onLayout={({
                nativeEvent: { layout: { width } }
              }) => {
                if (containerWidth !== width) setContainerWidth(width)
                if (!iscontainerMounted) setIsContainerMounted(true)
                console.log('onLayout', width, containerWidth)
              }}
            >
              {
              iscontainerMounted && containerWidth > 0 &&
                <YTPlayer key={containerWidth} id={el.item.code} containerWidth={containerWidth} />
              }
            </View>
          </View>
        )}
        horizontal
        keyExtractor={() => nextId()}
        showsHorizontalScrollIndicator={false}
      />
    </BlockTitleAndButton>
  )
}


export { ScrollVideoWithTitle }
