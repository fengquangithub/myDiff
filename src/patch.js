import { isElement, emptyNodeAt, sameVnode } from "./shared";
import createElement from './createElement'
import patchVnode from './patchVnode'
export default function(oldVnode, newVnode){
    // 如果旧节点是一个元素， 那就包装成Vnode
    if(isElement(oldVnode)){
        oldVnode = emptyNodeAt(oldVnode)
    }

    // 如果虚拟节点一样， 那就比对虚拟节点的子级
    // 如果虚拟节点不一样 那就删除了重建
    if(sameVnode(oldVnode, newVnode)){
        patchVnode(oldVnode, newVnode)
    }else{

        createElement(newVnode)

        let parent = oldVnode.elm.parentNode
        if(parent){
            // 把新节点插入到旧节点的后面
            parent.insertBefore(newVnode.elm, oldVnode.elm.nextSibling)
            // 然后把旧节点删除
            parent.removeChild(oldVnode.elm)
        }
    }
}