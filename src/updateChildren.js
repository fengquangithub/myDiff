import createElement from "./createElement";
import patchVnode from "./patchVnode";
import addVnodes from "./addVnodes";
import removeVnodes from "./removeVnodes";

import { sameVnode } from './shared'

export default function(parentElm, oldCh, newCh){
    // 旧节点的开始索引
    let oldStartIdx = 0;
    // 新节点的开始索引
    let newStartIdx = 0;
    // 旧节点的结束索引
    let oldEndIdx = oldCh.length - 1;
    // 旧节点开始元素
    let oldStartVnode = oldCh[0];
    // 旧节点最后的元素
    let oldEndVnode = oldCh[oldEndIdx];
    // 新节点的结束索引
    let newEndIdx = newCh.length - 1;
    // 新节点开始元素
    let newStartVnode = newCh[0];
    // 新节点的结束元素
    let newEndVnode = newCh[newEndIdx];
    let oldKeyToIdx;
    let idxInOld;
    // 元素需要移动
    let elmToMove;
    let before;

    // 如果旧节点的开始节点索引值小于等于旧节点的结束索引值
    // 并且新节点的开始索引值小于等于新节点的结束索引值才会执行循环
    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      // 首先判断老的开始节点 老的结束节点 新的开始节点 新的结束节点是不是null
      // 如果其中任意一个是null的话，直接加对应的索引进入下一次循环
      // 然后对比老的开始节点 和 新的开始节点是否是同一个虚拟节点
      // 对比老的开始节点和新的结束节点是否为同一个节点
      // 最后对比老的结束节点和新的开始节点是否为同一节点
      // 前面的8种情况都不是，那么就是最后一种情况
        if (oldStartVnode == undefined) {

            oldStartVnode = oldCh[++oldStartIdx]; // Vnode might have been moved left
      
        } else if (oldEndVnode == undefined) {

            oldEndVnode = oldCh[--oldEndIdx];

        } else if (newStartVnode == undefined) {

            newStartVnode = newCh[++newStartIdx];

        } else if (newEndVnode == undefined) {

            newEndVnode = newCh[--newEndIdx];

        } else if (sameVnode(oldStartVnode, newStartVnode)) {

            patchVnode(oldStartVnode, newStartVnode);

            oldStartVnode = oldCh[++oldStartIdx];
            newStartVnode = newCh[++newStartIdx];

        } else if (sameVnode(oldEndVnode, newEndVnode)) {

            patchVnode(oldEndVnode, newEndVnode);

            oldEndVnode = oldCh[--oldEndIdx];
            newEndVnode = newCh[--newEndIdx];

        } else if (sameVnode(oldStartVnode, newEndVnode)) {

            // Vnode moved right
            patchVnode(oldStartVnode, newEndVnode);

            parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling)
        
            oldStartVnode = oldCh[++oldStartIdx];
            newEndVnode = newCh[--newEndIdx];

        } else if (sameVnode(oldEndVnode, newStartVnode)) {

            // Vnode moved left
            patchVnode(oldEndVnode, newStartVnode);

            parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm);

            oldEndVnode = oldCh[--oldEndIdx];
            newStartVnode = newCh[++newStartIdx];

        } else {
            // 这种情况就是四个节点都没有匹配到，这种情况下就是取出中间不一样的节点
            // 但是中间的节点里也会有已存在的旧节点，所以需要记录一下key值，用key来查找
            // 这个旧节点key和节点索引对应关系的对象只定义一次就可以了
            // 这个的作用就是从不匹配的节点开始，记录这之间的每一个节点key对应的索引，前提是如果节点有key
            // 最后返回一个map对象
            if (oldKeyToIdx === undefined) {
                oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
            }
            // 用新的开始节点的key去旧的节点里去找
            // 没找到就是新的节点，直接插入就行了
            // 找到了，说明是移动了位置，找到要移动的旧节点
            // 然后判断需要移动的元素和新的开始节点的元素是否是同一个元素
            // 不是的话直接创建一个节点并插入到那个位置
            // 是同一个元素的话就直接移动了
            // 最后新节点的指针++进入下一次循环
            idxInOld = oldKeyToIdx[newStartVnode.key];
            if (idxInOld === undefined) {
                // New element
                parentElm.insertBefore(
                    createElement(newStartVnode),
                    oldStartVnode.elm
                );
            } else {
                elmToMove = oldCh[idxInOld];
                if (elmToMove.sel !== newStartVnode.sel) {
                    parentElm.insertBefore(
                        createElement(newStartVnode),
                        oldStartVnode.elm
                    );
                } else {
                    patchVnode(elmToMove, newStartVnode);
                    oldCh[idxInOld] = undefined;
                    parentElm.insertBefore(elmToMove.elm, oldStartVnode.elm);
                }
            }
            newStartVnode = newCh[++newStartIdx];
        }
    }

    // 如果新的节点的开始索引小于等于新节点的结束索引，那么说明有需要新添加的节点
    // 这种情况说明新节点的数量比旧节点的数量多，需要将新的节点添加到页面上
    if (newStartIdx <= newEndIdx) {
      before = newCh[newEndIdx + 1] == undefined ? undefined : newCh[newEndIdx + 1].elm;
      addVnodes(
        parentElm,
        before,
        newCh,
        newStartIdx,
        newEndIdx
      );
    }
    // 如果旧节点的开始索引小于等于旧节点的结束索引，那么说明需要删除一些节点
    // 这种情况说明旧的节点数量大于新的节点数量，旧的节点的这部分元素需要删除
    if (oldStartIdx <= oldEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
}