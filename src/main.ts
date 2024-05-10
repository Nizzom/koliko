import Fastify from 'fastify';
import { AppModule } from './app.module';
import { Discoverer } from './core/discover';
import { Config } from './config';

const server = Fastify({
    logger: Config.Server.Logger,
});
const discoverer = new Discoverer(server, AppModule);
discoverer.discover();
discoverer.listen(+Config.Server.Port, Config.Server.Host);
