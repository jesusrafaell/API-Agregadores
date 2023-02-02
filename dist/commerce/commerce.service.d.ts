import { DataSource } from 'typeorm';
import { CommerceDto } from './dto/new-commerce.dto';
import Comercios from '../db/models/comercios.entity';
import ComerciosXafiliado from '../db/models/comerciosXafliado.entity';
import CategoriasXafiliado from '../db/models/categoriasXafiliado.entity';
import { LogsService } from '../logs/logs.service';
import { Header } from '../logs/dto/dto-logs.dto';
import { ICommerceAll, ICommerceGet } from './dto';
import { AbonoService } from '../abono/abono.service';
export interface Resp {
    message?: string;
}
export declare class CommerceService {
    private logService;
    private _abonoService;
    constructor(logService: LogsService, _abonoService: AbonoService);
    getCategoriaByAfiliado(catCodAfi: string, DS: DataSource): Promise<CategoriasXafiliado>;
    getCommerce(comerRif: string, DS: DataSource): Promise<Comercios>;
    createCommerce(body: CommerceDto, header: Header): Promise<Resp>;
    getAfiliadoByCommerce(cxaCodComer: number, DS: DataSource): Promise<ComerciosXafiliado>;
    getCommerceData(comerRif: string, header: Header): Promise<ICommerceGet>;
    getAllCommerce(header: Header): Promise<ICommerceAll>;
}
