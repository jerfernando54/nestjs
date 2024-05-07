import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { AuthDto }      from './dto/auth.dto';
import { UserService }  from 'src/user/user.service';
import { UserDto } from 'src/user/dto';


@Injectable()
export class AuthService {
  constructor( 
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async login( authDto: AuthDto ): Promise<{access_token: string}> {
    const {email, password} = authDto;
    
    try {
      const user: UserDto = await this.userService.findOne(email, true);
      
    if (!user || !(await this.validationPassword(password, user.password)))
      throw new HttpException('Wrong email or password', HttpStatus.UNAUTHORIZED)

    const payload = {
      id: user._id, 
      name: user.name, 
      email: user.email,
      rol: user.rol
    } 

    const access_token = await this.jwtService.signAsync(payload)
    
    return {access_token};
    
    } catch (error) {
      throw new HttpException('Wrong email or password', HttpStatus.UNAUTHORIZED)
    }
  }

  logout(){
    return 'logout successful';
  }

  private async validationPassword(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainTextPassword, hashedPassword)
  }

}
