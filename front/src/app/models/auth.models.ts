export interface LoginModel {
  login: string,
  password: string,
}

export interface SignupModel extends LoginModel {
  nickname: string
}

export type AuthToken = {
  access_token: string
}
export type Room = { id: number, code: string, roomUsers: RoomUser[] };

export type User = {
  username: string,
  id: number,
  rooms: Room[];
}

export type RoomUser = {
  balance: number,
  room: Room,
  user: User,
  id: number
}
