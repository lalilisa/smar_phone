$(document).ready(function() {
    $("#btn-change-pass").click(function() {

    $.ajax({
        headers: {
            authorization:`Bearer ${getCookie('Username')}`
        },
        type:'put',
        url:window.location.href,
        contentType : "application/json",
        data:JSON.stringify({'currentpass':$("#currentPassword").val(),
                             'newpass':$("#newPassword").val()  }),
        dataType:'json',
        success:function(result){
        if(result===1){
            $('#form-changepass').load(window.location.href+" #form-changepass");
            $('.status').addClass('active');
            $('.check-current-pass').removeClass('active');
        }
        }
    });  
}) });

 $(document).ready(function() {

    $("#currentPassword").focusout(function() {
    $.ajax({  
        headers: {
            authorization:`Bearer ${getCookie('Username')}`
        },
        type:'post',
        url:window.location.href,
        contentType : "application/json",
        data:JSON.stringify({'currentpass':$("#currentPassword").val()}),
        dataType:'json',
        success:function(result){
            if(result===1){
                 $('.check-current-pass').addClass('active');
            }
            else
                 $('.check-current-pass').removeClass('active');
        }
    });  
}) });

 $('#newPassword, #confirmPassword').on('keyup', function () {
    if ($('#newPassword').val() =="" && $('#confirmPassword').val()=="") {
        $('#checkpass').html('')
      }
    else if ($('#newPassword').val() == $('#confirmPassword').val()) {
      $('#checkpass').html('mật khẩu xác nhận chính xác').css('color', 'green');
    } else 
      $('#checkpass').html('mật khẩu xác nhận không chính xác').css('color', 'red');
});

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

