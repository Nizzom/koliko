import 'reflect-metadata';
import { CONTROLLER, MODULE, MODULE_CONTROLLERS, PLUGABLE, ROUTERPATH, ROUTERTYPE } from './constants/metadata';
import { isConstructor, isFunction } from './utils/shared';
import { Container } from './types/container';
import { ROUTE_TYPES } from './constants/route-type';

type TMethodScannerResult = {
    path: string;
    type: ROUTE_TYPES;
    handlerRef: (...args: any) => any;
};

/**
 * MetaData
 */
export class MetaDataScanner {
    /**
     * Checking the module and getting controllers
     */
    static moduleScanner(module: Container<any>): Container<any>[] {
        const isModule = Reflect.getMetadata(MODULE, module);
        if (!isModule) {
            return [];
        }
        const controllers = Reflect.getMetadata(MODULE_CONTROLLERS, module);
        return controllers;
    }

    /**
     * Checking the controller and getting controller main path
     */
    static controllerScanner(controller: Container<any>) {
        const isController = Reflect.getMetadata(CONTROLLER, controller);
        if (!isController) {
            return;
        }
        return Reflect.getMetadata(ROUTERPATH, controller);
    }

    /**
     * Checking the controller routes and getting route path, handlers reference
     */
    static methodsScann(instance: Container<any>): TMethodScannerResult[] {
        const prototype = Object.getPrototypeOf(instance);
        const result: TMethodScannerResult[] = [];
        for (const property of Object.getOwnPropertyNames(prototype)) {
            if (isConstructor(property) || !isFunction(instance[property])) {
                continue;
            }

            const path = Reflect.getMetadata(ROUTERPATH, prototype[property]);
            const type = Reflect.getMetadata(ROUTERTYPE, prototype[property]);

            result.push({
                path,
                type,
                handlerRef: instance[property],
            });
        }
        return result;
    }

    static plugablesScann(containers: Container<any>[]): Container<any>[] {
        const result: Container<any>[] = [];
        for (const instance of containers) {
            const isPlugable = Reflect.getMetadata(PLUGABLE, instance);
            if (isPlugable) {
                result.push(instance);
            }
        }
        return result;
    }
}
