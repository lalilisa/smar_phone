var username=window.location.href.split('/')[5]
var url='http://localhost:8080/api/adminuser/';


//admin update profile for User
$("#submit-profile").click(function(){
    var infor = {};
    infor["name"] = $("#name").val();
    infor["date"] = $("#date").val();
    infor["phone"] = $("#phone").val();
    infor["address"] = $("#address").val();
    infor["mail"] = $("#mail").val();
    if($( "#option-role" ).val()==='admin')
        infor["role"] =1;
    else
        infor["role"]=0;
    infor["password"] = $("#password").val();
    if(validateForm()){
    $.ajax({
        type : "PUT",
        contentType : "application/json",
        url : url+username,
        data : JSON.stringify(infor),
        dataType : 'json',				
        success : function(data) {
            location.reload();
        }
        
    })}
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



  $.ajax({

    type : "GET",
    contentType : "application/json",
    url : url+username,
    data:{"username":username},
    dataType : 'json',				
    success : function(data) {
        console.log(data);
        if(data){
        $("#name").val(data.Name);
        $("#date").val(data.Date);
        $("#phone").val(data.Phonenumber);
        $("#address").val(data.Address);
        $("#mail").val(data.Email);
        document.getElementById('asgnmnt_file_img').src=data.img;
        if(data.role===1)
            $('#option-role option[value="admin"]').prop('selected', true)
        else
            $('#option-role option[value="user"]').prop('selected', true)
    }
    else{
        console.log("TB");
            
    }
}
    
})
// Change Pass
