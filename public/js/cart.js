


    $.ajax(({
        headers:{
            authorization:`Bearer ${getCookie('Username')}`
        },
        type:"GET",
        url:"http://localhost:8080/api/cart",
        dataType:"json",
        contentType:"application/json",
        success:  function(data){
            console.log(data)
            var text='';
            var finalprice=0
            for(let i=0;i<data.length;i++){
                text+=`<tr><td><div class="media">
                        <div class="d-flex">
                            
                        <label  data-name_product="${data[i].name_product}" data-img="${data[i].img}"
                        data-color="${data[i].color}" data-single_price="${data[i].single_price}" data-id_cartdetail="${data[i].id_cartdetail}" 
                        data-ID_Productdetail="${data[i].ID_Productdetail}" data-number="${data[i].number}" data-id_cart="${data[i].id_cart}"  data-ID_Product="${data[i].ID_Product}">
                            <input type="checkbox" class="option_checkout">

                                <img src=${data[i].img} alt="" id="img_product_cart">
                                </lable>
                                        </div><div class="media-body"><p>${data[i].name_product}</p></div></div></td>
                                        <td><h5>${data[i].single_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</h5></td><td><div class="product_count" data-price=${data[i].single_price}>
                                        <input type="text" name="qty" id="sst" maxlength="12" value=${data[i].number} title="Quantity:"class="input-text qty"  onfocusout="scanNumber(this)"><input type="hidden" value=${data[i].id_cartdetail} id="id_cartdetail" >
                                        <input type="hidden" value=${data[i].ID_Productdetail} id="ID_Productdetail"><button class="increase items-count" type="button" onclick="add(this)"><i class="lnr lnr-chevron-up"></i></button><button class="reduced items-count" type="button" onclick="decre(this)"><i class="lnr lnr-chevron-down"></i></button></div></td><td><h5 class="total" total=${(data[i].single_price*data[i].number)} id="total_single_product">${(data[i].single_price*data[i].number).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</h5></td><td><span onclick="deleteProductInCart(${data[i].id_cartdetail})">Xóa</span></td></tr>`;
                finalprice+=(data[i].single_price*data[i].number)
            }
            let bottom=`<tr><td></td><td></td><td><h5>Subtotal</h5></td><td><h5 data-finalprice=${finalprice} id="finalprice">${finalprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</h5></td></tr><tr class="bottom_button"><td></td><td></td><td></td><td><div class="cupon_text d-flex align-items-center"><a class="primary-btn" id="buy_product" onclick="toCheckout()">Apply</a></div></td></tr> `
            document.getElementById('list_product').innerHTML=text+bottom;
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log(textStatus)
                // window.location.href="http://localhost:8080"
         }
    }))


var finalprice=0;
$(".total").each(function(){
    finalprice+=parseInt($(this).attr('total'))
})
$('#finalprice').html(finalprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."))
function add(ojecttRef){
    $(ojecttRef).each(function(){
        let inputBox=$(this).siblings('#sst').val();
        inputBox=parseInt(inputBox)+1;
        $(this).siblings('#sst').val(inputBox);
        let price=$(this).closest('div').attr('data-price')
        pricecon=parseInt(price);
        $(this).closest('div').closest('td').next().find('.total').html((pricecon*inputBox).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."));
        $(this).closest('div').closest('td').next().find('.total').attr('total',pricecon*inputBox);
        let totalPrice=0;
        $('.total').each(function(){
            let t=$(this).attr('total');
            totalPrice+=parseInt(t);
            
        
        })
          console.log(totalPrice)
          $('#finalprice').attr('data-finalprice',totalPrice)
          $('#finalprice').html(totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."))
          let infor={};
          infor["number"]=parseInt($(this).siblings('#sst').val());
          infor["id_cartdetail"]=$(this).siblings("#id_cartdetail").val();
         
          $.ajax({
            headers:{
                authorization:`Bearer ${getCookie('Username')}`
            },
            type:"PUT",
            url:"http://localhost:8080/api/cart/",
            dataType:"json",
            data:JSON.stringify(infor),
            contentType:"application/json",
            success: function(data){
                    console.log(data)
            }
        })
    
    })


}

function decre(ojecttRef){
    $(ojecttRef).each(function(){

        let inputBox=$(this).siblings('#sst').val();
        inputBox =parseInt(inputBox)-1;
        if(inputBox===0)
             $(this).siblings('#sst').val(1);
        else
             $(this).siblings('#sst').val(inputBox);
        let price=$(this).closest('div').attr('data-price')
        pricecon=parseInt(price);
        tdpr=$(this).closest('div').closest('td').next().find('.total').html((pricecon*inputBox).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."));
        let totalPrice=0;
        $('.total').each(function(){
            let t=$(this).attr('total');

            totalPrice+=parseInt(t)
        })
        // console.log(totalPrice)
          $('#finalprice').attr('data-finalprice',totalPrice)
          $('#finalprice').html(totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."));
          let infor={};
          infor["number"]=parseInt($(this).siblings('#sst').val());
          infor["id_cartdetail"]=$("#id_cartdetail").val();
          $.ajax({
            headers:{
                authorization:`Bearer ${getCookie('Username')}`
            },
            type:"PUT",
            url:"http://localhost:8080/api/cart/",
            dataType:"json",
            data:JSON.stringify(infor),
            contentType:"application/json",
            success: function(data){
                    console.log(data)
            }
        })
    })

}

function scanNumber(ojecttRef){
    let numberList=[];
    $('.input-text').each(function(){
        console.log($(this))
        numberList.push(parseInt($(this).val()))
    })

    let totalPrice=0;
    let total_single=$('.total')
    $('.product_count').each(function(index){
        let t=$(this).attr('data-price');
        totalPrice+=(parseInt(t)*numberList[index])
        total_single[index].innerHTML=((parseInt(t)*numberList[index]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."));
    })
      $('#finalprice').attr('data-finalprice',totalPrice)
      $('#finalprice').html(totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."));
      let infor={};
      $(ojecttRef).each(function(){
        infor["number"]=parseInt($(this).val());
        infor["ID_Productdetail"]=parseInt($(this).siblings("#ID_Productdetail").val())
        infor["id_cartdetail"]=parseInt($(this).siblings("#id_cartdetail").val());
      })

      
      console.log(infor)
      $.ajax({
        headers:{
            authorization:`Bearer ${getCookie('Username')}`
        },
        type:"PUT",
        url:"http://localhost:8080/api/cart/",
        dataType:"json",
        data:JSON.stringify(infor),
        contentType:"application/json",
        success: function(data){
                console.log(data)
        }
    })
}

function  deleteProductInCart(id_cartdetail){
    $.ajax({
        headers:{
            authorization:`Bearer ${getCookie('Username')}`
        },
        type:"DELETE",
        url:"http://localhost:8080/api/cart/"+id_cartdetail,
        dataType:"json",
        data:JSON.stringify({"id_cartdetail":id_cartdetail}),
        contentType:"application/json",
        success: function(data){
                console.log(data)
        }
    })
}




///for checkout

function toCheckout(){
        let datas=[];
        $('.option_checkout').each(function(){
            if( $(this).is(':checked') ){
                let storedata=($(this).parent('label'))
                     let data={};
                     data['id_cartdetail']=parseInt(storedata.attr('data-id_cartdetail'));
                     data['id_cart']=parseInt(storedata.attr('data-id_cart'));
                     data['ID_Productdetail']=parseInt(storedata.attr('data-ID_Productdetail'));
                     data['ID_Product']=parseInt(storedata.attr('data-ID_Product'));
                     data['color']=storedata.attr('data-color');
                     data['number']=parseInt(storedata.attr('data-number'));
                     data['name_product']=storedata.attr('data-name_product');
                     data['img']=storedata.attr('data-img');
                     data['single_price']=parseFloat(storedata.attr('data-single_price'));
                     datas.push(data);
            }
            console.log(datas)
        })
        if(datas.length>0){
        $.ajax({
            headers:{
                authorization:`Bearer ${getCookie('Username')}`
            },
            type:'POST',
            contentType:'application/json',
            url:'http://localhost:8080/api/checkout',
            dataType:'json',
            data:JSON.stringify(datas),
            success : function(response){

                console.log(response);
                window.location.href='http://localhost:8080/checkout/?hash='+response;

            }
    })
}
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

