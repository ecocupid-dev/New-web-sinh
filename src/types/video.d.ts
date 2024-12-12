type TVideoFilter = {
  PageSize?: number;
  PageIndex?: number;
  TotalPage?: number;
  Total?: number;
  SearchByName?: string;
  FromDate?: number;
  ToDate?: number;
  Sort?: number;
};

type TVideo = {
  _id?: string;
  Title: string;
  IsFeature: boolean;
  IsPublish: boolean;
  Thumnail: string;
  Content: string;
  Summary: string;
  ProjectId: string;
  ProjectName?: string;
  LinkYoutube: string;
  Tags?: string[];

  Created?: Date;
  CreatedBy?: string;
  Updated?: Date;
  UpdatedBy?: string;

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
