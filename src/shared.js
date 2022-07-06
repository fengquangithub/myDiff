import vnode from './vnode'

export const isElement = function(node){
    return node.nodeType === 1;
}

export const emptyNodeAt = function(elm) {
    const id = elm.id ? "#" + elm.id : "";

    const classes = elm.getAttribute("class");

    const c = classes ? "." + classes.split(" ").join(".") : "";
    return vnode(
      elm.tagName.toLowerCase() + id + c,
      {},
      [],
      undefined,
      elm
    );
}

export const isPrimitive = function(s){
    return (
      typeof s === "string" ||
      typeof s === "number" ||
      s instanceof String ||
      s instanceof Number
    );
}

export const sameVnode = function(vnode1, vnode2){
    const isSameKey = vnode1.key === vnode2.key;
    // const isSameIs = vnode1.data === vnode2.data;
    const isSameIs = true;
    const isSameSel = vnode1.sel === vnode2.sel;
    const isSameTextOrFragment =
        !vnode1.sel && vnode1.sel === vnode2.sel
        ? typeof vnode1.text === typeof vnode2.text
        : true;

  return isSameSel && isSameKey && isSameIs && isSameTextOrFragment
}