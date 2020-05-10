import * as axios from 'axios'

export default class Network {
    static init() {
        axios.defaults.withCredentials = true;
    }

    static get(url, params, options) {
        return this.request(url, `GET`, params, options);
    }

    static post(url, params, options) {
        return this.request(url, `POST`, params, options);
    }

    static put(url, params, options) {
        return this.request(url, `PUT`, params, options);
    }

    static patch(url, params, options) {
        return this.request(url, `PATCH`, params, options);
    }

    static delete(url, params, options) {
        return this.request(url, `DELETE`, params, options);
    }

    static request(url, method, params, options) {
        if (!this.initialiazed) {
            Network.init();
            this.initialiazed = true;
        }

        if (!options) {
            options = {};
        }

        options.withCredentials = true;

        return new Promise((resolve, reject) => {
            if (!params) {
                params = {};
            }

            const axiosOptions = {
                url: url,
                method: method
            };

            if (method === `GET`) {
                axiosOptions.params = params;
            } else {
                axiosOptions.data = params;
            }
            if (options) {
                if (options.onUploadProgress) {
                    axiosOptions.onUploadProgress = (progressEvent) => {
                        const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader(`content-length`) || progressEvent.target.getResponseHeader(`x-decompressed-content-length`);
                        if (totalLength !== null) {
                            options.onUploadProgress(Math.round((progressEvent.loaded * 100) / totalLength), progressEvent);
                        }
                    };
                }
                if (options.onDownloadProgress) {
                    axiosOptions.onDownloadProgress = options.onDownloadProgress;
                }
                if (options.process_files) {
                    const formData = new FormData();
                    for (const key in params) {
                        if (params[key] !== null && typeof params[key] === `object` && params[key].constructor !== File) {
                            formData.append(key, JSON.stringify(params[key]));
                        } else {
                            formData.append(key, params[key]);
                        }
                    }
                    axiosOptions.data = formData;
                    axiosOptions.headers = {
                        'Content-Type': `multipart/form-data`
                    };
                }
            }

            const currentURL = new URL(document.URL);
            const currentURLParams = new URLSearchParams(currentURL.search);
            if (currentURLParams.has(`enable_debug`)) {
                if (!axiosOptions.params) {
                    axiosOptions.params = {};
                }
                axiosOptions.params.enable_debug = currentURLParams.get(`enable_debug`)
            }

            axios(axiosOptions).then((data) => {
                resolve(data);
            }).catch(reject);
        });
    }
}
