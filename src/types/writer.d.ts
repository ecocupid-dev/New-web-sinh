type TWriter = {
  _id?: string;
  UserName?: string;
  Avatar?: string;
  LinkedIn?: string;
  Email?: string;
  Description?: string;
  Created?: Date;
  CreatedBy?: string;
  Updated?: Date;
  UpdatedBy?: string;
  IsPublish?: boolean
}

type TWriterFilter = {
  PageSize?: number;
  PageIndex?: number;
  TotalPage?: number;
  Total?: number;
  SearchByName?: string;
  IsPublish?: boolean
  FromDate?: number;
  ToDate?: number;
  Sort?: number;
}