import { CONTROLLER, ROUTERPATH } from '../core/constants/metadata';
import 'reflect-metadata';
export function Controller(path: string = '/'): ClassDecorator {
    return (target: object) => {
        Reflect.defineMetadata(CONTROLLER, true, target);
        Reflect.defineMetadata(ROUTERPATH, path, target);
    };
}
