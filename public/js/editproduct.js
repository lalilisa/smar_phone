$(document).ready(function() {
            
    $('#addmodel').submit(function() {
      $(this).ajaxSubmit({
          type:'PUT',
          url: window.location.href,
          error: function(xhr) {
      status('Error: ' + xhr.status);
          },

      success: function(response) {
            console.log(response)
          }
  });
  return false;
  });    
  });

  $(document).ready(function() {
            
    $('#change-detail').submit(function() {
      $(this).ajaxSubmit({
          type:'PUT',
          url: window.location.href,
          error: function(xhr) {
      status('Error: ' + xhr.status);
          },

      success: function(response) {
            console.log(response)
          }
  });
  return false;
  });    
  });





function deleteProduct(id){
    let ID={};
    ID['id']=id;
    $.ajax({
        type : "Delete",
        contentType : "application/json",
        url : "deleteproduct",
        data : JSON.stringify(ID),
        dataType : 'json',				
        success : function(data) {
            console.log(data);

        }
        
    }) 
}
function deleteDetail(id){
    let ID={};
    ID['id']=id;
    $.ajax({
        type : "Delete",
        contentType : "application/json",
        url : "deleteproductdetail/"+ID.id,
        data : JSON.stringify(ID),
        dataType : 'json',				
        success : function(data) {
            console.log(data);

        }
        
    }) 
}
function searchProduct(){
    let info=$("#input_search").val();
    $.ajax({
        headers:{
            authorization:`Bearer ${getCookie('Username')}`
        },
        type:"GET",
        url:"http://localhost:8080/api/product",
        contentType:"application/json",
        dataType:"json",
        success:function(response){
            let filterList=response.filter(o=> o.Name.toLowerCase().includes(info.toLowerCase()))

            let element=`       <div class="show-content" id="column">
                                    <div>ID_Product</div>
                                    <div class="box2">Name</div>
                                    <div> Hãng </div>
                                    <div>Giá</div>
                                    <div>Action</div>
                                </div>`
            for(let i=0;i<filterList.length;i++){
                    element+=`<div class="show-content" id="inforUser">
                    <div>${filterList[i].ProductID}</div>
                    <div class="box2">${filterList[i].Name}</div>
                    <div>${filterList[i].Brand}</div>
                    <div>${filterList[i].Price}</div>
                    <div>
                    <a href=""><i class="fas fa-pencil-alt"></i></a>
                    <button style="color: black; margin-left: 0.5rem;" onclick="deleteProduct('${filterList[i].ProductID}')"><i class="fas fa-times"></i></button >
                </div>
                </div>`
            }
            document.getElementById("list_product").innerHTML=element
        },
        
    })
}
const debounce = (func, delay) => {
    let timerId;
    return function () {
        clearTimeout(timerId)
        timerId = setTimeout(() => func.apply(this, arguments), delay)
    };
  };
  
$("#input_search").on('keyup',searchProduct)

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