import type { User, AssetType, PrismaClient, Prisma } from '@prisma/client'

type ResolverParent = unknown
type ResolverContext = {
  orm: PrismaClient
}

export function findAll(
  parent: ResolverParent,
  args: { where?: Prisma.AssetTypeWhereInput },
  context: ResolverContext
): Promise<AssetType[]> {
  return context.orm.assetType.findMany({
    include: {
      user: true,
    },
    where: args.where,
  })
}

export const resolver: Record<
  keyof (AssetType & {user: User}),
  (parent: AssetType & {user: User}) => unknown
  > = {
    id: (parent) => parent.id,
    createdAt: (parent) => parent.createdAt,
    updatedAt: (parent) => parent.updatedAt,
    name: (parent) => parent.name,
    targetPercentage: (parent) => parent.targetPercentage,
    user: (parent) => ({
      id: parent.user.id,
      username: parent.user.username
    }),
    userId: (parent) => parent.userId,
  }

export async function createAssetType(
  parent: unknown,
  {
    data
  }: {
    data: Pick<AssetType, 'name' | 'targetPercentage' | 'userId'>
  },
  { orm }: { orm : PrismaClient }
): Promise<AssetType> {
  const { name, targetPercentage, userId } = data
  const assetType = await orm.assetType.create({
    data: {
      name: name,
      targetPercentage: targetPercentage,
      userId: userId
    },
    include: {
      user: true,
    },
  })
  return assetType
}

export async function updateAssetType(
  parent: unknown,
  {
    where,
    data
  }: {
    where: Pick<AssetType, 'id' >,
    data: Pick<AssetType, 'name' | 'targetPercentage'>
  },
  { orm }: { orm : PrismaClient }
): Promise<AssetType> {
  const { name, targetPercentage } = data
  let { id } = where
  if (typeof(id) === 'string') {
    id = parseInt(id)
  }
  const assetType = await orm.assetType.update({
    where: {
      id: id
    },
    data: {
      name: name,
      targetPercentage: targetPercentage
    },
    include: {
      user: true,
    }
  })
  return assetType
}

export async function deleteAssetType(
  parent: unknown,
  {
    where,
  }: {
    where: Pick<AssetType, 'id'>
  },
  { orm }: { orm: PrismaClient }
): Promise<AssetType> {
  const { id } = where
  const assetType = await orm.assetType.delete({
    where: {
      id: id
    },
    include: {
      user: true,
    }
  })

  return assetType
}