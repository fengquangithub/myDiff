import diff from '../build/diff.js' 
const {
    patch,
    h
} = diff

const container = document.getElementById("container");

const vnode = h(
    "div#container.two.classes", 
    { key: 'A' },
    h('p',{},'A')
);

// 传入一个空的元素节点 - 将产生副作用（修改该节点）
patch(container, vnode);

const newVnode = h(
  "div#container.two.classes",
  { key: 'A' },
  h('p',{},'B')
);

setTimeout(()=>{
    
},3000)

// // 再次调用 `patch`
patch(vnode, newVnode); // 将旧节点更新为新节点
