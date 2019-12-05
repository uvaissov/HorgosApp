import { genImageUri } from '../constants/global'

export function toBoutiqueShort(data) {
  const { boutique_id, name, image } = data
  return { id: boutique_id, name, img: { uri: genImageUri(image) } }
}

export function toCategory(data) {
  const { id, name, icon } = data
  return { id, name, img: { uri: genImageUri(icon) } }
}

export function toBoutique(data) {
  const {
    id,
    name, seller_name, owner_name, languages,
    phone, whatsapp, weechat, full_description,
    popular, top, stock, new: news, is_hit, averageRating, trading_houses: [{ id: trading_house_id }], firstImage, images } = data
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
    mainImg: { uri: genImageUri(firstImage) },
    images: imagesArr.map((el) => ({ uri: genImageUri(el) }))
  }
}