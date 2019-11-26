import React from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import { BlockTitleAndButton } from '../../../components/ui/kit/BlockTitleAndButton'
import { ButtonGradient } from '../../../components/ui/kit/ButtonGradient'
import { normalize, BORDER_COLOR, GRAY_SECOND } from '../../../constants/global'

const styles = StyleSheet.create({
  view: { marginHorizontal: 15 },
  text: { fontSize: normalize(12), fontWeight: 'bold' },
  textView: { borderWidth: 1, borderRadius: 5, borderColor: BORDER_COLOR }
})

const RequestView = (props) => {
  const { onPress, title } = props
  return (
    <BlockTitleAndButton onPress={onPress} title={title}>
      <View style={styles.view}>
        <View style={styles.textView}>
          <TextInput style={{ textAlignVertical: 'top' }} numberOfLines={6} multiline placeholder="Оставляйте свои заявки на сайте http://mcps-khorgos.info" placeholderTextColor={GRAY_SECOND} />
        </View>
        <ButtonGradient title="Оставить заявку" />
      </View>
    </BlockTitleAndButton>
  )
}


export { RequestView }
