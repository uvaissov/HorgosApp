import React, { useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import _ from 'lodash'
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
import { Col, Row, Grid } from 'react-native-easy-grid'
import { TouchableOpacity } from 'react-native-gesture-handler'
import ModalSelector from 'react-native-modal-selector'
import { BlockTitleAndButton } from '../../../components/ui/kit/BlockTitleAndButton'
import { normalize, GRAY_SECOND, BLACK, BORDER_COLOR, RED, GRAY } from '../../../constants/global'
import { strings } from '../../../service/Locale'

const styles = StyleSheet.create({
  view: { marginHorizontal: 15 },
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


const rates = [
  { key: 0, label: '₸ KZT' },
  { key: 1, label: '$ USD' },
  { key: 2, label: '¥ CNY' },
  { key: 3, label: '₽ RUB' }
]

const selector = (rate, setRate) => (
  <ModalSelector
    data={rates}
    accessible
    animationType="fade"
    cancelText={strings('message.cancel')}
    onChange={(option) => { setRate(option.key) }}
  >
    <TouchableOpacity>
      <View style={styles.currencyView}>
        <Text style={styles.currencyText}>{rates[rate].label}</Text>
        <Feather name="chevron-down" color={GRAY_SECOND} size={15} />
      </View>
    </TouchableOpacity>
  </ModalSelector>
)

const ProductPrices = ({ onLayourRef, data }) => {
  if (!data) return null

  const [rate, setRate] = useState(0)
  return (
    <BlockTitleAndButton name="price" onLayourRef={onLayourRef} element={selector(rate, setRate)} title={strings('boutique.priceOnProducts')}>
      <View style={styles.view}>
        <Grid>
          {
            data.map((item) => {
              const { name, price: { T = {}, D = {}, C = {}, R = {} } } = item
              let value = ''
              switch (rate) {
                case 0:
                  value = `${T.from} - ${T.to}`
                  break
                case 1:
                  value = `${D.from} - ${D.to}`
                  break
                case 2:
                  value = `${C.from} - ${C.to}`
                  break
                case 3:
                  value = `${R.from} - ${R.to}`
                  break
                default:
                  break
              }
              return (
                <Row key={_.uniqueId()} style={{ marginVertical: 10 }}>
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
    </BlockTitleAndButton>
  )
}


export { ProductPrices }
