import { FastifyInstance } from 'fastify';
import { Plugable } from '../decorators/plugable';
import '@fastify/redis';
import { Config } from '../config';

@Plugable()
export class RedisService {
    private serverInstance: FastifyInstance;
    plug(server: FastifyInstance) {
        server.log.info('Plugin Redis');
        server.register(require('@fastify/redis'), {
            host: Config.DB.RedisHost,
            port: Config.DB.RedisPORT, // Redis port
            family: 4, // 4 (IPv4) or 6 (IPv6),
            password: Config.DB.RedisPassword,
        });
        this.serverInstance = server;
    }

    async getJSON(key: string) {
        return JSON.parse(await this.serverInstance.redis.get(key));
    }

    async cacheJSON(key: string, val: any, time: number) {
    }
}
