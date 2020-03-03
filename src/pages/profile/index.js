import React, { Component } from 'react'
import { StyleSheet, View, InteractionManager, ScrollView, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import ImagePicker from 'react-native-image-picker'
import FastImage from 'react-native-fast-image'
import { connect } from 'react-redux'
import _ from 'lodash'
import { HeaderUI, FooterUI } from '../../components/ui/view'
import { WHITE, normalize, BORDER_COLOR, GRAY_SECOND, MAIN_COLOR, isEmptyString, alertApp, BLACK } from '../../constants/global'
import CustomStatusBar from '../../components/CustomStatusBar'
import Loader from '../../components/Loader'
import { ButtonGradient } from '../../components/ui/kit/ButtonGradient'
import { getUser } from './actions'
import * as manager from '../../service/manager'
import { strings } from '../../service/Locale'


const styles = StyleSheet.create({
  view: { backgroundColor: WHITE, flex: 1 },
  body: { flex: 1, marginHorizontal: 15 },
  avatar: { height: 120, width: 120, borderRadius: 60 },
  text: { fontSize: normalize(12), margin: 0, padding: 0, color: BLACK },
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
      title: strings('profile.choice'),
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
      alertApp(strings('message.warning'), strings('message.nameNotEmpty'))
    } else if (isEmptyString(email)) {
      alertApp(strings('message.warning'), strings('message.emailNotEmpty'))
    } else if ((!isEmptyString(password) || isEmptyString(passwordConfirm)) && password !== passwordConfirm) {
      alertApp(strings('message.warning'), strings('auth.passwordEqConfirm'))
    } else {
      try {
        this.setState({ isLoading: true })
        const { errors, data, message } = await manager.doUpdateProfile(true, token, name, email, password, passwordConfirm, avatar)
        if (!_.isEmpty(errors)) {
          const values = _.values(errors)
          let messageText = ''
          values.map((row) => row.map((inner) => messageText += `${inner}\n`))
          alertApp(strings('message.warning'), messageText)
        } else if (!isEmptyString(data) && data === 'Updated') {
          this.setState({ password: null, passwordConfirm: null })
          await this.props.getUser()
          this.setState({ updated: true })
          alertApp(strings('message.thank'), strings('auth.editSuccess'))
        } else if (!isEmptyString(message)) {
          alertApp(strings('message.warning'), message)
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
    const behavior = Platform.OS === 'ios' ? 'position' : ''
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView behavior={behavior} enabled style={{ flex: 1 }}>
          <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 25 }}>
            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={() => this.selectPhoto()}>
              <FastImage
                style={styles.avatar}
                resizeMode={FastImage.resizeMode.cover}
                source={avatar}
              />
              <Text style={{ marginVertical: 20, color: MAIN_COLOR }}>{strings('auth.edit')}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.textView}>
            <TextInput style={styles.text} value={name} textContentType="name" onChangeText={(el) => this.setState({ name: el })} placeholder={strings('auth.name')} placeholderTextColor={GRAY_SECOND} />
          </View>
          <View style={styles.textView}>
            <TextInput style={styles.text} value={email} textContentType="emailAddress" onChangeText={(el) => this.setState({ email: el })} placeholder={strings('auth.email')} placeholderTextColor={GRAY_SECOND} />
          </View>
          <View style={styles.textView}>
            <TextInput style={styles.text} value={password} secureTextEntry textContentType="password" onChangeText={(el) => this.setState({ password: el })} placeholder={strings('auth.newPassword')} placeholderTextColor={GRAY_SECOND} />
          </View>
          <View style={styles.textView}>
            <TextInput style={styles.text} value={passwordConfirm} secureTextEntry textContentType="password" onChangeText={(el) => this.setState({ passwordConfirm: el })} placeholder={strings('auth.confirmNewPassword')} placeholderTextColor={GRAY_SECOND} />
          </View>
          <ButtonGradient title={strings('auth.save')} onPress={() => this.onPress()} />
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }

  render() {
    const { navigation } = this.props
    return (
      <View style={[styles.view]}>
        <CustomStatusBar backgroundColor={WHITE} barStyle="dark-content" />
        <HeaderUI text={strings('menu.profile')} leftIcon="menu" leftOnPress={() => navigation.openDrawer()} withSearch={false} />
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
