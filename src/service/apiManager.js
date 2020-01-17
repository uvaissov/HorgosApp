import axios from 'axios'
import { hostName } from '../constants/global'
import * as transform from './transform'
import { BY_CATEGORY, BY_BOUTIQUE_IDS, BY_SEARCH_TEXT, BY_TRADING_HOUSE } from '../constants/static'

const instance = axios.create({
  baseURL: hostName,
  timeout: 10000,
  headers: { 'Accept': 'application/json' }
})

export const getRecommended = async () => {
  try {
    const { data } = await instance.get('/api/recommended')
    const payload = data.map((el) => transform.toBoutiqueShort(el))
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

export const getSpecialForYou = async () => {
  try {
    const { data } = await instance.get('/api/special-for-you')
    const payload = data.map((el) => transform.toBoutiqueShort(el))
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

export const getReviewsAbout = async () => {
  try {
    const { data } = await instance.get('/api/reviews-about')
    const payload = data.map((el) => transform.toReview(el))
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

export const getPosts = async () => {
  try {
    const { data } = await instance.get('/api/advices/posts')
    const payload = data.map((el) => transform.toPost(el))
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

export const getCategoryStocks = async () => {
  try {
    const { data } = await instance.get('/api/category-stocks')
    const payload = data.map((el) => transform.toCategoryStock(el))
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

export const getCustomerChoices = async () => {
  try {
    const { data } = await instance.get('/api/customer-choices')
    const payload = data.map((el) => transform.toBoutiqueShort(el))
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

export const getStockToday = async () => {
  try {
    const { data } = await instance.get('/api/stock-today')
    const payload = data.map((el) => transform.toBoutiqueShort(el))
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


export const getPopularBoutiques = async () => {
  try {
    const { data } = await instance.get('/api/popular-boutiques')
    const payload = data.map((el) => transform.toBoutiqueShort(el))
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

export const getBestProducts = async () => {
  try {
    const { data } = await instance.get('/api/best-products')
    const payload = data.map((el) => transform.toBoutiqueShort(el))
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

export const getFreebies = async () => {
  try {
    const { data } = await instance.get('/api/freebies')
    const payload = data.map((el) => transform.toBoutiqueShort(el))
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

export const getVideoAboutHorgos = async () => {
  try {
    const { data } = await instance.get('/api/video-about-horgos')
    const payload = data.map((el) => transform.toVideo(el))
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

export const getSliders = async () => {
  try {
    const { data } = await instance.get('/api/sliders/1')
    const payload = data.slides.map((el) => transform.toSlider(el))
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
    console.log('data,', data)
    const payload = transform.toHelp(data)
    console.log('payload,', {
      payload
    })
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

export const getCategories = async () => {
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
        list: [],
        populare: [],
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
    console.log('url', url)
    const { data } = await instance.get(url)
    console.log('url', data)
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
