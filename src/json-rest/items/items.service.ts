import { Injectable } from '../../decorators/injectable';

@Injectable()
export class JsonRestItemsService {
    constructor() {}

    validate() {
        /**
         * some validation here
         */
        console.log(JsonRestItemsService.name, this.validate.name);
    }
}
