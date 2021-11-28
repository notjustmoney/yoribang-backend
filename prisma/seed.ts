import * as dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { FileGroup, RecipeCategoryGroup } from '../src/core/graphql/schema';

dotenv.config();
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding...');
  await prisma.$connect();

  await prisma.attachmentGroup.createMany({
    data: [
      {
        name: FileGroup.USER_AVATAR,
        code: 'user/avatar',
      },
      {
        name: FileGroup.RECIPE_THUMBNAIL,
        code: 'recipe/thumbnail',
      },
      {
        name: FileGroup.RECIPE_VIDEO,
        code: 'recipe/video',
      },
      {
        name: FileGroup.RECIPE_IMAGE,
        code: 'recipe/image',
      },
    ],
  });

  await prisma.recipeCategoryGroup.createMany({
    data: [
      {
        name: RecipeCategoryGroup.COUNTRY,
        code: 'country',
      },
      {
        name: RecipeCategoryGroup.FOOD,
        code: 'food',
      },
      {
        name: RecipeCategoryGroup.INGREDIENT,
        code: 'ingredient',
      },
    ],
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
