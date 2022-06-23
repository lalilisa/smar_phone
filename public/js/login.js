$("#submit").click(function(){
    var User = {};
    User["username"] = $("#username").val();
    User["password"] = $("#password").val();
    $.ajax({
        type : "POST",
        contentType : "application/json",
        url : "login",
        data : JSON.stringify(User),
        dataType : 'json',				
        success : function(data) {
            if(data==1){
                console.log(data)
                window.location.href="/";
            }
            else
                $('#status-request').html(data).css('color','red')
        }
        
    })    
});