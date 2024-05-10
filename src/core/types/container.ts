export interface Container<T> {
    [x: string]: any;
    new (...args: any[]): T;
}
