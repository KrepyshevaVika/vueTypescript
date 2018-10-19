const JSON_DATA = 'application/json';
const host = "http://localhost";
const port = 8080;

const defaultConfig = {
    contentType: JSON_DATA
};

export function checkStatus(response: any) {

    if (response.ok) {
        if (response.headers.get("Content-Type"))
            return Promise.resolve(response.json());
        else
            return Promise.resolve(response.blob());
    }

    return response.json().then((json: any) => {
        const error: any = new Error(json.message || response.statusText)
        error.errors = json.errors;
        return Promise.reject(Object.assign(error, { response }))
    })
}

function ConvertData(contentType: any, data: any){
    if(!data) return null;

    switch(contentType){
        case JSON_DATA: 
            return  JSON.stringify(data);
        default:
            return null;
    }
}

export function configurateRequest(config: any) {
    if (!config.method) throw new Error("Method of request is not defined!");
    
    let fullUrl = `${host}:${port}`;

    if (config.url)
        fullUrl = fullUrl + config.url;

    config.contentType = config.contentType || defaultConfig.contentType;

    let header: any = {
            method: config.method,
            headers: {
                'content-type': config.contentType
            },
        },
        data = ConvertData(config.contentType, config.data);
    
    if (data) 
        header.body = data;

    return {
        fullUrl: fullUrl,
        header: header,
    }
}

export function request(config: any) {

    let setting = configurateRequest(config);

    return fetch(setting.fullUrl, setting.header)
        .then((response) => {
            return checkStatus(response);
        }).then((data) => {
            return data;
        }).catch((error) => {
            return error;
        });
}

export function getAllNodes() {
    return request(
        {
            method: "GET",
            url: "/nodes/all",
        }
    )
}