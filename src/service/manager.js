import * as apiManager from './apiManager'

export const getRecommended = async (online = true) => {
  const data = online ? await apiManager.getRecommended() : null
  return data
}
export const getSpecialForYou = async (online = true) => {
  const data = online ? await apiManager.getSpecialForYou() : null
  return data
}
export const getCategoryStocks = async (online = true) => {
  const data = online ? await apiManager.getCategoryStocks() : null
  return data
}
export const getStockToday = async (online = true) => {
  const data = online ? await apiManager.getStockToday() : null
  return data
}
export const getCustomerChoices = async (online = true) => {
  const data = online ? await apiManager.getCustomerChoices() : null
  return data
}

export const getPopularBoutiques = async (online = true) => {
  const data = online ? await apiManager.getPopularBoutiques() : null
  return data
}

export const getBestProducts = async (online = true) => {
  const data = online ? await apiManager.getBestProducts() : null
  return data
}

//Халява
export const getFreebies = async (online = true) => {
  const data = online ? await apiManager.getFreebies() : null
  return data
}

//Видео о хоргос
export const getVideoAboutHorgos = async (online = true) => {
  const data = online ? await apiManager.getVideoAboutHorgos() : null
  return data
}

//Категории
export const getCategories = async (online = true) => {
  const data = online ? await apiManager.getCategories() : null
  return data
}

//Отзывы о хоргос
export const getReviewsAbout = async (online = true) => {
  const data = online ? await apiManager.getReviewsAbout() : null
  return data
}

//Советы- статьи
export const getPosts = async (online = true) => {
  const data = online ? await apiManager.getPosts() : null
  return data
}

//Советы- статьи
export const getHelp = async (online = true) => {
  const data = online ? await apiManager.getHelp() : null
  return data
}

//Советы- статьи
export const addHelp = async (online = true, text) => {
  const data = online ? await apiManager.addHelp(text) : null
  return data
}

//Главный слайдер
export const getSliders = async (online = true) => {
  const data = online ? await apiManager.getSliders() : null
  return data
}

export const getBoutiqueList = async (online = true, params = {}) => {
  const data = online ? await apiManager.getBoutiqueList(params) : null
  return data
}

export const doLogin = async (online = true, login, password = {}) => {
  const data = online ? await apiManager.doLogin(login, password) : null
  return data
}
