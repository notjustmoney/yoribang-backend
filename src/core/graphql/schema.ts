
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum FileGroup {
    USER_AVATAR = "USER_AVATAR",
    RECIPE_THUMBNAIL = "RECIPE_THUMBNAIL",
    RECIPE_VIDEO = "RECIPE_VIDEO",
    RECIPE_IMAGE = "RECIPE_IMAGE"
}

export enum CommentType {
    RECIPE = "RECIPE",
    COOK_DIRAY = "COOK_DIRAY"
}

export enum AlleyShopItemType {
    SIGNATURE = "SIGNATURE",
    RECOMMENDED = "RECOMMENDED",
    GENERAL = "GENERAL"
}

export enum ReviewType {
    RECIPE = "RECIPE",
    ALLEY_SHOP = "ALLEY_SHOP"
}

export enum RecipeCategoryGroup {
    COUNTRY = "COUNTRY",
    FOOD = "FOOD",
    INGREDIENT = "INGREDIENT"
}

export enum ChiefApplyState {
    PENDING = "PENDING",
    REJECT = "REJECT",
    ACCEPT = "ACCEPT"
}

export enum ShopApplyState {
    PENDING = "PENDING",
    REJECT = "REJECT",
    ACCEPT = "ACCEPT"
}

export class SendVerificationCodeInput {
    phoneNumber: string;
}

export class LoginInput {
    phoneNumber: string;
    verificationCode: string;
}

export class FileUploadInput {
    file: Upload;
    group: FileGroup;
}

export class RecipeIngredientUploadInput {
    ingredientId: string;
    amount?: Nullable<number>;
    unit?: Nullable<string>;
}

export class RecipeStepUploadInput {
    title?: Nullable<string>;
    step?: Nullable<number>;
    video: string;
    attachmentIds?: Nullable<string[]>;
    ingredients?: Nullable<Nullable<RecipeIngredientUploadInput>[]>;
    description?: Nullable<string>;
}

export class RecipeUploadInput {
    thumbnailId: string;
    title: string;
    difficulty: number;
    food: string;
    categories?: Nullable<string[]>;
    description: string;
    cookTime: number;
    serving: number;
    steps: RecipeStepUploadInput[];
}

export class Meta {
    pagination?: Nullable<Pagination>;
}

export class Pagination {
    first?: Nullable<number>;
    size?: Nullable<number>;
}

export class RecipeDetailInput {
    id: string;
    comment?: Nullable<FindCommentInput>;
}

export class FindCommentInput {
    type?: Nullable<CommentType>;
    meta?: Nullable<Meta>;
}

export interface Like {
    count: number;
    self: boolean;
    user: Writer;
}

export class User {
    id: string;
    nickname: string;
    phoneNumber: string;
    avatar?: Nullable<Attachment>;
    isChief: boolean;
    chiefApplyState?: Nullable<ChiefApplyState>;
    shopApplyState?: Nullable<ShopApplyState>;
    locationInfo: Nullable<LocationInfo>[];
    shop?: Nullable<AlleyShopItem>;
    followerCount: number;
    followers: User[];
    followings: User[];
    diaries: CookDiary[];
    cookPlayground: Post[];
    scrappedRecipe: Recipe[];
    likePost: Post[];
    recipes: Recipe[];
    createdAt: DateTime;
    updatedAt?: Nullable<DateTime>;
    blockedAt?: Nullable<DateTime>;
}

export class LocationInfo {
    radius: number;
}

export class Comment {
    id: string;
    type: CommentType;
    writer: Writer;
    content: string;
    depth: number;
    like: CommentLike;
    parent?: Nullable<Comment>;
    childs: Comment[];
    locationInfo?: Nullable<LocationInfo>;
    createdAt: DateTime;
    updatedAt?: Nullable<DateTime>;
    blockedAt?: Nullable<DateTime>;
}

export class CommentLike implements Like {
    count: number;
    self: boolean;
    user: Writer;
    comment: Comment;
}

export class Review {
    id: string;
    writer: User;
    type: ReviewType;
    content: string;
    images: string[];
    createdAt: DateTime;
    updatedAt?: Nullable<DateTime>;
    blockedAt?: Nullable<DateTime>;
}

export class Attachment {
    id: string;
    originalName?: Nullable<string>;
    extension?: Nullable<string>;
    group?: Nullable<string>;
    url?: Nullable<string>;
}

export class Recipe {
    id: string;
    writer: User;
    title: string;
    food: string;
    thumbnail: Attachment;
    difficulty: number;
    cookTime: number;
    serving: number;
    categories?: Nullable<RecipeCategory[]>;
    description: string;
    comments: Comment[];
    ingredients: RecipeIngredient[];
    steps: RecipeStep[];
    isScrapped: boolean;
}

export class RecipeCategory {
    id: string;
    name: string;
    type?: Nullable<RecipeCategoryGroup>;
    parent?: Nullable<RecipeCategory>;
    childs: RecipeCategory[];
    recipes: Recipe[];
}

export class RecipeIngredient {
    id: string;
    recipe: Recipe;
    ingredient: Ingredient;
    amount?: Nullable<number>;
    unit?: Nullable<IngredientUnit>;
}

export class RecipeStep {
    id: string;
    step: number;
    title: string;
    description: string;
    ingredients: RecipeIngredient[];
    attachments: Attachment[];
    video: Attachment;
}

export class Ingredient {
    id: string;
    name: string;
    possibleUnits: IngredientUnit[];
    categories: IngredientCategory[];
}

export class IngredientUnit {
    name: string;
    ingredients: Ingredient[];
}

export class IngredientCategory {
    id: string;
    name: string;
    parent?: Nullable<IngredientCategory>;
    childs: IngredientCategory[];
    ingredients: Ingredient[];
}

export class CookDiaryLike implements Like {
    count: number;
    self: boolean;
    user: User;
    diary: CookDiary;
}

export class CookDiaryTag {
    id: string;
    name: string;
    diaries: CookDiary[];
}

export class CookDiary {
    id: string;
    writer: User;
    images: Attachment[];
    locationInfo?: Nullable<LocationInfo>;
    title: string;
    content: string;
    like: CookDiaryLike;
    comments: Comment[];
    tags: CookDiaryTag[];
    attachedRecipe?: Nullable<Recipe>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
}

export class PostLike implements Like {
    count: number;
    self: boolean;
    user: User;
    post: Post;
}

export class PostCategory {
    id: string;
    name: string;
    posts: Post[];
}

export class Post {
    id: string;
    writer: Writer;
    title?: Nullable<string>;
    content: string;
    locationInfo?: Nullable<LocationInfo>;
    like: Like;
    comments: Comment[];
    attachments: Attachment[];
    attachedRecipe?: Nullable<Recipe>;
    category: PostCategory;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
}

export class AlleyShop {
    id: string;
    locationInfo: LocationInfo;
    roadAddress: string;
    detailAddress: string;
    name: string;
    thumbnails: Attachment[];
    notice?: Nullable<string>;
    introduction: string;
    businessHours: string;
    website: string;
    phoneNumber: string;
    items: AlleyShopItemType[];
    news: Post[];
    patronFeed: Post[];
    reviews: Review[];
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
}

export class AlleyShopItem {
    id: string;
    name: string;
    price: number;
    type: AlleyShopItemType;
    shop: AlleyShop;
    description?: Nullable<string>;
}

export abstract class IQuery {
    abstract me(): User | Promise<User>;

    abstract userById(id: string): User | Promise<User>;

    abstract attachmentById(id: string): Attachment | Promise<Attachment>;

    abstract recipeById(input?: Nullable<RecipeDetailInput>): Recipe | Promise<Recipe>;
}

export abstract class IMutation {
    abstract sendVerificationCode(input?: Nullable<SendVerificationCodeInput>): Nullable<string> | Promise<Nullable<string>>;

    abstract login(input?: Nullable<LoginInput>): string | Promise<string>;

    abstract uploadRecipe(input: RecipeUploadInput): Recipe | Promise<Recipe>;
}

export type DateTime = any;
export type Upload = any;
export type Writer = User | AlleyShop;
type Nullable<T> = T | null;
