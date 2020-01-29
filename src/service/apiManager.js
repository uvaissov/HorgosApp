import axios from 'axios'
import { hostName } from '../constants/global'
import * as transform from './transform'
import { BY_CATEGORY, BY_BOUTIQUE_IDS, BY_SEARCH_TEXT, BY_TRADING_HOUSE, BY_ALL_DATA } from '../constants/static'

const instance = axios.create({
  baseURL: hostName,
  timeout: 10000,
  headers: { 'Accept': 'application/json' }
})

export const getRecommended = async (persistData) => {
  try {
    const { data } = await instance.get('/api/recommended')
    const payload = data.map((el) => transform.toBoutiqueShort(el))
    return {
      payload
    }
  } catch (error) {
    return {
      payload: persistData,
      error
    }
  }
}

export const getSpecialForYou = async (persistData) => {
  try {
    const { data } = await instance.get('/api/special-for-you')
    const payload = data.map((el) => transform.toBoutiqueShort(el))
    return {
      payload
    }
  } catch (error) {
    return {
      payload: persistData,
      error
    }
  }
}

export const getReviewsAbout = async (persistData) => {
  try {
    const { data } = await instance.get('/api/reviews-about')
    const payload = data.map((el) => transform.toReview(el))
    return {
      payload
    }
  } catch (error) {
    return {
      payload: persistData,
      error
    }
  }
}

export const getPosts = async (persistData) => {
  try {
    const { data } = await instance.get('/api/advices/posts')
    const payload = data.map((el) => transform.toPost(el))
    return {
      payload
    }
  } catch (error) {
    return {
      payload: persistData,
      error
    }
  }
}

export const getCategoryStocks = async (persistData) => {
  try {
    const { data } = await instance.get('/api/category-stocks')
    const payload = data.map((el) => transform.toCategoryStock(el))
    return {
      payload
    }
  } catch (error) {
    return {
      payload: persistData,
      error
    }
  }
}

export const getMaps = async (persistData) => {
  try {
    const { data } = await instance.get('/api/maps')
    const payload = transform.toMaps(data)
    return {
      payload
    }
  } catch (error) {
    return {
      payload: { images: persistData },
      error
    }
  }
}

export const getCustomerChoices = async (persistData) => {
  try {
    const { data } = await instance.get('/api/customer-choices')
    const payload = data.map((el) => transform.toBoutiqueShort(el))
    return {
      payload
    }
  } catch (error) {
    return {
      payload: persistData,
      error
    }
  }
}

export const getStockToday = async (persistData) => {
  try {
    const { data } = await instance.get('/api/stock-today')
    const payload = data.map((el) => transform.toBoutiqueShort(el))
    return {
      payload
    }
  } catch (error) {
    return {
      payload: persistData,
      error
    }
  }
}


export const getPopularBoutiques = async (persistData) => {
  try {
    const { data } = await instance.get('/api/popular-boutiques')
    const payload = data.map((el) => transform.toBoutiqueShort(el))
    return {
      payload
    }
  } catch (error) {
    return {
      payload: persistData,
      error
    }
  }
}

export const getBestProducts = async (persistData) => {
  try {
    const { data } = await instance.get('/api/best-products')
    const payload = data.map((el) => transform.toBoutiqueShort(el))
    return {
      payload
    }
  } catch (error) {
    return {
      payload: persistData,
      error
    }
  }
}

export const getFreebies = async (persistData) => {
  try {
    const { data } = await instance.get('/api/freebies')
    const payload = data.map((el) => transform.toBoutiqueShort(el))
    return {
      payload
    }
  } catch (error) {
    return {
      payload: persistData,
      error
    }
  }
}

export const getVideoAboutHorgos = async (persistData) => {
  try {
    const { data } = await instance.get('/api/video-about-horgos')
    const payload = data.map((el) => transform.toVideo(el))
    return {
      payload
    }
  } catch (error) {
    return {
      payload: persistData,
      error
    }
  }
}

export const getSliders = async (persistData) => {
  try {
    const { data } = await instance.get('/api/sliders/1')
    const payload = data.slides.map((el) => transform.toSlider(el))
    return {
      payload
    }
  } catch (error) {
    return {
      payload: persistData,
      error
    }
  }
}

export const getHelp = async () => {
  try {
    const { data } = await instance.get('/api/help')
    const payload = data.map((el) => transform.toHelp(el))
    return {
      payload
    }
  } catch (error) {
    return {
      payload: [],
      error
    }
  }
}

export const addHelp = async (text) => {
  try {
    const { data } = await instance.post(`/api/help?title=${text}`)
    const payload = transform.toHelp(data)
    return {
      payload
    }
  } catch (error) {
    return {
      payload: {},
      error
    }
  }
}

export const addFav = async (token, id) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    const { data } = await instance.post(`/api/favorite/${id}`, {}, config)
    const payload = transform.toFavAnswer(data)
    return {
      payload
    }
  } catch (error) {
    return {
      payload: {},
      error
    }
  }
}

export const delFav = async (token, id) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    const { data } = await instance.delete(`/api/favorite/${id}`, config)
    const payload = transform.toFavAnswer(data)
    return {
      payload
    }
  } catch (error) {
    return {
      payload: {},
      error
    }
  }
}

export const addReview = async (id, text, name, raiting) => {
  try {
    const { data } = await instance.get(`/api/boutique/${id}/reviews/create?name=${name}&review=${text}&rating=${raiting}`)
    return {
      data
    }
  } catch (error) {
    const { response: { data } } = error
    return data
  }
}

export const getCategories = async (persistData) => {
  try {
    const { data: allData } = await instance.get('/api/categories')
    const payload = {
      payload: {
        list: allData.map((el) => transform.toCategory(el)),
        populare: allData.filter((el) => el.is_popular === 1).map((el) => transform.toCategory(el))
      }
    }
    return payload
  } catch (error) {
    return {
      payload: {
        ...persistData,
        error
      }
    }
  }
}


export const getBoutiqueList = async (params) => {
  try {
    let url = '/api/boutiques?'
    const { cat_id, filter, ids, text, trading_house_id } = params
    switch (filter) {
      case BY_CATEGORY:
        url += `categories=${cat_id}`
        break
      case BY_BOUTIQUE_IDS:
        url += `ids=${ids.join()}`
        break
      case BY_SEARCH_TEXT:
        url += `name=${text}`
        break
      case BY_TRADING_HOUSE:
        url += `trading_house=${trading_house_id}`
        break
      case BY_ALL_DATA:
        url = '/api/boutiques'
        break

      default:
        return {
          payload: {
            list: [],
            trading_houses: [],
            hits: [],
            error: 'No filter to search'
          }
        }
    }
    const { data } = await instance.get(url)
    const trading_houses = []
    data.map(el => {
      const [house] = el.trading_houses
      if (house && !trading_houses.find((dir) => dir.id === house.id)) {
        trading_houses.push(house)
      }
      return null
    })
    return {
      payload: {
        trading_houses: trading_houses.map(el => transform.toHouse(el)),
        list: data.map(el => transform.toBoutique(el)),
        hits: data.filter(el => el.is_hit === 1).map(el => transform.toBoutique(el))
      }
    }
  } catch (error) {
    return {
      payload: {
        list: [],
        trading_houses: [],
        hits: [],
        error
      }
    }
  }
}

export const doLogin = async (mail, password) => {
  try {
    const { data = {} } = await instance.get(`/api/token?email=${mail}&password=${password}`)
    const { access_token, message } = data
    return {
      access_token, message
    }
  } catch (error) {
    const { response: { data } } = error
    return data
  }
}

export const doRegistration = async (name, email, password, password_confirmation) => {
  try {
    const { data = {} } = await instance.post('api/register', { name, email, password, password_confirmation })
    const { id, message } = data
    return {
      id, message
    }
  } catch (error) {
    const { response: { data } } = error
    return data
  }
}

export const doForget = async (email) => {
  try {
    const { data = {} } = await instance.post('api/forgot-password', { email })
    return {
      data
    }
  } catch (error) {
    const { response: { data } } = error
    return data
  }
}

export const getFavorite = async (token, persistData) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    const { data } = await instance.get('api/favorite', config)
    const payload = data.map(el => transform.toBoutique(el))
    return {
      payload
    }
  } catch (error) {
    const { response: { data } } = error
    return {
      data,
      payload: persistData,
      error
    }
  }
}