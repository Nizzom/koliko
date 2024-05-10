import { Injectable } from '../../decorators/injectable';
import { PostgresService } from '../../services/postgres.service';

@Injectable()
export class UsersProcessingService {
    constructor(private postgres: PostgresService) {}

    async balance(id) {
        const resultRows = await this.postgres.query('SELECT id, balance FROM users WHERE id=$1', [id]);
        return resultRows[0];
    }

    async trade(id, amount) {
        const resultRows = await this.postgres.query('UPDATE users SET balance=(balance - $1) WHERE id=$2 RETURNING id, balance', [amount,id]);
        return resultRows[0];
    }
}
