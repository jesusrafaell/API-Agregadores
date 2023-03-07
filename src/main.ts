import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem'),
  };

  const app = await NestFactory.create(AppModule, {
    httpsOptions,
    logger: false,
  });

  await app.listen(5050, async () => {
    console.log(
      `Ready, Application is running on port ${await app
        .getHttpServer()
        .address().port}`,
    );
  });
}

bootstrap();
