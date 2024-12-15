import { Prisma } from "@prisma/client";
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";


enum typeUser {
    cuidador="cuidador",
    contratador="contratador"
}
export class UserDto implements Prisma.UserCreateInput {

    id:string
    
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    username: string;

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    correo: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    @IsEnum(typeUser)
    tipo_usuario: string;

    @IsNumber()
    @IsNotEmpty()
    numero_mascotas: number;
}

export class UserDtoReturn {
    
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    username: string;

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    correo: string;

    @IsNumber()
    @IsNotEmpty()
    numero_mascotas: number;

}