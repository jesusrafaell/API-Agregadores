"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const fs = require("fs");
async function bootstrap() {
    const httpsOptions = {
        key: fs.readFileSync('key.pem'),
        cert: fs.readFileSync('cert.pem'),
    };
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        httpsOptions,
        logger: false,
    });
    await app.listen(5050, async () => {
        console.log(`Ready, Application is running on port ${await app
            .getHttpServer()
            .address().port}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map