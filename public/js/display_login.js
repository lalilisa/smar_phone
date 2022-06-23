

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

let token=getCookie("Username")
let username=getCookie("user")
let element=''
if( username.length>0 && token.length>0){
    document.getElementById('display_login').innerHTML=  `<a class="button button-header" href="http://localhost:8080/profile/${username}">${username}</a>
    <a class="button button-header" href="http://localhost:8080/logout"> Đăng xuất</a>`
   }else{
    document.getElementById('display_login').innerHTML=  `<a class="button button-header" href="http://localhost:8080/login">Mua ngay</a> `
   }






