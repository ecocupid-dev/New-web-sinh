import BaseAPI from "../method";

const { globalCRUD, get } = new BaseAPI("home");

export const homeAPI = {
  ...globalCRUD,
  getCategoryList: (params: { IsFeature?: boolean; IsPublish?: boolean }) =>
    get<THomeCategory[]>("/category-list", { params }),
  getVideoList: (params?: {
    IsFeature?: boolean;
    IsMostView?: boolean;
    IsNewest?: boolean;
    Limit?: number;
  }) => get<THomeVideo[]>("/video-list", { params }),
  getEcoHeroesList: () => get<THomeHeroes[]>("/eco-heroes-list"),
  getEcoProjectlist: () => get<THomeProject>("/eco-project-list"),
  getEcoArticleByCatIDlist: (params: {
    CategoryId: string;
    IsFeature?: boolean;
    IsMostView?: boolean;
    IsNewest?: boolean;
    Limit?: number;
  }) => get<TListArticleByCatId[]>("/eco-article-by-category-id", { params }),
  getEcoFullArticle: (params: {
    IsFeature?: boolean;
    IsMostView?: boolean;
    IsNewest?: boolean;
    Limit?: number;
  }) => get<TListArticleByCatId[]>("/eco-full-article-category", { params }),
  getEcoArticleWithoutCatIDlist: (params: {
    CategoryId: string;
    IsFeature?: boolean;
    IsMostView?: boolean;
    IsNewest?: boolean;
    Limit?: number;
  }) =>
    get<TListArticleByCatId[]>("/eco-article-without-category-id", { params }),
  getMultipleResources: (params: TGetGetMultipleResourcesParams) =>
    get<TCommonResource[]>("/multiple-resources", { params }),
};
