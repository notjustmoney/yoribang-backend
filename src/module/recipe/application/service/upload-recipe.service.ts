import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/prisma/prisma.service';
import { FileGroup, RecipeUploadInput } from '@core/graphql/schema';
import { Attachment, AttachmentGroup, User } from '@prisma/client';

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
      include: { group: true },
    });

    this.verifyAttachmentOwner(thumbnail, user.id);
    this.verifyAttachmentGroup(thumbnail, FileGroup.RECIPE_THUMBNAIL);

    return await this.prisma.recipe.create({
      data: {
        thumbnail: { connect: { id: thumbnailId } },
        title,
        food,
        difficulty,
        cookTime,
        serving,
        description,
        writer: { connect: { id: user.id } },
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

  private verifyAttachmentOwner(attachment: Attachment, userId: string) {
    if (attachment.uploaderId !== userId) {
      throw new Error('forbidden resource access');
    }
  }

  private verifyAttachmentGroup(
    attachment: Attachment & { group: AttachmentGroup },
    groupName: FileGroup,
  ) {
    if (attachment.group.name !== groupName) {
      throw new Error('attachment group not matched');
    }
  }
}
