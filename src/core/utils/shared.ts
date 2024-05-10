export const isFunction = (val: any): val is Function => typeof val === 'function';
export const isString = (val: any): val is string => typeof val === 'string';
export const isNumber = (val: any): val is number => typeof val === 'number';
export const isConstructor = (val: any): boolean => val === 'constructor';
export const isObjEmpty = (obj: any) => Object.keys(obj).length === 0;
