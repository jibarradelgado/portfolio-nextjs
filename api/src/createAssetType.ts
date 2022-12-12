import { PrismaClient } from '@prisma/client'
import prompt from 'prompt'

const orm = new PrismaClient()

prompt.start()

prompt.get(
  [
    {
      name: 'username',
      pattern: /^[a-zA-Z\s\-]+$/,
      message: 'Name must be only letters, spaces, or dashes',
      required: true,
    },
  ],
  async function (err, result) {
    if (err) {
      console.warn('Huh. Something went wrong.')
      return
    }
    const username = result.username as string

    const user = await orm.user.findUnique({
      where: { username },
      }
    )

    if (user != null) {
      const assetType = await orm.assetType.create({
        data: {
          name: "General",
          targetPercentage: 100,
          userId: user.id
        }
      })
      console.log(`General assetType with id ${assetType.id} created\n`)
    }
  })
