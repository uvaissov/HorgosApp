import axios from 'axios'
import { hostName } from '../constants/global'
import * as transform from './transform'
import { BY_CATEGORY, BY_BOUTIQUE_IDS } from '../constants/static'

const instance = axios.create({
  baseURL: hostName,
  timeout: 10000,
  headers: { 'Accept': 'application/json' }
})

export const getRecomended = async () => {
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

export const getCategoryStoks = async () => {
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
    const { cat_id, filter, ids } = params
    switch (filter) {
      case BY_CATEGORY:
        url += `categories=${cat_id}`
        break
      case BY_BOUTIQUE_IDS:
        url += `ids=${ids.join()}`
        break

      default:
        return {
          payload: {
            list: [],
            populare: [],
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
        populare: [],
        error
      }
    }
  }
}
