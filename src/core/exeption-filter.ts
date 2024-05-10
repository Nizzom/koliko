import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { ErrorExeption, Errors } from '../services/error.service';

/**
 * Catch Exeption
 */
export class ExeptionFilter {
    static wrapp(handler: (...args: any) => any, server: FastifyInstance) {
        return async (req: FastifyRequest, reply: FastifyReply) => {
            try {
                return await handler(req, reply);
            } catch (error) {
                server.log.error(error);
                if (error instanceof ErrorExeption) {
                    return reply.code(error.statusCode).send({ message: error.message });
                }
                return reply.code(500).send(Errors.InternalError.message());
            }
        };
    }
}
