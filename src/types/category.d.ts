type TCategoryFilter = {
  PageSize?: number;
  PageIndex?: number;
  TotalPage?: number;
  Total?: number;
  SearchByName?: string;
  IsPublish?: boolean;
  FromDate?: number;
  ToDate?: number;
  Sort?: number;
};

type TCreateCategory = {
  _id?: string;
  Name: string;
  Color: string;
  Description: string;
  IsFeature: boolean;
  IsPublish: boolean;
};

type TCategory = {
  _id: string;
  Name: string;
  IsFeature: boolean;
  Color: string;
  Description: string;
  Created: Date;
  CreatedBy: string;
  Updated: Date;
  UpdatedBy: string;
  Articles?: number;
  IsPublish: boolean;
};
