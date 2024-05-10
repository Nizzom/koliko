import { SkinportService } from '../../external/gateways/skinport.service';
import { Injectable } from '../../decorators/injectable';
import { RedisService } from '../../services/redis.service';
import { Config } from '../../config';
import { FastifyRequest } from 'fastify';
import * as crypto from 'crypto';

@Injectable()
export class ItemsProcessingService {
    private cacheTime: number;
    constructor(private redis: RedisService, private skinportService: SkinportService) {
        this.cacheTime = +Config.APP.CacheTimeInSeconds;
    }

    async getItems(req: FastifyRequest) {
        const key = this.requestToKey(req);
        const cache = await this.redis.getJSON(key);

        if (cache) {
            return cache;
        }

        const result = await this.skinportService.items();
        await this.redis.cacheJSON(key, result, this.cacheTime);
        return result;
    }

    requestToKey(req: FastifyRequest) {
        const dataToHash = {
            query: req.query,
        };

        const shasum = crypto.createHash('sha1').update(JSON.stringify(dataToHash)).digest('hex');
        return `${req.url}@${shasum}`;
    }
}
