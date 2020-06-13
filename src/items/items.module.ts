import { Module } from '@nestjs/common';
import { ItemResolver } from './items.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemSchema, Item } from './items.schema';
import { ItemService } from './items.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
  ],
  providers: [ItemResolver, ItemService],
})
export class ItemsModule {}
