import * as apiManager from './apiManager'

export const getRecomended = async (online = true) => {
  const data = online ?
    await apiManager.getRecomended() :
    null

  return data
}

export const getCategories = async (online = true) => {
  const data = online ?
    await apiManager.getCategories() :
    null

  return data
}