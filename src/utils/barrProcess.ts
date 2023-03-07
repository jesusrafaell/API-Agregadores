// import { setInterval } from 'timers';

import { DataSource } from 'typeorm';
import { IAgregadoresDS } from '../db/config/dto';

const slots = 10;
// const limit = 6;

function barrProcess(seg: number, total: number, log: number): string {
  const porcen = seg / total;
  const completed = Math.floor(porcen * log);
  const restant = log - completed;
  const barr = `[${'#'.repeat(completed)}${'*'.repeat(restant)} ${(
    porcen * 100
  ).toFixed(2)}%]`;
  return barr;
}

export default async function ProcessPrint(listInitDS: IAgregadoresDS) {
  let index = 0;
  for (let i = 0; i <= Object.keys(listInitDS).length * slots; i++) {
    if (i % slots === 0 && index < Object.keys(listInitDS).length) {
      const DS = Object.values(listInitDS)[index];
      const nameDS: string = DS.options.database as string;
      try {
        await DS.initialize();
        index++;
      } catch (err) {
        throw { msg: nameDS };
      }
    }
    await new Promise((resolve) =>
      setTimeout(() => {
        process.stdout.write(
          `${barrProcess(
            i,
            Object.keys(listInitDS).length * slots,
            6 * slots,
          )}\r`,
        );
        resolve(i);
      }, 20),
    );
  }
  console.log();
}

export async function BarProcess(
  listInitDS: IAgregadoresDS,
  callback: (item: string, dataAgr: DataSource) => Promise<void>,
) {
  let index = 0;
  for (let i = 0; i <= Object.keys(listInitDS).length * slots; i++) {
    if (i % slots === 0 && index < Object.keys(listInitDS).length) {
      const item = Object.keys(listInitDS)[index];
      const DS = Object.values(listInitDS)[index];
      await callback(item, DS);
      index++;
      /*
      void
      try {
      // const DS = Object.values(listInitDS)[index];
        const nameDS: string = DS.options.database as string;
        await DS.initialize();
        index++;
      } catch (err) {
        throw { msg: nameDS };
      }
      */
    }
    await new Promise((resolve) =>
      setTimeout(() => {
        process.stdout.write(
          `${barrProcess(
            i,
            Object.keys(listInitDS).length * slots,
            6 * slots,
          )}\r`,
        );
        resolve(i);
      }, 20),
    );
  }
  console.log();
}
