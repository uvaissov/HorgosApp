import React, { useState, useRef } from 'react'
import { View, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native'
import _ from 'lodash'
import { useDispatch, useSelector, connect } from 'react-redux'
import Feather from 'react-native-vector-icons/Feather'
import { ButtonGradient } from '../../../components/ui/kit/ButtonGradient'
import { WHITE, normalize, BORDER_COLOR, GRAY_SECOND, BLACK, isEmptyString, alertApp, MAIN_COLOR, GRAY } from '../../../constants/global'
import * as manager from '../../../service/manager'
import { ACTION_LOGIN_SUCCESS } from '../types'
import { ACTION_GET_PROFILE_FINISH } from '../../profile/actions/types'
import { getFavorite } from '../../favorite/actions'

const styles = StyleSheet.create({
  view: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  body: { backgroundColor: WHITE, width: '80%', opacity: 1, borderRadius: 10 },
  content: { margin: 15 },
  header: { marginBottom: 20, flexDirection: 'row' },
  headerText: { fontSize: normalize(16), fontWeight: 'bold', color: BLACK },
  text: { fontSize: normalize(12), margin: 0, padding: 0 },
  textView: { borderWidth: 1, borderRadius: 5, borderColor: BORDER_COLOR, paddingLeft: 10, marginBottom: 15, paddingVertical: 10 }
})

const LoginView = ({ close, regShow, forgetShow, param: [emailParam, passwordParam] = [], getFavorite: getFavoriteAction }) => {
  const [login, setLogin] = useState(emailParam)
  const [password, setPassword] = useState(passwordParam)
  const passwordInput = useRef(null)
  const isConnected = useSelector(state => state.network.isConnected)
  const dispatch = useDispatch()
  const loginPress = async () => {
    if (isEmptyString(login)) {
      alertApp('Внимание', 'Необходимо указать почту для авторизации')
    } else if (isEmptyString(password)) {
      alertApp('Внимание', 'Необходимо указать пароль для авторизации')
    } else {
      const { errors, access_token, message } = await manager.doLogin(true, login, password)
      if (!_.isEmpty(errors)) {
        const values = _.values(errors)
        let messageText = ''
        values.map((row) => row.map((inner) => messageText += `${inner}\n`))
        alertApp('Внимание', messageText)
      } else if (!isEmptyString(access_token)) {
        const data = await manager.getUser(isConnected, access_token)
        getFavoriteAction()
        dispatch({
          type: ACTION_LOGIN_SUCCESS,
          payload: access_token
        })
        dispatch({
          type: ACTION_GET_PROFILE_FINISH,
          payload: data
        })
        close()
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
              <Text style={styles.headerText}>Авторизация</Text>
            </View>
            <View style={{ marginHorizontal: 10 }}>
              <TouchableOpacity onPress={() => close()}>
                <Feather name="x" color={BLACK} size={22} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.textView}>
            <TextInput style={styles.text} value={login} onChangeText={(el) => setLogin(el)} keyboardType="email-address" textContentType="emailAddress" placeholder="E-mail" placeholderTextColor={GRAY_SECOND} returnKeyType="next" blurOnSubmit={false} onSubmitEditing={() => passwordInput.current.focus()} />
          </View>
          <View style={styles.textView}>
            <TextInput style={styles.text} ref={passwordInput} value={password} secureTextEntry textContentType="password" onChangeText={(el) => setPassword(el)} placeholder="Пароль" placeholderTextColor={GRAY_SECOND} returnKeyType="done" onSubmitEditing={() => loginPress()} />
          </View>
          <ButtonGradient title="Войти" onPress={() => loginPress()} />
          <View style={{ alignItems: 'center', marginTop: 25 }}>
            <TouchableOpacity onPress={() => {
              close()
              regShow()
            }}
            >
              <Text style={{ marginBottom: 40, color: MAIN_COLOR }}>Зарегистрироваться</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              close()
              forgetShow()
            }}
            >
              <Text style={{ marginBottom: 10, color: GRAY }}>Забыли пароль?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

const mapStateToProps = state => ({
  authToken: state.currentUser && state.currentUser.authToken,
  items: state.items
})

export default connect(mapStateToProps, { getFavorite })(LoginView)
// export default LoginView
