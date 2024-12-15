import { AppService } from './app.service';
import { PRUEBA } from './interfacePrueba';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    getPrueba(): string;
    getPrueba2(): PRUEBA[];
}
