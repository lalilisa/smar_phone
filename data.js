
class TreeNode {
        constructor(value) {
          this.value = value;
          this.descendants = [];
        }
      }

// create nodes with values
const abe = new TreeNode('Abe');
const homer = new TreeNode('Homer');
const bart = new TreeNode('Bart');
const lisa = new TreeNode('Lisa');
const maggie = new TreeNode('Maggie');
const maggies = new TreeNode('sss');
const trimai = new TreeNode('trimai');
// associate root with is descendants
abe.descendants.push(maggies);
const root=new TreeNode('root');
lisa.descendants.push(maggie)
root.descendants.push(homer);
root.descendants.push(abe)
root.descendants.push(lisa)
homer.descendants.push(bart, lisa,maggie,trimai,trimai);
console.log(root)
var txt=""
function travelTree(tree){
        txt+=tree.value
        console.log(tree.value)
        if(tree.descendants){
                for(var i=0;i<tree.descendants.length;i++){
                        txt+='<div class="trimai">'
                        travelTree(tree.descendants[i])
                        if(tree.descendants[i].value.length>0)
                                 txt+='</div>'
                             
                }       
}
}

function travelTrees(tree){
        if(tree.descendants){
                if(tree.descendants.length>0)
                for(var i=0;i<tree.descendants.length;i++){
                        txt+='<div>'
                        travelTree(tree.descendants[i])
                        txt+='</div>\n'
                             
                }       
}
}
travelTrees(root)
console.log(txt)
document.getElementById('p').innerHTML=txt

// console.log(txt)
