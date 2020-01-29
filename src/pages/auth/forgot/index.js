import React, { useState } from 'react'
import { View, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native'
import _ from 'lodash'
import Feather from 'react-native-vector-icons/Feather'
import { ButtonGradient } from '../../../components/ui/kit/ButtonGradient'
import { WHITE, normalize, BORDER_COLOR, GRAY_SECOND, BLACK, isEmptyString, alertApp, GRAY } from '../../../constants/global'
import * as manager from '../../../service/manager'

const styles = StyleSheet.create({
  view: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  body: { backgroundColor: WHITE, width: '80%', opacity: 1, borderRadius: 10 },
  content: { margin: 15 },
  header: { marginBottom: 20, flexDirection: 'row' },
  headerText: { fontSize: normalize(16), fontWeight: 'bold', color: BLACK },
  text: { fontSize: normalize(12), margin: 0, padding: 0 },
  textView: { borderWidth: 1, borderRadius: 5, borderColor: BORDER_COLOR, paddingLeft: 10, marginBottom: 15, paddingVertical: 10 }
})

const ForgotView = ({ close, loginShow }) => {
  const [mail, setMail] = useState(null)
  const loginPress = async () => {
    if (isEmptyString(mail)) {
      alertApp('Alert', '1')
    } else {
      const { errors, data, message } = await manager.doForget(true, mail)
      if (!_.isEmpty(errors)) {
        const values = _.values(errors)
        let messageText = ''
        values.map((row) => row.map((inner) => messageText += `${inner}\n`))
        alertApp('Внимание', messageText)
      } else if (!isEmptyString(data) && data === 'Link created') {
        alertApp('Внимание', 'Заявка на восстановление пароля успешно отправлена').then(() => {
          close()
        })
      } else if (!isEmptyString(message)) {
        alertApp('Внимание', message)
      }
    }
  }
  return (
    <View style={[styles.view]}>
      <View style={styles.body}>
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={{ flex: 1 }}>
              <Text style={styles.headerText}>Забыли пароль?</Text>
            </View>
            <View style={{ marginHorizontal: 10 }}>
              <TouchableOpacity onPress={() => close()}>
                <Feather name="x" color={BLACK} size={22} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.textView}>
            <TextInput style={styles.text} value={mail} onChangeText={(el) => setMail(el)} keyboardType="email-address" textContentType="emailAddress" placeholder="E-mail" placeholderTextColor={GRAY_SECOND} returnKeyType="done" blurOnSubmit={false} onSubmitEditing={() => loginPress()} />
          </View>
          <ButtonGradient title="Отправить запрос" onPress={() => loginPress()} />
          <View style={{ alignItems: 'center', marginTop: 25 }}>
            <TouchableOpacity onPress={() => {
              close()
              loginShow()
            }}
            >
              <Text style={{ marginBottom: 10, color: GRAY }}>Отмена</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}


export default ForgotView
