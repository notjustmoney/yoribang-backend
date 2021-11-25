
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
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

export enum RecipeCategoryType {
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
    avatar?: Nullable<File>;
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
    created: DateTime;
    updated?: Nullable<DateTime>;
    blocked?: Nullable<DateTime>;
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
    created: DateTime;
    updated?: Nullable<DateTime>;
    blocked?: Nullable<DateTime>;
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
    created: DateTime;
    updated?: Nullable<DateTime>;
    blocked?: Nullable<DateTime>;
}

export class File {
    id: string;
}

export class Recipe {
    id: string;
    writer: User;
    title: string;
    food: string;
    thumbnail: string;
    difficulty: number;
    cookTime: number;
    serving: number;
    categories: RecipeCategory[];
    description: string;
    comments: Comment[];
    ingredients: RecipeIngredient[];
    steps: RecipeStep[];
    isScrapped: boolean;
}

export class RecipeCategory {
    id: string;
    name: string;
    type?: Nullable<RecipeCategoryType>;
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
    attachments: File[];
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
    images: File[];
    locationInfo?: Nullable<LocationInfo>;
    title: string;
    content: string;
    like: CookDiaryLike;
    comments: Comment[];
    tags: CookDiaryTag[];
    attachedRecipe?: Nullable<Recipe>;
    created?: Nullable<DateTime>;
    updated?: Nullable<DateTime>;
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
    attachments: File[];
    attachedRecipe?: Nullable<Recipe>;
    category: PostCategory;
    created?: Nullable<DateTime>;
    updated?: Nullable<DateTime>;
}

export class AlleyShop {
    id: string;
    locationInfo: LocationInfo;
    roadAddress: string;
    detailAddress: string;
    name: string;
    thumbnails: File[];
    notice?: Nullable<string>;
    introduction: string;
    businessHours: string;
    website: string;
    phoneNumber: string;
    items: AlleyShopItemType[];
    news: Post[];
    patronFeed: Post[];
    reviews: Review[];
    created?: Nullable<DateTime>;
    updated?: Nullable<DateTime>;
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

    abstract recipeById(input?: Nullable<RecipeDetailInput>): Recipe | Promise<Recipe>;
}

export abstract class IMutation {
    abstract sendVerificationCode(input?: Nullable<SendVerificationCodeInput>): Nullable<string> | Promise<Nullable<string>>;

    abstract login(input?: Nullable<LoginInput>): string | Promise<string>;
}

export type DateTime = any;
export type Writer = User | AlleyShop;
type Nullable<T> = T | null;
