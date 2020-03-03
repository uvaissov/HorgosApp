import React, { useState } from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import { BlockTitleAndButton } from '../../../components/ui/kit/BlockTitleAndButton'
import { ButtonGradient } from '../../../components/ui/kit/ButtonGradient'
import { normalize, BORDER_COLOR, GRAY_SECOND, alertApp } from '../../../constants/global'
import * as manager from '../../../service/manager'
import { strings } from '../../../service/Locale'

const styles = StyleSheet.create({
  view: { marginHorizontal: 15 },
  text: { fontSize: normalize(12), fontWeight: 'bold' },
  textView: { borderWidth: 1, borderRadius: 5, borderColor: BORDER_COLOR }
})

const RequestView = (props) => {
  const [text, setText] = useState(null)
  const { onPress, title } = props
  const isConnected = useSelector(state => state.network.isConnected)
  const sendHelp = async () => {
    if (!isConnected) {
      return alertApp(strings('message.warning'), strings('message.networkOffline'))
    }
    if (_.isEmpty(text)) {
      return alertApp(strings('message.warning'), strings('help.textNotEmpty'))
    }
    const { payload: { id }, error } = await manager.addHelp(true, text)
    if (error) {
      alertApp(strings('message.warning'), strings('help.requestError'))
    }
    if (id) {
      alertApp(strings('message.thank'), strings('help.requestSuccess')).then(() => {
        setText(null)
      })
    }
  }


  return (
    <BlockTitleAndButton onPress={onPress} title={title}>
      <View style={styles.view}>
        <View style={styles.textView}>
          <TextInput style={{ textAlignVertical: 'top', marginVertical: 15, marginHorizontal: 10 }} value={text} onChangeText={(el) => setText(el)} numberOfLines={6} multiline placeholder={strings('help.helpPlaceHolder')} placeholderTextColor={GRAY_SECOND} />
        </View>
        <ButtonGradient title={strings('help.send')} onPress={() => sendHelp()} />
      </View>
    </BlockTitleAndButton>
  )
}


export { RequestView }
