import createElement from './createElement'
export default function addVnodes(parent, before, vnodes, startIndex, endIndex){
    for (; startIndex <= endIndex; ++startIndex) {
        const ch = vnodes[startIndex];
        if (ch != null) {
            parent.insertBefore(createElement(ch), before);
        }
    }
}