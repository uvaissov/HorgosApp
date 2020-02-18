import React, { useState } from 'react'
import { View, StyleSheet, TextInput, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import Share from 'react-native-share'
import nextId from 'react-id-generator'
import { MaskGradient } from '../../../components/ui/kit/MaskGradient'
import * as manager from '../../../service/manager'
import { BG_COLOR_HEADER, normalize, hostName, isEmptyString, alertApp, w, WHITE, h, BORDER_COLOR } from '../../../constants/global'
import { BY_SEARCH_TEXT } from '../../../constants/static'

let searchWaiting
const styles = StyleSheet.create({
  viewStyle: {
    justifyContent: 'flex-start',
    position: 'relative',
    alignItems: 'flex-start'
  },
  view: {
    backgroundColor: BG_COLOR_HEADER,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRadius: 5
    //zIndex: 10
  },
  menu: {
    paddingRight: 15,
    height: 40,
    width: 40
  },
  rightView: {
    flexDirection: 'row', width: 60, height: 40, justifyContent: 'space-around'
  },
  search: {
    flex: 1
  },
  share: {
    flex: 1
  },
  touchView: {
    flex: 1,
    backgroundColor: 'red'
  },
  touchContainer: {
    flex: 1,
    width: w,
    height: h,
    position: 'absolute',
    //backgroundColor: 'red',
    zIndex: 15,
    top: 65
  },
  resultContainer: {
    //marginLeft: 50,
    //borderRadius: 4,
    maxHeight: 220,
    width: w,
    zIndex: 15,
    backgroundColor: WHITE,
    padding: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)'
  }
})

const Header = (props) => {
  const { placeHolder, navigation } = props
  const [text, setText] = useState(null)
  const [showResults, setShowResults] = useState(false)
  const [data, setData] = useState([])
  const share = () => {
    Share.open({
      title: 'Dai5.kz',
      message: 'Советую Dai5.kz',
      url: hostName
    })
      .then((res) => { console.log(res) })
      .catch((err) => { err && console.log(err) })
  }
  const pressToSearch = (value) => {
    if (isEmptyString(value || text)) {
      return alertApp('Внимание', 'Необходимо указать фразу для поиска')
    }
    navigation.push('BoutiqueList', { filter: BY_SEARCH_TEXT, text: value || text })
  }

  const handleSelectItem = (item) => {
    setText(item.item)
    setShowResults(false)
    pressToSearch(item.item)
  }

  const fetchData = async (inputValue) => {
    const dataRes = await manager.searchWord(true, inputValue)
    setData(dataRes)
  }
  const onEndEdit = async (el) => {
    if (!el || el.length < 3) return
    if (searchWaiting) {
      clearTimeout(searchWaiting)
    }
    searchWaiting = setTimeout(() => {
      searchWaiting = null
      fetchData(el)
    }, 300)
  }
  const onChangeText = async (el) => {
    setText(el)
    onEndEdit(el)
  }
  const renderItem = (item) => {
    const name = item.item
    return (
      <View key={nextId()} style={{ zIndex: 50 }}>
        <TouchableOpacity onPress={() => handleSelectItem(item)}>
          <View style={{ flex: 1, flexDirection: 'row', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: BORDER_COLOR }}>
            <Text style={{ fontSize: normalize(14), fontWeight: '400' }}>{name}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={[styles.viewStyle]}>
      <View style={[styles.view, props.style]}>
        <TouchableOpacity style={styles.menu} onPress={() => navigation.openDrawer()} hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}><MaskGradient element={<Feather name="menu" size={23} />} /></TouchableOpacity>
        <TextInput returnKeyType="search" onSubmitEditing={() => pressToSearch()} style={{ flex: 1, fontSize: normalize(14) }} placeholder={placeHolder} value={text} onChangeText={onChangeText} onFocus={() => setShowResults(true)} />
        <View style={styles.rightView}>
          <TouchableOpacity style={styles.search} onPress={() => pressToSearch()}><MaskGradient element={<Feather name="search" size={20} />} /></TouchableOpacity>
          <TouchableOpacity style={styles.share} onPress={() => share()}><MaskGradient element={<Feather name="share-2" size={20} />} /></TouchableOpacity>
        </View>
      </View>
      { showResults && data.length > 0 &&
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss()
            setShowResults(false)
          }}
          style={styles.touchView}
        >
          <View style={styles.touchContainer}>
            <View style={styles.resultContainer}>
              <ScrollView
                style={{ zIndex: 15 }}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="none"
                nestedScrollEnabled
                key={data.length}
                //data={data}
                //renderItem={renderItem}
                //keyExtractor={() => nextId()}
              >
                {
                  data.map(el => renderItem({ item: el }))
                }
              </ScrollView>
            </View>
          </View>
        </TouchableWithoutFeedback>}
    </View>
  )
}


export default Header
