import type { Attribute, PrismaClient, Prisma } from '@prisma/client'

type ResolverParent = unknown
type ResolverContext = {
  orm: PrismaClient
}

export function findAll(
  parent: ResolverParent,
  args: { where?: Prisma.AttributeWhereInput },
  context: ResolverContext
): Promise<Attribute[]> {
  return context.orm.attribute.findMany({
    where: args.where,
  })
}

export const resolver: Record<
  keyof (Attribute),
  (parent: Attribute ) => unknown
  > = {
    id: (parent) => parent.id,
    updatedAt: (parent) => parent.updatedAt,
    type: (parent) => parent.type,
    name: (parent) => parent.name,
    symbol: (parent) => parent.symbol,
    lastValue: (parent) => parent.lastValue,
  }

export async function createAttribute(
  parent: unknown,
  {
    data
  }: {
    data: Pick<Attribute, 'type' | 'name' | 'symbol' | 'lastValue'>
  },
  { orm }: { orm : PrismaClient }
): Promise<Attribute> {
  const { type, name, symbol, lastValue } = data
  const attribute = await orm.attribute.create({
    data: {
      type: type,
      name: name,
      symbol: symbol,
      lastValue: lastValue
    }
  })
  return attribute
}

export async function upsertAttribute(
  parent: unknown,
  {
    where,
    data
  }: {
    where: Pick<Attribute, 'symbol'>
    data: Pick<Attribute, 'type' | 'name' | 'symbol' | 'lastValue' >
  },
  { orm }: { orm : PrismaClient }
): Promise<Attribute> {
  const { type, name, symbol, lastValue } = data
  const { symbol: symbolWhereNull } = where
  let symbolWhere: string | undefined
  if (symbolWhereNull != null) {
      symbolWhere = symbolWhereNull
  }
  const attribute = await orm.attribute.upsert({
    where: {
      symbol: symbolWhere
    },
    create: {
      type: type, 
      name: name,
      symbol: symbol,
      lastValue: lastValue
    },
    update: {
      lastValue: lastValue
    }
  })
  return attribute
}

export async function updateAttribute(
  parent: unknown,
  {
    where,
    data
  }: {
    where: Pick<Attribute, 'symbol' >,
    data: Pick<Attribute, 'type' | 'name' | 'symbol' | 'lastValue' >
  },
  { orm }: { orm : PrismaClient }
): Promise<Attribute> {
  const { type, name, symbol, lastValue } = data
  const { symbol: symbolWhereNull } = where
  let  symbolWhere: string | undefined
  if (symbolWhereNull != null) {
      symbolWhere = symbolWhereNull
  }
  const attribute = await orm.attribute.update({
    where: {
      symbol: symbolWhere
    },
    data: {
      type: type,
      name: name,
      symbol: symbol,
      lastValue: lastValue
    }
  })
  return attribute
}

export async function deleteAttribute(
  parent: unknown,
  {
    where,
  }: {
    where: Pick<Attribute, 'id'>
  },
  { orm }: { orm: PrismaClient }
): Promise<Attribute> {
  const { id } = where
  const attribute = await orm.attribute.delete({
    where: {
      id: id
    }
  })

  return attribute
}