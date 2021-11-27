import { Module } from '@nestjs/common';
import { SharedModule } from '@module/shared/shared.module';
import { PrismaService } from '../shared/prisma/prisma.service';
import { UploadRecipeService } from './application/service/upload-recipe.service';
import { RecipeResolver } from './presentation/http/graphql/recipe-resolver';

@Module({
  imports: [SharedModule],
  providers: [PrismaService, UploadRecipeService, RecipeResolver],
})
export class RecipeModule {}
