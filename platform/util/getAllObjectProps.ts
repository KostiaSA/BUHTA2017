
export function getAllObjectProps(obj:any) {
    var props:string[] = [];
    do {
        props = props.concat(Object.getOwnPropertyNames(obj));
    } while (obj = Object.getPrototypeOf(obj));
    return props;
}