


// $.ajax({
//     type:"GET",
//     url:`${window.location.origin}/api/product/smart_watch`,
//     contentType:"application/json",
//     dataType:"json",
//     success : function(data){
//         console.log(data)
//         let insert=`<div class="owl-item clone" style="width: 291.467px; margin-right: 10px;"><div class="hero-carousel__slide">
//         <img src="/product/1656304241353-736003058-1625537067385.png" alt="" class="img-fluid">
//         <a href="#" class="hero-carousel__slideOverlay">
//           <h3>Realme Brand 4</h3>
//           <p></p>
//         </a>
//       </div></div>`
//         let ele=``;
//         ele=""
//         for(let i=0;i<data.length;i++){
//             ele+=`
         
//             <div class="owl-item active" style="width: 291.467px; margin-right: 10px;"><div class="hero-carousel__slide">
//             <img src="/product/${data[i].img}" alt="" class="img-fluid">
//             <a href="/product/${data[i].ProductID}" class="hero-carousel__slideOverlay">
//               <h3>${data[i].Name}</h3>
//               <p></p>
//             </a>
//           </div></div>
         
//          `
         
     
//         }
//         ele+=`            <div class="owl-item active" style="width: 291.467px; margin-right: 10px;"><div class="hero-carousel__slide">
//         <img src="/product/${data[0].img}" alt="" class="img-fluid">
//         <a href="/product/${data[0].ProductID}" class="hero-carousel__slideOverlay">
//           <h3>${data[0].Name}</h3>
//           <p></p>
//         </a>
//       </div></div>`
//         document.querySelector(".owl-stage").innerHTML=insert+ insert+ ele 
//     }
// })
