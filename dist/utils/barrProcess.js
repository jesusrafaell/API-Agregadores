"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const slots = 10;
function barrProcess(seg, total, log) {
    const porcen = seg / total;
    const completed = Math.floor(porcen * log);
    const restant = log - completed;
    const barr = `[${'#'.repeat(completed)}${'*'.repeat(restant)} ${(porcen * 100).toFixed(2)}%]`;
    return barr;
}
async function ProcessPrint(listInitDS) {
    let index = 0;
    for (let i = 0; i <= Object.keys(listInitDS).length * slots; i++) {
        if (i % slots === 0 && index < Object.keys(listInitDS).length) {
            const DS = Object.values(listInitDS)[index];
            const nameDS = DS.options.database;
            try {
                await DS.initialize();
                index++;
            }
            catch (err) {
                throw { msg: nameDS };
            }
        }
        await new Promise((resolve) => setTimeout(() => {
            process.stdout.write(`${barrProcess(i, Object.keys(listInitDS).length * slots, 6 * slots)}\r`);
            resolve(i);
        }, 20));
    }
    console.log();
}
exports.default = ProcessPrint;
//# sourceMappingURL=barrProcess.js.map