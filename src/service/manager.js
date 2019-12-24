import * as apiManager from './apiManager'

export const getRecomended = async (online = true) => {
  const data = online ? await apiManager.getRecomended() : null
  return data
}
export const getSpecialForYou = async (online = true) => {
  const data = online ? await apiManager.getSpecialForYou() : null
  return data
}
export const getCategoryStoks = async (online = true) => {
  const data = online ? await apiManager.getCategoryStoks() : null
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

export const getCategories = async (online = true, params = {}) => {
  const data = online ?
    await apiManager.getCategories(params) :
    null

  return data
}

export const getBoutiqueList = async (online = true, params = {}) => {
  const data = online ?
    await apiManager.getBoutiqueList(params) :
    null
  return data
}
