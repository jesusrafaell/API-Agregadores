//export const entitiesAgregadores = ['dist/db/models/**/*.entity.{ts,js}'];
//export const entitiesAgregadores = ['./db/models/**/*.entity.{ts,js}'];
export const entitiesAgregadores = [
  __dirname + '/../models/**/*.entity{.ts,.js}',
];
export const migrationsAgregadores = [
  __dirname + '/../migrations/**/*{.ts,.js}',
];
