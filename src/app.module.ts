import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ItemsModule } from './items/items.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ItemsModule,
    GraphQLModule.forRoot({
    autoSchemaFile: 'schema.gql',
  }),
    MongooseModule.forRoot(process.env.MONGODB_URL)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
