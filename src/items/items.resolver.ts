import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { ItemService } from "./items.service";
import { ItemInput } from "./inputs/item.input";
import { Item } from "./interfaces/item.interface";

@Resolver()
export class ItemResolver {
  constructor(
    private itemsService: ItemService,
  ) {}

  @Query(() => String)
  async hello(): Promise<string> {
    return 'hello';
  }

  @Query(() => [Item])
  async items(): Promise<Item[]> {
    return await this.itemsService.findAll();
  }

  @Mutation(() => Item)
  async createItem(
      @Args('input') input: ItemInput
  ): Promise<Item> {
      return await this.itemsService.create(input)
  }
}