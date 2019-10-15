/* eslint-disable react/jsx-closing-tag-location */
import React from 'react'
import { G, Path } from 'react-native-svg'

export default {
  home: {
    svg: <G>
      <Path d="M2.25 6.75L9 1.5L15.75 6.75V15C15.75 15.3978 15.592 15.7794 15.3107 16.0607C15.0294 16.342 14.6478 16.5 14.25 16.5H3.75C3.35218 16.5 2.97064 16.342 2.68934 16.0607C2.40804 15.7794 2.25 15.3978 2.25 15V6.75Z" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
      <Path d="M6.75 16.5V9.75H11.25V16.5" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
    </G>,
    viewBox: '0 0 18 18'
  },
  idea: {
    svg: <G clip-path="url(#clip0)">
      <Path d="M6.59265 8.04072C6.4925 8.23507 6.50956 8.469 6.63652 8.64687C6.99481 9.14885 7.19222 9.77615 7.29664 10.3828C7.39546 10.957 7.41047 11.5096 7.40131 11.9139C5.32625 11.2387 3.82242 9.28599 3.82242 6.98885C3.82242 4.13391 6.14506 1.81112 9.00004 1.81112C11.855 1.81112 14.1777 4.13391 14.1777 6.98885C14.1777 9.28602 12.6738 11.2388 10.5987 11.9139C10.5896 11.5095 10.6046 10.9569 10.7034 10.3827C10.8079 9.77605 11.0053 9.14881 11.3636 8.64687C11.4906 8.46898 11.5075 8.23506 11.4075 8.04073C11.3074 7.8464 11.1071 7.72432 10.8886 7.72432H7.11139C6.89287 7.72432 6.69266 7.84646 6.59265 8.04072ZM6.59265 8.04072L6.6371 8.06362L6.59264 8.04073C6.59264 8.04073 6.59265 8.04072 6.59265 8.04072ZM9.00004 0.644092C5.50154 0.644092 2.65536 3.49033 2.65536 6.98888C2.65536 9.45022 4.0643 11.5882 6.11748 12.6398V16.3586C6.11748 17.2913 6.87628 18.0501 7.80898 18.0501H10.1911C11.1238 18.0501 11.8826 17.2913 11.8826 16.3586V12.6398C13.9358 11.5883 15.3448 9.45022 15.3448 6.98891C15.3448 3.49033 12.4985 0.644092 9.00004 0.644092ZM9.91377 8.89135C9.4306 10.0847 9.40477 11.4175 9.43739 12.1478C9.29308 12.16 9.14724 12.1665 9.00001 12.1665C8.85267 12.1665 8.70682 12.16 8.56251 12.1478C8.59521 11.4175 8.56939 10.0847 8.08619 8.89135H9.91377ZM7.28454 15.2193V13.0975C7.83043 13.2511 8.40576 13.3336 9.00004 13.3336C9.59431 13.3336 10.1696 13.2511 10.7155 13.0975V15.2193H7.28454ZM10.7148 16.3863C10.7003 16.6626 10.471 16.883 10.1911 16.883H7.80898C7.52912 16.883 7.29975 16.6626 7.28526 16.3863H10.7148Z" stroke-width="0.1" />
      <Path d="M2.07027 2.33506L2.07028 2.33506C2.18423 2.44898 2.3336 2.506 2.48283 2.506C2.63215 2.506 2.78153 2.44898 2.89548 2.33503C3.12336 2.10715 3.12336 1.7377 2.89548 1.50982L1.50751 0.121908C1.50751 0.121908 1.50751 0.121907 1.50751 0.121907C1.27961 -0.105999 0.910122 -0.106003 0.682241 0.12191L0.682236 0.121915C0.454427 0.349821 0.454424 0.719234 0.682239 0.947114L0.682245 0.94712L2.07027 2.33506Z" stroke-width="0.1" />
      <Path d="M15.1046 2.33409L15.1046 2.33409C15.2186 2.448 15.3679 2.50502 15.5172 2.50502C15.6665 2.50502 15.8159 2.448 15.9298 2.33408L17.3177 0.946204C17.5457 0.718293 17.5457 0.348865 17.3177 0.120929C17.0897 -0.107008 16.7203 -0.106945 16.4924 0.120931L16.5278 0.156286L16.4924 0.120931L15.1046 1.50881C14.8766 1.73671 14.8766 2.1062 15.1046 2.33409Z" stroke-width="0.1" />
      <Path d="M15.9298 11.6434C15.9298 11.6434 15.9298 11.6434 15.9298 11.6434C15.702 11.4155 15.3325 11.4155 15.1046 11.6434L15.8945 11.6788L15.9298 11.6434ZM15.9298 11.6434L17.3177 13.0313L15.9298 11.6434ZM17.3177 13.8565C17.5456 13.6287 17.5456 13.2592 17.3177 13.0313L17.3177 13.8565ZM16.9051 14.0275C17.0543 14.0275 17.2037 13.9705 17.3177 13.8566L15.14 12.4332L15.1046 12.4686L15.1046 12.4686L16.4925 13.8565L16.4925 13.8565C16.6064 13.9705 16.7558 14.0275 16.9051 14.0275Z" stroke-width="0.1" />
      <Path d="M0.682239 13.0314L0.682244 13.0314L2.07027 11.6434C2.07027 11.6434 2.07027 11.6434 2.07027 11.6434C2.29815 11.4155 2.66767 11.4155 2.89549 11.6434L0.682239 13.0314ZM0.682239 13.0314C0.454422 13.2593 0.45443 13.6287 0.682234 13.8566L0.682249 13.8567C0.796199 13.9706 0.945576 14.0276 1.09489 14.0276C1.2441 14.0276 1.39362 13.9707 1.50748 13.8566L0.682239 13.0314Z" stroke-width="0.6" />
    </G>,
    viewBox: '0 0 18 18'
  }
}