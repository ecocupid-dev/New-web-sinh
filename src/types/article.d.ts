type TArticleFilter = {
  PageSize?: number;
  PageIndex?: number;
  TotalPage?: number;
  Total?: number;

  UserId?: string;
  IsPublish?: boolean
  
  Title?: string;
  CategoryId?: string;
  FromDate?: number;
  ToDate?: number;
  IsMostImpactful?: boolean
  CountryId?: number;
  IsNewest?: boolean;
  IsOldest?: boolean
};

type TArticles = {
  _id: string;

  IsFeature: boolean;
  OldId?: string;
  Thumnail?: string;
  Title?: string;
  Content?: string;
  Summary?: string;
  ProjectId?: string;
  ProjectName?: string;
  CategoryId?: string;
  CategoryName?: string;
  Tags?: string[];
  Created?: Date;
  CreatedBy?: string;
  Updated?: Date;
  UpdatedBy?: string;
  CountryId?: number;
  WriterId?: string;
  WriterName?: string;
  IsPublish?: boolean

  // for seo
  OgUrl?: string;
  MetaKeywords?: string;
  MetaTitle?: string;
  OgxTitle?: string;
  OgTitle?: string;
  OgFacebookTitle?: string;
  MetaDescription?: string;
  OgDescription?: string;
  OgxDescription?: string;
  OgFacebookDescription?: string;
  OgFacebookImage?: string;
  OgxImage?: string;
};
