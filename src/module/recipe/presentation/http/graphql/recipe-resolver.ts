import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { CurrentUser } from '../../../../../auth/decorator/current-user.decorator';
import { JwtAuthGuard } from '../../../../../auth/guard/jwt-auth.guard';
import { RecipeUploadInput } from '../../../../../core/graphql/schema';
import { PrismaService } from '../../../../shared/prisma/prisma.service';
import { UploadRecipeService } from '../../../application/service/upload-recipe.service';

@Resolver('Recipe')
export class RecipeResolver {
  constructor(
    private readonly prisma: PrismaService,
    private readonly uploadRecipeSerivce: UploadRecipeService,
  ) {}

  @Mutation('uploadRecipe')
  @UseGuards(JwtAuthGuard)
  async uploadRecipe(
    @Args('input') input: RecipeUploadInput,
    @CurrentUser() user: User,
  ) {
    return this.uploadRecipeSerivce.uploadRecipe(input, user);
  }
}
