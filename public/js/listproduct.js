window.load=s()
function s(){

    $.ajax({
        type:'GET',
        url:'http://localhost:8080/api/product',
        contentType:'application/json',
        dataType:'json',
        success : function(data){
            let text='';
            console.log(data)
            for(let i=0;i<data.length;i++){
                text+=`
                <div class="col-md-6 col-lg-4">
                <div class="card text-center card-product">
                  <div class="card-product__img">
                    <img class="card-img" src="/product/${data[i].img}" alt="">
                    <ul class="card-product__imgOverlay">
                      <li><button><i class="ti-search"></i></button></li>
                      <li><button><i class="ti-shopping-cart"></i></button></li>
                      <li><button><i class="ti-heart"></i></button></li>
                    </ul>
                  </div>
                  <div class="card-body">
                    <p></p>
                    <h4 class="card-product__title"><a href="#">${data[i].Name}</a></h4>
                    <p class="card-product__price">${data[i].Price}  </p>
                  </div>
                </div>
              </div>
                `
            }
            document.getElementById('row').innerHTML=text
        }
    })  

}
document.getElementById('row').innerHTML='';
function searchKeyUp(){

    let keyword=$("#search_bar").val();
    console.log(keyword)
    $.ajax({

        type:"GET",
        url:`http://localhost:8080/api/product`,
        contentType:"application/json",
        dataType:"json",
        success :function(data){
            data=data.filter( o=> o.Name.toLowerCase().includes(keyword.toLowerCase()))
            console.log(data)
            let text='';

            for(let i=0;i<data.length;i++){
                text+=`
                <div class="col-md-6 col-lg-4">
                <div class="card text-center card-product">
                  <div class="card-product__img">
                    <img class="card-img" src="/product/${data[i].img}" alt="">
                    <ul class="card-product__imgOverlay">
                      <li><button><i class="ti-search"></i></button></li>
                      <li><button><i class="ti-shopping-cart"></i></button></li>
                      <li><button><i class="ti-heart"></i></button></li>
                    </ul>
                  </div>
                  <div class="card-body">
                    <p></p>
                    <h4 class="card-product__title"><a href="#">${data[i].Name}</a></h4>
                    <p class="card-product__price">${data[i].Price}  </p>
                  </div>
                </div>
              </div>
                `
            }
            document.getElementById('row').innerHTML=text
        
        }
    })

}
const debounce = (func, delay) => {
  let timerId;
  return function () {
      clearTimeout(timerId)
      timerId = setTimeout(() => func.apply(this, arguments), delay)
  };
};



let textField = document.querySelector('#search_bar');
textField.addEventListener('keyup', debounce(searchKeyUp, 500));






$('.filter-list>input').click(function() {

  
  $.ajax({

    type:'GET',
    url:'http://localhost:8080/api/product',
    contentType:'application/json',
    dataType:'json',
    success : function(data){
        let text='';
        let radiochecked=$('input[type=radio]:checked').val()
        if (radiochecked!==undefined)
            data=data.filter( o => o.Brand.toLowerCase()===radiochecked.toLowerCase())
        for(let i=0;i<data.length;i++){
            text+=`
            <div class="col-md-6 col-lg-4">
            <div class="card text-center card-product">
              <div class="card-product__img">
                <img class="card-img" src="/product/${data[i].img}" alt="">
                <ul class="card-product__imgOverlay">
                  <li><button><i class="ti-search"></i></button></li>
                  <li><button><i class="ti-shopping-cart"></i></button></li>
                  <li><button><i class="ti-heart"></i></button></li>
                </ul>
              </div>
              <div class="card-body">
                <p></p>
                <h4 class="card-product__title"><a href="#">${data[i].Name}</a></h4>
                <p class="card-product__price">${data[i].Price}  </p>
              </div>
            </div>
          </div>
            `
        }
        document.getElementById('row').innerHTML=text
    }
  })  
});

