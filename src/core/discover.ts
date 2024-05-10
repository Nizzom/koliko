import { FastifyInstance } from 'fastify';
import { Resolver } from './injector';
import { MetaDataScanner } from './metadata-scanner';
import { Router } from './router';
import { Container } from './types/container';
import { ExeptionFilter } from './exeption-filter';

export class Discoverer {
    private server: FastifyInstance;
    private module: Container<any>;

    constructor(server: FastifyInstance, module: Container<any>) {
        this.server = server;
        this.module = module;
    }
    /**
     * What happens here?
     * - Dependency injection
     * - Analyzing routes
     * - Creating Routes and Binding Route Handlers
     */
    discover() {
        /**
         * Analyzing Module
         */
        const controllers = MetaDataScanner.moduleScanner(this.module);
        if (!controllers) {
            return;
        }

        for (const controller of controllers) {
            /**
             * Dependency injection
             */
            Resolver.resolve(controller);
            /**
             * Analyzing routes
             */
            const path = MetaDataScanner.controllerScanner(controller);
            const instance = Resolver.depInstances.get(controller.name);
            const methods = MetaDataScanner.methodsScann(instance);

            /**
             * Creating Routes and Binding Route Handlers
             */
            for (const route of methods) {
                Router.createRoutes(
                    this.server,
                    this.createPath([path, route.path]),
                    route.type,
                    /**
                     * Bind a handler to a class instance and Wrapp with Exeption Filter
                     */
                    ExeptionFilter.wrapp(route.handlerRef.bind(instance), this.server),
                );
            }
        }

        const plugables = MetaDataScanner.plugablesScann(Array.from(Resolver.depInstancesTargets, ([name, instance]) => instance));
        for (const plugable of plugables) {
            const instance = Resolver.depInstances.get(plugable.name);
            instance.plug(this.server);
        }
    }

    listen(port: number, host: string) {
        this.server.listen({
            port,
            host,
        });
        console.log(this.server.printRoutes());
    }

    createPath(paths: string[]): string {
        let result = paths.map((val) => val.replace('/', '')).join('/');
        if (result[0] != '/') {
            result = '/' + result;
        }
        return result;
    }
}
