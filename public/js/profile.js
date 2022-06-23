var username=window.location.href.split('/')[4]
var url='http://localhost:8080/api/user/'+username;

$("#update_profile").click(function(){
    var infor = {};
    infor["name"] = $("#name").val();
    infor["date"] = $("#date").val();
    infor["phone"] = $("#phone").val();
    infor["address"] = $("#address").val();
    infor["mail"] = $("#mail").val();
    console.log(infor)
    if($( "#option-role" ).val()==='admin')
        infor["role"] =1;
    else
        infor["role"]=0;
    if(validateForm()){
    $.ajax({
      headers: {
        authorization:`Bearer ${getCookie('Username')}`,
    },
        type : "PUT",
        url : `http://localhost:8080/api/user/kimcuc237`,
        contentType : "application/json",
        data : JSON.stringify(infor),
        dataType : 'json',				
        success : function(data) {
            console.log(data)
            location.reload();
            // $('#form-profile').load(location.href+" #form-profile")
        }
        
    })}
});
$(document).ready(function() {
  
    $('#form-detail').submit(function() {
       $(this).ajaxSubmit({

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

function validateForm(){
    const regex=/^0([0-9]{9})$/g;
    var checkphone= $('#phone').val().match(regex);
    if(!checkphone){
        $('.errorPhone').addClass('active')
    }

    const EMAIL_REG = /[a-zA-Z][a-zA-Z0-9_\.]{1,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}/g;
    var checkmail= $('#mail').val().match(EMAIL_REG);
    if(!checkmail){
        $('.errorEmail').addClass('active')
    }

    if(!checkphone||!checkmail)
        return false;
    return true;
}


// Change Pass


  $.ajax({
    headers: {

      authorization:`Bearer ${getCookie('Username')}`,
  },
    type : "GET",
    contentType : "application/json",
    url : url,

    dataType : 'json',				
    success : function(data) {
         $("#name").val(data.Name);
         $("#date").val(data.Date);
         $("#phone").val(data.Phonenumber);
         $("#address").val(data.Address);
         $("#mail").val(data.Email);
         document.getElementById('asgnmnt_file_img').src=data.img;
         document.getElementById('changepass').href="  http://localhost:8080/profile/changepass/"+data.Username
         $('option').html(data.role===1 ? "Admin":"User")
         $('option').val(data.role===1 ? "admin":"user")
    }

    
})

$.ajax({
    headers: {

      authorization:`Bearer ${getCookie('Username')}`,
  },
    type : "GET",
    contentType : "application/json",
    url : 'http://localhost:8080/api/order',
    dataType : 'json',				
    success : function(data) {
        console.log(data)
        let text="";
        let total_price=0;
        for(let i=0;i<data.length;i++){
        if(i<data.length-1&&data[i].id_order!==data[i+1].id_order ||i===data.length-1){
            total_price+=data[i].number*data[i].price;
            text+=           `<tr>
            <td>
                <div class="media">
                  <div class="d-flex">
                    <img src="${data[i].img}" alt="" id="img_product_cart"></div>
                    <div class="media-body">
                      <p>${data[i].Name}</p>
                      <p>Màu :${data[i].color} </p>
                    </div>
                  </div>
                </td>
                <td>
                  <h5>${data[i].price}</h5>
                </td>
                <td>
                  <div class="product_count" data-price="20000000" style="margin-left:1.5rem;">
                  
                    <span >${data[i].number}</span>
                    </div>
                  </td>
                  <td><h5 class="total" total="" id="total_single_product">${data[i].number*data[i].price}</h5>
                  </td></tr>     
            <td> <input type='hidden' value=${data[i].id_order}><button class="btn comfrim" onclick="confirmOrder(this)">Xác nhận nhận hàng</button></td>
            <td> <input type='hidden' value=${data[i].id_order}><button class="btn comfrim" onclick="cancelOrder(this)">Hủy đơn hàng</button></td>
            <td><h5>Subtotal</h5></td><td><h5 data-finalprice="36000123" id="finalprice">${total_price}</h5></td>
            <tr>`
            total_price=0;
        }
       else{  
            text+=` <tr>
        <td>
            <div class="media">
              <div class="d-flex">
                <img src="${data[i].img}" alt="" id="img_product_cart"></div>
                <div class="media-body">
                  <p>${data[i].Name}</p>
                  <p>Màu :${data[i].color} </p>
                </div>
              </div>
            </td>
            <td>
              <h5>${data[i].price}</h5>
            </td>
            <td>
              <div class="product_count" data-price="20000000" style="margin-left:1.5rem;">
              
                <span >${data[i].number}</span>
                </div>
              </td>
              <td><h5 class="total" total="" id="total_single_product">${data[i].number*data[i].price}</h5>
              </td>`
              total_price+=data[i].number*data[i].price;
            
        // for(let i=0;i<data.length;i++){
    }
        //  total_price+=data[i].number*data[i].price;
         }
       
         document.getElementById('list_product').innerHTML=text;
        }
    
})

function confirmOrder(ojecttRef){
         $(ojecttRef).each(function(){
           let id_order =parseInt($(this).siblings('input').val())

       
           $.ajax({
              headers: {

                authorization:`Bearer ${getCookie('Username')}`,
            },
              type:"PUT",
              url:'http://localhost:8080/api/order/'+id_order,
              contentType:'application/json',
              dataType:'json',
              data:JSON.stringify({id_order: id_order}),
              success : function(data,status){
                  if(data){
                    console.log(data)
                  }
                  else{
                    console.log(data)
                  }
              }
           })
         })
}

function cancelOrder(ojecttRef){
  $(ojecttRef).each(function(){
    let id_order =parseInt($(this).siblings('input').val())


    $.ajax({
      headers: {

        authorization:`Bearer ${getCookie('Username')}`,
    },
       type:"DELETE",
       url:'http://localhost:8080/api/order/'+id_order,
       contentType:'application/json',
       dataType:'json',
       data:JSON.stringify({id_order: id_order}),
       success : function(data,status){
           if(data){
             console.log(data)
              location.reload();
           }
           else{
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

var decodedToken = getCookie('Username')
if (decodedToken.exp < new Date()/1000) {
  console.log("EXPIRED");
}