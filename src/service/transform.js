import { genImageUri } from '../constants/global'

export function toCategory(data) {
  const { id, name, icon } = data
  return { id, name, img: { uri: genImageUri(icon) } }
}

export function toBoutique(data) {
  const {
    id,
    name, seller_name, owner_name, languages,
    phone, whatsapp, weechat, full_description, categoriesName,
    popular, top, stock, new: news, is_hit, averageRating, trading_houses: [{ id: trading_house_id, name: trading_house_name }], firstImage, images } = data
  let imagesArr = []
  try {
    imagesArr = JSON.parse(images)
  } catch {
    imagesArr = []
  }
  return {
    id,
    name,
    seller_name,
    owner_name,
    languages,
    phone,
    whatsapp,
    weechat,
    full_description,
    popular,
    top,
    stock,
    is_new: news,
    is_hit,
    averageRating,
    trading_house_id,
    trading_house_name,
    categoriesName,
    img: { uri: genImageUri(firstImage) },
    images: imagesArr.map((el) => ({ uri: genImageUri(el) }))
  }
}

export function toBoutiqueShort(data) {
  const { boutique_id, name, image, boutique } = data
  return { id: boutique_id, name, boutique: boutique ? toBoutique(boutique) : undefined, img: { uri: genImageUri(image) } }
}

export function toHouse(data) {
  const { id, name, images, logo } = data
  let imagesArr = []
  try {
    imagesArr = JSON.parse(images)
  } catch {
    imagesArr = []
  }
  return { id, name, img: { uri: genImageUri(logo) }, images: imagesArr.map((el) => ({ uri: genImageUri(el) })) }
}
