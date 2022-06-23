


function successOrder(){
$.ajax({

        type : "GET",
        contentType : "application/json",
        url : 'http://localhost:8080/api/order/all_order',
        dataType : 'json',				
        success : function(data) {
            console.log(data);
                let element=`   <div class="show-content" id="column">
                                            <div>Username</div>
                                            <div class="box2">Tên sản phẩm</div>
                                            
                                            <div>Màu</div>
                                            <div>Số lượng</div>
                                            <div>Ảnh</div>
                                        
                                </div>`
                for(let i=0;i<data.length;i++){
                    if(data[i].status===1){
                    element+=`
            <div class="show-content" id="inforUser">
              <div>${data[i].Username}</div>
              <div class="box2">${data[i].Name}</div>
              <div>${data[i].color}</div>
              <div>${data[i].number}</div>
              <div> <img src=${data[i].img}></div>
           
          </div>
          <div class="show-content" >
                <div></div>
                <div></div>
                <div></div>
                <div id="btn-delete-order">Xóa Order</div>

          </div>
     
            
          </div>
      </div>
                    `
                }
            }
                document.getElementById('show-page').innerHTML=element;
    

        } 

})   
}
function pendingOrder(){
    $.ajax({
            headers:{
                authorization:`Bearer ${getCookie('Username')}`
            },
            type : "GET",
            contentType : "application/json",
            url : 'http://localhost:8080/api/order/all_order',
            dataType : 'json',				
            success : function(data) {
                console.log(data);
                let element=`   <div class="show-content" id="column">
                                            <div>Username</div>
                                            <div class="box2">Tên sản phẩm</div>
                                            
                                            <div>Màu</div>
                                            <div>Số lượng</div>
                                            <div>Ảnh</div>
                                       
                                </div>`
                for(let i=0;i<data.length;i++){
                    if(data[i].status===0){
                    element+=`
            <div class="show-content" id="inforUser">
              <div>${data[i].Username}</div>
              <div class="box2">${data[i].Name}</div>
              <div>${data[i].color}</div>
              <div>${data[i].number}</div>
              <div> <img src=${data[i].img}></div>

        </div>
                                
                <div class="show-content" >
                <div></div>
                <div></div>
                <div></div>
                <div id="btn-delete-order">Xóa Order</div>
          </div>  
                        
      </div>
                    `
                }
            }
                document.getElementById('show-page').innerHTML=element;
    
            } 
    
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