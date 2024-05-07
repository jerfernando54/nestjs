import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { isEmail } from 'class-validator';

import { User } from './entities/user.entity';
import { ERROR_CODE, UserError, UserRole } from './constants';
import { CreateUserDto, UpdateUserDto, UserDto, singularUser, multipleUsers} from './dto/index';
import { Console } from 'console';


@Injectable()
export class UserService {

  @InjectModel( User.name )
  private readonly userModel: Model<User>

  async create(createUserDto: CreateUserDto) {
    
    try {
      const { password, rol} = createUserDto;

      if ( !(rol.toUpperCase() in UserRole) )
        throw new BadRequestException('INVALID_ROLE', UserError.INVALID_ROLE);

      createUserDto.password = await bcrypt.hash(password, 12);

      const userRol = UserRole[rol.toUpperCase()]
      const newUser = {
        ...createUserDto,
        rol:userRol
      }
      
      const user: User = await this.userModel.create( newUser );

      const userDto: UserDto = singularUser(user)

      return userDto

    } catch (error) {
      if (error.message && error.message === 'INVALID_ROLE') {
        throw error
      }
      if (error.code == ERROR_CODE.DUPLICATE_KEY){
        const {email} = error.keyValue;
        throw new BadRequestException(`${UserError.UserExist}: ${email}`)
      }
      else {
        throw new InternalServerErrorException(UserError.CreatingUserInternalError)
      }
    }
  }

  async findAll(): Promise<UserDto[]> {
    const users: User[] = await this.userModel.find({},{password: false, __v: false})
    const usersDto = multipleUsers(users)
    return usersDto
  }

  async findOne(term: string, isAuth?: boolean): Promise<UserDto> {
    this.validatTerm(term)
    
    try {
      let query : { _id: string } | { email: string } = { _id: term };
      let proyection : { password: 0, __v: 0} | {} = { password: 0, __v: 0};

      if (isAuth) {
        query = { email: term }
        proyection = {__v: 0};

      }

      const user: User = await this.userModel.findOne(query, proyection);
      
      if ( !user)
        throw new NotFoundException(UserError.UserNotFound);

      const userDto : UserDto = singularUser(user);
      
      return userDto;

    } catch (error) {

      if (error instanceof BadRequestException || error instanceof NotFoundException)
        throw error;

      throw new InternalServerErrorException(UserError.FindingUserInternalError);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    this.validatTerm(id)
    
    return `This action updates a #${id} user`;
  }
  
  async remove(id: string) {
    this.validatTerm(id)

    try {
      const { deletedCount } = await this.userModel.deleteOne({ _id:id });

      if( deletedCount === 0 )
        throw new NotFoundException(UserError.UserNotFound);
      
    } catch (error) {
      if ( error instanceof BadRequestException || error instanceof NotFoundException )
        throw error;

      throw new InternalServerErrorException(UserError.RemovingUserInternalError)
    }
  }

  private validatTerm(term: string) {
    if ( !term )
      throw new BadRequestException(UserError.RequiredUserId);
    
    if (!isValidObjectId(term) && !isEmail(term))
      throw new BadRequestException(UserError.InvalidId);

    return true;

  }
}



