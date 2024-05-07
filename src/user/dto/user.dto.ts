import { User } from "../entities/user.entity";

export interface UserDto {
  _id:      string;
  name:     string;
  email:    string;
  rol:      string;
  password?: string
}

export function singularUser (user: User): UserDto {
  return user.password
    ? 
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        rol: user.rol,
        password: user.password
      }
    :
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        rol: user.rol
      }
};

export function multipleUsers (users: User[]): UserDto[] {
  return users.map(user => singularUser(user))
}


 
