import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/prisma/prisma.service';
import { RecipeUploadInput } from '@core/graphql/schema';
import { User } from '@prisma/client';

@Injectable()
export class UploadRecipeService {
  constructor(private readonly prisma: PrismaService) {}

  async uploadRecipe(input: RecipeUploadInput, user: User) {
    const {
      thumbnailId,
      title,
      difficulty,
      food,
      categories,
      description,
      cookTime,
      serving,
      steps,
    } = input;
    const thumbnail = await this.prisma.attachment.findUnique({
      where: { id: thumbnailId },
    });
    // if (
    //   user.id === '6e2a7753-0f33-495f-b501-dffdbff3ca9c' ||
    //   thumbnail.userId !== user.id
    // ) {
    //   throw new Error('forbidden resource access');
    // }

    return await this.prisma.recipe.create({
      data: {
        thumbnail: {
          connect: {
            id: '6e2a7753-0f33-495f-b501-dffdbff3ca9c',
          },
        },
        title,
        food,
        difficulty,
        cookTime,
        serving,
        description,
        writer: {
          connect: {
            id: user.id,
          },
        },
        steps: {
          createMany: {
            data: steps.map((item) => ({
              step: item.step,
              title: item.title,
              description: item.description,
            })),
          },
        },
      },
    });
  }
}
