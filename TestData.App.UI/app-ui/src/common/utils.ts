import uuidv1 from 'uuid';
import { KGen } from './k-gen';

export class U {

    static isEmpty(value: any) {
        if (value === null) return true;
        if (value === undefined) return true;
        if (typeof (value) === 'undefined') return true;
        if (typeof (value) === undefined) return true;
        return false;
    }

    static isEmptyString(value: any) {
        if (typeof value === 'string' && value === '') return true;
        return false;
    }

    static isNaNValue(value, replacement = 0) {
        return isNaN(value) ? replacement : value;
    }

    static promise<T>(func: Function | null, result: T): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            try {
                if (func) func();
                resolve(result);
            }
            catch (err) {
                reject(err);
            }
        });
    }

    static interpolate(format: string, item: any) {
        if (U.isEmpty(format) || U.isEmptyString(format)) return '';
        var pattern = /\{/gi;
        var s = format.replace(pattern, '$${this.');
        return new Function("return `" + s + "`;").call(item);
    }
}
