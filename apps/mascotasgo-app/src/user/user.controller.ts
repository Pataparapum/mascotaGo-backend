import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDto, UserDtoReturn} from "../dto/user.dto";
import { JwtAuthGuard } from "../login/jwt/jwt.guard";


@Controller('user')
export class userController {

    constructor(private database:UserService) {}

    /**
     * Metodo GET que optiene a todos los usuarios de la base de datos
     * @returns Promise<UserDtoReturn[]>
     */
    @Get()
    @UseGuards(JwtAuthGuard)
    getUser(): Promise<UserDtoReturn[]> {
        return this.database.getUser();
    }

    /**
     * Metodo GET que optione datos no sensibles del usuario asociado a la id
     * @param id 
     * @returns Promise<UserDtoReturn>
     */
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    getUserWithId(@Param('id') id:string): Promise<UserDtoReturn> {
        return this.database.getUserWithIdForClient(id);
    }

    /**
     * Metodo GET que devuelve todos los datos del usuario asociado al
     * su correo
     * @param correo 
     * @returns Promise<UserDto>
     */
    @Get('login/:correo')
    getUserWithCorreo(@Param('correo') correo:string):Promise<UserDto> {
        return this.database.getUserWithCorreoForAuth(correo);
    }

    /**
     * Metodo POST que inserta en la base de datos los datos de un nuevo usuario
     * @param body 
     * @returns Promise<UserDto>
     */
    @Post()
    addUser(@Body() body:UserDto): Promise<UserDto> {
        return  this.database.registerUser(body);
    }

    /**
     * Metodo PUT que actualiza ciertos datos del usuario asociado al correo
     * @param correo 
     * @param Body 
     * @returns Promise<UserDto>
     */
    @Put(':correo')
    @UseGuards(JwtAuthGuard)
    updateUser(@Param('correo') correo:string , @Body() Body:UserDto ): Promise<UserDto> {
        return this.database.updateUser(correo, Body);
    }

    /**
     * Elimina al usuario asosiado al correo
     * @param correo 
     * @returns String
     */
    @Delete(':correo') 
    @UseGuards(JwtAuthGuard)
    deleteUser(@Param('correo') correo:string): Promise<string> {
        return this.database.deleteUser(correo);
    }

}