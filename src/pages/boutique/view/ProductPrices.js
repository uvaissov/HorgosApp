import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
import { Col, Row, Grid } from 'react-native-easy-grid'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { normalize, GRAY_SECOND, BLACK, BORDER_COLOR, RED, GRAY } from '../../../constants/global'

const styles = StyleSheet.create({
  view: { margin: 15 },
  row: { flexDirection: 'row', flex: 1, alignItems: 'center' },
  nameText: { flex: 1, fontSize: normalize(12), color: GRAY_SECOND },
  valueText: { fontSize: normalize(10), color: GRAY, marginVertical: 5, marginHorizontal: 10, fontWeight: 'bold' },
  tdView: { flex: 1, alignItems: 'flex-end' },
  valueView: { backgroundColor: BORDER_COLOR, borderRadius: 5, alignItems: 'center', minWidth: 130 },
  titleView: { marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between' },
  title: { color: BLACK, fontSize: normalize(16), fontWeight: 'bold' },
  currencyView: { paddingVertical: 5, paddingHorizontal: 10, borderWidth: 1, borderRadius: 100, borderColor: BORDER_COLOR, flexDirection: 'row', alignItems: 'center' },
  currencyText: { marginRight: 25 }
})


const ProductPrices = ({ data }) => {
  if (!data) return null

  return (
    <View style={styles.view}>
      <View style={styles.titleView}>
        <Text style={styles.title}>Цены на товары</Text>
        <TouchableOpacity>
          <View style={styles.currencyView}>
            <Text style={styles.currencyText}>₸ KZT</Text>
            <Feather name="chevron-down" color={GRAY_SECOND} size={15} />
          </View>
        </TouchableOpacity>
      </View>
      <Grid>
        {
          data.map((item) => {
            const { name, value } = item
            return (
              <Row style={{ marginVertical: 10 }}>
                <Col>
                  <View style={styles.row}>
                    <View><Entypo name="dot-single" size={22} color={RED} /></View>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={styles.nameText}>{name}</Text>
                  </View>
                </Col>
                <Col>
                  <View style={styles.tdView}>
                    <View style={styles.valueView}><Text style={styles.valueText}>{value}</Text></View>
                  </View>
                </Col>
              </Row>
            )
          })
        }
      </Grid>
    </View>
  )
}


export { ProductPrices }
