import React, { useState, useRef } from 'react'
import { View, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native'
import _ from 'lodash'
import Feather from 'react-native-vector-icons/Feather'
import { ButtonGradient } from '../../../components/ui/kit/ButtonGradient'
import { WHITE, normalize, BORDER_COLOR, GRAY_SECOND, BLACK, isEmptyString, alertApp, GRAY } from '../../../constants/global'
import * as manager from '../../../service/manager'
import { strings } from '../../../service/Locale'

const styles = StyleSheet.create({
  view: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  body: { backgroundColor: WHITE, width: '80%', opacity: 1, borderRadius: 10 },
  content: { margin: 15 },
  header: { marginBottom: 20, flexDirection: 'row' },
  headerText: { fontSize: normalize(16), fontWeight: 'bold', color: BLACK },
  text: { fontSize: normalize(12), margin: 0, padding: 0, color: BLACK },
  textView: { borderWidth: 1, borderRadius: 5, borderColor: BORDER_COLOR, paddingLeft: 10, marginBottom: 15, paddingVertical: 10 }
})

const RegistrationView = ({ close, loginShow }) => {
  const [name, setName] = useState(null)
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [confPassword, setConfPassword] = useState(null)
  const mailInput = useRef(null)
  const passwordInput = useRef(null)
  const ConfPasswordInput = useRef(null)
  const onPress = async () => {
    if (isEmptyString(name)) {
      alertApp(strings('message.warning'), strings('message.nameNotEmpty'))
    } else if (isEmptyString(email)) {
      alertApp(strings('message.warning'), strings('message.emailNotEmpty'))
    } else if (isEmptyString(password)) {
      alertApp(strings('message.warning'), strings('message.passwordNotEmpty'))
    } else if (isEmptyString(confPassword)) {
      alertApp(strings('message.warning'), strings('message.confirmPasswordNotEmpty'))
    } else if (password !== confPassword) {
      alertApp(strings('message.warning'), strings('message.passwordEqConfirm'))
    } else {
      const { errors, id, message } = await manager.doRegistration(true, name, email, password, confPassword)
      if (!_.isEmpty(errors)) {
        const values = _.values(errors)
        let messageText = ''
        values.map((row) => row.map((inner) => messageText += `${inner}\n`))
        alertApp(strings('message.warning'), messageText)
      } else if (_.isNumber(id)) {
        alertApp(strings('message.thank'), strings('auth.registrationSuccess'))
          .then(() => {
            close()
            loginShow([email, password])
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
              <Text style={styles.headerText}>{strings('auth.registration')}</Text>
            </View>
            <View style={{ marginHorizontal: 10 }}>
              <TouchableOpacity onPress={() => close()}>
                <Feather name="x" color={BLACK} size={22} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.textView}>
            <TextInput style={styles.text} value={name} onChangeText={(el) => setName(el)} keyboardType="email-address" textContentType="emailAddress" placeholder={strings('auth.name')} placeholderTextColor={GRAY_SECOND} returnKeyType="next" blurOnSubmit={false} onSubmitEditing={() => mailInput.current.focus()} />
          </View>
          <View style={styles.textView}>
            <TextInput style={styles.text} value={email} onChangeText={(el) => setEmail(el)} keyboardType="email-address" textContentType="emailAddress" placeholder={strings('auth.email')} placeholderTextColor={GRAY_SECOND} returnKeyType="next" blurOnSubmit={false} onSubmitEditing={() => passwordInput.current.focus()} />
          </View>
          <View style={styles.textView}>
            <TextInput style={styles.text} ref={passwordInput} value={password} secureTextEntry textContentType="password" onChangeText={(el) => setPassword(el)} placeholder={strings('auth.password')} placeholderTextColor={GRAY_SECOND} returnKeyType="done" onSubmitEditing={() => ConfPasswordInput.current.focus()} />
          </View>
          <View style={styles.textView}>
            <TextInput style={styles.text} ref={ConfPasswordInput} value={confPassword} secureTextEntry textContentType="password" onChangeText={(el) => setConfPassword(el)} placeholder={strings('auth.confirmPassword')} placeholderTextColor={GRAY_SECOND} returnKeyType="done" onSubmitEditing={() => onPress()} />
          </View>
          <ButtonGradient title={strings('auth.registration')} onPress={() => onPress()} />
          <View style={{ alignItems: 'center', marginTop: 25 }}>
            <TouchableOpacity onPress={() => {
              close()
              loginShow()
            }}
            >
              <Text style={{ marginBottom: 10, color: GRAY }}>{strings('message.cancel')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}


export default RegistrationView
