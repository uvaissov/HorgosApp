import { genImageUri } from '../constants/global'

export function toBoutique(data) {
  const { boutique_id, name, image } = data
  return { id: boutique_id, name, img: { uri: genImageUri(image) } }
}
