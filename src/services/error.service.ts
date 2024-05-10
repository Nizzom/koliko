import { Injectable } from '../decorators/injectable';

export class ErrorExeption extends Error {
    public message: string;
    public statusCode: number;
    constructor(message: string, statusCode: number = 500) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const Errors = {
    InvalidParam: {
        message: (param: string | number = '') => `Invalid Param ${param}`,
        code: 400,
    },
    InternalError: {
        message: (data: string | number = '') => `Internal Server Error ${data}`,
        code: 500,
    },
};

@Injectable()
export class ErrorService {
    invalidParam(param: string | number) {
        return new ErrorExeption(Errors.InvalidParam.message(param), Errors.InvalidParam.code);
    }
    internalError(data: string | number) {
        return new ErrorExeption(Errors.InternalError.message(data), Errors.InternalError.code);
    }
}
