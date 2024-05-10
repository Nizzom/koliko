import { FastifyInstance } from 'fastify';
import { Plugable } from '../decorators/plugable';
import { Config } from '../config';
import "@fastify/postgres"

@Plugable()
export class PostgresService {
    private serverInstance: FastifyInstance;

    plug(server: FastifyInstance) {
        server.log.info('Plugin Postgres');
        server.register(require('@fastify/postgres'), {
            connectionString: Config.DB.PGConnectionStr,
        });
        this.serverInstance = server;
    }

    async query(query: string, values: string | number[]): Promise<object[]> {
        console.log(query, values);
        const client = await this.serverInstance.pg.connect();
        try {
            const { rows } = await client.query(query, values);
            // Note: avoid doing expensive computation here, this will block releasing the client
            return rows;
        } finally {
            // Release the client immediately after query resolves, or upon error
            client.release();
        }
    }
}
