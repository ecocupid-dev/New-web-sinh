type THomeCategory = {
  _id: string;
  Name: string;
  Code?: string;
  Description?: string;
};

type TListArticleByCatId = {
  _id?: string;
  CountryId: number;
  Title: string;
  OgUrl: string;
  Summary: string;
  Thumnail: string;
  Tags: string[];
  CatName: string;
  CatColor: string;
  Created: string;
  Author: {
    _id: string;
    UserName: string;
    Avatar: string;
  };
};

type TArticleByCatId = {
  _id: string;
  List: TListArticleByCatId[];
};

type THomeVideo = {
  _id: string;
  Title: string;
  Thumnail: string;
  LinkYoutube: string;
  OgUrl: string;
  Tags: string[];
  Summary: string;
};

type THomeHeroes = {
  _id: string;
  Image: string;
  Title: string;
  // Description: string;
  articleCount: number;
};

type TProjectObject = {
  _id: string;
  Title: string;
  Image: string;
  CountryId: number;
};

type THomeProject = {
  projects: {
    [countryId: number]: TProjectObject[];
  };
  totalProject: number;
};

type TMenuChildren = {
  Id: string;
  Name: string;
  Path: string;
};

type TMenu = {
  Id: number;
  Name: string;
  Path: string;
  Childrens?: TMenuChildren[];
};

type TGetGetMultipleResourcesParams = {
  PageIndex: number;
  PageSize: number;
  Search?: string;
  Sort?: number;
  FromDate?: number;
  ToDate?: number;
  CategoryId?: string;
  CountryId?: number;
  ResourceType?: string;
};

type TMultipleResourcesFilter = TGetGetMultipleResourcesParams & {
  Total?: number;
  TotalPage?: number;
};

type TCommonResource = {
  _id?: string;
  CountryId: number;
  Title: string;
  OgUrl: string;
  Summary: string;
  Thumnail: string;
  Tags: string[];
  CatName: string;
  CatColor: string;
  Created: string;
  Author: {
    _id: string;
    UserName: string;
    Avatar: string;
  };
  ResourceType?: number;
};
