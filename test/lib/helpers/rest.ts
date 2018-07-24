import { IRest, IRestParams } from '../interfaces/rest';
import * as request from 'request';

const formatResponse = (status: number, responseBody: any, headers: any) => {
    return {
        status,
        body: responseBody,
        headers,
    };
};

export const rest: IRest = {
    get: (url: string, params: IRestParams = {}) => new Promise((resolve, reject) =>
        request.get(url, { ...params }, (err, response, responseBody) => {
            if (err) {
                return reject(err);
            }
            const formatedResponse = formatResponse(response.statusCode, responseBody, response.headers);
            return resolve(formatedResponse);
        })),
    post: (url: string, body: any, params: IRestParams = {}) => new Promise((resolve, reject) =>
        request.post(url, { form: body, ...params }, (err, response, responseBody) => {
            if (err) {
                return reject(err);
            }
            const formatedResponse = formatResponse(response.statusCode, responseBody, response.headers);
            return resolve(formatedResponse);
        })),
    put: (url: string, body: any, params: IRestParams = {}) => new Promise((resolve, reject) =>
        request.put(url, { form: body, ...params }, (err, response, responseBody) => {
            if (err) {
                return reject(err);
            }
            const formatedResponse = formatResponse(response.statusCode, responseBody, response.headers);
            return resolve(formatedResponse);
        })),
    delete: (url: string, params: IRestParams = {}) => new Promise((resolve, reject) =>
        request.delete(url, { ...params }, (err, response, responseBody) => {
            if (err) {
                return reject(err);
            }
            const formatedResponse = formatResponse(response.statusCode, responseBody, response.headers);
            return resolve(formatedResponse);
        })),
};
