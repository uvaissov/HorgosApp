import { genImageUri, translate } from '../constants/global'

export function toCategory(data) {
  const { id, name, icon, translation } = data
  return { id, name, img: { uri: genImageUri(icon) }, translation }
}

export function toProduct(data) {
  const { id, name, price_from, price_to, priceFromTenge, priceToTenge, priceFromRub, priceToRub, priceFromDollar, priceToDollar, translation } = data
  const price =
  {
    C: { from: price_from, to: price_to },
    T: { from: priceFromTenge, to: priceToTenge },
    R: { from: priceFromRub, to: priceToRub },
    D: { from: priceFromDollar, to: priceToDollar }
  }
  return { id, name, price, translation }
}


export function toUser(data) {
  const { name, email, avatar } = data
  return { name, avatar: { uri: genImageUri(avatar) }, email }
}

export function toReview(data) {
  const { id, name, review, rating, date } = data
  return { id, name, text: review, rating, date }
}

export function toHelp(data) {
  const { id, title, content, created_at, translation } = data
  return { id, title, content, date: created_at, translation }
}

export function toSlider(data) {
  const { id, title, description, image, color, trading_house_id, category_id, boutique_id } = data
  return { id, title, description, img: { uri: genImageUri(image) }, color, trading_house_id, category_id, boutique_id }
}

export function toPost(data) {
  const { id, image, title, description, content, created_at, translation } = data
  return { id, title, description, content, img: { uri: genImageUri(image) }, date: created_at, translation }
}

export function toRecomended(data) {
  const { related_boutique_id } = data
  return related_boutique_id
}

export function toRelated(data) {
  const { related_boutique_id } = data
  return related_boutique_id
}

export function toFavAnswer(data) {
  const { id, boutique_id } = data
  return { id, boutique_id }
}

export function toHouse(data) {
  const { id, name, images, logo, translation } = data
  let imagesArr = []
  try {
    imagesArr = JSON.parse(images)
  } catch (e) {
    imagesArr = []
  }
  return { id, name, img: { uri: genImageUri(logo) }, images: (imagesArr || []).map((el) => ({ uri: genImageUri(el) })), translation }
}

export function toBoutique(data) {
  const {
    id,
    name, seller_name, owner_name, languages,
    phone, whatsapp, weechat, categoriesName, description_mobile,
    popular, top, stock, new: news, is_hit, averageRating: { rating }, trading_houses,
    firstImage, images, products, all_products, map, boutique_number, floor,
    reviews, recommended_relations, related_relations, categories, qr_code, translation, str_products_all } = data
  const [house = {}] = trading_houses
  const { id: trading_house_id, name: trading_house_name } = house

  let text = ''
  if (name) {
    text += ` ${name}`
    text += ` ${translate({ translation }, 'en.name', name)}`
    text += ` ${translate({ translation }, 'kz.name', name)}`
  }
  if (str_products_all) {
    text += ` ${str_products_all}`
    text += ` ${translate({ translation }, 'en.str_products_all', str_products_all)}`
    text += ` ${translate({ translation }, 'kz.str_products_all', str_products_all)}`
  }
  if (boutique_number) {
    text += ` ${boutique_number}`
    text += ` ${translate({ translation }, 'en.boutique_number', boutique_number)}`
    text += ` ${translate({ translation }, 'kz.boutique_number', boutique_number)}`
  }
  if (seller_name) {
    text += ` ${seller_name}`
    text += ` ${translate({ translation }, 'en.seller_name', seller_name)}`
    text += ` ${translate({ translation }, 'kz.seller_name', seller_name)}`
  }
  if (owner_name) {
    text += ` ${owner_name}`
    text += ` ${translate({ translation }, 'en.seller_name', owner_name)}`
    text += ` ${translate({ translation }, 'kz.seller_name', owner_name)}`
  }
  if (phone) {
    text += ` ${phone}`
    text += ` ${translate({ translation }, 'en.phone', phone)}`
    text += ` ${translate({ translation }, 'kz.phone', phone)}`
  }
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
    trading_houses,
    categories,
    categoriesName,
    translation,
    text,
    trading_house: toHouse(house),
    categoryId: (categories || []).map(el => `(${el.id})`).join(),
    img: { uri: genImageUri(firstImage) },
    qr_code: qr_code ? { uri: genImageUri(qr_code) } : undefined,
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
  const { boutique_id, name, image, boutique, discount, translation } = data
  return { id: boutique_id, name, boutique: boutique ? toBoutique(boutique) : undefined, img: { uri: genImageUri(image) }, discount, translation }
}


export function toCategoryStock(data) {
  const { id, name, images, background, category_id, translation } = data
  let imagesArr = []
  try {
    imagesArr = JSON.parse(images)
  } catch {
    imagesArr = []
  }
  return { id, name, category_id, background: { uri: genImageUri(background) }, images: (imagesArr || []).map((el) => ({ uri: genImageUri(el) })), translation }
}

export function toMaps(data) {
  const { id, maps } = data
  let imagesArr = []
  try {
    imagesArr = JSON.parse(maps)
  } catch {
    imagesArr = []
  }
  return { id, images: (imagesArr || []).map((el) => ({ uri: genImageUri(el) })) }
}

export function toVideo(data) {
  const { id, iframe, code } = data
  return { id, iframe, code }
}