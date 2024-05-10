import { Get, Post } from '../../decorators/router-type';
import { Controller } from '../../decorators/controller';
import { FastifyRequest } from 'fastify';
import { UsersProcessingService } from '../../processing/users/users.service';
import { JsonRestUsersService } from './users.service';

@Controller('/user')
export class JsonRestUsersController {
    constructor(private usersProcessing: UsersProcessingService, private usersService: JsonRestUsersService) {}

    @Post('/trade')
    async trade(req: FastifyRequest) {
        const query = req.query as { id: number; amount: number };
        this.usersService.validateTrade(query);
        return await this.usersProcessing.trade(query.id, query.amount);
    }

    @Get('/balance')
    async balance(req: FastifyRequest) {
        const query = req.query as { id: number };
        this.usersService.validateBalance(query);
        return await this.usersProcessing.balance(query.id);
    }
}
