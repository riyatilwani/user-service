export interface BaseUser {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    mobile: number;
}

export interface User extends BaseUser {
    isActive: boolean;
  }