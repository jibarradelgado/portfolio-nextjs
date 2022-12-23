import type { Asset, Attribute, User, AssetType, PrismaClient, Prisma } from '@prisma/client'

type ResolverParent = unknown
type ResolverContext = {
  orm: PrismaClient
}

export function findAll(
  parent: ResolverParent,
  args: { where?: Prisma.AssetWhereInput },
  context: ResolverContext
): Promise<Asset[]> {
  return context.orm.asset.findMany({
    include: {
      attribute: true,
      user: true,
      type: true
    },
    where: args.where,
  })
}

export const resolver: Record<
  keyof (Asset & {attribute: Attribute} & {user: User} & {type: AssetType}),
  (parent: Asset & { attribute: Attribute} & {user: User} & {type: AssetType}) => unknown
  > = {
    id: (parent) => parent.id,
    createdAt: (parent) => parent.createdAt,
    updatedAt: (parent) => parent.updatedAt,
    name: (parent) => parent.name,
    value: (parent) => parent.value,
    quantity: (parent) => parent.quantity,
    type: (parent) => ({
      id: parent.type.id,
      name: parent.type.name,
      targetPercentage: parent.type.targetPercentage
    }),
    user: (parent) => ({
      id: parent.user.id,
      username: parent.user.username
    }),
    attribute: (parent) => ({
      id: parent.attribute.id,
      type: parent.attribute.type,
      name: parent.attribute.name,
      symbol: parent.attribute.symbol,
      lastValue: parent.attribute.lastValue
    }),
    assetTypeId: (parent) => parent.assetTypeId,
    userId: (parent) => parent.userId,
    attributeId: (parent) => parent
  }

export async function createAsset(
  parent: unknown,
  {
    data
  }: {
    data: Pick<Asset, 'name' | 'quantity' | 'value' | 'assetTypeId' | 'attributeId' | 'userId'>
  },
  { orm }: { orm : PrismaClient }
): Promise<Asset> {
  const { name, quantity, value, assetTypeId, attributeId, userId } = data
  const asset = await orm.asset.create({
    data: {
      name: name,
      quantity: quantity,
      value: value,
      assetTypeId: assetTypeId,
      attributeId: attributeId,
      userId: userId
    },
    include: {
      user: true,
      type: true
    }
  })

  return asset
}

export async function updateAsset(
  parent: unknown,
  {
    where,
    data,
  }: {
    where: Pick<Asset, 'id' >,
    data: Pick<Asset, 'name' | 'quantity' | 'value' | 'assetTypeId' | 'attributeId' >
  },
  { orm }: { orm : PrismaClient }
): Promise<Asset> {
  const { name, quantity, value, assetTypeId, attributeId } = data
  let { id } = where
  if (typeof(id) === 'string') {
    id = parseInt(id)
  }
  const asset = await orm.asset.update({
    where: {
      id: id
    },
    data: {
      name: name,
      quantity: quantity,
      value: value,
      assetTypeId: assetTypeId,
      attributeId: attributeId
    }
  })

  return asset
}

export async function deleteAsset(
  parent: unknown,
  {
    where,
  }: {
    where: Pick<Asset, 'id'>
  },
  { orm }: { orm: PrismaClient }
): Promise<Asset> {
  const { id } = where
  const asset = await orm.asset.delete({
    where: {
      id: id
    }
  })

  return asset
}