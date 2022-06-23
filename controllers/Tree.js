function TreeComment(data){
    let n=data.length-1;
    let rep=[]
    for(let i=n;i>=0;i--){
        let x=data[i].reply;
        if(rep.indexOf(x)===-1&&x!==null){
            let t= data.filter((o)=> o.reply===x);
            let indexparent=-1;
            for(let i=0;i<data.length-1;i++){
                if(data[i].id_comment===x){
                    indexparent=i;
                }
            }

            if(t!==undefined){
                t.forEach(function(value){
                    data[indexparent].children.push(value)
                })
                rep.push(x)
            }
            rep.push(x)
        }
}
        let s=data.filter((o)=>o.reply===null)
        return s;
}
function TreeReview(data){
    let n=data.length-1;
    let rep=[]
    for(let i=n;i>=0;i--){
        let x=data[i].reply;
        if(rep.indexOf(x)===-1&&x!==null){

            let t= data.filter((o)=> o.reply===x);

            let indexparent=-1;
            for(let i=0;i<data.length-1;i++){
                if(data[i].id_review===x){
                    indexparent=i;

                }
            }
            console.log(t)
            if(t!==undefined && indexparent>-1){
                t.forEach(function(value){
                    
                    data[indexparent].children.push(value)
                })
                rep.push(x)
            }
        }
}   

        let s=data.filter((o)=>o.reply===null)
        return s;
}
module.exports={
    TreeComment,
    TreeReview

}