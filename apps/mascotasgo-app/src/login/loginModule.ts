import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { jwtConstanst } from "./jwt/jwt.constants";
import { JwtStrategy } from "./jwt/jwt.strategy";

@Module({
    imports: [
        JwtModule.register({
          secret: jwtConstanst.secret
        }),
        PassportModule,
        HttpModule
      ],
      providers: [JwtStrategy]
})
export class LoginModule {}