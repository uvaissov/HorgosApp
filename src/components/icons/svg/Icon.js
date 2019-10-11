/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import SvgIcon from 'react-native-svg-icon'
import svgs from './SvgIcon'

const Icon = (props) => <SvgIcon {...props} svgs={svgs} />

export default Icon
