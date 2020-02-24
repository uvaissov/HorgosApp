import React, { Component } from 'react'
import { StyleSheet, View, InteractionManager, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native'
import ImagePicker from 'react-native-image-picker'
import FastImage from 'react-native-fast-image'
import { connect } from 'react-redux'
import _ from 'lodash'
import { HeaderUI, FooterUI } from '../../components/ui/view'
import { WHITE, normalize, BORDER_COLOR, GRAY_SECOND, MAIN_COLOR, isEmptyString, alertApp } from '../../constants/global'
import CustomStatusBar from '../../components/CustomStatusBar'
import Loader from '../../components/Loader'
import { ButtonGradient } from '../../components/ui/kit/ButtonGradient'
import { getUser } from './actions'
import * as manager from '../../service/manager'


const styles = StyleSheet.create({
  view: { backgroundColor: WHITE, flex: 1 },
  body: { flex: 1, marginHorizontal: 15 },
  avatar: { height: 120, width: 120, borderRadius: 60 },
  text: { fontSize: normalize(12), margin: 0, padding: 0 },
  textView: { borderWidth: 1, borderRadius: 5, borderColor: BORDER_COLOR, paddingLeft: 10, marginBottom: 15, paddingVertical: 10 }
})

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      didFinishInitialAnimation: false,
      name: props.name,
      email: props.email,
      avatar: props.avatar,
      password: null,
      passwordConfirm: null,
      updated: false
    }
  }


  componentDidMount = () => {
    InteractionManager.runAfterInteractions(() => {
      setTimeout(() => this.setState({ didFinishInitialAnimation: true }), 0)
    })
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.updated === false && this.state.updated === true) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        name: this.props.name,
        email: this.props.email,
        avatar: this.props.avatar,
        password: null,
        passwordConfirm: null,
        isLoading: this.props.isLoading,
        updated: false
      })
    }
  }

  selectPhoto = () => {
    // More info on all the options is below in the API Reference... just some common use cases shown here
    const options = {
      title: 'Выбор фото для профайла',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    }
    ImagePicker.showImagePicker(options, (response) => {
      //console.log('Response = ', response)
      if (response.didCancel) {
        //console.log('User cancelled image picker')
      } else if (response.error) {
        //console.log('ImagePicker Error: ', response.error)
      } else if (response.customButton) {
        //console.log('User tapped custom button: ', response.customButton)
      } else {
        this.setState({
          avatar: response
        })
      }
    })
  }

  onPress = async () => {
    const { name, email, password, passwordConfirm, avatar } = this.state
    const { token } = this.props
    if (isEmptyString(name)) {
      alertApp('Внимание', 'Необходимо указать имя')
    } else if (isEmptyString(email)) {
      alertApp('Внимание', 'Необходимо указать почту')
    } else if ((!isEmptyString(password) || isEmptyString(passwordConfirm)) && password !== passwordConfirm) {
      alertApp('Внимание', 'Пароль и подтверждение пароля должны совпадать')
    } else {
      try {
        this.setState({ isLoading: true })
        const { errors, data, message } = await manager.doUpdateProfile(true, token, name, email, password, passwordConfirm, avatar)
        if (!_.isEmpty(errors)) {
          const values = _.values(errors)
          let messageText = ''
          values.map((row) => row.map((inner) => messageText += `${inner}\n`))
          alertApp('Внимание', messageText)
        } else if (!isEmptyString(data) && data === 'Updated') {
          this.setState({ password: null, passwordConfirm: null })
          await this.props.getUser()
          this.setState({ updated: true })
          alertApp('Спасибо', 'Данные успешно изменены')
        } else if (!isEmptyString(message)) {
          alertApp('Внимание', message)
        }
      } catch {
        this.setState({ isLoading: false })
      }
    }
  }

  init = () => {
    const { didFinishInitialAnimation, name, avatar, email, password, passwordConfirm, isLoading } = this.state
    if (didFinishInitialAnimation === false || isLoading === true) {
      return <Loader />
    }

    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 25 }}>
          <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={() => this.selectPhoto()}>
            <FastImage
              style={styles.avatar}
              resizeMode={FastImage.resizeMode.cover}
              source={avatar}
            />
            <Text style={{ marginVertical: 20, color: MAIN_COLOR }}>Изменить</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.textView}>
          <TextInput style={styles.text} value={name} textContentType="name" onChangeText={(el) => this.setState({ name: el })} placeholder="Имя" placeholderTextColor={GRAY_SECOND} />
        </View>
        <View style={styles.textView}>
          <TextInput style={styles.text} value={email} textContentType="emailAddress" onChangeText={(el) => this.setState({ email: el })} placeholder="E-Mail" placeholderTextColor={GRAY_SECOND} />
        </View>
        <View style={styles.textView}>
          <TextInput style={styles.text} value={password} secureTextEntry textContentType="password" onChangeText={(el) => this.setState({ password: el })} placeholder="Новый пароль" placeholderTextColor={GRAY_SECOND} />
        </View>
        <View style={styles.textView}>
          <TextInput style={styles.text} value={passwordConfirm} secureTextEntry textContentType="password" onChangeText={(el) => this.setState({ passwordConfirm: el })} placeholder="Повторите новый пароль" placeholderTextColor={GRAY_SECOND} />
        </View>
        <ButtonGradient title="Сохранить" onPress={() => this.onPress()} />
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

const mapStateToProps = state => ({
  name: state.profile.name,
  email: state.profile.email,
  avatar: state.profile.avatar,
  isLoading: state.profile.isLoading,
  token: state.auth.token
})
export default connect(mapStateToProps, { getUser })(Profile)
