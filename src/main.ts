import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import { Conections } from './db/config';
import { IAgregadoresDS } from './db/config/dto';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem'),
  };

  try {
    await Conections()
      .then(async (listDS: IAgregadoresDS) => {
        const app = await NestFactory.create(
          AppModule.forRoot({ DS: listDS }),
          {
            httpsOptions,
            logger: false,
          },
        );
        await app.listen(5050, async () => {
          console.log(
            `Ready, Application is running on ${await app
              .getHttpServer()
              .address().port}`,
          );
        });
      })
      .catch(async (err) => {
        throw {
          message: 'Error Connection DB',
          error: err,
        };
      });
  } catch (err) {
    console.log(err);
  }
}

bootstrap();
