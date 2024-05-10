import { ErrorService } from '../../services/error.service';
import { Injectable } from '../../decorators/injectable';

@Injectable()
export class JsonRestUsersService {
    constructor(private errorService: ErrorService) {}

    validateTrade(params: { id: number; amount: number }) {
        /**
         * some validation here
         */
        if (!params.id || isNaN(params.id)) {
            throw this.errorService.invalidParam(params.id);
        }
        if (!params.amount || isNaN(params.amount)) {
            throw this.errorService.invalidParam(params.id);
        }
    }
    validateBalance(params: { id: number }) {
        /**
         * some validation here
         */
        if (!params.id || isNaN(params.id)) {
            throw this.errorService.invalidParam(params.id);
        }
    }
}
