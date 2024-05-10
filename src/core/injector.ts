import { MetaDataScanner } from './metadata-scanner';
import { Container } from './types/container';

/**
 * DI
 */
export class Injector {
    public depInstancesTargets: Map<string, Container<any>> = new Map<string, Container<any>>();

    public depInstances: Map<string, Container<any>> = new Map<string, Container<any>>();

    /**
     * Recursive Resolving of dependencies
     */
    resolve(target: Container<any>): any {
        if (this.depInstancesTargets && this.depInstancesTargets.has(target.name)) {
            return this.depInstancesTargets.get(target.name);
        }

        /**
         * Get dependencies tokens
         */
        const tokens = Reflect.getMetadata('design:paramtypes', target) || [];
        /**
         * Recursive Resolve dependencies
         */
        const injections = tokens.map((token: any) => Resolver.resolve(token));
        const instance = new target(...injections);

        /**
         * Dependencies Instances and Targets
         */
        this.depInstancesTargets.set(target.name, target);
        this.depInstances.set(target.name, instance);

        return instance;
    }
}

export const Resolver = new Injector();
