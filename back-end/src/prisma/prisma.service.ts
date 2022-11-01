import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: 'mysql://admin:medcloud@patients-db.c0dpmctoovty.us-east-1.rds.amazonaws.com:3306/patients-db?connect_timeout=30&pool_timeout=30&socket_timeout=30',
        },
      },
    });
  }
}
