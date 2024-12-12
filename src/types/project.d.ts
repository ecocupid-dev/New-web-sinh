type TProjectFilter = {
  PageSize?: number;
  PageIndex?: number;
  TotalPage?: number;
  Total?: number;
  SearchByName?: string;
  CountryId?: number
  IsPublish?: boolean
  FromDate?: number;
  ToDate?: number;
  Sort?: number;
};

type TProject = {
  _id?: string;
  Title: string;
  Image?: string;
  Description?: string;
  CountryId: number;
  Created?: Date;
  CreatedBy?: string;
  Updated?: Date;
  UpdatedBy?: string;
  Articles?: number;
  Videos?: number;
  IsPublish?: boolean
};
