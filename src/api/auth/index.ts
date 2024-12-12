import BaseAPI from "../method";

const { post } = new BaseAPI("authen");

export const authenticate = {
  login: (data: TLogin) =>
    post<{ AccessToken: string }>("/login", data),
};
