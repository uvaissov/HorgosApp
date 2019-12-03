import axios from 'axios'
import { hostName } from '../constants/global'

const instance = axios.create({
  baseURL: hostName,
  timeout: 10000,
  headers: { 'Accept': 'application/json' }
})

export const getRecomended = async () =>
  instance.get('/api/recommended')

export const getCategories = async () =>
  instance.get('/api/categories')