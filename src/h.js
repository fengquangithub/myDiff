import vnode from "./vnode";
import { isPrimitive } from "./shared"

export default function(sel, data, children){
    let text = undefined
    if(children){
        if(Array.isArray(children)){
            children.map(child=>vnode(
                undefined,
                undefined,
                undefined,
                child,
                undefined
            ))
        }else if(isPrimitive(children)){
            text = children.toString()
            children = undefined
        }else if(children && children.sel){
            children = [children]
        }
    }

    return vnode(sel,  data, children, text, undefined)
}