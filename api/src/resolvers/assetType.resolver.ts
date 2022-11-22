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

  export async function upsertAssetType(
    parent: unknown,
    {
      where,
      data,
    }: {
      where: Pick<AssetType, 'id' >,
      data: Pick<AssetType, 'name' | 'targetPercentage' | 'userId'>
    },
    { orm }: { orm : PrismaClient }
  ): Promise<AssetType> {
    const { name, targetPercentage, userId } = data
    const { id } = where
    const assetType = await orm.assetType.upsert({
      where: {
        id: id
      },
      update: {
        name: name,
        targetPercentage: targetPercentage,
      },
      create: {
        name: name,
        targetPercentage: targetPercentage,
        userId: userId
      }
    })

  return assetType
}