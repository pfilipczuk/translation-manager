interface Params {
    [key: string]: string;
}

export function toParams(query: string): Params {
    const q = query.replace(/^\??\//, "");

    return q.split("&").reduce((values: Params, param) => {
        const [key, value] = param.split("=");

        values[key] = value;

        return values;
    }, {});
}

export function toQuery(params: Params, delimiter = "&"): string {
    const keys = Object.keys(params);

    return keys.reduce((str, key, index) => {
        let query = `${str}${key}=${params[key]}`;

        if (index < (keys.length - 1)) {
            query += delimiter;
        }

        return query;
    }, "");
}
