import { genImageUri } from '../constants/global'

export function toCategory(data) {
  const { id, name, icon } = data
  return { id, name, img: { uri: genImageUri(icon) } }
}

export function toProduct(data) {
  const { id, name, price_from, price_to, priceFromTenge, priceToTenge, priceFromRub, priceToRub, priceFromDollar, priceToDollar } = data
  const price =
  {
    C: { from: price_from, to: price_to },
    T: { from: priceFromTenge, to: priceToTenge },
    R: { from: priceFromRub, to: priceToRub },
    D: { from: priceFromDollar, to: priceToDollar }
  }
  return { id, name, price }
}

export function toReview(data) {
  const { id, name, review, rating, date } = data
  return { id, name, text: review, rating, date }
}

export function toHelp(data) {
  const { id, title, content, created_at } = data
  return { id, title, content, date: created_at }
}

export function toSlider(data) {
  const { id, title, description, image, color, trading_house_id, category_id, boutique_id } = data
  return { id, title, description, img: { uri: genImageUri(image) }, color, trading_house_id, category_id, boutique_id }
}

export function toPost(data) {
  const { id, image, title, description, content, created_at } = data
  return { id, title, description, content, img: { uri: genImageUri(image) }, date: created_at }
}

export function toRecomended(data) {
  const { related_boutique_id } = data
  return related_boutique_id
}

export function toRelated(data) {
  const { related_boutique_id } = data
  return related_boutique_id
}

export function toBoutique(data) {
  const {
    id,
    name, seller_name, owner_name, languages,
    phone, whatsapp, weechat, categoriesName, description_mobile,
    popular, top, stock, new: news, is_hit, averageRating: { rating }, trading_houses: [{ id: trading_house_id, name: trading_house_name }],
    firstImage, images, products, all_products, map, boutique_number, floor,
    reviews, recommended_relations, related_relations } = data
  let imagesArr = []
  try {
    imagesArr = JSON.parse(images)
  } catch {
    imagesArr = []
  }
  let imagesMapArr = []
  try {
    imagesMapArr = JSON.parse(map)
  } catch {
    imagesMapArr = []
  }
  return {
    id,
    name,
    seller_name,
    owner_name,
    languages,
    boutique_number,
    floor,
    phone,
    whatsapp,
    weechat,
    description: description_mobile,
    popular,
    top,
    stock,
    is_new: news,
    is_hit,
    rating,
    trading_house_id,
    trading_house_name,
    categoriesName,
    img: { uri: genImageUri(firstImage) },
    images: (imagesArr || []).map((el) => ({ uri: genImageUri(el) })),
    products: (products || []).map(el => toProduct(el)),
    all_products: (all_products || []).map(el => toProduct(el)),
    map: (imagesMapArr || []).map((el) => ({ uri: genImageUri(el) })),
    reviews: (reviews || []).map(el => toReview(el)),
    recommenders: (recommended_relations || []).map(el => toRecomended(el)),
    relaters: (related_relations || []).map(el => toRelated(el))
  }
}

export function toBoutiqueShort(data) {
  const { boutique_id, name, image, boutique, discount } = data
  return { id: boutique_id, name, boutique: boutique ? toBoutique(boutique) : undefined, img: { uri: genImageUri(image) }, discount }
}

export function toHouse(data) {
  const { id, name, images, logo } = data
  let imagesArr = []
  try {
    imagesArr = JSON.parse(images)
  } catch (e) {
    imagesArr = []
  }
  return { id, name, img: { uri: genImageUri(logo) }, images: (imagesArr || []).map((el) => ({ uri: genImageUri(el) })) }
}

export function toCategoryStock(data) {
  const { id, name, images, background, category_id } = data
  let imagesArr = []
  try {
    imagesArr = JSON.parse(images)
  } catch {
    imagesArr = []
  }
  return { id, name, category_id, background: { uri: genImageUri(background) }, images: (imagesArr || []).map((el) => ({ uri: genImageUri(el) })) }
}

export function toVideo(data) {
  const { id, iframe, code } = data
  return { id, iframe, code }
}