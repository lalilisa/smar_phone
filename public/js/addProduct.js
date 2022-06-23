$(document).ready(function() {
  
    $('#form-add').submit(function() {

       $(this).ajaxSubmit({

           error: function(xhr) {
       status('Error: ' + xhr.status);
           },

       success: function(response) {
            console.log(response);
            if(response){
                $('#alert-success').html("Thêm thành công").css('color', 'green');
                $('#alert-success').addClass('active');
                 setTimeout(function(){
                   
                    // $('#alert-success').remove('active');
                    document.querySelector('#alert-success').classList.remove('active');
                }, 2000);
            }
            else{
                $('#alert-success').addClass('active');
                $('#alert-success').html("Lỗi").css('color', 'red');
                setTimeout(function(){
                     
                    document.querySelector('#alert-success').classList.remove('active');
                    // $('#alert-success').remove('active');
                }, 2000);
            }
           }
   });
   return false;
   });    
});
$(document).ready(function() {
  
    $('#form-detail').submit(function() {
       $(this).ajaxSubmit({

           error: function(xhr) {
       status('Error: ' + xhr.status);
           },

       success: function(response) {
            console.log(response)
           }
   });
   return false;
   });    
});