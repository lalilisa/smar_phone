window.onload=loadDetail()
// window.onload=loadReview()
var fistlitag
function loadDetail(){
    $.ajax({
        type:'GET',
        url:'http://localhost:8080/api/product/'+window.location.href.split('/')[4],
        contentType:'application/json',
        dataType:'json',
        success : function(data){
            console.log(data)
            let text='';
            let tableinfor=''
            for(let i=0;i<data.length;i++){
                text+=`<div class="s_product_text">
                                <h3 id="name_product">${data[i].Name}</h3>
                                <input type="hidden" value="${data[i].ID_Product}" id="hidden_ID">
                                <ul class="list" id="list">
                                    
                                        <li data-chip="${data[i].Chip}" data-price="${data[i].price}" 
                                            data-OS="${data[i].OS}" data-fontcam="${data[i].frontcamera}"
                                            data-rearcam="${data[i].rearcamera}" data-screen="${data[i].screen}"  data-color="${data[i].color}"
                                            data-pin="${data[i].pin}" data-img="${data[i].img[1]}" data-id="${data[i].id_detail}">
                                            <span  class="color" onclick="chosen(this)">${data[i].color}</span>
                                        </li>						
                                </ul>
                                <h2 id="price_product">${data[i].price}</h2>
                                <div class="product_count">
                                <label for="qty">Quantity:</label>
                                <button onclick="var result = document.getElementById('sst'); var sst = result.value; if( !isNaN( sst )) result.value++;return false;"
                                               class="increase items-count" type="button"><i class="ti-angle-left"></i></button>
                                              <input type="text" name="qty" id="sst" size="2" maxlength="12" value="1" title="Quantity:" class="input-text qty">
                                              <button onclick="var result = document.getElementById('sst'); var sst = result.value; if( !isNaN( sst ) &amp;&amp; sst > 0 ) result.value--;return false;"
                                 class="reduced items-count" type="button"><i class="ti-angle-right"></i></button>
                                </div>
                        </div>
                    
                        `
                tableinfor=`<tbody>
                                <tr>
                                    <td>
                                        <h5 >RAM</h5>
                                    </td>
                                    <td>
                                        <h5 id="RAM">${data[i].RAM}</h5>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h5>ROM</h5>
                                    </td>
                                    <td>
                                        <h5 id="ROM">${data[i].ROM}</h5>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h5>OS</h5>
                                    </td>
                                    <td>
                                        <h5 id="os">${data[i].OS}</h5>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h5>Camera trước</h5>
                                    </td>
                                    <td>
                                        <h5 id="fontcam">${data[i].frontcamera}</h5>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h5>Camera sau</h5>
                                    </td>
                                    <td>
                                        <h5 id="rearcam">${data[i].rearcamera}</h5>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h5>Màn hình</h5>
                                    </td>
                                    <td>
                                        <h5 id="screen">${data[i].screen}</h5>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h5>Pin</h5>
                                    </td>
                                    <td>
                                        <h5 id="pin">${data[i].pin}</h5>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h5>Chip</h5>
                                    </td>
                                    <td>
                                        <h5 id="chip">${data[i].Chip}</h5>
                                    </td>
                                </tr>
                            </tbody>`
            }
            
            document.getElementById('detail_infor').innerHTML=text;
            document.getElementById('table_infor').innerHTML=tableinfor;
            data[0].Describe!==null ? document.getElementById('home').innerHTML=data[0].Describe : document.getElementById('home').innerHTML=''

            // $("#profile-tab").removeClass('active show');
            fistlitag=document.querySelectorAll("#list>li");
            fistlitag[0].classList.add('active')
            document.getElementById("img_product").src=fistlitag[0].getAttribute('data-img');
            document.getElementById('price_product').innerHTML=fistlitag[0].getAttribute('data-price').toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")+" đ";
        }
    })
}

function chosen(ojecttRef) {
    $(ojecttRef).each(function() {
        let parent=$(this).closest('li');
        $('li').removeClass('active');
        parent.addClass('active');
        document.getElementById("img_product").src=$(this).closest('li').attr('data-img');
        document.getElementById('price_product').innerHTML=parent.attr('data-price').toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")+" đ";
        infor(parent.attr('data-chip'),parent.attr('data-os'),parent.attr('data-fontcam'),parent.attr('data-rearcam'),parent.attr('data-screen'),parent.attr('data-pin'))
    })
}



function infor(chip,os,fontcam,rearcam,screen,pin){

    document.getElementById('chip').innerHTML=chip;
    document.getElementById('os').innerHTML=os;
    document.getElementById('fontcam').innerHTML=fontcam;
    document.getElementById('rearcam').innerHTML=rearcam;
    document.getElementById('screen').innerHTML=screen;
    document.getElementById('pin').innerHTML=pin;
}

$("#add_to_cart").click(function(){
    var list=document.querySelectorAll("#list>li");
    let index;
    for(let i=0;i,list.length;i++){
        if(list[i].classList.length===1){
                index=i;
                break;
        }

    }
    console.log(index)
    // ID_Product,ID_Productdetail,color,number,price
    var infor = {};
    infor["name"]=$("#name_product").html();
    infor["img"]=$("#img_product").attr("src");
    infor["ID_Productdetail"]=parseInt(list[index].getAttribute('data-id'));
    infor["ID_Product"]= parseInt($("#hidden_ID").val())
    infor["color"]=list[index].getAttribute('data-color');
    infor["number"]=parseInt($("#sst").val());;
    infor["single_price"]=parseFloat(list[index].getAttribute('data-price'));
    infor["price"]=infor["number"]*(parseFloat(list[index].getAttribute('data-price')));

    console.log(infor)
    $.ajax({
        
        type : "POST",
        contentType : "application/json",
        url : "http://localhost:8080/api/cart",
        data : JSON.stringify(infor),
        dataType : 'json',				
        success : function(data) {
            console.log(data)
        }
        
    })
});



