import * as asset from './asset.resolver'
import * as assetType from './assetType.resolver'
import * as scalars from './scalars'

export default {
  ...scalars,
  Query: {
    assets: asset.findAll,
    assetTypes: assetType.findAll
  },
  Mutation: {
    upsertAsset: asset.upsertAsset,
    upsertAssetType: assetType.upsertAssetType
  },
  Asset: asset.resolver,
  AssetType: assetType.resolver
}