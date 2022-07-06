import removeVnodes from "./removeVnodes"
import addVnodes from "./addVnodes"
import updateChildren from './updateChildren'

export default function(oldVnode, newVnode){

    const elm = newVnode.elm = oldVnode.elm

    // 如果新节点和旧节点是同一个节点 就不比了
    if (oldVnode === newVnode) return
    // 先判断新节点有没有文字 没有文字再进去判断有没有children
    // 如果有文本那就再判断跟老节点的文本是不是一样
    // 不一样的话进去删掉重建标签，一样的话就不用动了
    if(newVnode.text === undefined){
        if(oldVnode.children && newVnode.children){
            // 这种情况是新节点和旧节点都有子节点 那么使用核心的diff算法更新子节点
            if(oldVnode.children !== newVnode.children){
                updateChildren(elm, oldVnode.children, newVnode.children)
            }

        }else if(newVnode.children){
            // 如果只有新节点 说明是增加了新的子节点
            if(oldVnode.text) elm.textContent = ""
            addVnodes(elm, null, newVnode.children, 0, newVnode.children.length - 1)
        }else if(oldVnode.children){
            // 如果只有老节点有子节点 说明删除了
            removeVnodes(elm, oldVnode.children, 0, oldVnode.children.length - 1)
        }else if(oldVnode.text){
            // 这种情况属于老节点有内容，新节点既没有子节点，也没有文本内容，说明文本内容删除了
            elm.textContent = ""
        }
    } else if(oldVnode.text !== newVnode.text){
        // 这里就需要删除旧节点的所有子节点
        if(oldVnode.children){
            removeVnodes(elm, oldVnode.children, 0, oldVnode.children.length - 1)
        }

        elm.textContent = newVnode.text
    }
}