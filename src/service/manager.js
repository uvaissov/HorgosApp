import * as apiManager from './apiManager'

export const getRecomended = async (online = true) => {
  const data = online ?
    await apiManager.getRecomended() :
    null

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
