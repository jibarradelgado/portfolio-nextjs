import * as asset from './asset.resolver'
import * as scalars from './scalars'

export default {
  ...scalars,
  Query: {
    // avo: avo.findOne,
    assets: asset.findAll,
  },
  // Mutation: {
  //   createAvo: avo.createAvo,
  // },
  Asset: asset.resolver,
}