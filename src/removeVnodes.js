export default function removeVnodes(parent, vnodes, startIndex, endIndex){
    for(;startIndex<=endIndex;++startIndex){
        const ch = vnodes[startIndex];
        if(ch) {
            if (ch.children) {
                removeVnodes(
                    ch,
                    ch.children,
                    0,
                    ch.children.length - 1
                );
            } else {
                // Text node
                parent.removeChild(ch.elm);
            }
        }
    }
}