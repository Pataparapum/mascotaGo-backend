import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";

@Controller()
export class welcomeController {

    @Get()
    welcome(@Res() response:Response) {
        return response.json({message:"Bienvenido al servicio de usuarios"})
    }

}