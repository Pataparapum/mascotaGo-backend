import { Response } from 'express';
import {Injectable} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UserDto, UserDtoReturn } from '../dto/user.dto';
import { hash } from 'bcrypt'

@Injectable()
export class UserService {

    constructor(private prisma: PrismaService) {}

    /**
     * Registra al usuario en la base de datos, y encripta la contraseña
     * @param user 
     * @returns 
     */
    async registerUser(respones:Response, user:UserDto): Promise<Response> {
        const { password }  = user
        const plainTextTohash = await hash(password, 10)
        user = {...user, password:plainTextTohash};

        await this.prisma.user.create({data:user})

        return respones.json({message:"usuario creado"});
    }

    /**
     * devuelve el id, username, correo y numero de mascotas
     * de todos los usuarios
     * @returns 
     */
    async getUser(response:Response): Promise<Response> {
        await this.prisma.user.findMany({
            select: {
                id:true,
                username: true,
                correo:true,
                numero_mascotas: true,
            }
        }).catch(err => {
            return response.json(err);
        });

        return response.json({message:"usuario creado"})
    }

    /**
     * devuelve al usuario correspondiente al id enviado,
     * solo devuelve datos no sensibles, pues esta pensado
     * para se usado por los clientes
     * @param id 
     * @returns 
     */
    async getUserWithIdForClient(response:Response, id:string): Promise<Response> {
        const data = await this.prisma.user.findUnique({
            where: {
                id: id,
            },
            select: {
                username: true,
                correo: true,
                numero_mascotas: true
            }
        }).catch(err => {
            return response.json(err)
        });

        return response.json({data})

    }

    /**
     * devuelve todos los datos del usuario del correo mandado
     * pensado para la comprobación del usuario en el login
     * @param correo 
     * @returns 
     */
    async getUserWithCorreoForAuth(response:Response, correo:string): Promise<Response> {
        const data = await this.prisma.user.findUnique({
            where:{
                correo: correo
            }
        }).catch(err => {
            return response.json(err);
        });

        return response.json(data)
    }

    /**
     * Permite actualizar el username y el correo del usuario asosiados al
     * correo mandado
     * @param correo 
     * @param newUser 
     * @returns 
     */
    async updateUser(response:Response, correo:string, newUser:UserDto ): Promise<Response> {
            await this.prisma.user.update({
            where: {
                correo: correo,
            },
            data: {
                username: newUser.username,
                correo: newUser.correo,
            },
        }).catch(err => {
            return response.json(err);
        });

        return response.json({message:"usuario actualizado"});
    }

    /**
     * elimina al usuario del correo enviado
     * @param correo 
     * @returns 
     */
    async deleteUser(response:Response, correo:string): Promise<Response> {
        await this.prisma.user.delete({
            where: {
                correo: correo
            }
        }).catch(err => {
            return response.json(err)
        })
    
        return response.json({message:"el usuario ha sido eliminado"});
    }
    
}
