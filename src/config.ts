import * as dotenv from 'dotenv';

dotenv.config();
const env = process.env;

const Server = {
    Port: env.SERVER_PORT ?? 3000,
    Host: env.SERVER_HOST ?? 'localhost',
    Logger: env.SERVER_LOG ? true : false,
};

const DB = {
    PGConnectionStr: env.PG_CONN_STR ?? 'postgres://postgres:postgres@localhost/koliko',
    RedisHost: env.REDIS_HOST ?? '127.0.0.1',
    RedisPORT: env.REDIS_PORT ?? 6379,
    RedisPassword: env.REDIS_PASSWORD ?? '',
};

const Skinport = {
    Endpoint: env.SKINPORT_ENDPOINT ?? 'https://api.skinport.com/v1/',
    AppId: env.SKINPORT_APPID ?? 730,
    Currency: env.SKINPORT_CURRENCY ?? 'EUR',
    Tradeble: env.SKINPORT_TRADEBLE ? 1 : 0,
};

const APP = {
    CacheTimeInSeconds: env.CACHE_TIME_IN_SEC ?? 5 * 60,
};
export const Config = {
    Server,
    DB,
    APP,
    Skinport,
};
