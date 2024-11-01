import { Module } from '@nestjs/common';
import { userModule } from './user/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserService } from './user/user.service';
import { PrismaService } from './prisma.service';
import { PassportModule } from '@nestjs/passport';
import { LoginModule } from './login/loginModule';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    userModule,
    LoginModule, 
    PassportModule,
    JwtModule,
    ConfigModule.forRoot({
      envFilePath: '../env/development.env',
      isGlobal: true
    })
  ],
  providers: [UserService, JwtService, PrismaService]

})
export class AppModule {}
