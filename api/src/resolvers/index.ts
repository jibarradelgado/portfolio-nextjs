import * as asset from './asset.resolver'
import * as scalars from './scalars'

export default {
  ...scalars,
  Query: {
    assets: asset.findAll,
  },
  Mutation: {
    upsertAsset: asset.upsertAsset,
  },
  Asset: asset.resolver,
}