import React, { useState } from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import { BlockTitleAndButton } from '../../../components/ui/kit/BlockTitleAndButton'
import { ButtonGradient } from '../../../components/ui/kit/ButtonGradient'
import { normalize, BORDER_COLOR, GRAY_SECOND, alertApp } from '../../../constants/global'
import * as manager from '../../../service/manager'

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
      return alertApp('Внимание', 'Отсутсвует соединение с сетью')
    }
    if (_.isEmpty(text)) {
      return alertApp('Внимание', 'Перед отправкой сообщения необходимо заполнить тектовое поле')
    }
    const { payload: { id, title: titleResponse }, error } = await manager.addHelp(true, text)
    if (error) {
      alertApp('Внимание', 'Произошла ошибка при передаче сообщения, повторите попытку позже')
    }
    if (id) {
      alertApp('Спасибо', `Мы приняли вашу заявку с сообщением "${titleResponse}"`).then(() => {
        setText(null)
      })
    }
  }


  return (
    <BlockTitleAndButton onPress={onPress} title={title}>
      <View style={styles.view}>
        <View style={styles.textView}>
          <TextInput style={{ textAlignVertical: 'top', marginVertical: 15, marginHorizontal: 10 }} value={text} onChangeText={(el) => setText(el)} numberOfLines={6} multiline placeholder="Оставляйте свои заявки на сайте http://mcps-khorgos.info" placeholderTextColor={GRAY_SECOND} />
        </View>
        <ButtonGradient title="Оставить заявку" onPress={() => sendHelp()} />
      </View>
    </BlockTitleAndButton>
  )
}


export { RequestView }
