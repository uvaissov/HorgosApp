import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { View, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native'
import _ from 'lodash'
import Feather from 'react-native-vector-icons/Feather'
import { AirbnbRating } from 'react-native-ratings'
import { ButtonGradient } from '../../../components/ui/kit/ButtonGradient'
import { WHITE, normalize, BORDER_COLOR, GRAY_SECOND, BLACK, isEmptyString, alertApp, ORANGE } from '../../../constants/global'
import * as manager from '../../../service/manager'

const styles = StyleSheet.create({
  view: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  body: { backgroundColor: WHITE, width: '80%', opacity: 1, borderRadius: 10 },
  content: { margin: 15 },
  header: { marginBottom: 20, flexDirection: 'row' },
  headerText: { fontSize: normalize(16), fontWeight: 'bold', color: BLACK },
  text: { fontSize: normalize(12), fontWeight: 'bold' },
  textView: { borderWidth: 1, borderRadius: 5, borderColor: BORDER_COLOR, paddingLeft: 10, marginBottom: 15 },
  raitingView: { marginBottom: 15 },
  textResponse: { fontSize: normalize(12), marginVertical: 15, marginHorizontal: 10 }
})

const AddResponse = ({ close }) => {
  const [text, setText] = useState(null)
  const [raiting, setRaiting] = useState(3)
  const isConnected = useSelector(state => state.network.isConnected)
  const onPress = async () => {
    if (isConnected === false) {
      alertApp('Внимание', 'Отсутствует соединение с сетью')
    } else if (isEmptyString(text)) {
      alertApp('Внимание', 'Необходимо заполнить текстовое поле')
    } else {
      const { errors, access_token, message } = await manager.doLogin(true, text)
      if (!_.isEmpty(errors)) {
        const values = _.values(errors)
        let messageText = ''
        values.map((row) => row.map((inner) => messageText += `${inner}\n`))
        alertApp('Внимание', messageText)
      } else if (!isEmptyString(access_token)) {
        alertApp('Спасибо', 'Ваш отзыв добавлен').then(() => {
          setRaiting(3)
          setText(null)
          close()
        })
      } else if (!isEmptyString(message)) {
        alertApp('Внимание', message)
      }
    }
  }

  const ratingCompleted = (rating) => {
    setRaiting(rating)
  }
  return (
    <View style={[styles.view]}>
      <View style={styles.body}>
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={{ flex: 1 }}>
              <Text style={styles.headerText}>Добавление отзыва</Text>
            </View>
            <View style={{ marginHorizontal: 10 }}>
              <TouchableOpacity onPress={() => close()}>
                <Feather name="x" color={BLACK} size={22} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.raitingView}>
            <AirbnbRating
              onFinishRating={ratingCompleted}
              defaultRating={raiting}
              showRating={false}
              selectedColor={ORANGE}
            />
          </View>
          <View style={styles.textView}>
            <TextInput multiline numberOfLines={3} style={styles.textResponse} value={text} onChangeText={(el) => setText(el)} placeholder="Ваш отзыв" placeholderTextColor={GRAY_SECOND} returnKeyType="next" blurOnSubmit={false} onSubmitEditing={() => onPress()} />
          </View>
          <ButtonGradient title="Отправить" onPress={() => onPress()} />
        </View>
      </View>
    </View>
  )
}


export { AddResponse }
