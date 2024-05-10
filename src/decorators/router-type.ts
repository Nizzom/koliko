import { ROUTERPATH, ROUTERTYPE } from '../core/constants/metadata';
import { ROUTE_TYPES } from '../core/constants/route-type';
import 'reflect-metadata';
function Register(name: ROUTE_TYPES, path: string): MethodDecorator {
    return (target: object, key: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
        Reflect.defineMetadata(ROUTERPATH, path, descriptor.value);
        Reflect.defineMetadata(ROUTERTYPE, name, descriptor.value);
        return descriptor;
    };
}

export function Get(path: string = '/') {
    return Register(ROUTE_TYPES.Get, path);
}

export function Post(path: string = '/') {
    return Register(ROUTE_TYPES.Post, path);
}
