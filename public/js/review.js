var textReView=''
const ratingStars = [...document.getElementsByClassName("rating__star")];

function executeRating(stars) {
  const starClassActive = "rating__star fas fa-star";
  const starClassInactive = "rating__star far fa-star";
  const starsLength = stars.length;
  let i;
  stars.map((star) => {
    star.onclick = () => {
      i = stars.indexOf(star);

      if (star.className===starClassInactive) {
        for (i; i >= 0; --i) stars[i].className = starClassActive;
      } else {
        for (i; i < starsLength; ++i) stars[i].className = starClassInactive;
      }
    };
  });
}
executeRating(ratingStars);




    $.ajax({
        type:"GET",
        url:"http://localhost:8080/api/review/"+window.location.href.split('/')[4],
        contentType:"application/json",
        dataType:"json",

        success :function(data){

            
            for(let i=0;i<data.length;i++){
                let rate=Rate(data[i].rate)
                textReView+=`
                <div>
                <div class="review_item">
                <div class="media">
                    <div class="d-flex">
                        <img src="${data[i].img}" alt="">
                    </div>
                    <div class="media-body">
                        <h4>${data[i].Name}</h4>
                        <h5>${rate}</h5>
                      

                    </div>
                    
                 
                </div>
                <p>${data[i].Content}</p>
             
                <div class="edit_review">
                <input type="text"> <button class="btn comfrim" onclick="sendeditreview(this,${data[i].id_review})">Gửi</button>
            </div>
               ${userEditReview(data[i].id_review,data[i].isUser)}
            <div class="sss">
               <span onclick="inputreply(this,${data[i].id_review})" id="sss">Trả lời</span>
            </div>
            <div class="formreply">
                 <input type="text"> <button class="btn comfrim"  onclick="replyreview(this,${data[i].id_review})"">Gửi</button>
               </div>
            `

            if(data[i].children.length>0){

            for(let j=0;j<data[i].children.length;j++){
                let rate=Rate(data[i].children[j].rate)
                textReView+=`
                <div class="review_item reply">
                <div class="media">
                    <div class="d-flex">
                        <img src="${data[i].children[j].img}" alt="">
                    </div>
                    <div class="media-body">
                        <h4>${data[i].children[j].Name}</h4>
                        <h5>${rate}</h5>

                    </div>
                </div>
                <div class="edit_review">
                <input type="text"> <button class="btn comfrim" onclick="sendeditreview(this,${data[i].children[j].id_review})">Gửi</button>
            </div>
            <p>${data[i].children[j].Content}</p>
               ${userEditReview(data[i].children[j].id_review,data[i].children[j].isUser)}
            <div class="sss">
               <span onclick="inputreply(this,${data[i].children[j].id_review})" id="sss">Trả lời</span>
            </div>
            <div class="formreply">
                 <input type="text"> <button class="btn comfrim"  onclick="replyreview(this,${data[i].children[j].id_review})"">Gửi</button>
               </div>
         `
            travelTreeReview(data[i].children[j])
            textReView+='</div>'
            }
          
        }
            else{
                textReView+='</div>'
            }
            
            textReView+='</div>'
        }

        document.getElementById('review_list').innerHTML=textReView;
      
        // }
        
        // 
    
            
  
        }
    })
    function travelTreeReview(tree){

        if(tree.Content.length>0){

                for(let t=0;t<tree.children.length;t++){
                    let rate=Rate(tree.children[t].rate)
                    textReView+=`
                 <div class="review_item reply">
                        <div class="media">
                            <div class="d-flex">
                                <img src="${tree.children[t].img}" alt="">
                            </div>
                            <div class="media-body">
                                <h4>${tree.children[t].Name}</h4>
 
                                <h5>${rate}</h5>
                   
                            </div>
                        </div>
                        <div class="edit_review">
                        <input type="text"> <button class="btn comfrim" onclick="sendeditreview(this,${tree.children[t].id_review})">Gửi</button>
                    </div>
                    <p>${tree.children[t].Content}
                       ${userEditReview(tree.children[t].id_review,tree.children[t].isUser)}
                    <div class="sss">
                       <span onclick="inputreply(this,${tree.children[t].id_review})" id="sss">Trả lời</span>
                    </div>
                    <div class="formreply">
                         <input type="text"> <button class="btn comfrim"  onclick="replyreview(this,${tree.children[t].id_review})"">Gửi</button>
                       </div>
                 `
                         travelTreeReview(tree.children[t])
                        if(tree.children[t].Content.length>0)
                                textReView+='</div>'
                             
                }       
}
}
function Rate(rate){
    if (rate===0||rate===null)
        return ""
    const starClassActive = "<i class='rating__star fas fa-star'></i>";
    const starClassInactive = "<i class='rating__star far fa-star'></i>";
    let element=''
    for(let i=1;i <=5;i++){
         if(i<=rate)
            element+=starClassActive;
         else
            element+=starClassInactive
    }
    return element;
}
function formedit(ojecttRef){
    $(ojecttRef).each(function(){
        let s=$(this).parent('.abcz').siblings('.edit_review');
        s.toggleClass('active')
    })

}
function userEditReview(id_review,isUser){
    if(isUser){
        return `<div class="abcz"><span onclick="formreply(this)">Sửa</span><span onclick="deletereview(${id_review})">Xóa</span></div>`
    }
    return "";
}

$("#post_review").click(function(){
    let data={};
    data["ID_Product"]=parseInt(window.location.href.split('/')[4]),
    data['content']=document.getElementById('textarea').value;
    data['rate']=document.querySelectorAll('i.rating__star.fas.fa-star').length
    data['reply']=null
    $.ajax({
        type:'POST',
        url:'http://localhost:8080/api/review',
        contentType:'application/json',
        data:JSON.stringify(data),
        dataType:'json',
        success : function(data){
            console.log(data)
        }
    })
})
function sendeditreview(ojecttRef,id_review){
    $(ojecttRef).each(function(){
            let content=$(this).siblings('input').val()
            let edit_data={};
            edit_data['id_review']=parseInt(id_review);
            edit_data['content']=content;
        $.ajax({
            type:'PUT',
            url:'http://localhost:8080/api/review/'+id_review,
            contentType:'application/json',
            data:JSON.stringify(edit_data),
            dataType:'json',
            success : function(data){
                console.log(data)
            }
        })
    })


}
function deletereview(id_review){
        console.log(id_review)
        $.ajax({
            type:'DELETE',
            url:'http://localhost:8080/api/review/'+id_review,
            contentType:'application/json',
            dataType:'json',
            success : function(data){
                console.log(data)
            }
        })
   


}
function replyreview(ojecttRef,id_review){
    $(ojecttRef).each(function(){   
        let content=$(this).siblings('input').val();

        let data={};
        data['id_product']=parseInt(window.location.href.split('/')[4])
        data['reply']=id_review;
        data['content']=content;
        console.log(data)
        $.ajax({
            type:"POST",
            url:"http://localhost:8080/api/review/postreply",
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