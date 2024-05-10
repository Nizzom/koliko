import { FastifyInstance } from 'fastify';
import { ROUTE_TYPES } from './constants/route-type';

export class Router {
    static createRoutes(server: FastifyInstance, path: string, type: ROUTE_TYPES, handler: (...args) => any) {
        server[type](path, handler);
    }
}
