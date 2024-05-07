
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user'
}

export enum ERROR_CODE {
  DUPLICATE_KEY = 11000,
}

export enum UserError {
  CreatingUserInternalError = 'Error creating user',
  FindingUserInternalError = 'Error finding user',
  INVALID_ROLE = 'Invalid role, please provide a vilde role',
  InvalidId = 'Invalid user id',
  RequiredUserId = 'The user id is required',
  RemovingUserInternalError = 'Error removing user',
  UserExist = 'This email already exists in the database',
  UserNotFound = 'User not found'
}
