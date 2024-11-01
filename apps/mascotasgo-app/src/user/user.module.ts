import { Module } from "@nestjs/common";
import { userController } from "./user.controller";
import { UserService } from "./user.service";
import { PrismaService } from "../prisma.service";
import { ConfigModule } from "@nestjs/config";

@Module({
    
    controllers: [userController],
    providers: [UserService, PrismaService]
})
export class userModule {}
