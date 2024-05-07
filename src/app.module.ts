import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  controllers: [],
  providers: [],
  imports: [ 
    UserModule, 
    AuthModule,
    MongooseModule.forRoot('mongodb://localhost:27017/load-crust-crm'),
    ServeStaticModule.forRoot({ rootPath:join(__dirname,'..','public') }),
  ],
  
})
export class AppModule {}
