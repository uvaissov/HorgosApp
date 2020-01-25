import * as apiManager from './apiManager'
import Database from './dbManager'
import { BY_ALL_DATA } from '../constants/static'

const db = new Database()

export const getRecommended = async (online = true, persistData) => {
  const data = online ? await apiManager.getRecommended(persistData) : { payload: persistData }
  return data
}
export const getSpecialForYou = async (online = true, persistData) => {
  const data = online ? await apiManager.getSpecialForYou(persistData) : { payload: persistData }
  return data
}
export const getCategoryStocks = async (online = true, persistData) => {
  const data = online ? await apiManager.getCategoryStocks(persistData) : { payload: persistData }
  return data
}
export const getStockToday = async (online = true, persistData) => {
  const data = online ? await apiManager.getStockToday(persistData) : { payload: persistData }
  return data
}
export const getCustomerChoices = async (online = true, persistData) => {
  const data = online ? await apiManager.getCustomerChoices(persistData) : { payload: persistData }
  return data
}

export const getPopularBoutiques = async (online = true, persistData) => {
  const data = online ? await apiManager.getPopularBoutiques(persistData) : { payload: persistData }
  return data
}

export const getBestProducts = async (online = true, persistData) => {
  const data = online ? await apiManager.getBestProducts(persistData) : { payload: persistData }
  return data
}

//Халява
export const getFreebies = async (online = true, persistData) => {
  const data = online ? await apiManager.getFreebies(persistData) : { payload: persistData }
  return data
}

//Видео о хоргос
export const getVideoAboutHorgos = async (online = true, persistData) => {
  const data = online ? await apiManager.getVideoAboutHorgos(persistData) : { payload: persistData }
  return data
}

//Главный слайдер
export const getSliders = async (online = true, persistData) => {
  const data = online ? await apiManager.getSliders(persistData) : { payload: persistData }
  return data
}

//Категории
export const getCategories = async (online = true, persistData) => {
  const data = online ? await apiManager.getCategories(persistData) : { payload: persistData }
  return data
}

//Отзывы о хоргос
export const getReviewsAbout = async (online = true, persistData) => {
  const data = online ? await apiManager.getReviewsAbout(persistData) : { payload: persistData }
  return data
}

//Советы- статьи
export const getPosts = async (online = true, persistData) => {
  const data = online ? await apiManager.getPosts(persistData) : { payload: persistData }
  return data
}

//Советы- статьи
export const getHelp = async (online = true, persistData) => {
  const data = online ? await apiManager.getHelp(persistData) : { payload: persistData }
  return data
}

//Советы- статьи
export const addHelp = async (online = true, text) => {
  const data = online ? await apiManager.addHelp(text) : null
  return data
}


export const getBoutiqueList = async (online = true, params = {}) => {
  const data = online ? await apiManager.getBoutiqueList(params) : db.getBoutiqueList(params)
  return data
}

export const doLogin = async (online = true, login, password = {}) => {
  const data = online ? await apiManager.doLogin(login, password) : null
  return data
}

export const getFavorite = async (online = true, token, persistData) => {
  const data = online ? await apiManager.getFavorite(token, persistData) : { payload: persistData }
  return data
}

export const loadFromServer = async (online = true) => {
  if (!online) return null

  db.checkData()
    .then(row => {
      console.log(row)
      if (!row) {
        console.log('start api')
        apiManager.getBoutiqueList({ filter: BY_ALL_DATA })
          .then(({ payload: { list } }) => {
            db.addBoutique(list.map(el => ({ id: el.id, name: el.name, categories: el.categoryId, trading_house: el.trading_house_id, boutique: el })))
          })
      }
    })
}