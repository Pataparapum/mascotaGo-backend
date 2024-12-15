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
    async registerUser(user:UserDto): Promise<UserDto> {
        const { password }  = user
        const plainTextTohash = await hash(password, 10)
        user = {...user, password:plainTextTohash};

        return this.prisma.user.create({data:user})
    }

    /**
     * devuelve el id, username, correo y numero de mascotas
     * de todos los usuarios
     * @returns 
     */
    getUser(): Promise<UserDtoReturn[]> {
        return this.prisma.user.findMany({
            select: {
                id:true,
                username: true,
                correo:true,
                numero_mascotas: true,
            }
        });
    }

    /**
     * devuelve al usuario correspondiente al id enviado,
     * solo devuelve datos no sensibles, pues esta pensado
     * para se usado por los clientes
     * @param id 
     * @returns 
     */
    getUserWithIdForClient(id:string): Promise<UserDtoReturn> {
        return this.prisma.user.findUnique({
            where: {
                id: id,
            },
            select: {
                username: true,
                correo: true,
                numero_mascotas: true
            }
        });
    }

    /**
     * devuelve todos los datos del usuario del correo mandado
     * pensado para la comprobación del usuario en el login
     * @param correo 
     * @returns 
     */
    getUserWithCorreoForAuth(correo:string): Promise<UserDto> {
        return this.prisma.user.findUnique({
            where:{
                correo: correo
            }
        })
    }

    /**
     * Permite actualizar el username y el correo del usuario asosiados al
     * correo mandado
     * @param correo 
     * @param newUser 
     * @returns 
     */
    async updateUser(correo:string, newUser:UserDto ) {
        return this.prisma.user.update({
            where: {
                correo: correo,
            },
            data: {
                username: newUser.username,
                correo: newUser.correo,
            },
        });
    }

    /**
     * elimina al usuario del correo enviado
     * @param correo 
     * @returns 
     */
    async deleteUser(correo:string): Promise<string> {
        await this.prisma.user.delete({
            where: {
                correo: correo
            }
        })
    
        return `El usuario de correo ${correo} fue eliminado`;
    }
    
}
