import type { INestApplication } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';

import { AppUtils } from '../util';

export async function microserviceSetup(
  app: INestApplication,
  serviceName: string,
) {
  AppUtils.killAppWithGrace(app);
  const protoBasePath = process.cwd() + '/libs/proto-schema/src/proto';
  const host = process.env['GRPC_HOST'];
  const port = process.env['GRPC_PORT'];
  const options = {
    transport: Transport.GRPC,
    options: {
      url: `${host}:${port}`,
      protoPath: `${protoBasePath}/${serviceName}.proto`,
      package: `${serviceName}`,
    },
  };
  app.connectMicroservice(options);
  await app.startAllMicroservices();
  Logger.log(
    `GRPC ${serviceName} running on ${options.options.url}`,
    'Bootstrap',
  );
}
