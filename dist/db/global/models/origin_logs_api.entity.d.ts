import general_logs_api from './general_logs_api.entity';
export default class origin_logs_api {
    id?: number;
    name: string;
    general_logs?: general_logs_api[];
    createdAt?: Date;
    updatedAt?: Date;
}
