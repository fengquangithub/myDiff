import { isPrimitive } from "./shared";

export default function createElement(vnode){
    let sel = vnode.sel
    if(sel){

        const hashIdx = sel.indexOf("#");
        const dotIdx = sel.indexOf(".", hashIdx);
        const hash = hashIdx > 0 ? hashIdx : sel.length;
        const dot = dotIdx > 0 ? dotIdx : sel.length;
        const tag = hashIdx !== -1 || dotIdx !== -1
          ? sel.slice(0, Math.min(hash, dot))
          : sel;

        const elm = vnode.elm = document.createElement(tag, vnode.data);
        (hash < dot) && elm.setAttribute("id", sel.slice(hash + 1, dot));
        (dotIdx > 0) && elm.setAttribute("class", sel.slice(dot + 1).replace(/\./g, " "));
        
        if(Array.isArray(vnode.children)){
            for(let i=0;i<vnode.children.length;i++){
                const ch = vnode.children[i];
                if(ch){
                    elm.appendChild(createElement(ch))
                }
            }
        }else if(isPrimitive(vnode.text)){
            elm.appendChild(document.createTextNode(vnode.text))
        }

    }else{
        vnode.elm = document.createTextNode(vnode.text)
    }

    return vnode.elm
}