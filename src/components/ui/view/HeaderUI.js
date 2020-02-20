import React, { useState, useRef } from 'react'
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Keyboard, ScrollView, TouchableWithoutFeedback } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import nextId from 'react-id-generator'
import { MaskGradient } from '../kit/MaskGradient'
import * as manager from '../../../service/manager'
import { WHITE, normalize, BLACK, isEmptyString, alertApp, GRAY, w, BORDER_COLOR, h } from '../../../constants/global'

const styles = StyleSheet.create({
  view: {
    backgroundColor: WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRadius: 5,
    paddingTop: 15
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
  text: { flex: 1, fontSize: normalize(13), color: BLACK, padding: 0 },
  viewStyle: {
    justifyContent: 'flex-start',
    position: 'relative',
    alignItems: 'flex-start'
  },
  touchContainer: {
    flex: 1,
    width: w,
    height: h,
    position: 'absolute',
    zIndex: 1,
    top: 65
  },
  resultContainer: {
    maxHeight: 220,
    width: w,
    backgroundColor: WHITE,
    padding: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)'
  }
})

let searchWaiting
const HeaderUI = ({ text: fromExport, placeHolder, leftIcon, leftOnPress, style, withSearch = true, fetchData, onChangeFilter, filter }) => {
  const input = useRef(null)
  const [text, setText] = useState(fromExport)
  const [showResults, setShowResults] = useState(false)
  const [data, setData] = useState([])
  const clickToIcon = () => {
    if (onChangeFilter) {
      input.current.focus()
      return
    }
    if (isEmptyString(text)) {
      return alertApp('Внимание', 'Необходимо указать фразу для поиска').then(() => input.current.focus())
    }
    Keyboard.dismiss()
    setShowResults(false)
    fetchData(text)
  }

  const handleSelectItem = (item) => {
    setText(item.item)
    fetchData(item.item)
    Keyboard.dismiss()
    setData([])
    setShowResults(false)
  }

  const fetchDataWord = async (inputValue) => {
    const dataRes = await manager.searchWord(true, inputValue)
    setData(dataRes)
  }
  const onEndEdit = async (el) => {
    if (!el || el.length < 3) {
      setShowResults(false)
      return
    }

    if (searchWaiting) {
      clearTimeout(searchWaiting)
    }
    searchWaiting = setTimeout(() => {
      searchWaiting = null
      fetchDataWord(el)
      setShowResults(true)
    }, 300)
  }
  const onChangeText = async (el) => {
    setText(el)
    onEndEdit(el)
  }

  const renderItem = (item) => {
    const name = item.item
    return (
      <View key={nextId()}>
        <TouchableOpacity onPress={() => handleSelectItem(item)}>
          <View style={{ flex: 1, flexDirection: 'row', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: BORDER_COLOR }}>
            <Text style={{ fontSize: normalize(14), fontWeight: '400' }}>{name}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  const renderText = () => {
    if (onChangeFilter) {
      return (<TextInput ref={input} value={filter} onChangeText={onChangeFilter} style={styles.text} placeholder={placeHolder} placeholderTextColor={GRAY} returnKeyType="search" />)
    }
    if (withSearch) {
      return (<TextInput onBlur={() => setShowResults(false)} onFocus={() => setShowResults(true)} ref={input} value={text} onChangeText={onChangeText} style={styles.text} placeholder={placeHolder} placeholderTextColor={GRAY} returnKeyType="search" onSubmitEditing={() => clickToIcon()} />)
    }
    return (
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text}>{text || 'Каталог бутиков'}</Text>
    )
  }

  return (
    <View style={[styles.viewStyle]}>
      <View style={[styles.view, style]}>
        <TouchableOpacity hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }} style={styles.menu} onPress={() => leftOnPress()}><MaskGradient element={<Feather name={leftIcon} size={23} />} /></TouchableOpacity>
        {renderText()}
        {
          withSearch &&
          <View style={styles.rightView}>
            <TouchableOpacity onPress={() => clickToIcon()} style={styles.search}><MaskGradient element={<Feather name="search" size={20} />} /></TouchableOpacity>
          </View>
        }
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


export { HeaderUI }
