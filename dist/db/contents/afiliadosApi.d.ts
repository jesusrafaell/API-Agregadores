import { DataSource } from 'typeorm';
import AfiliadosApi from '../models/afiliados_api.entity';
export default function (DS: DataSource, data: AfiliadosApi[]): Promise<void>;
