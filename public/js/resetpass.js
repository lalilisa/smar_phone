// $(document).ready(function() {
            
//     $('#contactForm').submit(function() {
//         console.log($(this))
//       $(this).ajaxSubmit({
//           type:'GET',
//           url: 'http://localhost:8080/api/order/all_order',
//           error: function(xhr) {
//       status('Error: ' + xhr.status);
//           },

//       success: function(response) {
//             console.log(response)
//           }
//   });
//   return false;
//   });    
//   });


$("#resetpass").click(function(){
    let email=$('#email').val();
    $.ajax({
        type:"POST",
        url:`http://localhost:8080/api/user/reset-password/${email}`,
        contentType:"application/json",
        dataType:"json",

        success : function(data){
            console.log(data)
        }


    })


})


$("#changepass").click(function(){
    let data={};
    data['password']=$("#password").val()
    data['confirm_password']=$("#confirmPassword").val()
    let token=window.location.href.split('/')[4]
    if(data.password===data.confirm_password){
        $.ajax({
            type:"PUT",
            url:`http://localhost:8080/api/user/reset-change-password/${token}`,
            contentType:"application/json",
            dataType:"json",
            data    :JSON.stringify(data),
            success : function(data){
                console.log(data)
            }


    })
}

})
$('#password, #confirmPassword').on('keyup', function () {
    if ($('#password').val() =="" && $('#confirmPassword').val()=="") {
        $('#checkpass').html('')
      }
    else if ($('#password').val() == $('#confirmPassword').val()) {
      $('#checkpass').html('mật khẩu xác nhận chính xác').css('color', 'green');
    } else 
      $('#checkpass').html('mật khẩu xác nhận không chính xác').css('color', 'red');
});