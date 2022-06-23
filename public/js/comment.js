var txt=""
$.ajax({
    headers:{
        authorization:`Bearer ${getCookie('Username')}`
    },
    type:"GET",
    url:"http://localhost:8080/api/comment/"+window.location.href.split('/')[4],
    contentType:"application/json",
    dataType:"json",

    success :function(data){

    
 
        for(let i=0;i<data.length;i++){
                txt+=`
                <div>
                <div class="review_item">
                <div class="media">
                    <div class="d-flex">
                        <img src="${data[i].img}" alt="">
                    </div>
                    <div class="media-body">
                        <h4>${data[i].Name}</h4>
                        <h5>12th Feb, 2018 at 05:56 pm</h5>
                        <a class="reply_btn" href="#">Reply</a>
                    </div>
                    
                 
                </div>
                <p>${data[i].Content}</p>
             
                <div class="edit_review">
                <input type="text"> <button class="btn comfrim" onclick="sendeditcomment(this,${data[i].id_comment})">Gửi</button>
            </div>
               ${userEdit(data[i].id_comment,data[i].isUser)}
            <div class="sss">
               <span onclick="inputreply(this)" id="sss">Trả lời</span>
            </div>
            <div class="formreply">
                 <input type="text"> <button class="btn comfrim"  onclick="replycomment(this,${data[i].id_comment})"">Gửi</button>
               </div>
            `

            if(data[i].children.length>0){

            for(let j=0;j<data[i].children.length;j++){

                txt+=`
                <div class="review_item reply">
                <div class="media">
                    <div class="d-flex">
                        <img src="${data[i].children[j].img}" alt="">
                    </div>
                    <div class="media-body">
                        <h4>${data[i].children[j].Name}</h4>
                        <h5>12th Feb, 2018 at 05:56 pm</h5>
                        <a class="reply_btn" href="#">Reply</a>
                    </div>
                </div>
                <div class="edit_review">
                <input type="text"> <button class="btn comfrim" onclick="sendeditcomment(this,${data[i].children[j].id_comment})">Gửi</button>
            </div>
            <p>${data[i].children[j].Content}</p>
               ${userEdit(data[i].children[j].id_comment,data[i].children[j].isUser)}
            <div class="sss">
               <span onclick="inputreply(this,${data[i].children[j].id_comment})" id="sss">Trả lời</span>
            </div>
            <div class="formreply">
                 <input type="text"> <button class="btn comfrim"  onclick="replycomment(this,${data[i].children[j].id_comment})"">Gửi</button>
               </div>
        
         `
            travelTree(data[i].children[j])
            txt+='</div>'
            }
          
        }
            else{
                txt+='</div>'
            }
            
            txt+='</div>'
        }

        document.getElementById('comment_list').innerHTML=txt;
        
        // }
        
        // 
    }
})


function travelTree(tree){

        if(tree.children.length>0){
                for(var i=0;i<tree.children.length;i++){
                        txt+=`
                        <div class="review_item reply">
                        <div class="media">
                            <div class="d-flex">
                                <img src="${tree.children[i].img}" alt="">
                            </div>
                            <div class="media-body">
                                <h4>${tree.children[i].Name}</h4>
                                <h5>12th Feb, 2018 at 05:56 pm</h5>
                                <a class="reply_btn" href="#">Reply</a>
                            </div>
                        </div>
                        <div class="edit_review">
                        <input type="text"> <button class="btn comfrim" onclick="sendeditcomment(this,${tree.children[i].id_comment})">Gửi</button>
                    </div>
                    <p>${tree.children[i].Content}
                       ${userEdit(tree.children[i].id_comment,tree.children[i].isUser)}
                    <div class="sss">
                       <span onclick="inputreply(this,${tree.children[i].id_comment})" id="sss">Trả lời</span>
                    </div>
                    <div class="formreply">
                         <input type="text"> <button class="btn comfrim"  onclick="replycomment(this,${tree.children[i].id_comment})"">Gửi</button>
                       </div>
                
                
                 `
                        travelTree(tree.children[i])
                        if(tree.children[i].Content.length>0)
                                 txt+='</div>'
                             
                }       
}
}
function formreply(ojecttRef){
    $(ojecttRef).each(function(){
        let s=$(this).parent('.abcz').siblings('.edit_review');
        s.toggleClass('active')
    })

}
function inputreply(ojecttRef){
    $(ojecttRef).each(function(){
        let s=$(this).parent('.sss').siblings('.formreply');
        s.toggleClass('active')
    })
}


$('#post_comment').click(function(){
    let data={};
    data['content']=document.getElementById('message').value;
    data['id_product']= parseInt(window.location.href.split('/')[4]);
    data['reply']=null;
    console.log(data)
    $.ajax({
        headers:{
            authorization:`Bearer ${getCookie('Username')}`
        },
        type:'POST',
        url:'http://localhost:8080/api/comment',
        contentType:'application/json',
        data:JSON.stringify(data),
        dataType:'json',
        success : function(data){
            console.log(data)
        }
    })
})

function userEdit(id_comment,isUser){
    if(isUser){
        return `<div class="abcz"><span onclick="formreply(this)">Sửa</span><span onclick="deletecomment(this,${id_comment})">Xóa</span></div>`
    }
    return "";
}
function sendeditcomment(ojecttRef,id_comment){
    $(ojecttRef).each(function(){
            let content=$(this).siblings('input').val()
            let edit_data={};
            edit_data['id_comment']=parseInt(id_comment);
            edit_data['content']=content;
        $.ajax({
            headers:{
                authorization:`Bearer ${getCookie('Username')}`
            },
            type:'PUT',
            url:'http://localhost:8080/api/comment/'+id_comment,
            contentType:'application/json',
            data:JSON.stringify(edit_data),
            dataType:'json',
            success : function(data){
                console.log(data)
            }
        })
    })
}
function deletecomment(id_comment){

        $.ajax({
            headers:{
                authorization:`Bearer ${getCookie('Username')}`
            },
            type:'DELETE',
            url:'http://localhost:8080/api/comment/'+id_comment,
            contentType:'application/json',
            dataType:'json',
            success : function(data){
                console.log(data)
            }
        })
    }


function replycomment(ojecttRef,id_comment){
        $(ojecttRef).each(function(){   
            let content=$(this).siblings('input').val();

            let data={};
            data['id_product']=parseInt(window.location.href.split('/')[4])
            data['reply']=id_comment;
            data['content']=content;
            console.log(data)
            $.ajax({
                headers:{
                    authorization:`Bearer ${getCookie('Username')}`
                },
                type:"POST",
                url:"http://localhost:8080/api/comment/postreply",
                contentType:'application/json',
                dataType:'json',
                data:JSON.stringify(data),
                success :function(data){
                    if(data){
                        console.log(data)
                    }
                }
            })
        })
}
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }