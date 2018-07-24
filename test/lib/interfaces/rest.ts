export interface IRest {
    get: (url: string, params?: IRestParams) => Promise<any>;
    post: (url: string, body: any, params?: IRestParams) => Promise<any>;
    put: (url: string, body: any, params?: IRestParams) => Promise<any>;
    delete: (url: string, params?: IRestParams) => Promise<any>;
}

export interface IRestParams {
    headers?: {
        'Content-Type': string;
    };
}
