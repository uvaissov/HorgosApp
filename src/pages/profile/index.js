/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react'
import { StyleSheet, View, InteractionManager, ScrollView, TextInput } from 'react-native'
//import _ from 'lodash'
import { HeaderUI, FooterUI } from '../../components/ui/view'
import { WHITE, normalize, BORDER_COLOR, GRAY_SECOND } from '../../constants/global'
import CustomStatusBar from '../../components/CustomStatusBar'
import Loader from '../../components/Loader'
import { ButtonGradient } from '../../components/ui/kit/ButtonGradient'

const styles = StyleSheet.create({
  view: { backgroundColor: WHITE, flex: 1 },
  body: { flex: 1, marginHorizontal: 15 },
  text: { fontSize: normalize(12), margin: 0, padding: 0 },
  textView: { borderWidth: 1, borderRadius: 5, borderColor: BORDER_COLOR, paddingLeft: 10, marginBottom: 15, paddingVertical: 10 }
})

class Profile extends Component {
  state = { didFinishInitialAnimation: false }

  componentDidMount = () => {
    InteractionManager.runAfterInteractions(() => {
      setTimeout(() => this.setState({ didFinishInitialAnimation: true }), 0)
    })
  }

  // onPress = async () => {
  //   if (isEmptyString(name)) {
  //     alertApp('Внимание', 'Необходимо указать имя')
  //   } else if (isEmptyString(email)) {
  //     alertApp('Внимание', 'Необходимо указать почту')
  //   } else if (isEmptyString(password)) {
  //     alertApp('Внимание', 'Необходимо указать пароль')
  //   } else if (isEmptyString(confPassword)) {
  //     alertApp('Внимание', 'Необходимо указать подтверждение пароля')
  //   } else if (password !== confPassword) {
  //     alertApp('Внимание', 'Пароль и подтверждение пароля должны совподать')
  //   } else {
  //     const { errors, id, message } = await manager.doRegistration(true, name, email, password, confPassword)
  //     if (!_.isEmpty(errors)) {
  //       const values = _.values(errors)
  //       let messageText = ''
  //       values.map((row) => row.map((inner) => messageText += `${inner}\n`))
  //       alertApp('Внимание', messageText)
  //     } else if (_.isNumber(id)) {
  //       alertApp('Спасибо', 'Регистрация прошла успешно')
  //         .then(() => {
  //           close()
  //           loginShow([email, password])
  //         })
  //     } else if (!isEmptyString(message)) {
  //       alertApp('Внимание', message)
  //     }
  //   }
  // }

  init = () => {
    const { didFinishInitialAnimation, name } = this.state
    if (didFinishInitialAnimation === false) {
      return <Loader />
    }

    return (
      <ScrollView>
        <View style={styles.textView}>
          <TextInput style={styles.text} value={name} secureTextEntry textContentType="name" onChangeText={(el) => this.setState({ name: el })} placeholder="Имя" placeholderTextColor={GRAY_SECOND} />
        </View>
        <View style={styles.textView}>
          <TextInput style={styles.text} value={name} secureTextEntry textContentType="emailAddress" onChangeText={(el) => this.setState({ name: el })} placeholder="E-Mail" placeholderTextColor={GRAY_SECOND} />
        </View>
        <View style={styles.textView}>
          <TextInput style={styles.text} value={name} secureTextEntry textContentType="password" onChangeText={(el) => this.setState({ name: el })} placeholder="Новый пароль" placeholderTextColor={GRAY_SECOND} />
        </View>
        <View style={styles.textView}>
          <TextInput style={styles.text} value={name} secureTextEntry textContentType="password" onChangeText={(el) => this.setState({ name: el })} placeholder="Повторите новый пароль" placeholderTextColor={GRAY_SECOND} />
        </View>
        <ButtonGradient title="Сохранить" onPress={() => {}} />
      </ScrollView>
    )
  }

  render() {
    const { navigation } = this.props
    return (
      <View style={[styles.view]}>
        <CustomStatusBar backgroundColor={WHITE} barStyle="dark-content" />
        <HeaderUI text="Личный кабинет" leftIcon="menu" leftOnPress={() => navigation.openDrawer()} withSearch={false} />
        <View style={styles.body}>
          {this.init()}
        </View>
        <FooterUI navigation={navigation} />
      </View>
    )
  }
}

export default Profile
