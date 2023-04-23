import {CrudRequest} from "@crud/core";
import axios from "axios";
import {chooseFile} from "@crud/web";
import {SET_LOADER, SET_NOTIFY} from "../constants";

export class CrudFactory extends CrudRequest {
    baseUrl = "/api/";
    getUrl = (...segments) => segments.reduce((url, segment) => url + segment, this.baseUrl);
    store;

    async setStore(store) {
        this.store = store;
        return this;
    }

    async setNotify(notify) {
        this.store.dispatch({
            type: SET_NOTIFY,
            notify
        })
    }

    async setLoader(loading) {
        this.store.dispatch({
            type: SET_LOADER,
            loader: loading
        })
    }

    async get(url, data = {}, requestOptions = {}) {
        return this.send({
            method: "GET",
            url,
            data,
            ...requestOptions,
        });
    }

    async post(url, data = {}, requestOptions = {}) {
        return this.send({
            method: "POST",
            url,
            data,
            ...requestOptions,
        });
    }

    async delete(url, data = {}, requestOptions = {}) {
        return this.send({
            method: "DELETE",
            url,
            data,
            ...requestOptions,
        });
    }

    async send(requestOptions = {}) {
        const {method, url, data, notify = true} = requestOptions;
        const options = {
            ...requestOptions.ajaxOptions,
            method,
        };

        const fullUrl = this.getUrl(url);

        options.headers = {
            ...options.headers,
            Accept: "application/json"
        };

        if (!(data instanceof FormData)) {
            options.headers["Content-Type"] = "application/json";
        }

        if (options.method === "GET") {
            options.params = data;
        } else {
            options.data = data;
        }

        try {
            try {
                this.setLoader(true);
                const response = await axios(fullUrl, options);
                if ([200].includes(response.status)) {
                    const {type, message} = response.data;
                    if (type === "error")
                        throw new Error(message)

                    if (options.method !== "GET" && notify) {
                        this.setNotify({
                            message,
                            type,
                        });
                    }

                    return response.data;
                } else {
                    throw new Error(`${response.status} : ${response.statusText}`);
                }
            } catch (e) {
                this.setLoader(false)
                if (e.response?.status === 401)
                    window.location.href = "/";
                throw e;
            }finally {
                this.setLoader(false);
            }
        } catch (e) {
            this.setLoader(false);
            this.setNotify({
                message: e.message,
                type: "error",
            });
            throw e;
        }

    }
}

export const $crud = new CrudFactory();
$crud.config(chooseFile);
