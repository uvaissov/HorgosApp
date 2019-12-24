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

export function toRecomended(data) {
  const { related_boutique_id } = data
  return { related_boutique_id }
}

export function toRelated(data) {
  const { related_boutique_id } = data
  return { related_boutique_id }
}

export function toBoutique(data) {
  console.log('toBoutique', data)
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
    images: imagesArr.map((el) => ({ uri: genImageUri(el) })),
    products: products.map(el => toProduct(el)),
    all_products: all_products.map(el => toProduct(el)),
    map,
    reviews: reviews.map(el => toReview(el)),
    recommendeds: recommended_relations.map(el => toRecomended(el)),
    relateds: related_relations.map(el => toRelated(el))
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

export function toCategoryStock(data) {
  const { id, name, images, background, category_id } = data
  let imagesArr = []
  try {
    imagesArr = JSON.parse(images)
  } catch {
    imagesArr = []
  }
  return { id, name, category_id, background: { uri: genImageUri(background) }, images: imagesArr.map((el) => ({ uri: genImageUri(el) })) }
}
