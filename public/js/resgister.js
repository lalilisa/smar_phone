$("#submit").click(function(){
        var createUser = {};
        createUser["username"] = $("#name").val();
        createUser["email"] = $("#email").val();
        createUser["password"] = $("#password").val();
        createUser["confirmPassword"] = $("#confirmPassword").val();
        const EMAIL_REG = /[a-zA-Z][a-zA-Z0-9_\.]{1,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}/g;
        var check=true;
        if(!$('#email').val().match(EMAIL_REG)){
            check=false;
            $('#checkEmail').html("Email không hợp lệ").css('color', 'red');
        }

        if(check && $("#password").val()===$("#confirmPassword").val()){
        $.ajax({
            type : "POST",
            contentType : "application/json",
            url : "http://localhost:8080/api/user",
            data : JSON.stringify(createUser),
            dataType : 'json',				
            success : function(data) {
                // $('#register_form').load(window.location.href+" #register_form");

                $('#status-register').html(data).css('color', 'green');
                setTimeout(function(){
                    $('#status-register').html("").css('color', 'green');
                }, 2000);
                resetForm();

            }
            
        })
    }
        
});


$(document).ready(function() {
    $("#name").on("keyup",function() {
    $.ajax({
        type:'post',
        url:"/api/checkuser",
        contentType : "application/json",
        data:JSON.stringify({'username':$("#name").val()}),
        dataType:'json',
        success:function(result){
            $('#checkUser').html(result).css('color', 'red');
        }
    });  
}) });

$(document).ready(function() {
    $("#email").on("keyup",function() {
    $.ajax({
        type:'post',
        url:"/api/checkmail",
        contentType : "application/json",
        data:JSON.stringify({'email':$("#email").val()}),
        dataType:'json',
        success:function(result){
            $('#checkEmail').html(result).css('color', 'red');
        }
    });  
}) });

$('#password, #confirmPassword').on('keyup', function () {
    if ($('#password').val() =="" && $('#confirmPassword').val()=="") {
        $('#checkpass').html('')
      }
    else if ($('#password').val() == $('#confirmPassword').val()) {
      $('#checkpass').html('mật khẩu xác nhận chính xác').css('color', 'green');
    } else 
      $('#checkpass').html('mật khẩu xác nhận không chính xác').css('color', 'red');
});




function resetForm(){
    $("#name").val("");
    $("#email").val("");
    $("#password").val("");
    $("#confirmPassword").val("");
    $('#checkpass').html('')
}

