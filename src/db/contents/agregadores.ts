import { DataSource } from 'typeorm';
import Agregador from '../sitran/models/agregador.entity';

//3312
/*
ALTER TABLE [dbo].[agregador]
ADD 
host nvarchar(255) NULL, 
db nvarchar(255) NULL,
isAgr INT  ;
*/

export const listAgregadores: Agregador[] = [
  {
    //1
    name: 'Carropago',
    key: 1,
    host: '10.198.72.11',
    db: 'CARROPAGO',
    isAgr: 1,
  },
  {
    //2
    name: 'Milpagos',
    key: 2,
    host: '10.198.72.11',
    db: 'MILPAGOS',
    isAgr: 0,
  },
  {
    //3
    name: 'Librepago',
    key: 3,
    host: '10.198.72.11',
    db: 'LIBREPAGO',
    isAgr: 1,
  },
  {
    //4
    name: 'GSComputer',
    key: 4,
    host: '10.198.72.11',
    db: 'GSCOMPUTER',
    isAgr: 1,
  },
  {
    //5
    name: 'Tranred',
    key: 5,
    host: '10.198.72.11',
    db: 'SITRAN',
    isAgr: 0,
  },
  {
    //r
    name: 'DisGlobal',
    key: 5,
    host: '10.198.72.11',
    db: 'DISGLOBAL',
    isAgr: 1,
  },
  {
    //7
    name: 'ConsulTel',
    key: 5,
    host: '10.198.72.11',
    db: 'CONSULTEL',
    isAgr: 1,
  },
];

const agregadores = async (db: DataSource): Promise<void> => {
  //
  const valid = await db
    .getRepository(Agregador)
    .find({ where: listAgregadores });
  if (!valid.length) await db.getRepository(Agregador).save(listAgregadores);
  console.log('Agregadores ✅');
};

export default agregadores;
