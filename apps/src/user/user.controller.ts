import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDto, UserDtoReturn} from "../dto/user.dto";
import { Response } from "express";


@Controller('user')
export class userController {

    constructor(private database:UserService) {}

    /**
     * Metodo GET que optiene a todos los usuarios de la base de datos
     * @returns Promise<UserDtoReturn[]>
     */
    @Get()
    getUser(@Res() response:Response): Promise<Response> {
        return this.database.getUser(response);
    }

    /**
     * Metodo GET que optione datos no sensibles del usuario asociado a la id
     * @param id 
     * @returns Promise<UserDtoReturn>
     */
    @Get(':id')
    getUserWithId(@Param('id') id:string, @Res() response:Response): Promise<Response> {
        return this.database.getUserWithIdForClient(response, id);
    }

    /**
     * Metodo GET que devuelve todos los datos del usuario asociado al
     * su correo
     * @param correo 
     * @returns Promise<UserDto>
     */
    @Get('login/:correo')
    getUserWithCorreo(@Param('correo') correo:string, @Res() response:Response):Promise<Response> {
        return this.database.getUserWithCorreoForAuth(response, correo);
    }

    /**
     * Metodo POST que inserta en la base de datos los datos de un nuevo usuario
     * @param body 
     * @returns Promise<UserDto>
     */
    @Post()
    addUser(@Body() body:UserDto, @Res() response:Response): Promise<Response> {
        return this.database.registerUser(response, body);
    }

    /**
     * Metodo PUT que actualiza ciertos datos del usuario asociado al correo
     * @param correo 
     * @param Body 
     * @returns Promise<UserDto>
     */
    @Put(':correo')
    updateUser(@Param('correo') correo:string, @Body() Body:UserDto, @Res() response:Response ): Promise<Response> {
        return this.database.updateUser(response, correo, Body);
    }

    /**
     * Elimina al usuario asosiado al correo
     * @param correo 
     * @returns String
     */
    @Delete(':correo') 
    deleteUser(@Param('correo') correo:string, @Res() response:Response): Promise<Response> {
        return this.database.deleteUser(response, correo);
    }

}