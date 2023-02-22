"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const fs = require("fs");
const config_1 = require("./db/config");
const os = require("os");
const interfaces = os.networkInterfaces();
async function bootstrap() {
    const httpsOptions = {
        key: fs.readFileSync('key.pem'),
        cert: fs.readFileSync('cert.pem'),
    };
    try {
        await (0, config_1.Conections)()
            .then(async (listDS) => {
            const app = await core_1.NestFactory.create(app_module_1.AppModule.forRoot({ DS: listDS }), {
                httpsOptions,
                logger: false,
            });
            await app.listen(5050, async () => {
                console.log(`Application is running on ${await app.getHttpServer().address()
                    .port}`);
            });
        })
            .catch(async (err) => {
            console.log('Error MAIN');
            console.log(`Error Connection: ${err}`);
        });
    }
    catch (err) {
        console.log(err);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map