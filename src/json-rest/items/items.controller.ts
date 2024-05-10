import { JsonRestItemsService } from './items.service';
import { Get, Post } from '../../decorators/router-type';
import { Controller } from '../../decorators/controller';
import { ItemsProcessingService } from '../../processing/items/items.service';
import { FastifyRequest } from 'fastify';

@Controller()
export class JsonRestItemsController {
    constructor(private itemsService: JsonRestItemsService, private itemsProcessing: ItemsProcessingService) {}

    @Get()
    async getItems(req: FastifyRequest) {
        this.itemsService.validate();
        const result = await this.itemsProcessing.getItems(req);
        return result;
    }
}
