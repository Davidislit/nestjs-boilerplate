import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Item } from './interfaces/item.interface';
import { ItemInput } from './inputs/item.input';

@Injectable()
export class ItemService {
  constructor(@InjectModel(Item.name) private itemModel: Model<Item>) {}

  async create(createItemDto: ItemInput): Promise<Item> {
    const createItem = new this.itemModel(createItemDto);
    return await createItem.save();
  }

  async findAll(): Promise<Item[]> {
    return this.itemModel.find().exec();
  }
}
