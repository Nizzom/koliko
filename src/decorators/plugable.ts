import { PLUGABLE } from '../core/constants/metadata';

export function Plugable(): ClassDecorator {
    return (target: object) => {
        Reflect.defineMetadata(PLUGABLE, true, target);
    };
}
