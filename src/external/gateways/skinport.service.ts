import * as https from 'https';
import * as qs from 'querystring';

import axios, { AxiosRequestConfig } from 'axios';
import { Injectable } from '../../decorators/injectable';
import { Config } from '../../config';

@Injectable()
export class SkinportService {
    private endpoint: string;
    private appId: number;
    private currency: string;
    private tradable: number;

    constructor() {
        this.endpoint = Config.Skinport.Endpoint;
        this.appId = +Config.Skinport.AppId;
        this.currency = Config.Skinport.Currency;
        this.tradable = Config.Skinport.Tradeble;
    }

    async items() {
        const queryParams = {
            app_id: this.appId,
            currency: this.currency,
            tradable: this.tradable,
        };
        const axiosConfig: AxiosRequestConfig = this.prepareAxiosConfig(this.endpoint + this.items.name, queryParams);
        const response = await axios.request(axiosConfig);
        return response.data;
    }

    prepareAxiosConfig(endpoint: string, queryParams: Record<string, string | number>, timeout: number = 2 * 60): AxiosRequestConfig {
        const data = qs.stringify(queryParams);
        return <AxiosRequestConfig>{
            method: 'get',
            url: endpoint,
            timeout: timeout * 1000,
            httpsAgent: new https.Agent({ rejectUnauthorized: false }),
            data,
        };
    }
}
