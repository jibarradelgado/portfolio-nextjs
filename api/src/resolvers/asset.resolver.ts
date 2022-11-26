import type { Asset, Attribute, User, AssetType, PrismaClient } from '@prisma/client'

type ResolverContext = {
  orm: PrismaClient
}

export function findAll(
  parent: unknown,
  arg: unknown,
  context: ResolverContext
): Promise<Asset[]> {
  return context.orm.asset.findMany()
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