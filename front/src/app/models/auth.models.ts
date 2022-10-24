export interface LoginModel {
  login: string,
  password: string,
}

export interface SignupModel extends LoginModel {
  nickname: string
}
