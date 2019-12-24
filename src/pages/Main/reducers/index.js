import {
  ACTION_GET_RECOMENDED_SUCCESED,
  ACTION_GET_SPECIAL_FOR_YOU_SUCCESED,
  ACTION_GET_CATEGORY_STOKS_SUCCESED,
  ACTION_GET_CUSTEMER_CHOICES_SUCCESED,
  ACTION_GET_POPULAR_BOUTIQUES_SUCCESED,
  ACTION_GET_STOCK_TODAY_SUCCESED
} from '../types'

const initialState = {
  recomended: [],
  specialsForYou: [],
  categoryStocks: [],
  customerChoices: [],
  popularBoutiques: [],
  stockToday: [],
  token: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION_GET_RECOMENDED_SUCCESED: {
      return {
        ...state,
        recomended: action.payload
      }
    }
    case ACTION_GET_SPECIAL_FOR_YOU_SUCCESED: {
      return {
        ...state,
        specialsForYou: action.payload
      }
    }
    case ACTION_GET_CATEGORY_STOKS_SUCCESED: {
      return {
        ...state,
        categoryStocks: action.payload
      }
    }
    case ACTION_GET_CUSTEMER_CHOICES_SUCCESED: {
      return {
        ...state,
        customerChoices: action.payload
      }
    }
    case ACTION_GET_POPULAR_BOUTIQUES_SUCCESED: {
      return {
        ...state,
        popularBoutiques: action.payload
      }
    }
    case ACTION_GET_STOCK_TODAY_SUCCESED: {
      return {
        ...state,
        stockToday: action.payload
      }
    }
    default: {
      return state
    }
  }
}
