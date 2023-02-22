import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import { Conections } from './db/config';
import { IAgregadoresDS } from './db/config/dto';
//import https from 'https';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem'),
  };

  // const config = {
  //   value: 'Hello',
  // };

  try {
    // console.log(app.init());
    // const address = interfaces['Wi-Fi'][1].address;

    await Conections()
      .then(async (listDS: IAgregadoresDS) => {
        // console.log('main', listDS.length);
        const app = await NestFactory.create(
          AppModule.forRoot({ DS: listDS }),
          {
            httpsOptions,
            logger: false,
          },
        );
        await app.listen(5050, async () => {
          console.log(
            `Application is running on ${await app.getHttpServer().address()
              .port}`,
          );
        });
      })
      .catch(async (err) => {
        console.log('Error MAIN');
        console.log(`Error Connection: ${err}`);
      });
  } catch (err) {
    console.log(err);
  }
}
/*

            #    ######  ###    ####### ######     #    #     # ######  ####### ######  
            # #   #     #  #        #    #     #   # #   ##    # #     # #       #     # 
          #   #  #     #  #        #    #     #  #   #  # #   # #     # #       #     # 
          #     # ######   #        #    ######  #     # #  #  # ######  #####   #     # 
          ####### #        #        #    #   #   ####### #   # # #   #   #       #     # 
          #     # #        #        #    #    #  #     # #    ## #    #  #       #     # 
          #     # #       ###       #    #     # #     # #     # #     # ####### ######  
*/

bootstrap();
