import { Container } from '../core/types/container';
import { MODULE, MODULE_CONTROLLERS } from '../core/constants/metadata';

type TModuleParam = { controllers: Container<any>[] };
export function Module(param: TModuleParam): ClassDecorator {
    return (target: object) => {
        Reflect.defineMetadata(MODULE, true, target);
        Reflect.defineMetadata(MODULE_CONTROLLERS, param.controllers, target);
    };
}
