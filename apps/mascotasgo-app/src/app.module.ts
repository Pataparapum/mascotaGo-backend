import { Module } from '@nestjs/common';
import { userModule } from './user/user.module';
import { UserService } from './user/user.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    userModule,
  ],
  providers: [UserService, PrismaService]

})
export class AppModule {}
