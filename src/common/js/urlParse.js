/**
 * @example '?id=123&name=q'
 * @return {id:123,name:q}
 */
export function urlParse() {
    let queryUrl = window.location.search.length ? window.location.search.substring(1) : '';
    let args = {};
    let items = queryUrl.length ? queryUrl.split('&') : [];
    for (let i = 0; i < items.length; i++) {
        let item = items[i].split('=');
        let key = decodeURIComponent(item[0]);
        let value = decodeURIComponent(item[1]);
        args[key] = value;
    }
    return args;
};
