type TUser = {
  _id: string;
  UserName: string;
  RoleID: number;
  Avatar: string;
  Description: string;
  Email: string;
  LinkedIn: string;
  Created?: Date | null;
  CreatedBy?: string;
  Updated?: Date | null;
  UpdatedBy?: string;
};

type TCreateUser = {
  _id?: string;
  UserName: string;
  Password: string;
  ConfirmPassword: string;
  Avatar?: string;
  Description?: string;
  Email: string;
  LinkedIn?: string;
  RoleID: number;
  NewPassword?: string;
  NewPasswordConfirm?: string;
};

type TUserFilter = {
  PageSize?: number;
  PageIndex?: number;
  TotalPage?: number;
  Total?: number;
  SearchByName?: string;
  RoleID?: number;
  FromDate?: number;
  ToDate?: number;
  Sort?: number;
}