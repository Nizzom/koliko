import { Module } from './decorators/module';
import { JsonRestItemsController } from './json-rest/items/items.controller';
import { JsonRestUsersController } from './json-rest/users/users.controller';

@Module({controllers: [JsonRestItemsController, JsonRestUsersController]})
export class AppModule {
    constructor() {}
}
