/* eslint-disable react/no-this-in-sfc */
import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import FastImage from 'react-native-fast-image'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Moment from 'moment'
import _ from 'lodash'
import { Comment } from './Comment'
import { ORANGE, normalize, BLACK, GRAY_SECOND, w } from '../../../constants/global'

const styles = StyleSheet.create({
  view: { marginBottom: 25 },
  headerView: { flexDirection: 'row', marginBottom: 5 },
  avatarView: { borderRadius: 100, overflow: 'hidden', margin: 5 },
  image: { width: 40, height: 40 },
  infoView: { marginLeft: 10, justifyContent: 'center' },
  nameAndStartView: { flexDirection: 'row', marginBottom: 5 },
  startsView: { flexDirection: 'row', alignItems: 'center', marginLeft: 13 },
  startStyle: { marginRight: 4 },
  nameText: { fontSize: normalize(12), color: BLACK, maxWidth: w * 0.5 },
  telText: { fontSize: normalize(10), color: GRAY_SECOND }
})


const Response = ({ index, name = '', rating = 0, date = '', text = '' }) => {
  const formateDate = Moment(date).format('DD.MM.YYYY HH:mm')
  return (

    <View style={[styles.view, { marginTop: index === 0 ? 15 : 0 }]}>
      <View style={styles.headerView}>
        <View style={styles.avatarView}>
          <FastImage source={require('../../../../resources/image/avatar.png')} style={[styles.image]} resizeMode={FastImage.resizeMode.cover} />
        </View>
        <View style={styles.infoView}>
          <View style={styles.nameAndStartView}>
            <Text style={styles.nameText} numberOfLines={1}>{_.isString(name) ? name.replace(/(?:\r\n|\r|\n)/g, '').replace(/(<([^>]+)>)/ig, '') : ''}</Text>
            <View style={styles.startsView}>{
              Array(5).fill().map((el, elIdx) => <FontAwesome key={_.uniqueId()} style={styles.startStyle} name="star" color={elIdx >= rating ? GRAY_SECOND : ORANGE} size={11} />)
              }
            </View>
          </View>
          <View><Text style={styles.telText}>{formateDate}</Text></View>
        </View>
      </View>
      <Comment text={_.isString(text) ? text.replace(/(?:\r\n|\r|\n)/g, '').replace(/(<([^>]+)>)/ig, '') : ''} />
    </View>
  )
}

export { Response }
