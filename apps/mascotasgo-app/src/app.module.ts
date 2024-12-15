import { Module } from '@nestjs/common';
import { userModule } from './user/user.module';
import { UserService } from './user/user.service';
import { PrismaService } from './prisma.service';
import { welcomeController } from './welcome.controller';

@Module({
  imports: [
    userModule,
  ],
  providers: [UserService, PrismaService],
  controllers: [welcomeController]

})
export class AppModule {}
