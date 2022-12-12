import * as asset from './asset.resolver'
import * as assetType from './assetType.resolver'
import * as attribute from './attributes.resolver'
import * as scalars from './scalars'

export default {
  ...scalars,
  Query: {
    assets: asset.findAll,
    assetTypes: assetType.findAll
  },
  Mutation: {
    createAsset: asset.createAsset,
    updateAsset: asset.updateAsset,
    deleteAsset: asset.deleteAsset,
    createAssetType: assetType.createAssetType,
    updateAssetType: assetType.updateAssetType,
    deleteAssetType: assetType.deleteAssetType,
    createAttribute: attribute.createAttribute,
    updateAttribute: attribute.updateAttribute,
    deleteAttribute: attribute.deleteAttribute
  },
  Asset: asset.resolver,
  AssetType: assetType.resolver
}